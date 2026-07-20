import { User, DietPlan } from '../types';

export const henriqueDietPlan: DietPlan = {
  nutritionist: { name: "Karine Calixto Braga Lino", crn: "28995", contact: "karine.calixtob@gmail.com" },
  createdAt: "2026-07-20",
  generalGuidelines: "Melhorar composição corporal. Bater meta de água todos os dias. Musculação 5x semana. Liberado 1 a 2 refeições livres por semana.",
  meals: [
    {
      id: "cafe-manha",
      time: "08:30",
      name: "Café da manhã",
      items: [
        { food: "Pão integral", quantity: "2 fatias", alternatives: ["1 unidade de pão de sal"] },
        { food: "Ovos", quantity: "2 unidades", alternatives: ["60g de frango desfiado"] },
        { food: "Requeijão light", quantity: "1 colher de sopa" },
        { food: "Café", quantity: "1 xícara" },
        { food: "Maçã", quantity: "1 unidade", alternatives: ["pera", "200g de melancia", "200g de mamão"] }
      ],
      obs: "Pão + recheio proteico + café sem açúcar. Marcas de pão: Wickbold, Newbread ou Delícias do Trigo.",
      completed: false
    },
    {
      id: "lanche-manha",
      time: "11:00",
      name: "Lanche da manhã",
      items: [
        { food: "Whey Protein", quantity: "30g" },
        { food: "Leite de vaca desnatado", quantity: "200ml" }
      ],
      completed: false
    },
    {
      id: "almoco",
      time: "13:30",
      name: "Almoço",
      items: [
        { food: "Arroz", quantity: "150g" },
        { food: "Feijão", quantity: "100g" },
        { food: "Carne bovina", quantity: "130g", alternatives: ["Frango"] },
        { food: "Legumes cozidos", quantity: "80g" },
        { food: "Salada ou verdura crua", quantity: "à vontade" }
      ],
      obs: "Variar cores dos legumes ao máximo, no mínimo 3 opções diferentes, até 3 colheres de sopa de cada. Folhas cruas à vontade. Escolher pelo menos 1 folha, 1 legume cru e 1 cozido. Ex: alface roxa, cenoura ralada e berinjela refogada.",
      completed: false
    },
    {
      id: "lanche-tarde",
      time: "17:30",
      name: "Lanche da tarde",
      items: [
        { food: "Ovo de galinha", quantity: "2 unidades" },
        { food: "Tapioca de goma", quantity: "1 colher de sopa (15g)" },
        { food: "Mussarela", quantity: "1 fatia", alternatives: ["1 colher de sobremesa de requeijão light"] },
        { food: "Café sem açúcar", quantity: "1 xícara" }
      ],
      obs: "Crepioca: misture os ovos com a tapioca, depois recheie com uma das opções acima.",
      completed: false
    },
    {
      id: "jantar",
      time: "20:30",
      name: "Jantar",
      items: [
        { food: "Arroz", quantity: "150g" },
        { food: "Feijão", quantity: "100g" },
        { food: "Carne bovina", quantity: "100g", alternatives: ["Frango"] },
        { food: "Legumes cozidos", quantity: "80g" }
      ],
      completed: false
    }
  ],
  substitutions: [
    {
      name: "Substituição 1 (Jantar)",
      items: [
        { food: "Cuscuz de milho", quantity: "150g" },
        { food: "Frango desfiado", quantity: "100g", alternatives: ["carne"] },
        { food: "Salada ou verdura crua", quantity: "meio prato cheio" }
      ],
      obs: "Cuscuz recheado."
    }
  ]
};

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
  dietPlan: henriqueDietPlan
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
