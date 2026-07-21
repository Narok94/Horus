
export interface CardioSession {
  exercise: string;
  duration: number; // in minutes
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
  image?: string;
  videoUrl?: string;
  dropSet?: boolean;
  restPause?: boolean;
  biSet?: boolean;
  cluster?: boolean;
  isometria?: boolean;
  falha?: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  cardio?: CardioSession;
  color: string;
}

export interface SetPerformance {
  weight: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completed: boolean;
}

export interface WorkoutHistoryEntry {
  id: string;
  date: string; // ISO string
  workoutId: string;
  workoutTitle: string;
  duration?: number; // in seconds
  exercises: {
    exerciseId: string;
    name: string;
    performance: SetPerformance[];
  }[];
  cardio?: {
    exercise: string;
    duration: number;
    completed: boolean;
  };
}

export interface MealItem {
  food: string;
  quantity?: string;
  alternatives?: string[];
}

export interface Meal {
  id: string;
  time: string;
  name: string;
  items: MealItem[];
  obs?: string;
  completed: boolean;
}

export interface DietPlan {
  nutritionist: { name: string; crn: string; contact: string };
  createdAt: string;
  generalGuidelines: string;
  meals: Meal[];
  substitutions: { name: string; items: MealItem[]; obs?: string }[];
}

export interface DailyCheck {
  date: string; // YYYY-MM-DD
  treino: boolean;
  zeroDoce: boolean;
  zeroBesteira: boolean;
  agua: boolean;
  sono: boolean;
  dietaRegulada: boolean;
}

export interface BodyMeasurement {
  date: string;
  peso: number;
  percentualGordura?: number;
  cintura?: number;
  quadril?: number;
  bracoDireito?: number;
  bracoEsquerdo?: number;
  pernaDireita?: number;
  pernaEsquerda?: number;
  peito?: number;
  barriga?: number;
  observacao?: string;
}

export interface ChallengeGoal {
  description: string;
  type: 'percentual_gordura' | 'peso_mensal' | 'outro';
  targetValue?: number;
}

export interface Challenge90 {
  dataInicio: string; // "2026-07-06"
  goal: ChallengeGoal;
  dailyChecks: DailyCheck[];
  measurements: BodyMeasurement[];
}

export interface User {
  username: string;
  password?: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  sex?: 'masculino' | 'feminino';
  goalIMC?: number;
  goal?: string;
  streak: number;
  goalStreak?: number;
  totalWorkouts: number;
  goalWorkouts?: number;
  checkIns: string[];
  avatar?: string;
  isProfileComplete: boolean;
  role: 'student' | 'teacher';
  weights?: Record<string, number>; 
  history: WorkoutHistoryEntry[];
  badges?: Badge[];
  completedMeals?: Record<string, string[]>; // YYYY-MM-DD -> list of meal times or meal names
  dietPlan?: DietPlan;
  challenge90?: Challenge90;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  requirement: (user: User) => boolean;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  WORKOUT = 'workout',
  HISTORY = 'history',
  PROFILE = 'profile',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  CARDIO = 'cardio',
  DIET = 'diet',
  DESAFIO = 'desafio'
}
