import { WorkoutRoutine } from '../types';
import { getExerciseGifUrl } from '../src/utils/exerciseUtils';

export const jessicaWorkouts: WorkoutRoutine[] = [
  {
    id: 't2-a',
    title: 'TREINO A — SEGUNDA',
    description: 'Glúteo + Quadríceps',
    color: 'emerald',
    exercises: [
      { id: 't2a-0', name: 'Esteira (Caminhada Inclinada) - Aquecimento', muscleGroup: 'Cardio', sets: 1, reps: '10 min', rest: 0, image: getExerciseGifUrl('Esteira (Caminhada Inclinada)') },
      { id: 't2a-1', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', sets: 4, reps: '10', rest: 60, image: getExerciseGifUrl('Agachamento Livre') },
      { id: 't2a-2', name: 'Leg Press 45', muscleGroup: 'Quadríceps', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Leg Press 45') },
      { id: 't2a-3', name: 'Afundo Caminhando', muscleGroup: 'Pernas', sets: 3, reps: '12/12', rest: 60, image: getExerciseGifUrl('Afundo Caminhando') },
      { id: 't2a-4', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '15 + 10 parciais', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 't2a-5', name: 'Elevação Pélvica Barra', muscleGroup: 'Glúteo', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Elevação Pélvica Barra') },
      { id: 't2a-6', name: 'Abdutora Máquina', muscleGroup: 'Glúteo', sets: 4, reps: '20', rest: 60, image: getExerciseGifUrl('Abdutora Máquina') },
      { id: 't2a-7', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Panturrilha em pé') }
    ],
    cardio: { exercise: 'Caminhada inclinada', duration: 20 }
  },
  {
    id: 't2-b',
    title: 'TREINO B — TERÇA',
    description: 'Superiores + Core',
    color: 'blue',
    exercises: [
      { id: 't2b-1', name: 'Supino Máquina', muscleGroup: 'Peito', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Supino Máquina') },
      { id: 't2b-2', name: 'Remada Baixa', muscleGroup: 'Costas', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Remada Baixa') },
      { id: 't2b-3', name: 'Desenvolvimento Halteres', muscleGroup: 'Ombros', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Desenvolvimento Halteres') },
      { id: 't2b-4', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Puxada Frontal') },
      { id: 't2b-5', name: 'Elevação Lateral', muscleGroup: 'Ombros', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Elevação Lateral') },
      { id: 't2b-6', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Rosca Direta') },
      { id: 't2b-7', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Tríceps Corda') },
      { id: 't2b-8', name: 'Prancha para o Core', muscleGroup: 'Core', sets: 3, reps: '40s', rest: 60, image: getExerciseGifUrl('Prancha') },
      { id: 't2b-9', name: 'Dead Bug', muscleGroup: 'Abdomen', sets: 3, reps: '12/12', rest: 60, image: getExerciseGifUrl('Dead Bug') },
      { id: 't2b-10', name: 'Abdômen Infra Banco', muscleGroup: 'Abdomen', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Abdomen Infra Banco') }
    ],
    cardio: { exercise: 'HIIT leve (bike ou esteira)', duration: 18 }
  },
  {
    id: 't2-c',
    title: 'TREINO C — QUARTA',
    description: 'Posterior + Glúteo',
    color: 'purple',
    exercises: [
      { id: 't2c-1', name: 'Stiff Barra', muscleGroup: 'Posterior', sets: 4, reps: '10', rest: 60, image: getExerciseGifUrl('Stiff Barra') },
      { id: 't2c-2', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 't2c-3', name: 'Elevação Pélvica', muscleGroup: 'Glúteo', sets: 4, reps: '10', rest: 60, image: getExerciseGifUrl('Elevação Pélvica') },
      { id: 't2c-4', name: 'Coice Máquina', muscleGroup: 'Glúteo', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Coice Máquina') },
      { id: 't2c-5', name: 'Cadeira Abdutora', muscleGroup: 'Glúteo', sets: 4, reps: '20', rest: 60, image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2c-6', name: 'Passada no Smith', muscleGroup: 'Pernas', sets: 3, reps: '12/12', rest: 60, image: getExerciseGifUrl('Passada no Smith') },
      { id: 't2c-7', name: 'Panturrilha Sentada', muscleGroup: 'Panturrilha', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Panturrilha Sentada') }
    ],
    cardio: { exercise: 'Bike moderada', duration: 15 }
  },
  {
    id: 't2-d',
    title: 'TREINO D — QUINTA',
    description: 'Metabólico + Abdômen (Circuito Sem Descanso)',
    color: 'orange',
    exercises: [
      { id: 't2d-1', name: 'Agachamento Goblet', muscleGroup: 'Pernas', sets: 4, reps: '15', rest: 0, image: getExerciseGifUrl('Agachamento Goblet') },
      { id: 't2d-2', name: 'Kettlebell Swing', muscleGroup: 'Corpo Todo', sets: 4, reps: '15', rest: 0, image: getExerciseGifUrl('Kettlebell Swing') },
      { id: 't2d-3', name: 'Step-up Banco', muscleGroup: 'Pernas', sets: 4, reps: '12/12', rest: 0, image: getExerciseGifUrl('Step-up Banco') },
      { id: 't2d-4', name: 'Battle Rope / Corda Naval', muscleGroup: 'Cardio', sets: 4, reps: '30s', rest: 0, image: getExerciseGifUrl('Battle Rope') },
      { id: 't2d-5', name: 'Burpee Adaptado', muscleGroup: 'Cardio', sets: 4, reps: '10', rest: 0, image: getExerciseGifUrl('Burpee Adaptado') },
      { id: 't2d-6', name: 'Bicicleta Abdominal', muscleGroup: 'Abdomen', sets: 4, reps: '20', rest: 90, notes: 'Descanse 90s ao final da volta', image: getExerciseGifUrl('Bicicleta Abdominal') }
    ],
    cardio: { exercise: 'Esteira Caminhada Inclinada', duration: 25 }
  },
  {
    id: 't2-e',
    title: 'TREINO E — SEXTA',
    description: 'Glúteo Premium 🍑',
    color: 'red',
    exercises: [
      { id: 't2e-1', name: 'Elevação Pélvica Extrema', muscleGroup: 'Glúteo', sets: 5, reps: '10', rest: 60, image: getExerciseGifUrl('Elevação Pélvica') },
      { id: 't2e-2', name: 'Agachamento Sumô', muscleGroup: 'Glúteo', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Agachamento Sumô') },
      { id: 't2e-3', name: 'Bulgarian Split Squat', muscleGroup: 'Pernas', sets: 3, reps: '10/10', rest: 60, image: getExerciseGifUrl('Bulgarian Split Squat') },
      { id: 't2e-4', name: 'Cadeira Abdutora', muscleGroup: 'Glúteo', sets: 4, reps: '20', rest: 60, image: getExerciseGifUrl('Cadeira Abdutora') },
      { id: 't2e-5', name: 'Glúteo Cabo / Coice', muscleGroup: 'Glúteo', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Glúteo Cabo') },
      { id: 't2e-6', name: 'Stiff Halteres', muscleGroup: 'Posterior', sets: 3, reps: '12', rest: 60, image: getExerciseGifUrl('Stiff Halteres') },
      { id: 't2e-7', name: 'Frog Pump', muscleGroup: 'Glúteo', sets: 3, reps: '25', rest: 60, image: getExerciseGifUrl('Frog Pump') }
    ]
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
