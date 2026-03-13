// src/lib/types/index.ts

export interface Fish {
  id: number;
  name: string;
  image: string;
  description: string;
  habitat: string;
  funFact: string;
}

export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  rewardPoints: number;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  rewardPoints: number;
}

export interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlockCondition: string;
}

export interface UserProfile {
  id: number;
  name: string;
  ageGroup: string;
  points: number;
  badges: Badge[];
  completedQuizzes: number;
  activitiesDone: number;
}

export interface FishingFact {
  id: number;
  fact: string;
}