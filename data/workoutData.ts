import { WorkoutRoutine } from '../types';
import { getExerciseGifUrl } from '../src/utils/exerciseUtils';

export const jessicaWorkouts: WorkoutRoutine[] = [
  {
    id: 't2-a',
    title: 'Treino A — Pernas 🦵',
    description: 'Foco em Cadeira Extensora, Agachamento e Pernas',
    color: 'emerald',
    exercises: [
      { id: 't2a-1', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 't2a-2', name: 'Agachamento Livre no Banco', muscleGroup: 'Pernas', sets: 3, reps: '12-15', rest: 60, notes: 'Amplitude controlada', image: getExerciseGifUrl('Agachamento Smith') },
      { id: 't2a-3', name: 'Cadeira Adutora', muscleGroup: 'Adutora', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Cadeira Adutora') },
      { id: 't2a-4', name: 'Afundo (apoiado)', muscleGroup: 'Pernas', sets: 3, reps: '10 cada perna', rest: 60, notes: 'Passo curto, sem descida profunda', image: getExerciseGifUrl('Afundo') },
      { id: 't2a-5', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 3, reps: '15', rest: 45, image: getExerciseGifUrl('Panturrilha em Pé') },
      { id: 't2a-6', name: 'Abdômen Infra (Pingus)', muscleGroup: 'Abdômen', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Abdômen Infra') }
    ]
  },
  {
    id: 't2-b',
    title: 'Treino B — Peito + Ombro 🦾',
    description: 'Foco em Supino, Desenvolvimento e Superiores',
    color: 'blue',
    exercises: [
      { id: 't2b-1', name: 'Supino Máquina', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Supino Máquina') },
      { id: 't2b-2', name: 'Desenvolvimento Máquina', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Desenvolvimento Máquina') },
      { id: 't2b-3', name: 'Peck Deck', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Peck Deck') },
      { id: 't2b-4', name: 'Elevação Lateral (halteres)', muscleGroup: 'Ombros', sets: 3, reps: '15', rest: 45, notes: 'Peso leve', image: getExerciseGifUrl('Elevação Lateral') },
      { id: 't2b-5', name: 'Remada Alta (kettlebell)', muscleGroup: 'Ombros', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Remada Alta') },
      { id: 't2b-6', name: 'Abdômen Reto Pilates', muscleGroup: 'Abdômen', sets: 3, reps: '15', rest: 45, image: getExerciseGifUrl('Abdominal Máquina') }
    ]
  },
  {
    id: 't2-c',
    title: 'Treino C — Glúteo/Posterior + Core 🍑',
    description: 'Foco em Elevação Pélvica, Stiff e Cadeira Flexora',
    color: 'purple',
    exercises: [
      { id: 't2c-1', name: 'Elevação Pélvica (Hip Thrust)', muscleGroup: 'Glúteo', sets: 4, reps: '12-15', rest: 60, notes: 'Base do trabalho de glúteo', image: getExerciseGifUrl('Hip Thrust - elevação pélvica') },
      { id: 't2c-2', name: 'Stiff (barra)', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 60, notes: 'Atenção à lombar na descida', image: getExerciseGifUrl('Stiff') },
      { id: 't2c-3', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Cadeira Flexora') },
      { id: 't2c-4', name: 'Abdução Solo (Pilates)', muscleGroup: 'Glúteo', sets: 3, reps: '15', rest: 45, image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2c-5', name: 'Prancha', muscleGroup: 'CORE', sets: 3, reps: '60-90 seg', rest: 45, image: getExerciseGifUrl('Prancha') }
    ]
  },
  {
    id: 't2-d',
    title: 'Treino D — Costas + Tríceps 👐',
    description: 'Foco em Costas, Puxada e Tríceps',
    color: 'orange',
    exercises: [
      { id: 't2d-1', name: 'Puxada Supinada', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Puxada Frente Aberta') },
      { id: 't2d-2', name: 'Remada Baixa (máquina)', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Remada Baixa') },
      { id: 't2d-3', name: 'Peck Deck Invertido', muscleGroup: 'Ombros', sets: 3, reps: '15', rest: 45, image: getExerciseGifUrl('Peck Deck Invertido') },
      { id: 't2d-4', name: 'Tríceps Pulley (barra W)', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Tríceps Pulley') },
      { id: 't2d-5', name: 'Rosca Direta Pulley (barra W)', muscleGroup: 'Bíceps', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Rosca Direta Barra W') },
      { id: 't2d-6', name: 'Canoa Estática', muscleGroup: 'CORE', sets: 3, reps: '60-90 seg', rest: 45, image: getExerciseGifUrl('Prancha') }
    ]
  },
  {
    id: 't2-e',
    title: 'Treino E — Glúteo (Especialização) ✨',
    description: 'Glúteos Máquina, Elevação Unilateral e Ponte',
    color: 'pink',
    exercises: [
      { id: 't2e-1', name: 'Cadeira Abdutora', muscleGroup: 'Glúteo', sets: 3, reps: '15', rest: 45, notes: 'Ângulo diferente do Treino C', image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2e-2', name: 'Glúteo Máquina Coice', muscleGroup: 'Glúteo', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Glúteo Cabo (Coice)') },
      { id: 't2e-3', name: 'Elevação Pélvica Unilateral', muscleGroup: 'Glúteo', sets: 3, reps: '10 cada lado', rest: 60, notes: 'Mais isolamento por perna', image: getExerciseGifUrl('Hip Thrust - elevação pélvica') },
      { id: 't2e-4', name: 'Glúteo no Cabo (coice)', muscleGroup: 'Glúteo', sets: 3, reps: '12 cada lado', rest: 45, image: getExerciseGifUrl('Glúteo Cabo (Coice)') },
      { id: 't2e-5', name: 'Ponte Glútea (isometria)', muscleGroup: 'Glúteo', sets: 3, reps: '30-40 seg', rest: 45, notes: 'Finalizador', image: getExerciseGifUrl('Prancha') }
    ]
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
