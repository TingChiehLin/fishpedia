// src/lib/data/mockData.ts

import { Fish, Quiz, Activity, Badge, FishingFact } from '@/lib/types';

export const mockFish: Fish[] = [
  {
    id: 1,
    name: 'Rainbow Trout',
    image: '/images/rainbow-trout.jpg',
    description: 'A beautiful fish with colorful stripes.',
    habitat: 'Freshwater rivers and lakes',
    funFact: 'Rainbow trout can jump up to 6 feet out of the water!'
  },
  {
    id: 2,
    name: 'Bluegill',
    image: '/images/bluegill.jpg',
    description: 'A popular panfish with blue and orange colors.',
    habitat: 'Ponds and lakes',
    funFact: 'Bluegills can live up to 10 years in the wild.'
  },
  {
    id: 3,
    name: 'Bass',
    image: '/images/bass.jpg',
    description: 'A strong fighter fish.',
    habitat: 'Lakes and rivers',
    funFact: 'Bass have excellent hearing and can detect sounds from far away.'
  },
  {
    id: 4,
    name: 'Catfish',
    image: '/images/catfish.jpg',
    description: 'Bottom-dwelling fish with whiskers.',
    habitat: 'Rivers and ponds',
    funFact: 'Catfish can have up to 100,000 taste buds!'
  },
  {
    id: 5,
    name: 'Salmon',
    image: '/images/salmon.jpg',
    description: 'Fish that migrate from ocean to rivers.',
    habitat: 'Oceans and rivers',
    funFact: 'Salmon can swim up waterfalls to spawn.'
  },
  {
    id: 6,
    name: 'Perch',
    image: '/images/perch.jpg',
    description: 'Striped fish with spiny fins.',
    habitat: 'Lakes and ponds',
    funFact: 'Perch have stripes that help them hide from predators.'
  },
  {
    id: 7,
    name: 'Carp',
    image: '/images/carp.jpg',
    description: 'Large fish that can grow very big.',
    habitat: 'Rivers and lakes',
    funFact: 'Carp can live for over 100 years!'
  },
  {
    id: 8,
    name: 'Sunfish',
    image: '/images/sunfish.jpg',
    description: 'Bright colored fish that loves sun.',
    habitat: 'Shallow waters',
    funFact: 'Sunfish build nests in the sand.'
  },
  {
    id: 9,
    name: 'Pike',
    image: '/images/pike.jpg',
    description: 'Long, slender predator fish.',
    habitat: 'Lakes and rivers',
    funFact: 'Pike can swim up to 10 mph!'
  },
  {
    id: 10,
    name: 'Walleye',
    image: '/images/walleye.jpg',
    description: 'Fish with large eyes for night vision.',
    habitat: 'Lakes and rivers',
    funFact: 'Walleye have excellent night vision.'
  }
];

export const mockFacts: FishingFact[] = [
  { id: 1, fact: 'Fish can hear sounds underwater.' },
  { id: 2, fact: 'The largest fish is the whale shark.' },
  { id: 3, fact: 'Some fish can change color to hide.' },
  { id: 4, fact: 'Fish breathe through gills.' },
  { id: 5, fact: 'Many fish migrate long distances.' },
  { id: 6, fact: 'Fish have been around for 500 million years.' },
  { id: 7, fact: 'Some fish can live in very cold water.' },
  { id: 8, fact: 'Fish sleep with their eyes open.' },
  { id: 9, fact: 'The fastest fish is the sailfish.' },
  { id: 10, fact: 'Fish can taste with their whole body.' },
  { id: 11, fact: 'Some fish can climb trees.' },
  { id: 12, fact: 'Fish have no eyelids.' },
  { id: 13, fact: 'The smallest fish is the dwarf goby.' },
  { id: 14, fact: 'Fish can detect earthquakes.' },
  { id: 15, fact: 'Some fish glow in the dark.' },
  { id: 16, fact: 'Fish can recognize faces.' },
  { id: 17, fact: 'The oldest fish lived to be 205 years old.' },
  { id: 18, fact: 'Fish can swim backwards.' },
  { id: 19, fact: 'Some fish can fly.' },
  { id: 20, fact: 'Fish have a sense of smell.' }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    question: 'What do fish use to breathe?',
    options: ['Lungs', 'Gills', 'Nose', 'Mouth'],
    correctAnswer: 1,
    explanation: 'Fish use gills to extract oxygen from water.',
    rewardPoints: 10
  },
  {
    id: 2,
    question: 'Which fish can jump the highest?',
    options: ['Salmon', 'Trout', 'Bass', 'Catfish'],
    correctAnswer: 1,
    explanation: 'Rainbow trout can jump up to 6 feet!',
    rewardPoints: 10
  },
  {
    id: 3,
    question: 'Where do catfish live?',
    options: ['Trees', 'Bottom of water', 'Air', 'Mountains'],
    correctAnswer: 1,
    explanation: 'Catfish are bottom-dwelling fish.',
    rewardPoints: 10
  },
  {
    id: 4,
    question: 'What helps fish hide?',
    options: ['Stripes', 'Wings', 'Legs', 'Horns'],
    correctAnswer: 0,
    explanation: 'Stripes help fish like perch blend in.',
    rewardPoints: 10
  },
  {
    id: 5,
    question: 'How long can carp live?',
    options: ['1 year', '10 years', '100 years', '1000 years'],
    correctAnswer: 2,
    explanation: 'Carp can live over 100 years!',
    rewardPoints: 10
  },
  {
    id: 6,
    question: 'What do sunfish build?',
    options: ['Houses', 'Nests', 'Cars', 'Boats'],
    correctAnswer: 1,
    explanation: 'Sunfish build nests in the sand.',
    rewardPoints: 10
  },
  {
    id: 7,
    question: 'How fast can pike swim?',
    options: ['1 mph', '5 mph', '10 mph', '20 mph'],
    correctAnswer: 2,
    explanation: 'Pike can swim up to 10 mph!',
    rewardPoints: 10
  },
  {
    id: 8,
    question: 'What helps walleye see at night?',
    options: ['Large eyes', 'Stripes', 'Gills', 'Fins'],
    correctAnswer: 0,
    explanation: 'Walleye have large eyes for night vision.',
    rewardPoints: 10
  },
  {
    id: 9,
    question: 'What is the largest fish?',
    options: ['Trout', 'Whale shark', 'Bass', 'Perch'],
    correctAnswer: 1,
    explanation: 'The whale shark is the largest fish.',
    rewardPoints: 10
  },
  {
    id: 10,
    question: 'How do fish sleep?',
    options: ['With eyes closed', 'With eyes open', 'Standing up', 'Flying'],
    correctAnswer: 1,
    explanation: 'Fish sleep with their eyes open.',
    rewardPoints: 10
  }
];

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: 'Learn a Fish Fact Together',
    description: 'Read and discuss a fun fishing fact as a family.',
    rewardPoints: 20
  },
  {
    id: 2,
    title: 'Fishing Checklist',
    description: 'Prepare a checklist for your first fishing trip.',
    rewardPoints: 15
  },
  {
    id: 3,
    title: 'Log Your First Catch',
    description: 'Record details about your first fish catch.',
    rewardPoints: 25
  },
  {
    id: 4,
    title: 'Identify a Fish',
    description: 'Use the app to identify a fish you saw.',
    rewardPoints: 20
  },
  {
    id: 5,
    title: 'Family Fishing Story',
    description: 'Share a fishing story with your family.',
    rewardPoints: 15
  }
];

export const mockBadges: Badge[] = [
  {
    id: 1,
    title: 'First Fish',
    description: 'Learned about your first fish!',
    icon: '🐟',
    unlockCondition: 'Complete first fish card'
  },
  {
    id: 2,
    title: 'Quiz Master',
    description: 'Answered 5 quiz questions correctly!',
    icon: '🧠',
    unlockCondition: 'Score 100% on 5 quizzes'
  },
  {
    id: 3,
    title: 'Family Fun',
    description: 'Completed a family activity!',
    icon: '👨‍👩‍👧‍👦',
    unlockCondition: 'Finish one activity'
  },
  {
    id: 4,
    title: 'Fact Finder',
    description: 'Read 10 fishing facts!',
    icon: '📖',
    unlockCondition: 'View 10 facts'
  },
  {
    id: 5,
    title: 'Fishing Expert',
    description: 'Learned about all fish species!',
    icon: '🎣',
    unlockCondition: 'View all 10 fish'
  }
];