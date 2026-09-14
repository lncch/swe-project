import { useLayoutEffect, useRef, type ReactNode } from 'react';
import Mark from './Mark';
import SignPanel from './SignPanel';

/** Below this, shrinking hurts more than scrolling would. */
const MIN_SCALE = 0.52;
/** A safety bound only. The stage is fixed, so sparse slides are allowed to
    grow until they fill the frame instead of stopping short of the bottom. */
const MAX_SCALE = 2.2;

interface Props {
  active: boolean;
  /** 1-based slide number, shown on the sign. */
  number: number;
  sign?: { english: string };
  children: ReactNode;
}

/**
 * Sizes a slide's content to the window: dense slides shrink so nothing needs
 * scrolling, sparse ones grow so the frame is not half empty.
 *
 * The body is laid out at `100 / scale` percent width and then scaled, so it
 * still spans the frame exactly afterwards. Text therefore re-wraps at the
 * scaled measure rather than being stretched, which is why the height is
 * measured a second time once the width has changed.
 */
export default function Slide({ active, number, sign, children }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const f = frame.current;
    const b = body.current;
    if (!f || !b) return;

    const clamp = (s: number) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

    const fit = () => {
      const availH = f.clientHeight;
      if (!availH) return;

      b.style.transform = 'none';
      b.style.marginTop = '0px';

      // Settle on a layout width. A narrower body re-wraps text taller, which
      // asks for a smaller scale, which widens it again, so an undamped step
      // oscillates instead of converging. The exponent damps it.
      let s = 1;
      // Lines that must not wrap (the title's two lines) have a fixed width,
      // so a larger scale, which narrows the layout, can push them past the
      // edge. The first time that happens the ceiling for s is known exactly.
      let widthCap = Infinity;
      for (let pass = 0; pass < 6; pass += 1) {
        b.style.width = `${100 / s}%`;
        const h = b.scrollHeight;
        if (!h) return;
        if (b.scrollWidth > b.clientWidth + 1) {
          widthCap = Math.min(widthCap, (s * b.clientWidth) / b.scrollWidth);
        }
        const ratio = availH / (s * h);
        if (Math.abs(ratio - 1) < 0.005 && s <= widthCap) break;
        const next = Math.min(clamp(s * Math.pow(ratio, 0.6)), widthCap);
        if (Math.abs(next - s) < 0.003) {
          s = next;
          break;
        }
        s = next;
      }

      // The width is now fixed, and a transform never changes layout, so this
      // height is final. Taking the smaller of the two bounds cannot overflow:
      // width is bounded by s, height by what actually fits.
      s = Math.min(s, widthCap);
      b.style.width = `${100 / s}%`;
      const settled = b.scrollHeight;
      const applied = Math.max(MIN_SCALE, Math.min(s, (availH / settled) * 0.99));
      b.style.transform = `scale(${applied})`;
      // A slide held back by its width leaves height over; share it above and below.
      b.style.marginTop = `${Math.max(0, (availH - settled * applied) / 2)}px`;
      // When height is the limit, applied < s and the content ends short of the
      // frame's right edge. The logo row takes the same inset, so both end together.
      f.parentElement?.style.setProperty('--content-inset', `${f.clientWidth * (1 - applied / s)}px`);
    };

    fit();
    const raf = requestAnimationFrame(fit);
    // Only the frame is observed: the body's size is what this effect changes,
    // so watching it would loop.
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active]);

  return (
    <section className={active ? 'slide on' : 'slide'} aria-hidden={!active}>
      <div className="frame">
        {/* Outside the fit box, so the sign and the logo keep one size on every slide. */}
        {sign && (
          <div className="slidehead">
            <SignPanel number={number} english={sign.english} />
            <div className="headbrand">
              <Mark />
              <span>HireWheel</span>
            </div>
          </div>
        )}
        <div className="fitbox" ref={frame}>
          <div className="body" ref={body}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
