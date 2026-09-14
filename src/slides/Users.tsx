import type { PointGroup } from '../content';
import { PRIMARY_USERS, STAKEHOLDERS } from '../content';

function Cards({ groups, layout }: { groups: PointGroup[]; layout: string }) {
  return (
    <div className={`feat checklist plain ${layout}`}>
      {groups.map((group) => (
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
  );
}

export default function Users() {
  return (
    <>
      <h2>Users and stakeholders</h2>

      <div className="featblock">
        <h3 className="seclabel in">Primary users</h3>
        <Cards groups={PRIMARY_USERS} layout="pair" />
      </div>

      <div className="featblock">
        <h3 className="seclabel in">Supporting stakeholders</h3>
        <Cards groups={STAKEHOLDERS} layout="" />
      </div>
    </>
  );
}
