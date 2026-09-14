import absher from '../assets/stakeholders/absher.svg';
import hrsd from '../assets/stakeholders/hrsd.svg';
import moc from '../assets/stakeholders/moc.svg';
import nafath from '../assets/stakeholders/nafath.svg';
import tga from '../assets/stakeholders/tga.svg';
import { PRIMARY_USERS } from '../content';

const STAKEHOLDER_LOGOS = [
  { src: moc, name: 'Ministry of Commerce' },
  { src: hrsd, name: 'Ministry of Human Resources and Social Development' },
  { src: tga, name: 'Transport General Authority' },
  { src: absher, name: 'Absher' },
  { src: nafath, name: 'Nafath' },
];

export default function Users() {
  return (
    <>
      <h2>Users and stakeholders</h2>

      <div className="featblock">
        <h3 className="seclabel in">Primary users</h3>
        <div className="feat pair">
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
        <div className="logos">
          {STAKEHOLDER_LOGOS.map((logo) => (
            <figure key={logo.name}>
              <img src={logo.src} alt={logo.name} />
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
