import { User, CardExpense } from '../types';

export const defaultExpenses: CardExpense[] = [
  { id: '1', description: 'Celular Jessica', value: 323.81, currentInstallment: 18, totalInstallments: 21 },
  { id: '2', description: 'Farmácia', value: 60.13, currentInstallment: 3, totalInstallments: 3 },
  { id: '3', description: 'Havan', value: 29.99, currentInstallment: 10, totalInstallments: 10 },
  { id: '4', description: 'Centauro', value: 99.99, currentInstallment: 8, totalInstallments: 10 },
  { id: '5', description: 'Época', value: 74.88, currentInstallment: 7, totalInstallments: 8 },
  { id: '6', description: 'Stanley', value: 22.80, currentInstallment: 8, totalInstallments: 10 },
  { id: '7', description: 'Farmácia minas master 2', value: 63.28, currentInstallment: 2, totalInstallments: 3 },
  { id: '8', description: 'Drogaria americana', value: 64.52, currentInstallment: 2, totalInstallments: 3 },
  { id: '9', description: 'Loja 61', value: 81.68, currentInstallment: 2, totalInstallments: 3 },
  { id: '10', description: 'Farmácia minas master', value: 39.50, currentInstallment: 2, totalInstallments: 2 },
  { id: '11', description: 'Big sup', value: 55.00, currentInstallment: 2, totalInstallments: 2 },
  { id: '12', description: 'Araújo', value: 88.00, currentInstallment: 2, totalInstallments: 3 },
  { id: '13', description: 'Shopee', value: 82.11, currentInstallment: 2, totalInstallments: 2 },
  { id: '14', description: 'Alvorada', value: 59.51, currentInstallment: 2, totalInstallments: 2 },
  { id: '15', description: 'Mercado', value: 92.93, currentInstallment: 2, totalInstallments: 3 },
  { id: '16', description: 'Farmacia Minas', value: 47.25, currentInstallment: 2, totalInstallments: 2 },
  { id: '17', description: 'Big Suplementos', value: 87.00, currentInstallment: 1, totalInstallments: 3 },
  { id: '18', description: 'Clube da Casa', value: 44.00, currentInstallment: 1, totalInstallments: 2 },
  { id: '19', description: 'Dentista Pri', value: 294.00, currentInstallment: 1, totalInstallments: 8 },
  { id: '20', description: 'Spotify', value: 0, isPendingValue: true },
  { id: '21', description: 'Youtube', value: 0, isPendingValue: true },
  { id: '22', description: 'Alvorada', value: 85.00 },
  { id: '23', description: 'bh', value: 63.00 }
];

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
  isProfileComplete: true,
  cardExpenses: [...defaultExpenses]
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
  isProfileComplete: true,
  cardExpenses: [...defaultExpenses]
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
