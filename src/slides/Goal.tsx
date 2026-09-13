import { GOAL, OBJECTIVES } from '../content';

export default function Goal() {
  return (
    <>
      <div className="goal">{GOAL}</div>

      <div className="featblock">
        <h3 className="seclabel in">Objectives</h3>
        <div className="feat pair objectives">
          {OBJECTIVES.map((objective) => (
            <article key={objective}>
              <p>{objective}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
