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
    title: 'TREINO A — PEITO, OMBRO E TRÍCEPS',
    description: '(Foco em peitoral superior, ombro largo e estética)',
    color: 'orange',
    exercises: [
      { id: 'ha-1', name: 'Supino Inclinado Máquina ou Halteres', muscleGroup: 'Peitoral', sets: 4, reps: '8-12', rest: 60, image: getExerciseGifUrl('Supino Inclinado Máquina ou Halteres') },
      { id: 'ha-2', name: 'Supino Reto Máquina ou Halteres', muscleGroup: 'Peitoral', sets: 3, reps: '8-12', rest: 60, image: getExerciseGifUrl('Supino Reto Máquina ou Halteres') },
      { id: 'ha-3', name: 'Crucifixo Máquina', muscleGroup: 'Peitoral', sets: 2, reps: '12-15', rest: 60, image: getExerciseGifUrl('Crucifixo Máquina') },
      { id: 'ha-4', name: 'Desenvolvimento Máquina (pegada neutra)', muscleGroup: 'Ombros', sets: 3, reps: '10-12', rest: 60, image: getExerciseGifUrl('Desenvolvimento Máquina (pegada neutra)') },
      { id: 'ha-5', name: 'Elevação Lateral Polia', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: 60, image: getExerciseGifUrl('Elevação Lateral Polia') },
      { id: 'ha-6', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', rest: 60, image: getExerciseGifUrl('Tríceps Corda') }
    ]
  },
  {
    id: 'h-b',
    title: 'TREINO B — COSTAS, TRAPÉZIO, BÍCEPS E ANTEBRAÇO',
    description: '(Foco em dorsal aberta, trapézio e braços)',
    color: 'purple',
    exercises: [
      { id: 'hb-1', name: 'Puxada Alta', muscleGroup: 'Costas', sets: 4, reps: '8-12', rest: 60, image: getExerciseGifUrl('Puxada Alta') },
      { id: 'hb-2', name: 'Remada Baixa Triângulo', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: 60, image: getExerciseGifUrl('Remada Baixa Triângulo') },
      { id: 'hb-3', name: 'Pulldown Unilateral OU Pullover Polia', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Pulldown Unilateral OU Pullover Polia') },
      { id: 'hb-4', name: 'Encolhimento Halteres', muscleGroup: 'Trapézio', sets: 4, reps: '12-15', rest: 60, image: getExerciseGifUrl('Encolhimento Halteres') },
      { id: 'hb-5', name: 'Rosca Martelo', muscleGroup: 'Bíceps', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Rosca Martelo') },
      { id: 'hb-6', name: 'Rosca Scott Máquina OU Barra W', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: 60, image: getExerciseGifUrl('Rosca Scott Máquina OU Barra W') },
      { id: 'hb-7', name: 'Rosca Inversa Barra W', muscleGroup: 'Antebraço', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Rosca Inversa Barra W') },
      { id: 'hb-8', name: 'Flexão de Punho', muscleGroup: 'Antebraço', sets: 3, reps: '15-20', rest: 60, image: getExerciseGifUrl('Flexão de Punho') }
    ]
  },
  {
    id: 'h-c',
    title: 'TREINO C — PERNAS E ABDÔMEN',
    description: '(Foco em pernas equilibradas e cintura estética)',
    color: 'emerald',
    exercises: [
      { id: 'hc-1', name: 'Leg Press', muscleGroup: 'Pernas', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Leg Press') },
      { id: 'hc-2', name: 'Stiff', muscleGroup: 'Posterior', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Stiff') },
      { id: 'hc-3', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 'hc-4', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 'hc-5', name: 'Panturrilha', muscleGroup: 'Panturrilha', sets: 4, reps: '12-15', rest: 60, image: getExerciseGifUrl('Panturrilha') },
      { id: 'hc-6', name: 'Abdômen Infra', muscleGroup: 'Abdômen', sets: 3, reps: '15-20', rest: 60, image: getExerciseGifUrl('Abdômen Infra') },
      { id: 'hc-7', name: 'Prancha', muscleGroup: 'CORE', sets: 3, reps: '45-60s', rest: 60, image: getExerciseGifUrl('Prancha') }
    ]
  }
];
