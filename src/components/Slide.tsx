import { useLayoutEffect, useRef, type ReactNode } from 'react';
import Mark from './Mark';
import SignPanel from './SignPanel';

/** Below this, shrinking hurts more than scrolling would. */
const MIN_SCALE = 0.52;
/** Above this, a sparse slide starts to look like a poster. */
const MAX_SCALE = 1.34;

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

      // Settle on a layout width. A narrower body re-wraps text taller, which
      // asks for a smaller scale, which widens it again, so an undamped step
      // oscillates instead of converging. The exponent damps it.
      let s = 1;
      for (let pass = 0; pass < 6; pass += 1) {
        b.style.width = `${100 / s}%`;
        const h = b.scrollHeight;
        if (!h) return;
        const ratio = availH / (s * h);
        if (Math.abs(ratio - 1) < 0.005) break;
        const next = clamp(s * Math.pow(ratio, 0.6));
        if (Math.abs(next - s) < 0.003) {
          s = next;
          break;
        }
        s = next;
      }

      // The width is now fixed, and a transform never changes layout, so this
      // height is final. Taking the smaller of the two bounds cannot overflow:
      // width is bounded by s, height by what actually fits.
      b.style.width = `${100 / s}%`;
      const settled = b.scrollHeight;
      const applied = Math.max(MIN_SCALE, Math.min(s, (availH / settled) * 0.99));
      b.style.transform = `scale(${applied})`;
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
