/** All report content, typed and separated from presentation. */

export interface Member {
  name: string;
  /** Section 1.5. Kept for the report; the slides show names only. */
  role: string;
}

export interface Pain {
  who: string;
  text: string;
  /** Words to emphasise, matched verbatim inside `text`. */
  stress?: string;
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
  { name: 'Elyas Babour', role: 'Goals, system boundary, included and excluded features' },
  { name: 'Ibrahim Alyami', role: 'Problem, objectives, root causes, assumptions, constraints' },
  { name: 'Mohammed Al Ghalib', role: 'Identification, introduction, proposed system' },
];

export const PROBLEM_PAINS: Pain[] = [
  {
    who: 'Drivers',
    text: 'Finding a suitable job after a contract ends is difficult, and disorganized job postings mean a driver spends longer looking. Vacancies rarely say enough about needs, experience, location or salary to judge.',
    stress: 'disorganized job postings',
  },
  {
    who: 'Companies',
    text: 'Hiring runs on relationship networks, a company website, or an advertisement medium. That requires more time, money and effort, and may lead to inappropriate hiring.',
    stress: 'more time, money and effort',
  },
  {
    who: 'Both sides',
    text: 'Existing platforms provide little to no detail about the drivers, and drivers have little to no information about the company. Neither side can judge the other.',
    stress: 'little to no detail about the drivers',
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

export const PRIMARY_USERS: Pain[] = [
  { who: 'Drivers', text: 'Professional drivers (truck, parcel delivery, bus, private, and commercial) seeking new job opportunities post-contract. The platform enables them to browse structured vacancies, submit applications, track application status in real-time, and compare employers.' },
  { who: 'Companies', text: 'Businesses and recruiters transitioning away from traditional word-of-mouth and manual recruitment methods. The platform allows them to publish detailed, searchable job listings and source qualified local drivers within the Kingdom efficiently.' },
];

export const STAKEHOLDERS: Pain[] = [
  { who: 'HRSD & Ministry of Commerce', text: 'HRSD enforces labor laws and Saudization quotas for recruitment, while the Ministry of Commerce validates company commercial records via Wathq to prevent fraudulent registrations.' },
  { who: 'Transport General Authority (TGA)', text: 'Sets transport standards, unified driver status, professional licensing categories, and commercial vehicle operating regulations.' },
  { who: 'Service & Integration Providers', text: 'Core third-party services powering national digital identity (Nafath/Absher), SMS gateways, payment processing, and secure local hosting.' },
];

export const GOAL =
  'Connect companies that need professional drivers with those already in Saudi Arabia, through a trusted platform.';


export const OBJECTIVES: string[] = [
  'To assist companies and establishments to look for new drivers living in Saudi Arabia rather than recruiting from outside the Kingdom.',
  'To enable companies to create detailed and searchable driver vacancies.',
  'To reduce the time for companies and establishments to hire drivers with the desired qualifications.',
  'To reduce unsuitable applications by presenting requirements clearly before a driver applies.',
];

export const FEATURES: Feature[] = [
  { id: 'IN-01', title: 'Registration & verification', rationale: "Checking drivers' IDs and company data to ensure the safety and trustworthiness of the platform." },
  { id: 'IN-02', title: 'Job management', rationale: 'Enabling companies to publish information on job characteristics, compensation and benefits.' },
  { id: 'IN-03', title: 'Search & job matching', rationale: 'Filtering jobs according to licence type, location, experience and vehicle category.' },
  { id: 'IN-04', title: 'Application tracking', rationale: 'Drivers save jobs, track the jobs applied for, and receive notifications, while companies manage the candidates.' },
  { id: 'IN-05', title: 'Mutual review system', rationale: 'Rating and reviewing the companies and the drivers.' },
  { id: 'IN-06', title: 'Multilingual interfaces', rationale: 'Providing the website and application in multiple languages.' },
];


export const SCOPE_OUT: ScopeItem[] = [
  { id: 'EX-01', label: 'Overseas recruitment', reason: 'Only drivers already residing in Saudi Arabia, to avoid complicated processes' },
  { id: 'EX-02', label: 'Payroll and HR management', reason: 'No salary payment, no employee management during shifts' },
  { id: 'EX-03', label: 'Signing legal contracts', reason: 'Official government contracts are signed outside the app, after a company decides to hire' },
  { id: 'EX-04', label: 'Live GPS vehicle tracking', reason: 'A fleet management feature, outside the recruitment scope' },
];


export const CLOSING: Pain[] = [
  { who: 'Assumed', text: 'Drivers, companies and establishments will entrust their credentials to the portal; companies will pay for access to job postings; drivers are literate and fill out the forms themselves.' },
  { who: 'Constrained', text: 'Approval from the Ministry of Human Resources and Social Development and the Ministry of Commerce to operate an employing or mediation portal, adherence to HRSD conditions and policies, access to the Absher and Nafath APIs, and strict adherence to Transport General Authority standards.' },
  { who: 'Dependent on', text: 'Nafath and Absher, telecom and SMS gateways (STC, Mobily, Zain), the Wathq API, local cloud hosting, a payment gateway, and SSL and other security certificates.' },
];
