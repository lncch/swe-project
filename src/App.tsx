import { useLayoutEffect, useRef } from 'react';
import ControlBar from './components/ControlBar';
import HelpOverlay from './components/HelpOverlay';
import Slide from './components/Slide';
import { SLIDES } from './deck';
import { useDeck } from './useDeck';

/** The one layout size. Keep in step with .stage in index.css. */
const STAGE_W = 1600;
const STAGE_H = 900;

export default function App() {
  const {
    index, go, step,
    blanked, unblank,
    helpOpen, toggleHelp,
    fullscreen, toggleFullscreen,
  } = useDeck();

  const deck = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  /* The slides are laid out once, on a STAGE_W x STAGE_H stage, and that stage
     is scaled as a single picture to the space above the control bar. Every
     screen therefore shows the same layout, letterboxed if its shape differs. */
  useLayoutEffect(() => {
    const d = deck.current;
    const st = stage.current;
    if (!d || !st) return;
    const fit = () => {
      const bar = document.querySelector<HTMLElement>('.bar');
      document.documentElement.style.setProperty('--bar-h', `${bar?.offsetHeight ?? 0}px`);
      const k = Math.min(d.clientWidth / STAGE_W, d.clientHeight / STAGE_H);
      if (k > 0) st.style.setProperty('--k', String(k));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(d);
    const bar = document.querySelector('.bar');
    if (bar) ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Every slide stays mounted so Cmd-P prints the whole deck. */}
      <div className="deck" ref={deck}>
        <div className="stage" ref={stage}>
          {SLIDES.map(({ Body, label, sign }, n) => (
            <Slide key={label} active={n === index} number={n + 1} sign={sign}>
              <Body />
            </Slide>
          ))}
        </div>
      </div>

      {/* Click the edge of the screen to move, the way a remote's two buttons work. */}
      <button
        type="button"
        className="edge edge-prev"
        onClick={() => step(-1)}
        disabled={index === 0}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className="edge edge-next"
        onClick={() => step(1)}
        disabled={index === SLIDES.length - 1}
        aria-label="Next slide"
      >
        <span aria-hidden="true">›</span>
      </button>

      <ControlBar
        index={index}
        go={go}
        step={step}
        fullscreen={fullscreen}
        toggleFullscreen={toggleFullscreen}
        toggleHelp={toggleHelp}
      />

      {helpOpen && <HelpOverlay onClose={toggleHelp} />}

      {blanked && (
        <button type="button" className="blank" onClick={unblank} aria-label="Screen blanked. Click to resume." />
      )}
    </>
  );
}
