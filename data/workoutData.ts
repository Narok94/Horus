
import { WorkoutRoutine } from '../types';
import { getExerciseGifUrl } from '../src/utils/exerciseUtils';


export const teste2Workouts: WorkoutRoutine[] = [
  {
    id: 't2-a',
    title: 'TREINO A — SEGUNDA',
    description: 'Glúteo + Quadríceps',
    color: 'emerald',
    exercises: [
      { id: 't2a-1', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', sets: 4, reps: '10', rest: 60, image: getExerciseGifUrl('Agachamento Livre') },
      { id: 't2a-2', name: 'Leg Press 45', muscleGroup: 'Quadríceps', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Leg Press 45') },
      { id: 't2a-3', name: 'Afundo Caminhando', muscleGroup: 'Pernas', sets: 3, reps: '12/12', rest: 60, image: getExerciseGifUrl('Afundo Caminhando') },
      { id: 't2a-4', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '15 + 10 parciais', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 't2a-5', name: 'Elevação Pélvica Barra', muscleGroup: 'Glúteo', sets: 4, reps: '12', rest: 60, image: getExerciseGifUrl('Elevação Pélvica Barra') },
      { id: 't2a-6', name: 'Abdutora Máquina', muscleGroup: 'Glúteo', sets: 4, reps: '20', rest: 60, image: getExerciseGifUrl('Abdutora Máquina') },
      { id: 't2a-7', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Panturrilha em pé') }
    ],
    cardio: { exercise: 'Caminhada inclinada e final', duration: 30 }
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


export const jessicaWorkouts = teste2Workouts;

export const nikeWorkouts: WorkoutRoutine[] = [
  {
    id: 'nike-a',
    title: 'RUNNER STRENGTH — FORÇA ESPORTIVA',
    description: 'Foco em sprint, potência e musculatura estabilizadora de corrida.',
    color: 'blue',
    exercises: [
      { id: 'nikea-1', name: 'Agachamento Búlgaro Unilateral', muscleGroup: 'Quadríceps', sets: 4, reps: '8-10', rest: 60, image: getExerciseGifUrl('Agachamento Búlgaro Unilateral') },
      { id: 'nikea-2', name: 'Stiff Unilateral com Halteres', muscleGroup: 'Posterior', sets: 3, reps: '10-12', rest: 60, image: getExerciseGifUrl('Stiff Unilateral com Halteres') },
      { id: 'nikea-3', name: 'Subida no Banco Explosiva', muscleGroup: 'Pernas', sets: 3, reps: '12/12', rest: 45, image: getExerciseGifUrl('Subida no Banco Explosiva') },
      { id: 'nikea-4', name: 'Elevação Pélvica Unilateral', muscleGroup: 'Glúteo', sets: 3, reps: '12-15', rest: 45, image: getExerciseGifUrl('Elevação Pélvica Unilateral') },
      { id: 'nikea-5', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', rest: 45, image: getExerciseGifUrl('Panturrilha em pé') }
    ]
  },
  {
    id: 'nike-b',
    title: 'ATHLETIC CORE — ESTABILIDADE & TRONCO',
    description: 'Foco em postura ideal, controle respiratório e corrida eficiente.',
    color: 'orange',
    exercises: [
      { id: 'nikeb-1', name: 'Prancha para o Core', muscleGroup: 'Core', sets: 3, reps: '60s', rest: 45, image: getExerciseGifUrl('Prancha') },
      { id: 'nikeb-2', name: 'Bicicleta Abdominal', muscleGroup: 'Abdomen', sets: 3, reps: '20-25', rest: 30, image: getExerciseGifUrl('Bicicleta Abdominal') },
      { id: 'nikeb-3', name: 'Dead Bug', muscleGroup: 'Abdomen', sets: 3, reps: '12/12', rest: 30, image: getExerciseGifUrl('Dead Bug') },
      { id: 'nikeb-4', name: 'Flexão', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Flexão') }
    ],
    cardio: { exercise: 'Corrida Intervalada Nike Run (Sprints)', duration: 25 }
  },
  {
    id: 'nike-c',
    title: 'POWER & MOBILITY — FLEXIBILIDADE ATIVA',
    description: 'Foco em amplitude articular, prevenção de lesões e recuperação.',
    color: 'emerald',
    exercises: [
      { id: 'nikec-1', name: 'Agachamento Sumô', muscleGroup: 'Glúteo', sets: 3, reps: '12', rest: 45, image: getExerciseGifUrl('Agachamento Sumô') },
      { id: 'nikec-2', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 4, reps: '10-12', rest: 60, image: getExerciseGifUrl('Mesa Flexora') },
      { id: 'nikec-3', name: 'Kettlebell Swing', muscleGroup: 'Corpo Todo', sets: 4, reps: '15', rest: 60, image: getExerciseGifUrl('Kettlebell Swing') },
      { id: 'nikec-4', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') }
    ],
    cardio: { exercise: 'Corrida Progressiva (Zonas de Ritmo)', duration: 35 }
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

export const mariaWorkouts: WorkoutRoutine[] = [
  {
    id: 'm-a',
    title: 'Treino A - Superior',
    description: 'Foco em membros superiores.',
    color: 'orange',
    exercises: [
      { id: 'ma1', name: 'Supino reto', muscleGroup: 'Peito', sets: 3, reps: '10', rest: 90, notes: 'Carga 60%', image: getExerciseGifUrl('Supino reto') },
      { id: 'ma2', name: 'Elevação conjunta', muscleGroup: 'Ombros', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Elevação conjunta') },
      { id: 'ma3', name: 'Tríceps francês', muscleGroup: 'Tríceps', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Tríceps francês') },
      { id: 'ma4', name: 'Crucifixo', muscleGroup: 'Peito', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Crucifixo') },
      { id: 'ma5', name: 'Desenvolvimento Arnold', muscleGroup: 'Ombros', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Desenvolvimento Arnold') },
      { id: 'ma6', name: 'Tríceps na caixa ou nas argolas', muscleGroup: 'Tríceps', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Tríceps na caixa ou nas argolas') },
      { id: 'ma7', name: 'Supino alternado', muscleGroup: 'Peito', sets: 3, reps: '10, 10', rest: 90, image: getExerciseGifUrl('Supino alternado') },
      { id: 'ma8', name: 'Flexão', muscleGroup: 'Peito', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Flexão') }
    ]
  },
  {
    id: 'm-b',
    title: 'Treino B - Inferior',
    description: 'Foco em membros inferiores.',
    color: 'emerald',
    exercises: [
      { id: 'mb1', name: 'Elevação de perna extendida', muscleGroup: 'Pernas', sets: 3, reps: '12 a 15', rest: 60, notes: 'Carga caneleira', image: getExerciseGifUrl('Elevação de perna extendida') },
      { id: 'mb2', name: 'Hip Thrust - elevação pélvica', muscleGroup: 'Glúteo', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Hip Thrust - elevação pélvica') },
      { id: 'mb3', name: 'Clamshell - ostra', muscleGroup: 'Glúteo', sets: 3, reps: '10, 10', rest: 60, image: getExerciseGifUrl('Clamshell - ostra') },
      { id: 'mb4', name: 'Deadlift', muscleGroup: 'Posterior/Glúteo', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Deadlift') },
      { id: 'mb5', name: 'Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '10, 10', rest: 90, image: getExerciseGifUrl('Extensora') },
      { id: 'mb6', name: 'Flexora', muscleGroup: 'Posterior', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Flexora') },
      { id: 'mb7', name: 'Stiff', muscleGroup: 'Posterior', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Stiff') }
    ]
  },
  {
    id: 'm-c',
    title: 'Treino C - Superior',
    description: 'Foco em membros superiores.',
    color: 'blue',
    exercises: [
      { id: 'mc1', name: 'Remada curvada', muscleGroup: 'Costas', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Remada curvada') },
      { id: 'mc2', name: 'Encolhimento', muscleGroup: 'Trapézio', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Encolhimento') },
      { id: 'mc3', name: 'Rosca direta', muscleGroup: 'Bíceps', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Rosca direta') },
      { id: 'mc4', name: 'Crucifixo inverso', muscleGroup: 'Ombros/Costas', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Crucifixo inverso') },
      { id: 'mc5', name: 'Rosca alternada', muscleGroup: 'Bíceps', sets: 3, reps: '10, 10', rest: 90, image: getExerciseGifUrl('Rosca alternada') },
      { id: 'mc6', name: 'Remada alternada', muscleGroup: 'Costas', sets: 3, reps: '10, 10', rest: 90, image: getExerciseGifUrl('Remada alternada') }
    ]
  },
  {
    id: 'm-d',
    title: 'Treino D - Inferior',
    description: 'Foco em membros inferiores.',
    color: 'purple',
    exercises: [
      { id: 'md1', name: 'Abdução de quadril em pé', muscleGroup: 'Glúteo', sets: 3, reps: '10, 10', rest: 60, image: getExerciseGifUrl('Abdução de quadril em pé') },
      { id: 'md2', name: 'Stiff unilateral', muscleGroup: 'Posterior', sets: 3, reps: '10, 10', rest: 60, image: getExerciseGifUrl('Stiff unilateral') },
      { id: 'md3', name: 'Sumô', muscleGroup: 'Pernas/Glúteo', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Sumô') },
      { id: 'md4', name: 'Flexão de joelho em pé', muscleGroup: 'Posterior', sets: 3, reps: '10, 10', rest: 60, image: getExerciseGifUrl('Flexão de joelho em pé') },
      { id: 'md5', name: 'Flexão de joelho na MB', muscleGroup: 'Posterior', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Flexão de joelho na MB') },
      { id: 'md6', name: 'Wall sit', muscleGroup: 'Pernas', sets: 3, reps: '30 a 45"', rest: 60, image: getExerciseGifUrl('Wall sit') },
      { id: 'md7', name: 'Back Squat', muscleGroup: 'Pernas', sets: 3, reps: '10', rest: 90, image: getExerciseGifUrl('Back Squat') }
    ]
  }
];

export const flaviaWorkouts: WorkoutRoutine[] = [
  {
    id: 'f-a',
    title: 'Treino A - Inferiores/CORE',
    description: 'Foco em pernas e estabilização.',
    color: 'blue',
    exercises: [
      { id: 'fa1', name: 'Abdomen Infra (Pingus)', muscleGroup: 'CORE', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Abdomen Infra (Pingus)') },
      { id: 'fa2', name: 'Agachamento Livre Banco', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Agachamento Livre Banco') },
      { id: 'fa3', name: 'Cadeira Adutora', muscleGroup: 'Adutores', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Adutora') },
      { id: 'fa4', name: 'Afundo', muscleGroup: 'Pernas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Afundo') },
      { id: 'fa5', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Extensora') },
      { id: 'fa6', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 3, reps: '15', rest: 45, image: getExerciseGifUrl('Panturrilha em pé') }
    ]
  },
  {
    id: 'f-b',
    title: 'Treino B - CORE/Fortalecimento',
    description: 'Fortalecimento específico do CORE.',
    color: 'emerald',
    exercises: [
      { id: 'fb1', name: 'Pingus', muscleGroup: 'CORE', sets: 3, reps: '12-15', rest: 30, image: getExerciseGifUrl('Pingus') },
      { id: 'fb2', name: 'Frog', muscleGroup: 'CORE', sets: 3, reps: '12-15', rest: 30, image: getExerciseGifUrl('Frog') },
      { id: 'fb3', name: 'One Hundred', muscleGroup: 'CORE', sets: 3, reps: '50', rest: 30, image: getExerciseGifUrl('One Hundred') },
      { id: 'fb4', name: 'Single Leg Stretch', muscleGroup: 'CORE', sets: 3, reps: '12-15', rest: 30, image: getExerciseGifUrl('Single Leg Stretch') },
      { id: 'fb5', name: 'Double Leg Stretch', muscleGroup: 'CORE', sets: 3, reps: '12-15', rest: 30, image: getExerciseGifUrl('Double Leg Stretch') },
      { id: 'fb6', name: 'Elevação Pélvica', muscleGroup: 'Glúteo/CORE', sets: 3, reps: '12-15', rest: 30, image: getExerciseGifUrl('Elevação Pélvica') }
    ]
  },
  {
    id: 'f-c',
    title: 'Treino C - Superiores',
    description: 'Tronco e membros superiores.',
    color: 'orange',
    exercises: [
      { id: 'fc1', name: 'Abdomen Reto Pilates', muscleGroup: 'Abdomen', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Abdomen Reto Pilates') },
      { id: 'fc2', name: 'Elevação Frontal Halteres', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Elevação Frontal Halteres') },
      { id: 'fc3', name: 'Supino Máquina', muscleGroup: 'Peitoral', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Supino Máquina') },
      { id: 'fc4', name: 'Desenvolvimento Máquina', muscleGroup: 'Ombros', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Desenvolvimento Máquina') },
      { id: 'fc5', name: 'Crucifixo Banco Halteres', muscleGroup: 'Peitoral', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Crucifixo Banco Halteres') },
      { id: 'fc6', name: 'Remada Alta Kettlebell', muscleGroup: 'Costas/Ombro', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Remada Alta Kettlebell') }
    ]
  },
  {
    id: 'f-d',
    title: 'Treino D - Posterior/Glúteo',
    description: 'Cadeia posterior e glúteos.',
    color: 'purple',
    exercises: [
      { id: 'fd1', name: 'Extensão Lombar Livre', muscleGroup: 'Lombar', sets: 3, reps: '15', rest: 60, image: getExerciseGifUrl('Extensão Lombar Livre') },
      { id: 'fd2', name: 'Abdução Solo Pilates (Leg circles)', muscleGroup: 'Quadril', sets: 3, reps: '20', rest: 60, image: getExerciseGifUrl('Abdução Solo Pilates (Leg circles)') },
      { id: 'fd3', name: 'Stiff Barra', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Stiff Barra') },
      { id: 'fd4', name: 'Gluteo Máquina Coice', muscleGroup: 'Glúteo', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Gluteo Máquina Coice') },
      { id: 'fd5', name: 'Cadeira Flexora', muscleGroup: 'Posterior', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Cadeira Flexora') },
      { id: 'fd6', name: 'Elevação Pélvica Livre', muscleGroup: 'Glúteo', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Elevação Pélvica Livre') }
    ]
  },
  {
    id: 'f-e',
    title: 'Treino E - Tração/Braços',
    description: 'Costas e braços.',
    color: 'red',
    exercises: [
      { id: 'fe1', name: 'Canoa Estática', muscleGroup: 'CORE', sets: 3, reps: '90s', rest: 60, image: getExerciseGifUrl('Canoa Estática') },
      { id: 'fe2', name: 'Puxada Supinada', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Puxada Supinada') },
      { id: 'fe3', name: 'Triceps Pulley Barra W', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Triceps Pulley Barra W') },
      { id: 'fe4', name: 'Remada Baixa Aberta', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Remada Baixa Aberta') },
      { id: 'fe5', name: 'Rosca Direta Pulley Corda', muscleGroup: 'Bíceps', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Rosca Direta Pulley Corda') },
      { id: 'fe6', name: 'Serrote Halteres', muscleGroup: 'Costas', sets: 3, reps: '12-15', rest: 60, image: getExerciseGifUrl('Serrote Halteres') }
    ]
  }
];
