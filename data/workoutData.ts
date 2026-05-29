
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

export const henriqueWorkouts: WorkoutRoutine[] = [
  {
    id: 'h-a',
    title: 'TREINO A',
    description: 'Foco: Peitoral superior + ombro lateral SEM destruir articulação',
    color: 'orange',
    exercises: [
      { id: 'ha-1', name: 'Manguito rotador polia', muscleGroup: 'Manguito', sets: 2, reps: '15', rest: 60, notes: 'Foco em ativação e aquecimento articular leve', image: getExerciseGifUrl('Manguito rotador polia') },
      { id: 'ha-2', name: 'Supino inclinado máquina', muscleGroup: 'Peito', sets: 4, reps: '8-12', rest: 90, notes: 'Foco em peitoral superior, movimento super controlado', image: getExerciseGifUrl('Supino inclinado máquina') },
      { id: 'ha-3', name: 'Supino reto halteres pegada neutra', muscleGroup: 'Peito', sets: 3, reps: '10-12', rest: 90, notes: 'Proteger ombro com pegada neutra (palmas voltadas para dentro)', image: getExerciseGifUrl('Supino reto halteres pegada neutra') },
      { id: 'ha-4', name: 'Crucifixo máquina', muscleGroup: 'Peito', sets: 3, reps: '12-15', rest: 60, notes: 'Esmagar peitoral no pico, sem ultrapassar linha dos ombros', image: getExerciseGifUrl('Crucifixo máquina') },
      { id: 'ha-5', name: 'Desenvolvimento máquina leve', muscleGroup: 'Ombros', sets: 3, reps: '10-12', rest: 90, notes: 'Foco em ombro anterior, sem forçar articulação', image: getExerciseGifUrl('Desenvolvimento máquina leve') },
      { id: 'ha-6', name: 'Elevação lateral halteres', muscleGroup: 'Ombros', sets: 5, reps: '12-15', rest: 60, notes: 'Plano escapular (braços levemente à frente), tronco firme', image: getExerciseGifUrl('Elevação lateral halteres') },
      { id: 'ha-7', name: 'Elevação lateral no cabo', muscleGroup: 'Ombros', sets: 3, reps: '15', rest: 60, notes: 'Tensão constante na polia, movimento controlado', image: getExerciseGifUrl('Elevação lateral no cabo') },
      { id: 'ha-8', name: 'Tríceps corda', muscleGroup: 'Tríceps', sets: 4, reps: '10-12', rest: 60, notes: 'Extensão máxima abrindo as pontas da corda no final', image: getExerciseGifUrl('Tríceps corda') },
      { id: 'ha-9', name: 'Tríceps francês unilateral', muscleGroup: 'Tríceps', sets: 3, reps: '12', rest: 60, notes: 'Foco na cabeça longa do tríceps, cotovelo apontado reto para cima', image: getExerciseGifUrl('Tríceps francês unilateral') },
      { id: 'ha-10', name: 'Abdômen supra', muscleGroup: 'Abdômen', sets: 3, reps: '20', rest: 60, notes: 'Esmagar o abdômen sem puxar o pescoço', image: getExerciseGifUrl('Abdômen supra') }
    ]
  },
  {
    id: 'h-b',
    title: 'TREINO B — COSTAS + TRAPÉZIO',
    description: 'NÃO é só subir peso. Faça: ✅ contração máxima no topo ✅ 1 segundo segurando ✅ descida controlada ✅ sem girar ombro Trapézio responde MUITO bem a: * volume alto * controle * frequência',
    color: 'purple',
    exercises: [
      { id: 'hb-1', name: 'Puxada alta aberta', muscleGroup: 'Costas', sets: 4, reps: '8-12', rest: 90, notes: 'Foco em asas e latíssimo, puxar com cotovelo', image: getExerciseGifUrl('Puxada alta aberta') },
      { id: 'hb-2', name: 'Pull down unilateral', muscleGroup: 'Costas', sets: 3, reps: '12', rest: 60, notes: 'Sentir esticar o latíssimo por completo', image: getExerciseGifUrl('Pull down unilateral') },
      { id: 'hb-3', name: 'Remada baixa neutra', muscleGroup: 'Costas', sets: 4, reps: '10-12', rest: 90, notes: 'Esmagar as costas no pico, sem jogar tronco atrás', image: getExerciseGifUrl('Remada baixa neutra') },
      { id: 'hb-4', name: 'Remada articulada peito apoiado', muscleGroup: 'Costas', sets: 3, reps: '10', rest: 90, notes: 'Trabalho focado sem sobrecarregar a lombar', image: getExerciseGifUrl('Remada articulada peito apoiado') },
      { id: 'hb-5', name: 'Face pull', muscleGroup: 'Ombros/Trapézio', sets: 4, reps: '15', rest: 60, notes: 'Foco em ombro posterior e manguito superior', image: getExerciseGifUrl('Face pull') },
      { id: 'hb-6', name: 'Encolhimento halteres', muscleGroup: 'Trapézio', sets: 5, reps: '12-15', rest: 60, notes: '✅ CONTRAÇÃO MÁXIMA NO TOPO (1s segurando) • descida controlada • SEM girar os ombros', image: getExerciseGifUrl('Encolhimento halteres') },
      { id: 'hb-7', name: 'Encolhimento barra guiada', muscleGroup: 'Trapézio', sets: 4, reps: '10-12', rest: 60, notes: '✅ CONTRAÇÃO MÁXIMA NO TOPO (1s segurando) • descida controlada • SEM girar os ombros', image: getExerciseGifUrl('Encolhimento barra guiada') },
      { id: 'hb-8', name: 'Rosca martelo', muscleGroup: 'Bíceps', sets: 3, reps: '12', rest: 60, notes: 'Pegada neutra para trabalhar braquial e braquiorradial', image: getExerciseGifUrl('Rosca martelo') },
      { id: 'hb-9', name: 'Rosca direta barra W', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', rest: 60, notes: 'Pegada anatômica para proteger punho e cotovelo', image: getExerciseGifUrl('Rosca direta barra W') }
    ]
  },
  {
    id: 'h-c',
    title: 'TREINO C — PERNAS',
    description: 'Pernas estéticas sem “pesar” cintura/quadril',
    color: 'emerald',
    exercises: [
      { id: 'hc-1', name: 'Agachamento Smith', muscleGroup: 'Pernas', sets: 4, reps: '8-10', rest: 90, notes: 'Posicionamento seguro dos pés, coluna ereta', image: getExerciseGifUrl('Agachamento Smith') },
      { id: 'hc-2', name: 'Leg press', muscleGroup: 'Pernas', sets: 4, reps: '10-12', rest: 90, notes: 'Amplitude máxima de movimento de forma segura', image: getExerciseGifUrl('Leg press') },
      { id: 'hc-3', name: 'Mesa flexora', muscleGroup: 'Posterior', sets: 4, reps: '10-12', rest: 60, notes: 'Controle absoluto da fase excêntrica da descida', image: getExerciseGifUrl('Mesa flexora') },
      { id: 'hc-4', name: 'Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '15', rest: 60, notes: 'Garantir contração máxima de 1s no pico da extensão', image: getExerciseGifUrl('Extensora') },
      { id: 'hc-5', name: 'Panturrilha em pé', muscleGroup: 'Panturrilha', sets: 5, reps: '15-20', rest: 45, notes: 'Alongamento máximo embaixo e contração total no topo', image: getExerciseGifUrl('Panturrilha em pé') },
      { id: 'hc-6', name: 'Panturrilha sentado', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', rest: 45, notes: 'Execução sem pressa, sentindo o músculo queimar', image: getExerciseGifUrl('Panturrilha sentado') },
      { id: 'hc-7', name: 'Elevação de pernas', muscleGroup: 'Abdômen', sets: 4, reps: '15', rest: 60, notes: 'Foco em abdômen infra e controle de descida', image: getExerciseGifUrl('Elevação de pernas') },
      { id: 'hc-8', name: 'Prancha', muscleGroup: 'CORE', sets: 3, reps: '60s', rest: 60, notes: 'Alinhamento espinhal perfeito e contração absoluta de abdômen e glúteos', image: getExerciseGifUrl('Prancha') },
      { id: 'hc-9', name: 'Vacuum abdominal', muscleGroup: 'Estômago', sets: 3, reps: '30-40s', rest: 60, notes: 'Soltar todo o ar dos pulmões e sugar o abdômen ao máximo para dentro', image: getExerciseGifUrl('Vacuum abdominal') }
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
