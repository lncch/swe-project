import { PROBLEM_POINTS } from '../content';

export default function Problem() {
  return (
    <>
      <h2>Two sides of the same market, and no place where they meet.</h2>
      <div className="feat pair checklist">
        {PROBLEM_POINTS.map((group) => (
          <article key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
