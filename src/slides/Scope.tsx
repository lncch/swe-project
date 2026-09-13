import { FEATURES, SCOPE_OUT } from '../content';

export default function Scope() {
  return (
    <>
      <h2>An intermediate between drivers and companies, nothing more.</h2>

      <div className="featblock">
        <h3 className="seclabel in">Included features</h3>
        <div className="feat four">
          {FEATURES.map((f) => (
            <article key={f.id}>
              <span className="k">{f.id}</span>
              <h3>{f.title}</h3>
              <p>{f.rationale}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="featblock">
        <h3 className="seclabel out">Excluded features</h3>
        <div className="feat four out-cards">
          {SCOPE_OUT.map((s) => (
            <article key={s.id}>
              <span className="k">{s.id}</span>
              <h3>{s.label}</h3>
              <p>{s.reason}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
