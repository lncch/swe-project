import { useCallback, useEffect, useRef, useState } from 'react';
import { SLIDES } from './deck';

/** Reads the slide index out of the URL hash, e.g. #4 for the fourth slide. */
function slideFromHash(): number {
  const n = Number.parseInt(window.location.hash.slice(1), 10);
  return Number.isFinite(n) ? Math.min(SLIDES.length, Math.max(1, n)) - 1 : 0;
}

/** Horizontal travel, in pixels, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 55;

export function useDeck() {
  const [index, setIndex] = useState(slideFromHash);
  const [blanked, setBlanked] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const go = useCallback((n: number) => {
    setIndex(Math.max(0, Math.min(SLIDES.length - 1, n)));
    window.scrollTo(0, 0);
  }, []);

  const step = useCallback((delta: number) => {
    setIndex((i) => Math.max(0, Math.min(SLIDES.length - 1, i + delta)));
    window.scrollTo(0, 0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => undefined);
  }, []);

  /* Keep the hash in step so a reload, or a shared link, lands on this slide. */
  useEffect(() => {
    const want = `#${index + 1}`;
    if (window.location.hash !== want) {
      window.history.replaceState(null, '', want);
    }
  }, [index]);

  useEffect(() => {
    const onHash = () => setIndex(slideFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  /* Stop the screen dimming mid-presentation. Unsupported browsers just skip it. */
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    const acquire = async () => {
      try {
        lock = await navigator.wakeLock?.request('screen');
      } catch {
        /* denied or unsupported; nothing to do */
      }
    };
    void acquire();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void acquire();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      void lock?.release();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // an expanded diagram owns the keyboard until it closes
      if (document.body.dataset.overlay && e.key !== 'Escape') return;
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          step(1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          step(-1);
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(SLIDES.length - 1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'b':
        case 'B':
          setBlanked((v) => !v);
          break;
        case '?':
          setHelpOpen((v) => !v);
          break;
        case 'Escape':
          setBlanked(false);
          setHelpOpen(false);
          break;
        case 'p':
        case 'P':
          window.print();
          break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, step, toggleFullscreen]);

  /* Wheel and trackpad: one slide per gesture.
     A trackpad flick fires dozens of events with a decaying delta, so the
     deltas accumulate to a threshold and then lock until the momentum goes
     quiet. Without that, one swipe jumps several slides. */
  useEffect(() => {
    const THRESHOLD = 90;   // accumulated pixels before a move
    const SETTLE_MS = 200;  // quiet time that ends one gesture
    let travel = 0;
    let locked = false;
    let settle: number | undefined;

    /** True when something under the cursor can absorb this scroll itself. */
    function ownScroller(target: EventTarget | null, delta: number) {
      let el = target instanceof Element ? target : null;
      while (el && el !== document.body) {
        const overflow = getComputedStyle(el).overflowY;
        if (overflow === 'auto' || overflow === 'scroll') {
          const room = el.scrollHeight - el.clientHeight;
          if (room > 1) {
            const atTop = el.scrollTop <= 0;
            const atEnd = el.scrollTop >= room - 1;
            if (!(delta < 0 && atTop) && !(delta > 0 && atEnd)) return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    }

    function onWheel(e: WheelEvent) {
      // an expanded diagram owns the wheel until it closes
      if (document.body.dataset.overlay) return;
      // browsers report lines or pages as well as pixels
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
      const delta = e.deltaY * unit;
      if (!delta) return;
      if (ownScroller(e.target, delta)) return;

      e.preventDefault();
      if (settle !== undefined) window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        locked = false;
        travel = 0;
      }, SETTLE_MS);

      if (locked) return;
      travel += delta;
      if (Math.abs(travel) < THRESHOLD) return;
      const dir = travel > 0 ? 1 : -1;
      locked = true;
      travel = 0;
      // Anything on the slide with steps of its own (the fishbone walk) gets
      // the gesture first, and cancels this event to keep the slide in place.
      const turn = new CustomEvent<number>('deck:wheel', { detail: dir, cancelable: true });
      if (window.dispatchEvent(turn)) step(dir);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      if (settle !== undefined) window.clearTimeout(settle);
      window.removeEventListener('wheel', onWheel);
    };
  }, [step]);

  /* Swipe, for presenting from a phone or tablet. */
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStart.current = e.changedTouches[0]?.clientX ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      const from = touchStart.current;
      const to = e.changedTouches[0]?.clientX;
      touchStart.current = null;
      if (from === null || to === undefined) return;
      const travel = to - from;
      if (Math.abs(travel) < SWIPE_THRESHOLD) return;
      step(travel < 0 ? 1 : -1);
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [step]);

  return {
    index,
    go,
    step,
    blanked,
    unblank: () => setBlanked(false),
    helpOpen,
    toggleHelp: () => setHelpOpen((v) => !v),
    fullscreen,
    toggleFullscreen,
  };
}
