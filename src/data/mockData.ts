
import { User, Event, Candidate, Judge, ScoringCriteria, Award, Score, PublicVote } from "../types/pageant-types";

// Coordinator Users
export const coordinators: User[] = [
  {
    id: "coord1",
    name: "John Smith",
    email: "john@example.com",
    role: "coordinator",
  },
  {
    id: "coord2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "coordinator",
  },
];

// Judge Users
export const judges: Judge[] = [
  {
    id: "judge1",
    eventId: "event1",
    name: "Michael Brown",
    email: "michael@example.com",
    accessCode: "JUDGE001",
    status: "active",
  },
  {
    id: "judge2",
    eventId: "event1",
    name: "Jessica Taylor",
    email: "jessica@example.com",
    accessCode: "JUDGE002",
    status: "active",
  },
  {
    id: "judge3",
    eventId: "event2",
    name: "Robert Wilson",
    email: "robert@example.com",
    accessCode: "JUDGE003",
    status: "invited",
  },
];

// Events
export const events: Event[] = [
  {
    id: "event1",
    name: "Miss Elegance 2025",
    description: "The annual beauty pageant celebrating elegance and grace",
    date: "2025-06-15",
    location: "Grand Palace Hotel",
    status: "upcoming",
    imageUrl: "/placeholder.svg",
    createdBy: "coord1",
  },
  {
    id: "event2",
    name: "Mr. Universe 2025",
    description: "The premier men's pageant showcasing talent and physique",
    date: "2025-07-22",
    location: "City Convention Center",
    status: "upcoming",
    imageUrl: "/placeholder.svg",
    createdBy: "coord2",
  },
  {
    id: "event3",
    name: "Teen Sparkle 2025",
    description: "Celebrating talented teenagers across the nation",
    date: "2025-05-10",
    location: "Youth Center Auditorium",
    status: "active",
    imageUrl: "/placeholder.svg",
    createdBy: "coord1",
  },
];

// Candidates
export const candidates: Candidate[] = [
  {
    id: "cand1",
    eventId: "event1",
    name: "Emma Roberts",
    age: 24,
    bio: "Emma is a marketing professional who loves community service and volunteering at animal shelters.",
    imageUrl: "/placeholder.svg",
    candidateNumber: 1,
  },
  {
    id: "cand2",
    eventId: "event1",
    name: "Sophia Miller",
    age: 26,
    bio: "Sophia is a medical resident who advocates for healthcare accessibility and education.",
    imageUrl: "/placeholder.svg",
    candidateNumber: 2,
  },
  {
    id: "cand3",
    eventId: "event1",
    name: "Isabella Lopez",
    age: 23,
    bio: "Isabella is a dance instructor who runs programs for disadvantaged youth.",
    imageUrl: "/placeholder.svg",
    candidateNumber: 3,
  },
  {
    id: "cand4",
    eventId: "event2",
    name: "Daniel Johnson",
    age: 28,
    bio: "Daniel is a fitness coach who promotes healthy living and wellness.",
    imageUrl: "/placeholder.svg",
    candidateNumber: 1,
  },
  {
    id: "cand5",
    eventId: "event2",
    name: "Matthew Garcia",
    age: 27,
    bio: "Matthew is an environmental scientist passionate about sustainability.",
    imageUrl: "/placeholder.svg",
    candidateNumber: 2,
  },
];

// Scoring Criteria
export const scoringCriteria: ScoringCriteria[] = [
  {
    id: "criteria1",
    eventId: "event1",
    name: "Beauty",
    description: "Overall physical appearance and grooming",
    maxScore: 10,
    weight: 30,
  },
  {
    id: "criteria2",
    eventId: "event1",
    name: "Talent",
    description: "Performance of a talent showcase",
    maxScore: 10,
    weight: 25,
  },
  {
    id: "criteria3",
    eventId: "event1",
    name: "Intelligence",
    description: "Response to Q&A and intellectual abilities",
    maxScore: 10,
    weight: 25,
  },
  {
    id: "criteria4",
    eventId: "event1",
    name: "Poise & Personality",
    description: "Confidence, grace, and overall disposition",
    maxScore: 10,
    weight: 20,
  },
  {
    id: "criteria5",
    eventId: "event2",
    name: "Physique",
    description: "Physical conditioning and appearance",
    maxScore: 10,
    weight: 35,
  },
  {
    id: "criteria6",
    eventId: "event2",
    name: "Talent",
    description: "Performance of a talent showcase",
    maxScore: 10,
    weight: 25,
  },
  {
    id: "criteria7",
    eventId: "event2",
    name: "Intelligence",
    description: "Response to Q&A and intellectual abilities",
    maxScore: 10,
    weight: 25,
  },
  {
    id: "criteria8",
    eventId: "event2",
    name: "Presentation",
    description: "Stage presence and communication skills",
    maxScore: 10,
    weight: 15,
  },
];

// Awards
export const awards: Award[] = [
  {
    id: "award1",
    eventId: "event1",
    name: "Miss Elegance 2025",
    description: "Overall winner of the pageant",
    type: "judged",
  },
  {
    id: "award2",
    eventId: "event1",
    name: "Miss Congeniality",
    description: "Candidate who exhibited the best personality",
    type: "judged",
  },
  {
    id: "award3",
    eventId: "event1",
    name: "People's Choice",
    description: "Most popular candidate as voted by the public",
    type: "public",
  },
  {
    id: "award4",
    eventId: "event2",
    name: "Mr. Universe 2025",
    description: "Overall winner of the pageant",
    type: "judged",
  },
  {
    id: "award5",
    eventId: "event2",
    name: "Mr. Photogenic",
    description: "Candidate with the best camera presence",
    type: "judged",
  },
  {
    id: "award6",
    eventId: "event2",
    name: "Public Favorite",
    description: "Most popular candidate as voted by the public",
    type: "public",
  },
];

// Sample Scores
export const scores: Score[] = [
  {
    id: "score1",
    eventId: "event1",
    candidateId: "cand1",
    judgeId: "judge1",
    criteriaId: "criteria1",
    score: 8.5,
  },
  {
    id: "score2",
    eventId: "event1",
    candidateId: "cand1",
    judgeId: "judge1",
    criteriaId: "criteria2",
    score: 9.0,
  },
  {
    id: "score3",
    eventId: "event1",
    candidateId: "cand1",
    judgeId: "judge2",
    criteriaId: "criteria1",
    score: 8.0,
  },
  {
    id: "score4",
    eventId: "event1",
    candidateId: "cand2",
    judgeId: "judge1",
    criteriaId: "criteria1",
    score: 9.5,
  },
];

// Sample Public Votes
export const publicVotes: PublicVote[] = [
  {
    id: "vote1",
    eventId: "event1",
    candidateId: "cand1",
    awardId: "award3",
    voterIp: "192.168.1.1",
  },
  {
    id: "vote2",
    eventId: "event1",
    candidateId: "cand2",
    awardId: "award3",
    voterIp: "192.168.1.2",
  },
  {
    id: "vote3",
    eventId: "event1",
    candidateId: "cand3",
    awardId: "award3",
    voterIp: "192.168.1.3",
  },
];
