
import { createContext, useContext, useState, ReactNode } from "react";
import {
  Event,
  Candidate,
  Judge,
  ScoringCriteria,
  Award,
  Score,
  PublicVote
} from "../types/pageant-types";
import {
  events as mockEvents,
  candidates as mockCandidates,
  judges as mockJudges,
  scoringCriteria as mockCriteria,
  awards as mockAwards,
  scores as mockScores,
  publicVotes as mockVotes
} from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface PageantContextType {
  // Data
  events: Event[];
  candidates: Candidate[];
  judges: Judge[];
  criteria: ScoringCriteria[];
  awards: Award[];
  scores: Score[];
  publicVotes: PublicVote[];
  
  // Event operations
  addEvent: (event: Omit<Event, "id">) => string;
  updateEvent: (event: Event) => boolean;
  deleteEvent: (eventId: string) => boolean;
  
  // Candidate operations
  addCandidate: (candidate: Omit<Candidate, "id">) => string;
  updateCandidate: (candidate: Candidate) => boolean;
  deleteCandidate: (candidateId: string) => boolean;
  
  // Judge operations
  addJudge: (judge: Omit<Judge, "id" | "accessCode">) => string;
  updateJudge: (judge: Judge) => boolean;
  deleteJudge: (judgeId: string) => boolean;
  
  // Criteria operations
  addCriteria: (criteria: Omit<ScoringCriteria, "id">) => string;
  updateCriteria: (criteria: ScoringCriteria) => boolean;
  deleteCriteria: (criteriaId: string) => boolean;
  
  // Award operations
  addAward: (award: Omit<Award, "id">) => string;
  updateAward: (award: Award) => boolean;
  deleteAward: (awardId: string) => boolean;
  
  // Scoring operations
  submitScore: (score: Omit<Score, "id">) => string;
  updateScore: (score: Score) => boolean;
  deleteScore: (scoreId: string) => boolean;
  
  // Voting operations
  submitPublicVote: (vote: Omit<PublicVote, "id">) => boolean;
  
  // Helper methods
  getCandidatesByEvent: (eventId: string) => Candidate[];
  getJudgesByEvent: (eventId: string) => Judge[];
  getCriteriaByEvent: (eventId: string) => ScoringCriteria[];
  getAwardsByEvent: (eventId: string) => Award[];
  getScoresByCandidate: (candidateId: string) => Score[];
  getScoresByCandidateAndJudge: (candidateId: string, judgeId: string) => Score[];
}

const PageantContext = createContext<PageantContextType | undefined>(undefined);

export const PageantProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [judges, setJudges] = useState<Judge[]>(mockJudges);
  const [criteria, setCriteria] = useState<ScoringCriteria[]>(mockCriteria);
  const [awards, setAwards] = useState<Award[]>(mockAwards);
  const [scores, setScores] = useState<Score[]>(mockScores);
  const [publicVotes, setPublicVotes] = useState<PublicVote[]>(mockVotes);
  const { toast } = useToast();

  // Utility to generate IDs
  const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate a random access code for judges
  const generateAccessCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Event operations
  const addEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = { ...eventData, id: generateId("event") };
    setEvents([...events, newEvent]);
    toast({
      title: "Event added",
      description: `${newEvent.name} has been created successfully`,
    });
    return newEvent.id;
  };

  const updateEvent = (event: Event) => {
    const index = events.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      const updatedEvents = [...events];
      updatedEvents[index] = event;
      setEvents(updatedEvents);
      toast({
        title: "Event updated",
        description: `${event.name} has been updated successfully`,
      });
      return true;
    }
    return false;
  };

  const deleteEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setEvents(events.filter((e) => e.id !== eventId));
      
      // Also delete related data
      setCandidates(candidates.filter((c) => c.eventId !== eventId));
      setJudges(judges.filter((j) => j.eventId !== eventId));
      setCriteria(criteria.filter((c) => c.eventId !== eventId));
      setAwards(awards.filter((a) => a.eventId !== eventId));
      setScores(scores.filter((s) => s.eventId !== eventId));
      setPublicVotes(publicVotes.filter((v) => v.eventId !== eventId));
      
      toast({
        title: "Event deleted",
        description: `${event.name} and all related data have been deleted`,
      });
      return true;
    }
    return false;
  };

  // Candidate operations
  const addCandidate = (candidateData: Omit<Candidate, "id">) => {
    const newCandidate: Candidate = { ...candidateData, id: generateId("cand") };
    setCandidates([...candidates, newCandidate]);
    toast({
      title: "Candidate added",
      description: `${newCandidate.name} has been added successfully`,
    });
    return newCandidate.id;
  };

  const updateCandidate = (candidate: Candidate) => {
    const index = candidates.findIndex((c) => c.id === candidate.id);
    if (index !== -1) {
      const updatedCandidates = [...candidates];
      updatedCandidates[index] = candidate;
      setCandidates(updatedCandidates);
      toast({
        title: "Candidate updated",
        description: `${candidate.name} has been updated successfully`,
      });
      return true;
    }
    return false;
  };

  const deleteCandidate = (candidateId: string) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (candidate) {
      setCandidates(candidates.filter((c) => c.id !== candidateId));
      // Also delete related scores and votes
      setScores(scores.filter((s) => s.candidateId !== candidateId));
      setPublicVotes(publicVotes.filter((v) => v.candidateId !== candidateId));
      toast({
        title: "Candidate deleted",
        description: `${candidate.name} and related data have been deleted`,
      });
      return true;
    }
    return false;
  };

  // Judge operations
  const addJudge = (judgeData: Omit<Judge, "id" | "accessCode">) => {
    const accessCode = generateAccessCode();
    const newJudge: Judge = { 
      ...judgeData, 
      id: generateId("judge"),
      accessCode 
    };
    setJudges([...judges, newJudge]);
    toast({
      title: "Judge added",
      description: `${newJudge.name} has been added with access code: ${accessCode}`,
    });
    return newJudge.id;
  };

  const updateJudge = (judge: Judge) => {
    const index = judges.findIndex((j) => j.id === judge.id);
    if (index !== -1) {
      const updatedJudges = [...judges];
      updatedJudges[index] = judge;
      setJudges(updatedJudges);
      toast({
        title: "Judge updated",
        description: `${judge.name} has been updated successfully`,
      });
      return true;
    }
    return false;
  };

  const deleteJudge = (judgeId: string) => {
    const judge = judges.find((j) => j.id === judgeId);
    if (judge) {
      setJudges(judges.filter((j) => j.id !== judgeId));
      // Also delete related scores
      setScores(scores.filter((s) => s.judgeId !== judgeId));
      toast({
        title: "Judge deleted",
        description: `${judge.name} and related scores have been deleted`,
      });
      return true;
    }
    return false;
  };

  // Criteria operations
  const addCriteria = (criteriaData: Omit<ScoringCriteria, "id">) => {
    const newCriteria: ScoringCriteria = { ...criteriaData, id: generateId("criteria") };
    setCriteria([...criteria, newCriteria]);
    toast({
      title: "Criteria added",
      description: `${newCriteria.name} criteria has been added successfully`,
    });
    return newCriteria.id;
  };

  const updateCriteria = (criteriaItem: ScoringCriteria) => {
    const index = criteria.findIndex((c) => c.id === criteriaItem.id);
    if (index !== -1) {
      const updatedCriteria = [...criteria];
      updatedCriteria[index] = criteriaItem;
      setCriteria(updatedCriteria);
      toast({
        title: "Criteria updated",
        description: `${criteriaItem.name} criteria has been updated successfully`,
      });
      return true;
    }
    return false;
  };

  const deleteCriteria = (criteriaId: string) => {
    const criteriaItem = criteria.find((c) => c.id === criteriaId);
    if (criteriaItem) {
      setCriteria(criteria.filter((c) => c.id !== criteriaId));
      // Also delete related scores
      setScores(scores.filter((s) => s.criteriaId !== criteriaId));
      toast({
        title: "Criteria deleted",
        description: `${criteriaItem.name} criteria and related scores have been deleted`,
      });
      return true;
    }
    return false;
  };

  // Award operations
  const addAward = (awardData: Omit<Award, "id">) => {
    const newAward: Award = { ...awardData, id: generateId("award") };
    setAwards([...awards, newAward]);
    toast({
      title: "Award added",
      description: `${newAward.name} award has been added successfully`,
    });
    return newAward.id;
  };

  const updateAward = (award: Award) => {
    const index = awards.findIndex((a) => a.id === award.id);
    if (index !== -1) {
      const updatedAwards = [...awards];
      updatedAwards[index] = award;
      setAwards(updatedAwards);
      toast({
        title: "Award updated",
        description: `${award.name} award has been updated successfully`,
      });
      return true;
    }
    return false;
  };

  const deleteAward = (awardId: string) => {
    const award = awards.find((a) => a.id === awardId);
    if (award) {
      setAwards(awards.filter((a) => a.id !== awardId));
      // Also delete related public votes if it's a public award
      if (award.type === "public") {
        setPublicVotes(publicVotes.filter((v) => v.awardId !== awardId));
      }
      toast({
        title: "Award deleted",
        description: `${award.name} award and related data have been deleted`,
      });
      return true;
    }
    return false;
  };

  // Scoring operations
  const submitScore = (scoreData: Omit<Score, "id">) => {
    // Check if score already exists
    const existingScore = scores.find(
      (s) =>
        s.candidateId === scoreData.candidateId &&
        s.judgeId === scoreData.judgeId &&
        s.criteriaId === scoreData.criteriaId
    );

    if (existingScore) {
      // Update existing score
      const updatedScores = scores.map((s) =>
        s.id === existingScore.id ? { ...scoreData, id: existingScore.id } : s
      );
      setScores(updatedScores);
      toast({
        title: "Score updated",
        description: "The score has been updated successfully",
      });
      return existingScore.id;
    } else {
      // Add new score
      const newScore: Score = { ...scoreData, id: generateId("score") };
      setScores([...scores, newScore]);
      toast({
        title: "Score submitted",
        description: "The score has been submitted successfully",
      });
      return newScore.id;
    }
  };

  const updateScore = (score: Score) => {
    const index = scores.findIndex((s) => s.id === score.id);
    if (index !== -1) {
      const updatedScores = [...scores];
      updatedScores[index] = score;
      setScores(updatedScores);
      toast({
        title: "Score updated",
        description: "The score has been updated successfully",
      });
      return true;
    }
    return false;
  };

  const deleteScore = (scoreId: string) => {
    const scoreExists = scores.some((s) => s.id === scoreId);
    if (scoreExists) {
      setScores(scores.filter((s) => s.id !== scoreId));
      toast({
        title: "Score deleted",
        description: "The score has been deleted successfully",
      });
      return true;
    }
    return false;
  };

  // Voting operations
  const submitPublicVote = (voteData: Omit<PublicVote, "id">) => {
    // Check if user already voted for this award
    const existingVote = publicVotes.find(
      (v) =>
        v.awardId === voteData.awardId &&
        v.voterIp === voteData.voterIp
    );

    if (existingVote) {
      toast({
        title: "Vote failed",
        description: "You have already voted for this award",
        variant: "destructive",
      });
      return false;
    } else {
      const newVote: PublicVote = { ...voteData, id: generateId("vote") };
      setPublicVotes([...publicVotes, newVote]);
      toast({
        title: "Vote submitted",
        description: "Your vote has been submitted successfully. Thank you!",
      });
      return true;
    }
  };

  // Helper methods
  const getCandidatesByEvent = (eventId: string) => {
    return candidates.filter((c) => c.eventId === eventId);
  };

  const getJudgesByEvent = (eventId: string) => {
    return judges.filter((j) => j.eventId === eventId);
  };

  const getCriteriaByEvent = (eventId: string) => {
    return criteria.filter((c) => c.eventId === eventId);
  };

  const getAwardsByEvent = (eventId: string) => {
    return awards.filter((a) => a.eventId === eventId);
  };

  const getScoresByCandidate = (candidateId: string) => {
    return scores.filter((s) => s.candidateId === candidateId);
  };

  const getScoresByCandidateAndJudge = (candidateId: string, judgeId: string) => {
    return scores.filter((s) => s.candidateId === candidateId && s.judgeId === judgeId);
  };

  const value = {
    events,
    candidates,
    judges,
    criteria,
    awards,
    scores,
    publicVotes,
    addEvent,
    updateEvent,
    deleteEvent,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    addJudge,
    updateJudge,
    deleteJudge,
    addCriteria,
    updateCriteria,
    deleteCriteria,
    addAward,
    updateAward,
    deleteAward,
    submitScore,
    updateScore,
    deleteScore,
    submitPublicVote,
    getCandidatesByEvent,
    getJudgesByEvent,
    getCriteriaByEvent,
    getAwardsByEvent,
    getScoresByCandidate,
    getScoresByCandidateAndJudge,
  };

  return <PageantContext.Provider value={value}>{children}</PageantContext.Provider>;
};

export const usePageant = () => {
  const context = useContext(PageantContext);
  
  if (context === undefined) {
    throw new Error("usePageant must be used within a PageantProvider");
  }
  
  return context;
};
