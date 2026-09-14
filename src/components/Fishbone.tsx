import { useEffect, useMemo, useRef, useState } from 'react';
import { CAUSES, EFFECT } from '../content';

const SPINE_Y = 345;
const SPINE_X0 = 90;
const SPINE_X1 = 1290;
/** Where each bone meets the spine. Bones 0-2 sit above it, 3-5 below. */
const ATTACH_X = [430, 750, 1070];
const BONE_RUN = 155;
const TIP_Y_ABOVE = 100;
const TIP_Y_BELOW = 590;
/** Positions of the three factor labels along each bone. */
const FACTOR_T = [0.3, 0.55, 0.8];
const VIEWBOX = { x: 0, y: 60, width: 1660, height: 570 };
const FOCUS_SCALE = 2.05;
const EFFECT_INDEX = CAUSES.length;

function focusTransform(index: number): string {
  if (index < 0) return 'translate(0px, 0px) scale(1)';

  if (index === EFFECT_INDEX) {
    const centerX = 1490;
    const centerY = 345;
    const targetX = VIEWBOX.x + VIEWBOX.width / 2;
    const targetY = VIEWBOX.y + VIEWBOX.height / 2;
    const tx = targetX - centerX * FOCUS_SCALE;
    const ty = targetY - centerY * FOCUS_SCALE;

    return `translate(${tx}px, ${ty}px) scale(${FOCUS_SCALE})`;
  }

  const above = index < 3;
  const attachX = ATTACH_X[index % 3];
  const centerX = attachX - 8;
  const centerY = above ? 214 : 477;
  const targetX = VIEWBOX.x + VIEWBOX.width / 2;
  const targetY = VIEWBOX.y + VIEWBOX.height / 2;
  const tx = targetX - centerX * FOCUS_SCALE;
  const ty = targetY - centerY * FOCUS_SCALE;

  return `translate(${tx}px, ${ty}px) scale(${FOCUS_SCALE})`;
}

export default function Fishbone() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(-1);
  const stageStyle = useMemo(() => ({ transform: focusTransform(focusIndex) }), [focusIndex]);
  // the wheel listener reads the step without re-subscribing on every change
  const focusRef = useRef(focusIndex);
  focusRef.current = focusIndex;

  // Every way of moving forward or back (arrow keys, space, page keys, wheel,
  // swipe) walks the bones first. Past either end the step is left alone, so
  // the deck turns to the next or previous slide.
  useEffect(() => {
    function onDeckStep(e: Event) {
      const root = rootRef.current;
      if (!root?.closest('.slide.on')) return;
      const dir = (e as CustomEvent<number>).detail;
      const current = focusRef.current;
      if (dir > 0 && current < EFFECT_INDEX) {
        e.preventDefault();
        setFocusIndex(current + 1);
      } else if (dir < 0 && current > -1) {
        e.preventDefault();
        setFocusIndex(current - 1);
      }
    }
    window.addEventListener('deck:step', onDeckStep);
    return () => window.removeEventListener('deck:step', onDeckStep);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const root = rootRef.current;
      if (!root) return;

      // On the slide, the deck's step event drives the walk. Only Escape is
      // handled here, to jump back to the full view.
      if (root.closest('.slide.on') && !document.body.dataset.overlay) {
        if (e.key === 'Escape') setFocusIndex(-1);
        return;
      }

      // The full-screen copy has the keyboard to itself, since the deck
      // ignores keys while it is open, so it takes the same keys directly.
      if (!root.closest('.expanded-inner')) return;
      const forward = ['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key);
      const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
      if (!forward && !back) return;
      e.preventDefault();
      e.stopPropagation();
      setFocusIndex((current) => Math.max(-1, Math.min(EFFECT_INDEX, current + (forward ? 1 : -1))));
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Leaving the slide puts the diagram back to its full view. The deck moves
  // with history.replaceState, which fires no hashchange, so this watches the
  // slide's own "on" class instead.
  useEffect(() => {
    const slide = rootRef.current?.closest('.slide');
    if (!slide) return;
    const observer = new MutationObserver(() => {
      if (!slide.classList.contains('on')) setFocusIndex(-1);
    });
    observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        'fish',
        focusIndex >= 0 ? 'fish-stepping' : '',
        focusIndex === EFFECT_INDEX ? 'fish-effect-focused' : '',
      ].filter(Boolean).join(' ')}
      data-focus={focusIndex === EFFECT_INDEX ? 'effect' : focusIndex >= 0 ? CAUSES[focusIndex].category : 'full'}
    >
      <svg viewBox="0 60 1660 570" role="img" aria-labelledby="fb-title">
        <title id="fb-title">
          Fishbone cause and effect diagram for the HireWheel problem, with six cause
          categories feeding one effect
        </title>

        <g className="fishbone-stage" style={stageStyle}>
          <line x1={SPINE_X0} y1={SPINE_Y} x2={SPINE_X1} y2={SPINE_Y} stroke="currentColor" strokeWidth={3} />
          <polygon
            points={`${SPINE_X1},${SPINE_Y - 12} ${SPINE_X1 + 28},${SPINE_Y} ${SPINE_X1},${SPINE_Y + 12}`}
            fill="currentColor"
          />

          <g className={focusIndex === EFFECT_INDEX ? 'fishbone-effect is-active' : 'fishbone-effect'}>
            <rect x={1330} y={252} width={320} height={186} rx={7} fill="#8E3A2C" stroke="#5E241A" strokeWidth={2} />
            {EFFECT.map((line, i) => (
              <text
                key={line}
                x={1356}
                y={298 + i * 32}
                fontSize={21}
                fontWeight={600}
                fill="#FBFAF7"
              >
                {line}
              </text>
            ))}
          </g>

          {CAUSES.map((cause, i) => {
            const above = i < 3;
            const attachX = ATTACH_X[i % 3];
            const tipX = attachX - BONE_RUN;
            const tipY = above ? TIP_Y_ABOVE : TIP_Y_BELOW;
            const active = focusIndex === i;
            const muted = focusIndex >= 0 && !active;
            const causeClass = [
              'fishbone-cause',
              active ? 'is-active' : '',
              muted ? 'is-muted' : '',
            ].filter(Boolean).join(' ');

            return (
              <g key={cause.category} className={causeClass}>
                <line
                  className="fishbone-branch"
                  x1={tipX}
                  y1={tipY}
                  x2={attachX}
                  y2={SPINE_Y}
                  stroke="var(--accent-line)"
                  strokeWidth={2.5}
                />
                <text
                  className="fishbone-category"
                  x={tipX}
                  y={above ? tipY - 17 : tipY + 30}
                  fontSize={22}
                  fontWeight={700}
                  fill="var(--accent-line)"
                >
                  {cause.category}
                </text>
                {cause.factors.map((factor, j) => {
                  const t = FACTOR_T[j];
                  const px = tipX + (attachX - tipX) * t;
                  const py = tipY + (SPINE_Y - tipY) * t;
                  return (
                    <g key={factor}>
                      <line x1={px} y1={py} x2={px + 11} y2={py} stroke="var(--line)" strokeWidth={2} />
                      <text x={px + 18} y={py + 5.5} fontSize={16.5} fill="var(--ink)">
                        {factor}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
        {focusIndex >= 0 && (
          <text className="fishbone-step" x={26} y={615}>
            {focusIndex + 1} / {EFFECT_INDEX + 1}
          </text>
        )}
      </svg>
    </div>
  );
}
