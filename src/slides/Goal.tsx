import { GOAL, OBJECTIVES } from '../content';

export default function Goal() {
  return (
    <>
      <div className="goal">{GOAL}</div>

      <div className="featblock">
        <h3 className="seclabel in">Main objectives</h3>
        <div className="feat pair objectives">
          {OBJECTIVES.map((o) => (
            <article key={o.id}>
              <span className="k">{o.id}</span>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
