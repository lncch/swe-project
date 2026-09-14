/** All report content, typed and separated from presentation. */

export interface Member {
  name: string;
  /** Section 1.5. Kept for the report; the slides show names only. */
  role: string;
}

export interface PointGroup {
  title: string;
  items: string[];
}

export interface Feature {
  id: `IN-0${number}`;
  title: string;
  rationale: string;
}

export interface ScopeItem {
  id: string;
  label: string;
  reason?: string;
}

export interface Cause {
  category: string;
  factors: [string, string, string];
}

export const TEAM: Member[] = [
  { name: 'Almoayyad Abuljdail', role: 'Team leader · organization, slides, integration, submission' },
  { name: 'Mohammed Al Ghalib', role: 'Identification, introduction, proposed system' },
  { name: 'Ibrahim Alyami', role: 'Problem, objectives, root causes, assumptions, constraints' },
  { name: 'Elyas Babour', role: 'Goals, system boundary, included and excluded features' },
];

/** Slide 2: the report's problem statement, one short point per line. */
export const PROBLEM_POINTS: PointGroup[] = [
  {
    title: 'Drivers',
    items: [
      'Hard to find a job after a contract ends',
      'Disorganized job postings mean longer searches',
      'Little to no information about the company',
    ],
  },
  {
    title: 'Companies',
    items: [
      'Hire through personal networks, their website or ads',
      'Costs more time, money and effort',
      'Little to no detail about the drivers',
      'May lead to inappropriate hiring',
    ],
  },
];

/** Six bones of the fishbone, in draw order: three above the spine, three below. */
export const CAUSES: Cause[] = [
  { category: 'Drivers', factors: ['Rely on word of mouth', 'No structured path to next job', 'Cannot compare employers'] },
  { category: 'Companies', factors: ['Hiring by personal networks', 'Ads reach the wrong people', 'Manual CV screening'] },
  { category: 'Information', factors: ['Licence class never captured', 'Salary and route left vague', 'Disorganized job tasks'] },
  { category: 'Technology', factors: ['Job boards ignore licences', 'Single-category driver limit', 'No direct driver–company platform'] },
  { category: 'Trust', factors: ['No identity verification', 'No commercial-record check', 'No history on either side'] },
  { category: 'Market', factors: ['Neglecting local driver talent', 'Saudization targets unmet', 'Residency transfer complications'] },
];

export const EFFECT: string[] = [
  'Qualified drivers in Saudi',
  'Arabia and the companies',
  'that need them do not',
  'reliably find each other.',
];

/** Slide 4: each description split into its parts, one per line. */
export const PRIMARY_USERS: PointGroup[] = [
  {
    title: 'Drivers',
    items: [
      'Seeking new roles after a contract ends',
      'Structured job listings',
      'Real-time application tracking',
      'Employer comparisons',
    ],
  },
  {
    title: 'Companies',
    items: [
      'Moving away from manual hiring',
      'Publish detailed vacancies',
      'Source verified local drivers',
    ],
  },
];

export const STAKEHOLDERS: PointGroup[] = [
  {
    title: 'HRSD & Ministry of Commerce',
    items: [
      'Labor laws and Saudization quotas',
      'Verify commercial records via Wathq',
      'Prevent fraudulent companies',
    ],
  },
  {
    title: 'Transport General Authority',
    items: [
      'Transport standards',
      'Unified driver status',
      'Professional licensing',
      'Commercial operations',
    ],
  },
  {
    title: 'Service providers',
    items: [
      'Digital ID: Nafath and Absher',
      'SMS',
      'Payments',
      'Local hosting',
    ],
  },
];

export const GOAL =
  'Connect companies that need professional drivers with those already in Saudi Arabia, through a trusted platform.';


export interface Objective {
  id: `OBJ-${number}`;
  text: string;
}

export const OBJECTIVES: Objective[] = [
  { id: 'OBJ-1', text: 'To help companies hire drivers already in Saudi Arabia, not from abroad.' },
  { id: 'OBJ-2', text: 'To enable companies to create detailed and searchable driver vacancies.' },
  { id: 'OBJ-3', text: 'To reduce the time for companies and establishments to hire drivers with the desired qualifications.' },
  { id: 'OBJ-4', text: 'To reduce unsuitable applications by presenting requirements clearly before a driver applies.' },
];

/** Slide 6: the report's platform paragraph, split into its two channels and what they share. */
export const WEBSITE_FOR = ['Drivers', 'Company recruiters'];
export const APP_ACCESS = ['Vacancies', 'Applications', 'Notifications', 'Saved jobs'];
export const SHARED =
  'Both use the same database and backend services, so each side sees the same data.';

export const FEATURES: Feature[] = [
  { id: 'IN-01', title: 'Registration & verification', rationale: "Checking drivers' IDs and company data to ensure the safety and trustworthiness of the platform." },
  { id: 'IN-02', title: 'Job management', rationale: 'Enabling companies to publish information on job characteristics, compensation and benefits.' },
  { id: 'IN-03', title: 'Search & job matching', rationale: 'Filtering jobs according to licence type, location, experience and vehicle category.' },
  { id: 'IN-04', title: 'Application tracking', rationale: 'Drivers save jobs, track the jobs applied for, and receive notifications, while companies manage the candidates.' },
];


export const SCOPE_OUT: ScopeItem[] = [
  { id: 'EX-01', label: 'Overseas recruitment', reason: 'Only drivers already residing in Saudi Arabia, to avoid complicated processes' },
  { id: 'EX-02', label: 'Payroll and HR management', reason: 'No salary payment, no employee management during shifts' },
  { id: 'EX-03', label: 'Signing legal contracts', reason: 'Official government contracts are signed outside the app, after a company decides to hire' },
  { id: 'EX-04', label: 'Live GPS vehicle tracking', reason: 'A fleet management feature, outside the recruitment scope' },
];


/** Slide 8: each sentence split at its commas, so every point reads as one line. */
export const CLOSING: PointGroup[] = [
  {
    title: 'Assumptions',
    items: [
      'Users will trust the platform',
      'Companies will pay a commission fee for successful hires',
      'Drivers can fill out their own forms',
    ],
  },
  {
    title: 'Constraints',
    items: [
      'Government approvals from HRSD and the Ministry of Commerce',
      'Must follow Transport General Authority rules',
    ],
  },
  {
    title: 'Dependencies',
    items: [
      'Government APIs: Nafath, Absher and Wathq',
      'Payment gateways',
      'SMS services',
    ],
  },
];
