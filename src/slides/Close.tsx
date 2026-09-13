import { CLOSING } from '../content';

export default function Close() {
  return (
    <>
      <h2>Where this leaves us.</h2>
      <div className="feat closing-groups">
        {CLOSING.map((group) => (
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
