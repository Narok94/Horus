import { User } from '../types';

export const henriqueDefault: User = {
  username: 'teste1',
  name: 'Henrique',
  age: 26,
  sex: 'masculino',
  goal: 'Hipertrofia & Força',
  role: 'student',
  streak: 0,
  totalWorkouts: 0,
  history: [],
  weights: {},
  checkIns: [],
  badges: [],
  isProfileComplete: true
};

export const jessicaDefault: User = {
  username: 'jessica',
  name: 'Jessica',
  age: 24,
  sex: 'feminino',
  goal: 'Glúteo & Posterior Premium',
  role: 'student',
  streak: 0,
  totalWorkouts: 0,
  history: [],
  weights: {},
  checkIns: [],
  badges: [],
  isProfileComplete: true
};

export const professorDefault: User = {
  username: 'teste3',
  name: 'Professor',
  age: 35,
  sex: 'masculino',
  goal: 'Orientar alunos',
  role: 'teacher',
  streak: 0,
  totalWorkouts: 0,
  history: [],
  weights: {},
  checkIns: [],
  badges: [],
  isProfileComplete: true
};

const DEFAULT_PASSWORDS: Record<string, string> = {
  teste1: '12345',
  jessica: '9860',
  teste3: '12345'
};

export function getUserByUsername(username: string): User | null {
  const normalized = username.trim().toLowerCase();
  if (normalized === 'teste1') return { ...henriqueDefault };
  if (normalized === 'jessica') return { ...jessicaDefault };
  if (normalized === 'teste3') return { ...professorDefault };
  return null;
}

export function validateCredentials(username: string, password: string): boolean {
  const normalized = username.trim().toLowerCase();
  return DEFAULT_PASSWORDS[normalized] === password;
}
