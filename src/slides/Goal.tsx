import Expandable from '../components/Expandable';
import { GOAL, OBJECTIVES } from '../content';

export default function Goal() {
  return (
    <>
      <div className="goal">{GOAL}</div>
      <Expandable label="the objectives table">
        <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Objective</th>
            </tr>
          </thead>
          <tbody>
            {OBJECTIVES.map((objective) => (
              <tr key={objective}>
                <td>{objective}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Expandable>
    </>
  );
}
