import { PRIMARY_USERS, STAKEHOLDERS } from '../content';

export default function Users() {
  return (
    <>
      <h2>Users and stakeholders</h2>

      {/* Slides 6 and 7 card treatment, so the deck has one card. The two
          primary users take the wider pair, the three stakeholders the
          default three across, which is the hierarchy between them. */}
      <div className="featblock">
        <h3 className="seclabel in">Primary users</h3>
        <div className="feat pair people">
          {PRIMARY_USERS.map((user) => (
            <article key={user.who}>
              <h3>{user.who}</h3>
              <p>{user.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="featblock">
        <h3 className="seclabel in">Supporting stakeholders</h3>
        <div className="feat people">
          {STAKEHOLDERS.map((stakeholder) => (
            <article key={stakeholder.who}>
              <h3>{stakeholder.who}</h3>
              <p>{stakeholder.text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
