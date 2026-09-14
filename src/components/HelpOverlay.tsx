const KEYS: [string, string][] = [
  ['→ ↓  space', 'Next'],
  ['← ↑', 'Back'],
  ['F', 'Fullscreen'],
  ['B', 'Blank the screen'],
  ['P', 'Print, or save as PDF'],
  ['Esc', 'Close this, or unblank'],
];

export default function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="scrim" onClick={onClose} role="presentation">
      <div className="help" role="dialog" aria-label="Keyboard shortcuts" onClick={(e) => e.stopPropagation()}>
        <h3>Keyboard</h3>
        <dl>
          {KEYS.map(([key, what]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{what}</dd>
            </div>
          ))}
        </dl>
              <p className="note">Scrolling and swiping move the same way. On the fishbone, each
        step zooms into the next cause before the deck moves on. The URL tracks the slide,
        so a reload keeps your place.</p>
        <button type="button" className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
