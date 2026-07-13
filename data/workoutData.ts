import { WorkoutRoutine } from '../types';
import { getExerciseGifUrl } from '../src/utils/exerciseUtils';

export const jessicaWorkouts: WorkoutRoutine[] = [
  {
    id: 't2-a',
    title: 'Treino A — Peito e Tríceps',
    description: 'Cardio todos os dias pós treino 25\' • Alongamento',
    color: 'purple',
    exercises: [
      { id: 't2a-1', name: 'Supino Reto', muscleGroup: 'Peito', sets: 3, reps: '8-10', rest: 45, image: getExerciseGifUrl('Supino Reto (máquina)') },
      { id: 't2a-2', name: 'Supino Inclinado', muscleGroup: 'Peito', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Supino inclinado (máquina)') },
      { id: 't2a-3', name: 'Peck Deck', muscleGroup: 'Peito', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Peck Deck') },
      { id: 't2a-4', name: 'Tríceps Pulley', muscleGroup: 'Tríceps', sets: 3, reps: '10', rest: 45, image: getExerciseGifUrl('Tríceps Pulley') },
      { id: 't2a-5', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Tríceps Corda') },
      { id: 't2a-6', name: 'Tríceps Francês', muscleGroup: 'Tríceps', sets: 3, reps: '9-10', rest: 45, image: getExerciseGifUrl('Tríceps Francês') }
    ]
  },
  {
    id: 't2-b',
    title: 'Treino B — Quadríceps',
    description: 'Alongamento e Bicicleta 5\' antes do treino • Cardio pós 25\'',
    color: 'emerald',
    exercises: [
      { id: 't2b-1', name: 'Agachamento Barra Guiada', muscleGroup: 'Quadríceps', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Agachamento Smith') },
      { id: 't2b-2', name: 'Leg 45º + Afundo', muscleGroup: 'Quadríceps', sets: 4, reps: '12 / 10', rest: 45, image: getExerciseGifUrl('Leg Press 45') },
      { id: 't2b-3', name: 'Hack', muscleGroup: 'Quadríceps', sets: 3, reps: '10', rest: 45, image: getExerciseGifUrl('Agachamento Hack') },
      { id: 't2b-4', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 4, reps: '15', rest: 45, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 't2b-5', name: 'Cadeira Adutora', muscleGroup: 'Pernas', sets: 4, reps: 'Até a falha', rest: 45, image: getExerciseGifUrl('Cadeira Adutora') },
      { id: 't2b-6', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: 'Até a falha', rest: 45, image: getExerciseGifUrl('Panturrilha em Pé') }
    ]
  },
  {
    id: 't2-c',
    title: 'Treino C — Costa e Bíceps',
    description: 'Alongamento • Cardio pós 25\'',
    color: 'orange',
    exercises: [
      { id: 't2c-1', name: 'Pulley Aberto', muscleGroup: 'Costas', sets: 4, reps: '8-10', rest: 45, image: getExerciseGifUrl('Puxada frente') },
      { id: 't2c-2', name: 'Pulley Triângulo', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Puxada Triângulo') },
      { id: 't2c-3', name: 'Remada Sentada', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 45, image: getExerciseGifUrl('Remada baixa') },
      { id: 't2c-4', name: 'Rosca Direta Barra W', muscleGroup: 'Bíceps', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Rosca Barra W') },
      { id: 't2c-5', name: 'Rosca Scott Barra W', muscleGroup: 'Bíceps', sets: 3, reps: '10', rest: 45, image: getExerciseGifUrl('Rosca Scott') },
      { id: 't2c-6', name: 'Rosca Martelo Corda', muscleGroup: 'Bíceps', sets: 4, reps: '12-15', rest: 45, image: getExerciseGifUrl('Rosca Martelo') }
    ]
  },
  {
    id: 't2-d',
    title: 'Treino D — Posterior e Glúteo',
    description: 'Alongamento e Bicicleta 5\' antes treino • Cardio pós 25\'',
    color: 'rose',
    exercises: [
      { id: 't2d-1', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 4, reps: '12', rest: 45, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 't2d-2', name: 'Stiff com Halteres', muscleGroup: 'Posterior', sets: 3, reps: '12', rest: 45, image: getExerciseGifUrl('Stiff') },
      { id: 't2d-3', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 4, reps: '12', rest: 45, image: getExerciseGifUrl('Cadeira Flexora') },
      { id: 't2d-4', name: 'Búlgaro', muscleGroup: 'Posterior', sets: 3, reps: '10', rest: 45, notes: 'SOLO', image: getExerciseGifUrl('Agachamento Búlgaro') },
      { id: 't2d-5', name: 'Cadeira Abdutora', muscleGroup: 'Glúteo', sets: 4, reps: '15', rest: 45, notes: 'ELEVAÇÃO', image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2d-6', name: 'Levantamento Pélvico', muscleGroup: 'Glúteo', sets: 5, reps: '10', rest: 45, notes: '3\' no pico de contração', image: getExerciseGifUrl('Elevação pélvica') },
      { id: 't2d-7', name: 'Panturrilha Sentada', muscleGroup: 'Panturrilha', sets: 4, reps: 'Até a Falha', rest: 45, image: getExerciseGifUrl('Panturrilha Sentada') }
    ]
  },
  {
    id: 't2-e',
    title: 'Treino E — Ombro',
    description: 'Alongamento • Cardio pós 25\'',
    color: 'blue',
    exercises: [
      { id: 't2e-1', name: 'Desenvolvimento Aberto Barra', muscleGroup: 'Ombros', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Desenvolvimento') },
      { id: 't2e-2', name: 'Frontal com Halteres', muscleGroup: 'Ombros', sets: 3, reps: '8-9', rest: 45, image: getExerciseGifUrl('Elevação Frontal') },
      { id: 't2e-3', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Elevação lateral') },
      { id: 't2e-4', name: 'Crucifixo Inverso', muscleGroup: 'Ombros', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Crucifixo Inverso') },
      { id: 't2e-5', name: 'Encolhimento Ombro', muscleGroup: 'Trapézio', sets: 3, reps: 'Até a Falha', rest: 45, image: getExerciseGifUrl('Encolhimento') }
    ]
  }
];

export const henriqueWorkouts: WorkoutRoutine[] = [
  {
    id: 'h-a',
    title: 'TREINO A — Peito e Bíceps',
    description: 'Objetivo: Hipertrofia, Saúde • 12 Semanas',
    color: 'purple',
    exercises: [
      { id: 'ha-1', name: 'Supino Reto (Barra)', muscleGroup: 'Peito', sets: 4, reps: '8-10', rest: 45, image: getExerciseGifUrl('Supino Reto') },
      { id: 'ha-2', name: 'Supino Inclinado (Halteres)', muscleGroup: 'Peito', sets: 3, reps: '10-12', rest: 45, image: getExerciseGifUrl('Supino Inclinado') },
      { id: 'ha-3', name: 'Supino Inclinado Máquina', muscleGroup: 'Peito', sets: 4, reps: '8', rest: 45, image: getExerciseGifUrl('Supino inclinado (máquina)') },
      { id: 'ha-4', name: 'Crucifixo na Máquina', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Peck Deck') },
      { id: 'ha-5', name: 'Rosca Direta (Barra)', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: 45, image: getExerciseGifUrl('Rosca Direta') },
      { id: 'ha-6', name: 'Rosca Alternada (Halteres)', muscleGroup: 'Bíceps', sets: 3, reps: '12', rest: 45, notes: 'CADA BRAÇO', image: getExerciseGifUrl('Rosca Alternada') },
      { id: 'ha-7', name: 'Rosca Martelo', muscleGroup: 'Bíceps', sets: 5, reps: '15', rest: 45, image: getExerciseGifUrl('Rosca martelo') }
    ]
  },
  {
    id: 'h-b',
    title: 'TREINO B — Quadríceps e Panturrilha',
    description: 'Objetivo: Hipertrofia, Saúde • 12 Semanas',
    color: 'emerald',
    exercises: [
      { id: 'hb-1', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', sets: 4, reps: '8-10', rest: 45, image: getExerciseGifUrl('Agachamento') },
      { id: 'hb-2', name: 'Leg Press 45º', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Leg Press 45') },
      { id: 'hb-3', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 'hb-4', name: 'Afundo', muscleGroup: 'Quadríceps', sets: 3, reps: '10', rest: 45, notes: 'CADA PERNA', image: getExerciseGifUrl('Afundo') },
      { id: 'hb-5', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 3, reps: '15-20', rest: 45, image: getExerciseGifUrl('Panturrilha em Pé') },
      { id: 'hb-6', name: 'Panturrilha Sentada', muscleGroup: 'Panturrilha', sets: 3, reps: '15-20', rest: 45, image: getExerciseGifUrl('Panturrilha Sentada') }
    ]
  },
  {
    id: 'h-c',
    title: 'TREINO C — Costas e Tríceps',
    description: 'Objetivo: Hipertrofia, Saúde • 12 Semanas',
    color: 'orange',
    exercises: [
      { id: 'hc-1', name: 'Puxada Alta (Pulley Frente)', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: 45, image: getExerciseGifUrl('Puxada frente') },
      { id: 'hc-2', name: 'Remada Curvada (Barra)', muscleGroup: 'Costas', sets: 4, reps: '8-10', rest: 45, image: getExerciseGifUrl('Remada Curvada') },
      { id: 'hc-3', name: 'Remada Sentada', muscleGroup: 'Costas', sets: 3, reps: '8-10', rest: 45, image: getExerciseGifUrl('Remada baixa') },
      { id: 'hc-4', name: 'Remada Cavalinho', muscleGroup: 'Costas', sets: 3, reps: '10-12', rest: 45, image: getExerciseGifUrl('Remada Cavalinho') },
      { id: 'hc-5', name: 'Tríceps Testa (Barra W)', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', rest: 45, image: getExerciseGifUrl('Tríceps testa') },
      { id: 'hc-6', name: 'Tríceps Francês', muscleGroup: 'Tríceps', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Tríceps Francês') },
      { id: 'hc-7', name: 'Tríceps Pulley (Corda)', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Tríceps Corda') }
    ]
  },
  {
    id: 'h-d',
    title: 'TREINO D — Ombro, Panturrilha e Trapézio',
    description: 'Objetivo: Hipertrofia, Saúde • 12 Semanas',
    color: 'rose',
    exercises: [
      { id: 'hd-1', name: 'Elevação Frontal (Haltere)', muscleGroup: 'Ombros', sets: 4, reps: '8-10', rest: 45, image: getExerciseGifUrl('Elevação Frontal') },
      { id: 'hd-2', name: 'Desenvolvimento (Haltere)', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: 45, image: getExerciseGifUrl('Desenvolvimento') },
      { id: 'hd-3', name: 'Elevação Lateral (Haltere)', muscleGroup: 'Ombros', sets: 4, reps: '12-15', rest: 45, image: getExerciseGifUrl('Elevação lateral') },
      { id: 'hd-4', name: 'Encolhimento de Ombros (Halteres)', muscleGroup: 'Trapézio', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Encolhimento (halteres)') },
      { id: 'hd-5', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', rest: 45, image: getExerciseGifUrl('Panturrilha em Pé') },
      { id: 'hd-6', name: 'Abdominal Supra (Máquina)', muscleGroup: 'Abdômen', sets: 3, reps: '15-20', rest: 45, image: getExerciseGifUrl('Abdominal') },
      { id: 'hd-7', name: 'Prancha Abdominal', muscleGroup: 'Abdômen', sets: 3, reps: '45-60s', rest: 45, image: getExerciseGifUrl('Prancha') }
    ]
  },
  {
    id: 'h-e',
    title: 'TREINO E — Posterior de Perna, Glúteo e Cardio',
    description: 'Objetivo: Hipertrofia, Saúde • 12 Semanas',
    color: 'blue',
    exercises: [
      { id: 'he-1', name: 'Stiff (Barra ou Halter)', muscleGroup: 'Posterior', sets: 4, reps: '8-10', rest: 45, notes: 'Foco no alongamento do posterior', image: getExerciseGifUrl('Stiff') },
      { id: 'he-2', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 45, notes: 'Contrair bem o posterior', image: getExerciseGifUrl('Mesa Flexora') },
      { id: 'he-3', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 4, reps: '10', rest: 45, image: getExerciseGifUrl('Cadeira Flexora') },
      { id: 'he-4', name: 'Elevação Pélvica (Hip Thrust)', muscleGroup: 'Glúteo', sets: 3, reps: '10-12', rest: 45, notes: 'Foco na contração máxima do glúteo', image: getExerciseGifUrl('Hip Thrust - elevação pélvica') },
      { id: 'he-5', name: 'Cadeira Abdutora', muscleGroup: 'Glúteo', sets: 3, reps: '15-20', rest: 45, notes: 'Para glúteo médio', image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 'he-6', name: 'Cardio (Esteira/Bike)', muscleGroup: 'Cardio', sets: 1, reps: '20-30 min', rest: 0, notes: 'Intensidade moderada a alta', image: getExerciseGifUrl('Cardio') }
    ]
  }
];
