import type { ComponentType } from 'react';
import Title from './slides/Title';
import Problem from './slides/Problem';
import RootCause from './slides/RootCause';
import Users from './slides/Users';
import Goal from './slides/Goal';
import Solution from './slides/Solution';
import Scope from './slides/Scope';
import Close from './slides/Close';
import Thanks from './slides/Thanks';

export interface SlideMeta {
  /** Short name, used for the navigation dots' accessible labels. */
  label: string;
  /**
   * The guide sign. It lives here rather than inside each slide so it renders
   * outside the auto-fit, keeping one size across the whole deck. The title
   * and closing slides have none.
   */
  sign?: { english: string };
  Body: ComponentType;
}

export const SLIDES: SlideMeta[] = [
  { label: 'Title', Body: Title },
  { label: 'The problem', sign: { english: 'What is the problem?' }, Body: Problem },
  { label: 'Root cause', sign: { english: 'Why does it happen?' }, Body: RootCause },
  { label: 'Who is affected', sign: { english: 'Who is affected?' }, Body: Users },
  { label: 'Goal and objectives', sign: { english: 'What do we want to achieve?' }, Body: Goal },
  { label: 'Proposed solution', sign: { english: 'What are we proposing?' }, Body: Solution },
  { label: 'Scope', sign: { english: 'What is in scope?' }, Body: Scope },
  { label: 'Dependencies', sign: { english: 'What does it depend on?' }, Body: Close },
  { label: 'Thank you', Body: Thanks },
];
