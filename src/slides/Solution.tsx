import { APP_ACCESS, SHARED, WEBSITE_FOR } from '../content';

export default function Solution() {
  return (
    <>
      <h2>One platform, on web and mobile.</h2>

      <div className="platform">
        <div className="feat pair">
          <article>
            <h3>Website</h3>
            <p>Targets</p>
            <ul className="access">
              {WEBSITE_FOR.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Mobile application</h3>
            <p>Gives drivers easy access to</p>
            <ul className="access">
              {APP_ACCESS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        {/* one drop from each card's centre into the shared layer */}
        <div className="joins" aria-hidden="true" />
        <div className="shared">{SHARED}</div>
      </div>
    </>
  );
}
