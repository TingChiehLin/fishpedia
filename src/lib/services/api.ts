// src/lib/services/api.ts

import { Fish, Quiz, Activity, Badge, FishingFact, UserProfile } from '@/lib/types';
import { mockFish, mockFacts, mockQuizzes, mockActivities, mockBadges } from '@/lib/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Fish endpoints
  async getFish(): Promise<Fish[]> {
    await delay(500); // Simulate network delay
    return mockFish;
  },

  async getFishById(id: number): Promise<Fish | null> {
    await delay(300);
    return mockFish.find(fish => fish.id === id) || null;
  },

  // Facts endpoints
  async getFacts(): Promise<FishingFact[]> {
    await delay(400);
    return mockFacts;
  },

  // Quiz endpoints
  async getQuizzes(): Promise<Quiz[]> {
    await delay(400);
    return mockQuizzes;
  },

  async submitQuizResult(quizId: number, answer: number): Promise<{ correct: boolean; points: number }> {
    await delay(300);
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (!quiz) throw new Error('Quiz not found');
    const correct = answer === quiz.correctAnswer;
    return { correct, points: correct ? quiz.rewardPoints : 0 };
  },

  // Activities endpoints
  async getActivities(): Promise<Activity[]> {
    await delay(400);
    return mockActivities;
  },

  // Progress endpoints
  async getProgress(): Promise<{ points: number; badges: Badge[]; completedQuizzes: number; activitiesDone: number }> {
    await delay(400);
    // Mock progress data
    return {
      points: 150,
      badges: mockBadges.slice(0, 3), // Unlocked first 3 badges
      completedQuizzes: 7,
      activitiesDone: 2
    };
  },

  // Profile endpoints
  async getProfile(): Promise<UserProfile> {
    await delay(400);
    return {
      id: 1,
      name: 'Alex',
      ageGroup: '8-12',
      points: 150,
      badges: mockBadges.slice(0, 3),
      completedQuizzes: 7,
      activitiesDone: 2
    };
  }
};