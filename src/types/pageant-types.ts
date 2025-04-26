
export type UserRole = 'coordinator' | 'judge' | 'public';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accessCode?: string; // For judges only
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  status: 'upcoming' | 'active' | 'completed';
  imageUrl?: string;
  createdBy: string; // Coordinator ID
}

export interface Candidate {
  id: string;
  eventId: string;
  name: string;
  age: number;
  bio: string;
  imageUrl?: string;
  candidateNumber: number;
}

export interface Judge {
  id: string;
  eventId: string;
  name: string;
  email: string;
  accessCode: string;
  status: 'invited' | 'active';
}

export interface ScoringCriteria {
  id: string;
  eventId: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number; // percentage weight of this criteria
}

export interface Award {
  id: string;
  eventId: string;
  name: string;
  description: string;
  type: 'judged' | 'public'; // Judged or public voting
}

export interface Score {
  id: string;
  eventId: string;
  candidateId: string;
  judgeId: string;
  criteriaId: string;
  score: number;
  comment?: string;
}

export interface PublicVote {
  id: string;
  eventId: string;
  candidateId: string;
  awardId: string;
  voterIp: string; // For limiting votes per person
}
