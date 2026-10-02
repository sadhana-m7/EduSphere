export type Resource = {
  id: string
  title: string
  author: string
  subject: string
  type: string
  language: string
  freshness: number
  outdatedNote?: string
  upvotes: number
  updated: string
  studentNote: string
  practiceCount: number
  curriculumAlignment: number
  standard: string
  endorsements: number
}

export const FILTER_OPTIONS = {
  subject: ['All', 'Computer Science', 'Mathematics', 'Design', 'Engineering', 'Data Science'],
  type: ['All', 'Lecture Notes', 'Slides', 'Textbook', 'Video', 'Problem Set'],
  language: ['All', 'English', 'Spanish', 'Hindi', 'French', 'Swahili'],
  freshness: ['All', 'Fresh (90%+)', 'Needs Review', 'Outdated'],
} as const

export type FilterKey = keyof typeof FILTER_OPTIONS

export const RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Data Structures & Algorithms: Complete 2026 Notes',
    author: 'Dr. Amara Okafor',
    subject: 'Computer Science',
    type: 'Lecture Notes',
    language: 'English',
    freshness: 98,
    upvotes: 1284,
    updated: '2 days ago',
    studentNote: 'Big-O cheat sheet on p.3, heaps explained with diagrams.',
    practiceCount: 24,
    curriculumAlignment: 96,
    standard: 'ACM CS2023 · AL',
    endorsements: 31,
  },
  {
    id: 'r2',
    title: 'Intro to Python Programming (Legacy Edition)',
    author: 'Open Code Collective',
    subject: 'Computer Science',
    type: 'Textbook',
    language: 'English',
    freshness: 34,
    outdatedNote: 'Python 2 Syntax Deprecated',
    upvotes: 412,
    updated: '3 years ago',
    studentNote: 'Good concepts, but print statements use old syntax.',
    practiceCount: 12,
    curriculumAlignment: 58,
    standard: 'ACM CS2023 · SDF',
    endorsements: 4,
  },
  {
    id: 'r3',
    title: 'Linear Algebra for Machine Learning',
    author: 'Priya Nair',
    subject: 'Mathematics',
    type: 'Slides',
    language: 'Hindi',
    freshness: 92,
    upvotes: 876,
    updated: '1 week ago',
    studentNote: 'Visual intuition for eigenvectors and SVD.',
    practiceCount: 18,
    curriculumAlignment: 89,
    standard: 'NEP 2020 · Math III',
    endorsements: 19,
  },
  {
    id: 'r4',
    title: 'Diseño de Interfaces: Principios de UX',
    author: 'Lucía Fernández',
    subject: 'Design',
    type: 'Video',
    language: 'Spanish',
    freshness: 95,
    upvotes: 653,
    updated: '5 days ago',
    studentNote: 'Short videos on hierarchy, contrast and usability testing.',
    practiceCount: 9,
    curriculumAlignment: 84,
    standard: 'IxDF Core · UX-1',
    endorsements: 12,
  },
  {
    id: 'r5',
    title: 'Structural Analysis: Beams & Trusses',
    author: 'Eng. Kwame Mensah',
    subject: 'Engineering',
    type: 'Problem Set',
    language: 'Swahili',
    freshness: 71,
    outdatedNote: 'Eurocode 2 revision pending review',
    upvotes: 298,
    updated: '8 months ago',
    studentNote: '40 worked problems with step-by-step free-body diagrams.',
    practiceCount: 40,
    curriculumAlignment: 77,
    standard: 'ABET · CE-SA',
    endorsements: 7,
  },
  {
    id: 'r6',
    title: 'Statistiques pour la Data Science',
    author: 'Camille Laurent',
    subject: 'Data Science',
    type: 'Lecture Notes',
    language: 'French',
    freshness: 90,
    upvotes: 541,
    updated: '3 weeks ago',
    studentNote: 'Hypothesis testing explained with real datasets.',
    practiceCount: 15,
    curriculumAlignment: 88,
    standard: 'EDSF · DSDA',
    endorsements: 14,
  },
]

export type Recommendation = { title: string; type: string; minutes: number; level: string }

export const SKILL_OPTIONS = ['Data Science', 'Full-Stack Dev', 'UI/UX Design', 'Civil Engineering'] as const

export const RECOMMENDATIONS: Record<string, Recommendation[]> = {
  'Data Science': [
    { title: 'Pandas in 60 Minutes', type: 'Interactive Notebook', minutes: 60, level: 'Beginner' },
    { title: 'Statistics for Data Science', type: 'Lecture Notes', minutes: 120, level: 'Intermediate' },
    { title: 'Build Your First ML Model', type: 'Project', minutes: 180, level: 'Intermediate' },
  ],
  'Full-Stack Dev': [
    { title: 'Data Structures & Algorithms 2026', type: 'Lecture Notes', minutes: 90, level: 'Intermediate' },
    { title: 'REST vs GraphQL Explained', type: 'Video', minutes: 25, level: 'Beginner' },
    { title: 'Deploy a Full-Stack App', type: 'Project', minutes: 150, level: 'Advanced' },
  ],
  'UI/UX Design': [
    { title: 'Visual Hierarchy Fundamentals', type: 'Slides', minutes: 40, level: 'Beginner' },
    { title: 'Usability Testing on a Budget', type: 'Guide', minutes: 55, level: 'Intermediate' },
    { title: 'Design Systems from Scratch', type: 'Project', minutes: 200, level: 'Advanced' },
  ],
  'Civil Engineering': [
    { title: 'Structural Analysis: Beams & Trusses', type: 'Problem Set', minutes: 120, level: 'Intermediate' },
    { title: 'Intro to Sustainable Materials', type: 'Lecture Notes', minutes: 45, level: 'Beginner' },
    { title: 'Bridge Design Case Studies', type: 'Video', minutes: 75, level: 'Advanced' },
  ],
  'AI & Full-Stack Engineering': [
    { title: 'Linear Algebra for Machine Learning', type: 'Slides', minutes: 80, level: 'Intermediate' },
    { title: 'Building AI-Powered Web Apps', type: 'Project', minutes: 160, level: 'Advanced' },
    { title: 'Data Structures & Algorithms 2026', type: 'Lecture Notes', minutes: 90, level: 'Intermediate' },
  ],
}

export function getRecommendations(skill: string): Recommendation[] {
  return (
    RECOMMENDATIONS[skill] ?? [
      { title: `Foundations of ${skill}`, type: 'Lecture Notes', minutes: 60, level: 'Beginner' },
      { title: `${skill}: Community Study Guide`, type: 'Guide', minutes: 90, level: 'Intermediate' },
      { title: `Hands-on ${skill} Project`, type: 'Project', minutes: 180, level: 'Advanced' },
    ]
  )
}

export const LEADERBOARD = [
  { rank: 1, name: 'Amara Okafor', country: 'Nigeria', points: 12480, resources: 214, initials: 'AO' },
  { rank: 2, name: 'Priya Nair', country: 'India', points: 10920, resources: 187, initials: 'PN' },
  { rank: 3, name: 'Lucía Fernández', country: 'Mexico', points: 9870, resources: 162, initials: 'LF' },
  { rank: 4, name: 'Kwame Mensah', country: 'Ghana', points: 7340, resources: 119, initials: 'KM' },
  { rank: 5, name: 'Camille Laurent', country: 'France', points: 6910, resources: 104, initials: 'CL' },
  { rank: 12, name: 'Alex Rivera', country: 'You', points: 1450, resources: 18, initials: 'AR' },
]

export const UPLOAD_HISTORY = [
  { title: 'Graph Theory Crash Course.pdf', date: 'Sep 21, 2026', status: 'Verified', views: 1204 },
  { title: 'React Hooks Deep Dive — Slides', date: 'Sep 14, 2026', status: 'Verified', views: 876 },
  { title: 'SQL Joins Visual Guide.pdf', date: 'Sep 02, 2026', status: 'In Review', views: 142 },
  { title: 'Intro to Neural Networks Notes', date: 'Aug 27, 2026', status: 'Verified', views: 2310 },
]

export const WEEKLY_HOURS = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 5.0 },
  { day: 'Sun', hours: 3.4 },
]
