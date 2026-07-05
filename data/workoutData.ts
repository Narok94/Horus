import { WorkoutRoutine } from '../types';
import { getExerciseGifUrl } from '../src/utils/exerciseUtils';

export const jessicaWorkouts: WorkoutRoutine[] = [
  {
    id: 't2-a',
    title: 'TREINO A — Glúteos e Posterior 🍑',
    description: 'Foco em Glúteos e Isquiotibiais',
    color: 'emerald',
    exercises: [
      { id: 't2a-0', name: 'Caminhada (Aquecimento)', muscleGroup: 'Cardio', sets: 1, reps: '5 min', rest: 0, image: getExerciseGifUrl('Caminhar') },
      { id: 't2a-1', name: 'Hip Thrust', muscleGroup: 'Glúteo', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Hip Thrust - elevação pélvica') },
      { id: 't2a-2', name: 'Stiff', muscleGroup: 'Posterior', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Stiff') },
      { id: 't2a-3', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 't2a-4', name: 'Glúteo Coice Máquina', muscleGroup: 'Glúteo', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Glúteo Cabo (Coice)') },
      { id: 't2a-5', name: 'Abdução Máquina', muscleGroup: 'Glúteo', sets: 4, reps: '15-20', rest: 60, image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2a-6', name: 'Panturrilha Sentada', muscleGroup: 'Panturrilha', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Panturrilha Sentada') }
    ],
    cardio: { exercise: 'Caminhada inclinada', duration: 15 }
  },
  {
    id: 't2-b',
    title: 'TREINO B — Costas, Ombros e Abdômen',
    description: 'Postura, Afinar Cintura e Harmonia Corporal',
    color: 'blue',
    exercises: [
      { id: 't2b-1', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Puxada Frente Aberta') },
      { id: 't2b-2', name: 'Remada Baixa', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Remada Baixa') },
      { id: 't2b-3', name: 'Remada Articulada', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Remada Articulada') },
      { id: 't2b-4', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: 60, image: getExerciseGifUrl('Elevação Lateral') },
      { id: 't2b-5', name: 'Peck Deck Invertido', muscleGroup: 'Ombros', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Peck Deck Invertido') },
      { id: 't2b-6', name: 'Abdômen Máquina', muscleGroup: 'Abdômen', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Abdominal Máquina') },
      { id: 't2b-7', name: 'Prancha', muscleGroup: 'CORE', sets: 3, reps: '30-45s', rest: 60, image: getExerciseGifUrl('Prancha') }
    ],
    cardio: { exercise: 'Esteira', duration: 20 }
  },
  {
    id: 't2-c',
    title: 'TREINO C — Quadríceps e Glúteos',
    description: 'Foco em Quadríceps e membros inferiores',
    color: 'purple',
    exercises: [
      { id: 't2c-1', name: 'Leg Press 45°', muscleGroup: 'Quadríceps', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Leg Press 45') },
      { id: 't2c-2', name: 'Agachamento Smith', muscleGroup: 'Quadríceps', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Agachamento Smith') },
      { id: 't2c-3', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 4, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 't2c-4', name: 'Afundo', muscleGroup: 'Pernas', sets: 3, reps: '12 cada perna', rest: 60, image: getExerciseGifUrl('Afundo') },
      { id: 't2c-5', name: 'Cadeira Adutora', muscleGroup: 'Adutora', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Cadeira Adutora') },
      { id: 't2c-6', name: 'Abdução Máquina', muscleGroup: 'Glúteo', sets: 3, reps: '20', rest: 60, image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2c-7', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Panturrilha em Pé') }
    ],
    cardio: { exercise: 'Esteira', duration: 15 }
  },
  {
    id: 't2-d',
    title: 'TREINO D — Superiores Feminino',
    description: 'Tonificar com estética refinada',
    color: 'orange',
    exercises: [
      { id: 't2d-1', name: 'Supino Máquina', muscleGroup: 'Peito', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Supino Máquina') },
      { id: 't2d-2', name: 'Desenvolvimento Máquina', muscleGroup: 'Ombros', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Desenvolvimento Máquina') },
      { id: 't2d-3', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Puxada Frente Aberta') },
      { id: 't2d-4', name: 'Remada Baixa', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Remada Baixa') },
      { id: 't2d-5', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Tríceps Corda') },
      { id: 't2d-6', name: 'Rosca Direta Barra W', muscleGroup: 'Bíceps', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Rosca Direta Barra W') },
      { id: 't2d-7', name: 'Abdômen Infra', muscleGroup: 'Abdômen', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Abdômen Infra') }
    ],
    cardio: { exercise: 'Esteira', duration: 20 }
  }
];

export const henriqueWorkouts: WorkoutRoutine[] = [
  {
    id: 'h-a',
    title: 'TREINO A — Costas + Bíceps + Trapézio',
    description: 'Cronograma: Segunda e Quinta • Foco em Costas, Bíceps, Trapézio e Core',
    color: 'orange',
    exercises: [
      { id: 'ha-1', name: 'Puxada frente', muscleGroup: 'Costas', sets: 4, reps: '12-10-8-8', rest: 60, notes: 'Pirâmide de carga', image: getExerciseGifUrl('Puxada frente') },
      { id: 'ha-2', name: 'Remada baixa', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 60, notes: 'Série corrida', image: getExerciseGifUrl('Remada baixa') },
      { id: 'ha-3', name: 'Remada unilateral (halter)', muscleGroup: 'Costas', sets: 3, reps: '12+8', rest: 60, notes: 'Drop set', image: getExerciseGifUrl('Remada unilateral (halter)') },
      { id: 'ha-4', name: 'Encolhimento (halteres)', muscleGroup: 'Trapézio', sets: 4, reps: '15', rest: 45, image: getExerciseGifUrl('Encolhimento (halteres)') },
      { id: 'ha-5', name: 'Rosca barra W (polia)', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: 60, notes: 'Série corrida', image: getExerciseGifUrl('Rosca barra W (polia)') },
      { id: 'ha-6', name: 'Rosca Scott', muscleGroup: 'Bíceps', sets: 3, reps: '8-12', rest: 60, notes: 'Série corrida', image: getExerciseGifUrl('Rosca Scott') },
      { id: 'ha-7', name: 'Rosca martelo', muscleGroup: 'Bíceps', sets: 3, reps: '10+8', rest: 45, notes: 'Drop set', image: getExerciseGifUrl('Rosca martelo') },
      { id: 'ha-8', name: 'Prancha frontal', muscleGroup: 'CORE', sets: 3, reps: '40-60 seg', rest: 30, notes: 'Apoie os joelhos se falhar antes do tempo (Finalizador de Core)', image: getExerciseGifUrl('Prancha') },
      { id: 'ha-9', name: 'Prancha lateral', muscleGroup: 'CORE', sets: 3, reps: '30 seg', rest: 30, notes: 'Cada lado (Finalizador de Core)', image: getExerciseGifUrl('Prancha lateral') },
      { id: 'ha-10', name: 'Prancha com marcha', muscleGroup: 'CORE', sets: 2, reps: '30 seg', rest: 30, notes: 'Alternando pernas (Finalizador de Core)', image: getExerciseGifUrl('Prancha com marcha') }
    ]
  },
  {
    id: 'h-b',
    title: 'TREINO B — Peito + Ombro + Tríceps',
    description: 'Cronograma: Terça e Sexta • Atenção ao ombro direito (lesão de ligamento)',
    color: 'purple',
    exercises: [
      { id: 'hb-1', name: 'Supino reto (máquina)', muscleGroup: 'Peito', sets: 4, reps: '12-10-8-6', rest: 60, notes: 'Pirâmide de carga • Mais seguro para o ombro direito', image: getExerciseGifUrl('Supino reto (máquina)') },
      { id: 'hb-2', name: 'Supino inclinado (máquina)', muscleGroup: 'Peito', sets: 3, reps: '12-10-8', rest: 60, notes: 'Pirâmide de carga', image: getExerciseGifUrl('Supino inclinado (máquina)') },
      { id: 'hb-3', name: 'Voador (peck deck)', muscleGroup: 'Peito', sets: 3, reps: '12+8', rest: 60, notes: 'Drop set', image: getExerciseGifUrl('Peck Deck') },
      { id: 'hb-4', name: 'Elevação lateral (polia)', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: 45, notes: 'CUIDADO EXTRA! Não passar da linha do ombro. Pare se sentir instabilidade ou dor.', image: getExerciseGifUrl('Elevação lateral') },
      { id: 'hb-5', name: 'Cross over', muscleGroup: 'Peito', sets: 3, reps: '10', rest: 45, notes: 'Série corrida', image: getExerciseGifUrl('Cross Over') },
      { id: 'hb-6', name: 'Tríceps pulley', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', rest: 45, notes: 'Série corrida', image: getExerciseGifUrl('Tríceps Pulley') },
      { id: 'hb-7', name: 'Tríceps testa (barra W)', muscleGroup: 'Tríceps', sets: 3, reps: '12+8', rest: 45, notes: 'Drop set', image: getExerciseGifUrl('Tríceps testa') }
    ]
  },
  {
    id: 'h-c',
    title: 'TREINO C — Perna',
    description: 'Cronograma: Quarta • Sem exercícios de flexão/rotação lateral de tronco com carga',
    color: 'emerald',
    exercises: [
      { id: 'hc-1', name: 'Agachamento', muscleGroup: 'Quadríceps', sets: 3, reps: '12+8', rest: 60, notes: 'Drop set', image: getExerciseGifUrl('Agachamento') },
      { id: 'hc-2', name: 'Leg Press', muscleGroup: 'Pernas', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Leg Press 45') },
      { id: 'hc-3', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 4, reps: '10+10+10', rest: 60, notes: 'Drop set', image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 'hc-4', name: 'Mesa flexora', muscleGroup: 'Posterior', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 'hc-5', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 4, reps: '10+10+10', rest: 60, notes: 'Drop set', image: getExerciseGifUrl('Cadeira Flexora') },
      { id: 'hc-6', name: 'Stiff', muscleGroup: 'Posterior', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Stiff') },
      { id: 'hc-7', name: 'Panturrilha', muscleGroup: 'Panturrilha', sets: 4, reps: '20+15', rest: 45, notes: 'Drop set', image: getExerciseGifUrl('Panturrilha em Pé') }
    ]
  }
];
