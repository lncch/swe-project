import type { ReactNode } from 'react';
import { TEAM } from '../content';
import Mark from './Mark';

/**
 * The shell slides 1 and 9 share. Only the headline differs, so it lives here
 * rather than in both files where the two could drift apart.
 */
export default function Bookend({ children }: { children: ReactNode }) {
  return (
    <div className="title-wrap">
      <div className="brandrow">
        <Mark />
        <div className="brandname">HireWheel</div>
      </div>

      <h1>{children}</h1>

      <div className="team-row">
        {TEAM.map((m) => (
          <span key={m.name}>{m.name}</span>
        ))}
      </div>

      <div className="credits">
        <span>Software Engineering group project</span>
        <span>Innovation, Group 3 · Section CS1</span>
        <span>Dr. Abdulaziz Attaallah</span>
      </div>
    </div>
  );
}
