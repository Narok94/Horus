
/**
 * Utilitários para manipulação de dados de exercícios
 */

/**
 * Normaliza o nome do exercício para ser usado em URLs e IDs
 */
export const normalizeExerciseName = (name: string): string => {
  if (!name) return '';
  
  // Mapeamento manual para casos específicos conhecidos
  const manualMap: Record<string, string> = {
    'Agachamento Livre': 'agachamento-livre',
    'Agachamento no Smith': 'agachamento-smith',
    'Leg Press 45': 'leg-press-45',
    'Extensora': 'cadeira-extensora',
    'Flexora': 'cadeira-flexora',
    'Supino Reto': 'supino-reto',
    'Supino Inclinado': 'supino-inclinado',
    'Puxada Aberta': 'puxada-frente',
    'Puxada Frente Aberta': 'puxada-frente',
    'Remada Curvada': 'remada-curvada',
    'Desenvolvimento': 'desenvolvimento-ombros',
    'Elevação Lateral': 'elevacao-lateral',
    'Rosca Direta': 'rosca-direta',
    'Tríceps Corda': 'triceps-corda',
    'Tríceps Pulley (Corda)': 'triceps-corda',
    'Tríceps Pulley (Barra)': 'triceps-barra',
    'Tríceps Testa': 'triceps-testa',
    'Panturrilha em Pé': 'panturrilha-pe',
    'Panturrilha Sentado': 'panturrilha-sentado',
    'Abdominal Supra': 'abdominal-supra',
    'Prancha': 'prancha-abdominal',
    'Remada Unilateral (Serrote)': 'remada-unilateral',
    'Remada Unilateral': 'remada-unilateral',
    'Crossover Polia Alta': 'crossover-polia-alta',
    'Dips (Paralelas)': 'dips',
    'Peck Deck (Voador)': 'peck-deck',
    'Peck Deck': 'peck-deck',
    'Agachamento Sumô': 'agachamento-sumo-com-halteres',
    'Agachamento Hack': 'agachamento-hack-machine',
    'Hack Machine': 'agachamento-hack-machine',
    'Sissy Squat': 'agachamento-sissy',
    'Afundo com Halteres': 'afundo-com-halteres',
    'Agachamento Búlgaro': 'agachamento-bulgaro',
    'Supino Reto Barra': 'supino-reto-com-barra',
    'Supino Inclinado Barra': 'supino-inclinado-com-barra',
    'Supino Reto Halteres': 'supino-reto-com-halteres',
    'Supino Inclinado Halteres': 'supino-inclinado-com-halteres',
    'Supino Máquina': 'supino-na-maquina',
    'Crucifixo Máquina': 'crucifixo-na-maquina',
    'Crucifixo Banco Halteres': 'crucifixo-com-halteres',
    'Flexão de Braços': 'flexão-de-braços',
    'Puxada Triângulo': 'puxada-frente-com-triângulo',
    'Puxada Supinada': 'puxada-frente-com-pegada-supinada',
    'Remada Baixa': 'remada-baixa-com-triângulo',
    'Remada Articulada': 'remada-na-maquina',
    'Pulldown Corda': 'pulldown-na-polia-com-corda',
    'Barra Fixa': 'barra-fixa',
    'Levantamento Terra': 'levantamento-terra-com-barra',
    'Desenvolvimento Halteres': 'desenvolvimento-de-ombros-com-halteres',
    'Desenvolvimento Máquina': 'desenvolvimento-de-ombros-na-maquina',
    'Elevação Frontal': 'elevação-frontal-com-halteres',
    'Crucifixo Inverso': 'crucifixo-inverso-com-halteres',
    'Remada Alta': 'remada-alta-na-polia',
    'Encolhimento': 'encolhimento-com-halteres',
    'Rosca Direta Barra': 'rosca-direta-com-barra',
    'Rosca Alternada': 'rosca-alternada-com-halteres',
    'Rosca Martelo': 'rosca-martelo-com-halteres',
    'Rosca Scott': 'rosca-scott-com-barra-w',
    'Rosca Concentrada': 'rosca-concentrada-com-halteres',
    'Rosca Direta Polia': 'rosca-direta-na-polia',
    'Tríceps Francês': 'triceps-frances-com-haltere',
    'Tríceps Coice': 'triceps-coice-com-haltere',
    'Mesa Flexora': 'mesa-flexora',
    'Stiff Barra': 'stiff-com-barra',
    'Flexora em Pé': 'flexora-vertical',
    'Abdução de Quadril com Cabo': 'abdução-de-quadril-com-cabo',
    'Abdução de Quadril com Ponte': 'abdução-de-quadril-com-ponte',
    'Glúteo Máquina': 'gluteo-na-maquina',
    'Abdominal Infra': 'abdominal-infra',
    'Abdominal Bicicleta': 'abdominal-bicicleta',
    'Abdominal Máquina': 'abdominal-maquina',
    'Alongamento de Peitoral': 'alongamento-dinâmico-do-peitoral',
    'Alongamento de Quadríceps': 'alongamento-de-quadríceps-ajoelhado',
    'Alongamento de Posterior': 'alongamento-de-isquiotibiais-em-pé',
    'Alongamento de Glúteos': 'alongamento-de-glúteos-deitado',
    'Alongamento de Ombros': 'alongamento-de-ombro-com-o-braço-cruzado',
    'Abdução Solo Pilates': 'abducao-solo-pilates',
    'Gluteo Máquina Coice': 'gluteo-maquina-coice',
    'Glúteo Cabo (Coice)': 'gluteo-no-cabo-coice',
    'Elevação Pélvica': 'elevação-pélvica-com-barra',
    'Cadeira Abdutora': 'abduçao-de-quadril-em-pé',
    'Cadeira Adutora': 'adução-na-polia',
    'Pulley anterior aberta': 'puxada-frente',
    'Remada articulada neutra': 'remada-na-maquina',
    'Crucifixo inverso máquina pronada': 'crucifixo-inverso-na-maquina',
    'Remada baixa peg. neutra': 'remada-baixa-com-triângulo',
    'Rosca martelo no cross corda': 'rosca-martelo-na-polia',
    'Rosca direta barra reta': 'rosca-direta-com-barra',
    'Supino inclinado iso articulado deitado (shua)': 'supino-inclinado-na-maquina',
    'Elevação lateral c/ halter 0º-180º neutra': 'elevacao-lateral',
    'Elevação frontal no cross': 'elevação-frontal-na-polia',
    'Tríceps no cross barra reta': 'triceps-barra',
    'Tríceps no cross corda': 'triceps-corda',
    'Banco abdutor': 'cadeira-abdutora',
    'Banco extensor': 'cadeira-extensora',
    'Banco sóleo': 'panturrilha-sentado',
    'Extensão lombar no banco romano': 'extensão-lombar-no-banco-romano',
    'Pingus (Abdomen Infra)': 'pingus',
    'Frog (Pilates)': 'frog',
    'Abdomen Infra': 'abdominal-infra',
    'Abdomen Reto': 'abdominal-supra',
    'Elevação Lateral Halteres': 'elevacao-lateral',
    'Remada Alta Kettlebell': 'remada-alta',
    'Canoa Estática': 'canoa-estatica',
    'Remada Baixa Máquina': 'remada-baixa',
    'Rosca Direta Pulley': 'rosca-direta-na-polia',
    'Peck Deck Invertido': 'peck-deck-invertido',
    'Abdomen Infra (Pingus)': 'pingus',
    'Agachamento Livre Banco': 'agachamento-livre',
    'Abdomen Reto Pilates': 'abdominal-supra',
    'Elevação Frontal Halteres': 'elevação-frontal-com-halteres',
    'Extensão Lombar Livre': 'extensão-lombar',
    'Abdução Solo Pilates (Leg circles)': 'abducao-solo-pilates',
    'Elevação Pélvica Livre': 'elevação-pélvica-com-barra',
    'Remada Baixa Aberta': 'remada-baixa',
    'Rosca Direta Pulley Corda': 'rosca-direta-na-polia',
    'Serrote Halteres': 'remada-unilateral',
    'Elevação conjunta': 'elevacao-lateral',
    'Crucifixo': 'crucifixo-com-halteres',
    'Desenvolvimento Arnold': 'desenvolvimento-arnold',
    'Tríceps na caixa ou nas argolas': 'triceps-banco',
    'Supino alternado': 'supino-reto-com-halteres',
    'Flexão': 'flexão-de-braços',
    'Elevação de perna extendida': 'abdominal-infra',
    'Hip Thrust - elevação pélvica': 'elevação-pélvica-com-barra',
    'Clamshell - ostra': 'abducao-solo-pilates',
    'Deadlift': 'levantamento-terra-com-barra',
    'Stiff': 'stiff-com-barra',
    'Remada alternada': 'remada-unilateral',
    'Stiff unilateral': 'stiff-unilateral-com-halteres',
    'Sumô': 'agachamento-sumo-com-halteres',
    'Flexão de joelho em pé': 'flexora-vertical',
    'Flexão de joelho na MB': 'flexora-na-bola',
    'Wall sit': 'agachamento-isometrico',
    'Back Squat': 'agachamento-livre-com-barra',
  };

  if (manualMap[name]) return manualMap[name];

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/\s+/g, "-")           // Espaços para hífens
    .replace(/[^a-z0-9-]/g, "")     // Remove caracteres especiais
    .replace(/-+/g, "-")            // Remove hífens duplos
    .replace(/^-|-$/g, "");         // Remove hífens no início/fim
};

/**
 * Gera variações de URLs para tentar carregar o GIF/Vídeo do exercício
 */
export const getExerciseGifUrlVariations = (exerciseName: string, originalUrl?: string): string[] => {
  const urls: string[] = [];
  
  // 1. Prioridade máxima: URL original se fornecida
  if (originalUrl) {
    urls.push(originalUrl);
  }

  const normalized = normalizeExerciseName(exerciseName);
  if (!normalized) return urls.length > 0 ? urls : ['https://picsum.photos/seed/gym/400/300'];

  // 2. Variações de base para o repositório de assets
  const baseVariations = [
    normalized,
    normalized.replace(/-/g, '_'),
    normalized.replace(/-/g, ''),
    normalized.split('-')[0] // Apenas a primeira palavra (ex: 'agachamento')
  ];

  const uniqueVariations = Array.from(new Set(baseVariations)).slice(0, 3);
  
  // 3. Extensões e pastas mais comuns
  const extensions = ['.gif', '.mp4', '.webp'];
  const folders = ['', 'assets/', 'gifs/'];
  
  // Construímos uma lista pequena e eficiente (máximo ~20 URLs)
  uniqueVariations.forEach(v => {
    const encoded = encodeURIComponent(v);
    folders.forEach(folder => {
      extensions.forEach(ext => {
        const filename = `${encoded}${ext}`;
        // GitHub Raw (Prioridade para arquivos diretos)
        urls.push(`https://raw.githubusercontent.com/Narok94/tatu-gym-assets/main/${folder}${filename}`);
      });
    });
  });

  // 4. Fallback final: jsDelivr de uma variação segura
  urls.push(`https://cdn.jsdelivr.net/gh/Narok94/tatu-gym-assets@main/assets/${encodeURIComponent(normalized)}.gif`);
  
  // Remove duplicatas e limita para não demorar demais
  return Array.from(new Set(urls)).slice(0, 12);
};

/**
 * Alias para getExerciseGifUrlVariations para compatibilidade com código antigo
 */
/**
 * Lista de nomes de arquivos GIF do Horus para correspondência precisa
 */
export const HORUS_EXERCISE_GIFS = [
  "abdominal-invertido",
  "abducao-de-quadril-em-pe",
  "abracos-nos-joelhos-em-pe",
  "aducao-do-quadril-com-cabo",
  "aducao-do-quadril-lateral-com-alavanca",
  "afundo-com-barra",
  "afundo-com-landmine",
  "afundo-lateral-com-barra",
  "afundo-livre",
  "afundo-no-banco-com-halteres",
  "agachamento-bulgaro",
  "agachamento-com-barra-e-salto",
  "agachamento-com-barra-no-chao-seguido-de-levantamento-militar",
  "agachamento-com-barra-sobre-a-cabeca",
  "agachamento-com-salto-ajoelhado",
  "agachamento-com-salto-usando-barra-hexagonal",
  "agachamento-com-salto",
  "agachamento-com-sustentacao-e-elevacao-de-panturrilhas",
  "agachamento-dividido-profundo",
  "agachamento-em-plie-com-halteres",
  "agachamento-goblet-com-kettlebell-e-faixa-elastica",
  "agachamento-na-maquina",
  "agachamento-na-parede-com-bola-de-exercicio",
  "agachamento-no-banco-com-peso-corporal",
  "agachamento-pistola-com-apoio-em-caixa",
  "agachamento-pistola-na-caixa",
  "agachamento-skater",
  "agachamento-sumo-sem-pesos",
  "agachamento-unilateral-cruzado",
  "alongamento-1",
  "alongamento-2",
  "alongamento-3",
  "alongamento-4",
  "alongamento-5",
  "alongamento-6",
  "alongamento-7",
  "alongamento-8",
  "alongamento-9",
  "alongamento-10",
  "alongamento-11",
  "alongamento-12",
  "alongamento-13",
  "alongamento-assistido-reverso-peitoral-e-ombro",
  "alongamento-borboleta",
  "alongamento-com-pvc-na-posicao-frontal-de-rack",
  "alongamento-da-esfinge",
  "alongamento-da-panturrilha-agachado",
  "alongamento-da-panturrilha-com-descida-do-calcanhar",
  "alongamento-da-parte-superior-das-costas",
  "alongamento-das-costas-com-rolo-de-espuma",
  "alongamento-de-adutores-com-pernas-afastadas-em-pe",
  "alongamento-de-gluteos-deitado",
  "alongamento-de-isquiotibiais-deitado",
  "alongamento-de-isquiotibiais-em-pe",
  "alongamento-de-ombro-com-o-braco-cruzado",
  "alongamento-de-ombro-reverso-em-pe",
  "alongamento-de-panturrilha-com-corda",
  "alongamento-de-panturrilha-com-uma-perna-esticada",
  "alongamento-de-panturrilha-com-uma-perna",
  "alongamento-de-panturrilha-em-passo-largo",
  "alongamento-de-panturrilha-na-parede",
  "alongamento-de-rotacao-da-coluna-em-pe",
  "alongamento-do-peito-e-parte-frontal-dos-ombros",
  "alongamento-do-piriforme-sentado",
  "alongamento-dos-adutores-com-a-perna-estendida-ajoelhado",
  "alongamento-dos-adutores-com-pernas-abertas-em-pe",
  "alongamento-dos-adutores-da-coxa-com-rolo-de-espuma",
  "alongamento-dos-adutores-em-posicao-sentada-com-pernas-abertas",
  "alongamento-dos-adutores-sentado",
  "alongamento-dos-extensores-dos-dedos-dos-pes",
  "alongamento-dos-flexores-de-quadril-ajoelhado",
  "alongamento-dos-flexores-do-quadril-em-posicao-de-joelho",
  "alongamento-dos-flexores-dos-dedos-dos-pes-em-pe",
  "alongamento-dos-isquiotibiais-em-pe-com-a-perna-cruzada",
  "alongamento-dos-isquiotibiais-em-pe",
  "alongamento-dos-isquiotibiais-sentado",
  "alongamento-dos-ombros-por-tras-das-costas",
  "alongamento-em-pe-dos-quadriceps",
  "alongamento-inclinado-lateral-em-pe",
  "alongamento-lateral-da-parte-interna-da-coxa",
  "alongamento-piriforme",
  "alongamento-reverso-assistido-peito-e-ombro",
  "alongamento-sentado-para-a-panturrilha-com-perna-esticada",
  "andar-de-bicicleta-ao-ar-livre",
  "antebraco-apoiado-no-banco",
  "antebraco-barra-costas",
  "antebraco-barra-frente",
  "antebraco-com-anilhas",
  "antebraco-movimento-enrrolar",
  "apoio-de-frente-pegada-fechada-parede",
  "arnold-dips-maschine",
  "arranco-com-kettlebell-de-um-braco",
  "arranque-e-arremesso-com-kettlebell",
  "arremesso-com-barra",
  "arremesso-de-bola-de-reacao",
  "arremesso-de-medicina-bola-com-levantamento-de-tronco",
  "avanco-com-joelho-alto-em-cima-da-bola-bosu",
  "avanco-com-joelho-elevado-em-caminhada",
  "avanco-sem-peso-corporal",
  "balanco-com-gymstick",
  "balloon-drill",
  "bandeira-humana",
  "barra-fixa",
  "barra-fixa-1",
  "barra-fixa-2",
  "barra-fixa-3",
  "barra-fixa-4",
  "barra-fixa-5",
  "barra-fixa-6",
  "barra-fixa-7",
  "barra-fixa-8",
  "barra-fixa-assistida",
  "barra-fixa-com-peso",
  "barra-fixa-unilateral-assistida",
  "barra-livre-pegada-aberta-joelhos-flexionados",
  "barra-livre-pegada-aberta",
  "bicicleta-ergometrica-reclinada",
  "bola-medicinal-lancada-para-cima-e-para-baixo",
  "bola-na-parede",
  "bom-dia-com-faixa-elastica-de-resistencia",
  "boxe-jab",
  "boxe-sombra",
  "cadeira-abdutora-em-pe",
  "caminhada-na-parada-de-mao",
  "caminhada-na-parede",
  "cardio-de-passos-de-boxeador",
  "carregamento-zercher",
  "copia-de-abdominal-de-ra-com-bola-de-exercicios",
  "corrida-com-elevacao-dos-joelhos",
  "corrida-com-salto",
  "corrida-latera",
  "corrida-para-tras",
  "crucifixo-invertido-com-gymstick-para-deltoides-posterior",
  "crucifixo-suspenso",
  "crunch-declinado",
  "cruz-de-ferro-com-halteres",
  "cruzado-de-direita",
  "desenvolvimento-de-ombro-com-kettlebell",
  "desvia-radial",
  "dumbbell-devil-press",
  "dumbbell-power-clean",
  "elevacao-de-joelhos-suspenso",
  "elevacao-de-panturrilha-em-pe-unilateral",
  "elevacao-de-panturrilha-em-uma-perna",
  "elevacao-de-panturrilha-na-plataforma",
  "elevacao-de-perna-unica-com-equilibrio-e-rosca-de-biceps",
  "elevacao-de-pernas-deitado-de-lado",
  "elevacao-de-pernas-estilo-sapo",
  "elevacao-de-quadril-com-banda-de-resistencia-de-joelhos",
  "elevacao-de-quadril-com-pes-no-banco",
  "elevacao-de-quadril-com-peso-corporal",
  "elevacao-frontal-lateral-com-elastico",
  "elevacao-lateral-de-bracos",
  "elevacao-lateral-de-perna-com-faixa-elastica-deitado-de-lado",
  "elevacao-lateral-de-perna-com-faixa-elastica",
  "elevacao-pelvica",
  "elevacao-pelvica-com-banda-de-resistencia",
  "elevacao-pelvica-com-barra",
  "elevacao-pelvica-com-halter",
  "elevacao-pelvica-declinado",
  "elevacao-pelvica-livre",
  "encolhimento-em-paralelas",
  "enge-klimmzuege-obergriff",
  "escalador-de-montanha",
  "esquiador-com-gymstick",
  "exercicio-pliometrico-x",
  "exercicios-das-5-marcas",
  "exercicios-de-escada-de-agilidade-lateral",
  "exercicios-de-escada-de-agilidade",
  "extensao-de-gluteo-em-pe",
  "extensao-de-ombro-com-faixa",
  "extensao-de-perna-em-pe-com-faixa-de-resistencia",
  "extensao-de-perna-reta",
  "extensao-de-pernas-com-faixa-elastica-sentado",
  "extensao-de-pernas-sentado-com-faixa-de-resistencia",
  "extensao-de-quadril-em-pe-com-joelhos-flexionados",
  "extensao-de-quadril-em-pe-na-polia",
  "extensao-de-quadril-em-pe",
  "extensao-de-triceps-com-barra-w-inclinada",
  "extensao-de-triceps-com-cabo-ajoelhado",
  "extensao-de-triceps-com-cabo-em-posicao-ajoelhada",
  "extensao-de-triceps-com-cabo-inclinado",
  "extensao-de-triceps-com-haltere-em-pronacao-com-um-braco",
  "extensao-de-triceps-com-haltere-unilateral-sentado",
  "extensao-de-triceps-com-pegada-invertida",
  "extensao-de-triceps-com-um-braco",
  "extensao-de-triceps-com-uma-mao-no-pulley-alto-sobre-a-cabeca",
  "extensao-de-triceps-deitado-com-barra-w-pegada-fechada-atras-da-cabeca",
  "extensao-de-triceps-deitado-com-corda",
  "extensao-de-triceps-invertida-com-unilateral",
  "extensao-de-triceps-lateral-com-cabo",
  "extensao-de-triceps-na-maquina-pegada-neutra",
  "extensao-de-triceps-na-maquina",
  "extensao-de-triceps-na-parede",
  "extensao-de-triceps-no-cabo-alto",
  "extensao-de-triceps-no-cabo-deitado",
  "extensao-de-triceps-testa-declinado-fechado",
  "fitness-gifs-4-u",
  "flexao",
  "flexao-1",
  "flexao-arqueiro",
  "flexao-com-kettlebell-profunda",
  "flexao-com-parada-de-maos",
  "flexao-de-apoio-com-elevacao-de-braco",
  "flexao-de-braco",
  "flexao-de-braco-1",
  "flexao-de-braco-with-bola-de-estabilidade",
  "flexao-de-braco-com-bola-de-estabilidade",
  "flexao-de-braco-com-bola-medicinal-em-um-braco",
  "flexao-de-braco-com-bola-medicinal",
  "flexao-de-bracos",
  "flexao-de-joelhos",
  "flexao-de-joelhos-1",
  "flexao-de-parede",
  "flexao-de-pernas-com-faixa-elastica",
  "flexao-de-pernas-com-toalha",
  "flexao-de-pernas-deitado-com-faixa-elastica",
  "flexao-de-pernas-na-bola-de-estabilidade",
  "flexao-de-punho-com-cabo-em-um-braco-no-chao",
  "flexao-de-punho-com-halteres1",
  "flexao-de-punho-reversa-com-anilha",
  "flexao-de-punho-reversa-com-barra-sobre-um-banco",
  "flexao-declinada",
  "flexao-hindu-modificada",
  "flexao-inclinada",
  "flexao-pike-elevada",
  "flexao-pike-pes-elevados",
  "flexao-pike",
  "flexao-suspensa",
  "flexao-unilateral-na-bola-medicinal",
  "gancho-de-direita",
  "gluteo-coice-com-gymstick",
  "gluteo-coice-com-pernas-flexionada-com-faixa",
  "gluteo-coice-em-pe-com-faixa-elastica",
  "gluteos-coice-com-faixa-elastica",
  "hiperextensao-de-punho-com-barra",
  "hiperextensao-do-tronco",
  "hiperextensao-reversa-com-faixa-de-resistencia",
  "impulso-com-barra",
  "inclinacao-pelvica",
  "joelho-alternado-no-peito",
  "joelhos-altos-contra-a-parede",
  "kettlebell-em-forma-de-oito",
  "kick-back",
  "lancamento-de-bola-medicinal-deitado",
  "lancamento-de-bola-medicinal",
  "leg-press-alternado-deitado-com-gymstick",
  "leg-press-pes-afastados",
  "leg-press",
  "levantamento-lateral-de-perna-em-quatro-apoios",
  "levantamento-terra-com-barra",
  "levantamento-terra-romeno",
  "levantamento-terra",
  "levantamento-terrra-com-halteres-frente",
  "maquina-de-flexao-de-triceps",
  "maquina-de-remo",
  "medicine-ball-rotational-throw",
  "mergulho-de-triceps-com-alavanca",
  "mergulho-em-bancos",
  "mergulho-reverso",
  "mergulhos-assistidos-para-triceps",
  "mesa-flex",
  "muscle-up",
  "nave-seal-burpee",
  "panturrilha-com-halteres",
  "panturrilha-maquina",
  "panturrilha-no-leg-press-45",
  "panturrilha-sentado",
  "paralelas-na-barra",
  "passada-a-frente-com-halteres",
  "passagem-de-bola-medicinal-de-peito-em-pe",
  "passo-de-esqui",
  "passo-invertido-com-elevacao-do-joelho",
  "pendulo-de-ombro",
  "ponte-de-gluteos-com-pes-elevados",
  "ponte-em-unilateral",
  "prancha",
  "protracao-e-retracao-da-escapula",
  "pular-corda",
  "pull-over-com-barra",
  "pull-over-na-polia-com-corda",
  "pull-up",
  "pulldown-com-corda",
  "pulldown-inclinado-com-corda",
  "pulldown-unilateral-no-cabo",
  "pulley-costa-maquina",
  "pulley-costa-unilateral",
  "pulley-frente-pegada-supinada",
  "pulley-pegada-aberta-atras-da-nuca",
  "pulley-pegada-aberta-pronada",
  "pullover-com-barra-no-banco-declinado",
  "pullover-com-barra-w-pegada-invertida",
  "pullover-com-barra",
  "pullover-com-cabo-sentado",
  "pullover-com-cabo",
  "pullover-na-maquina-de-alavanca",
  "pulo-de-impulso-de-quadril-de-uma-perna",
  "pulos-com-abertura-de-pernas",
  "puxada-alta-com-alavanca",
  "puxada-alta-com-triangulo",
  "puxada-alta-com-um-joelho-apoiado",
  "puxada-com-halteres-entre-as-pernas",
  "puxada-isometrica",
  "puxador-costas-por-tras-maquina",
  "remada-aberta-no-banco-inclinado-com-halteres",
  "remada-baixa-no-pulley-pegada-aberta-supinada",
  "remada-baixa-unilateral-pegada-neutra",
  "remada-cavalinho-unilateral",
  "remada-cavalino-com-barra",
  "remada-inclinada-com-pegada-reversa-com-halteres",
  "remada-inclinada-no-banco-com-cabo",
  "remada-inclinda-no-banco-pegada-supinda-puxada-fechada",
  "remada-invertida-na-mesa",
  "remada-invertida",
  "remada-maquina-pronada",
  "remada-renegada-com-halteres",
  "remada-sentada-com-anilhas",
  "remada-sentada-com-cabo",
  "remada-sentada-com-corda-na-polia",
  "remada-sentada-na-maquina",
  "remada-sentado-com-cabo-pegada-fechada",
  "remada-t-com-alavanca",
  "remada-t-com-landmine",
  "remada-t-invertida-com-alavanca",
  "remada-unilateral-com-barra-landmine",
  "remada-unilateral-com-barra",
  "remada-unilateral-com-cabo",
  "rosca-biceps-com-faixa-elastica",
  "rosca-concentrada-com-perna",
  "rosca-de-punho-com-barra",
  "rotacao-do-corpo-superior-deitado",
  "rotacao-espinhal-deitado",
  "rotacao-externa-com-cabo-a-90-graus",
  "rotacao-externa-de-ombro-com-faixa-elastica",
  "rotacao-externa-de-quadril-com-faixa-elastica",
  "rotacao-externa-de-quadril-sentado-com-faixa-elastica",
  "rotacao-externa-do-ombro-deitado-com-haltere",
  "rotacao-externa-do-ombro",
  "rotacao-externa-do-pe-com-faixa-elastica",
  "rotacao-interna-de-cabo-a-90-graus",
  "rotacao-interna-de-ombro-com-cabo",
  "rotacao-interna-do-ombro-sentada-com-cabo",
  "rotacao-interna-do-ombro",
  "rotacao-interna-do-quadril-sentado-com-faixa-elastica",
  "rotacao-para-tras-de-joelhos",
  "salto-com-joelhos-flexionados",
  "salto-em-caixa-com-uma-perna",
  "salto-em-distancia",
  "salto-na-caixa-para-agachamento-pistola",
  "salto-na-caixa",
  "salto-para-caixa-2-para-1",
  "saltos-de-afastamento",
  "saltos-em-tesoura",
  "saltos-potentes",
  "seitlicher-ausfallschritt-mit-langhantel",
  "soco-direto-de-direita",
  "stiff-com-halteres",
  "stiff-no-smth-unilateral",
  "stiff-unilateral",
  "supino-declinado-no-smit",
  "supino-em-pe-com-faixa-elastica",
  "suspensao-passiva",
  "swing-360",
  "tesoura-de-bracos",
  "toque-lateral-dos-dedos-dos-pes-em-pe",
  "toque-nos-dedos-dos-pes-em-pe",
  "toque-nos-dedos-dos-pes-sentado",
  "toques-de-dedos-em-pe",
  "torcao-obliqua-sentada",
  "torcoes-do-cotovelo-para-o-joelho",
  "tracao-lateral-com-elastico",
  "triceps-apoaiado-na-pareda",
  "triceps-com-halteres-no-banco-reto",
  "triceps-extencao-de-cotovelo-unilateral",
  "triceps-frances-barra-w",
  "triceps-frances-bilateral-no-cross",
  "triceps-frances-com-faixa-elastica-acima-da-cabeca",
  "triceps-frances-com-halter-bilateral",
  "triceps-frances-em-pe-com-gymstick",
  "triceps-frances-unilateral-no-corss",
  "triceps-inclinado-no-cross-bilateral",
  "triceps-no-aparelho-scort",
  "triceps-paralelo-no-banco",
  "triceps-patada-blateral-com-halteres",
  "triceps-patada-unilateral-com-halteres",
  "triceps-pegada-pronada-uniatres-no-cross",
  "triceps-testa-com-faixa-elastica",
  "triceps-testa-pegada-neutra-deitado-no-banco",
  "triceps",
  "v-up-com-bola-de-estabilidade",
  "wall-sit-com-inclinacao-de-tronco",
  "wall-sit"
];

export const getExerciseGifUrl = (exerciseName: string, originalUrl?: string): string => {
  return getHorusGifUrl(exerciseName);
};

/**
 * Retorna o caminho relativo estrito do GIF seguindo as diretrizes de mapeamento kebab-case
 */
export const getHorusGifUrl = (name: string): string => {
  if (!name) return '';

  // Dicionário de sinônimos/atalhos manuais para garantir que os nomes usados no banco encontrem o GIF exato
  const synonyms: Record<string, string> = {
    'pingus': 'abdominal-invertido',
    'frog': 'v-up-com-bola-de-estabilidade',
    'one hundred': 'abdominal-invertido',
    'single leg stretch': 'alongamento-de-isquiotibiais-deitado',
    'double leg stretch': 'alongamento-de-isquiotibiais-deitado',
    'elevacao pelvica solo': 'elevacao-pelvica-com-barra',
    'agachamento livre banco': 'agachamento-no-banco-com-peso-corporal',
    'agachamento livre': 'agachamento-no-banco-com-peso-corporal',
    'cadeira adutora': 'aducao-do-quadril-com-cabo',
    'afundo': 'afundo-livre',
    'cadeira extensora': 'extensao-de-pernas-com-faixa-elastica-sentado',
    'extensora': 'extensao-de-pernas-com-faixa-elastica-sentado',
    'panturrilha em pe': 'elevacao-de-panturrilha-em-pe-unilateral',
    'abdomen reto': 'abdominal-invertido',
    'elevacao lateral halteres': 'elevacao-lateral-de-bracos',
    'elevacao lateral': 'elevacao-lateral-de-bracos',
    'supino maquina': 'supino-declinado-no-smit',
    'desenvolvimento maquina': 'desenvolvimento-de-ombro-com-kettlebell',
    'desenvolvimento': 'desenvolvimento-de-ombro-com-kettlebell',
    'peck deck': 'crucifixo-suspenso',
    'remada alta kettlebell': 'puxada-alta-com-alavanca',
    'abducao solo pilates': 'elevacao-lateral-de-perna-com-faixa-elastica-deitado-de-lado',
    'stiff barra': 'stiff-com-halteres',
    'stiff': 'stiff-com-halteres',
    'gluteo maquina coice': 'gluteos-coice-com-faixa-elastica',
    'cadeira flexora': 'mesa-flex',
    'flexora': 'mesa-flex',
    'elevacao pelvica': 'elevacao-pelvica',
    'canoa estatica': 'prancha',
    'puxada supinada': 'pulley-frente-pegada-supinada',
    'triceps pulley barra w': 'triceps',
    'triceps corda': 'extensao-de-triceps-deitado-com-corda',
    'remada baixa maquina': 'remada-sentada-na-maquina',
    'remada baixa': 'remada-sentada-na-maquina',
    'rosca direta pulley': 'rosca-biceps-com-faixa-elastica',
    'rosca direta': 'rosca-biceps-com-faixa-elastica',
    'peck deck invertido': 'crucifixo-invertido-com-gymstick-para-deltoides-posterior',
    'manguito rotador polia': 'rotacao-externa-com-cabo-a-90-graus',
    'supino inclinado maquina': 'supino-declinado-no-smit',
    'supino reto halteres pegada neutra': 'triceps-com-halteres-no-banco-reto',
    'crucifixo maquina': 'crucifixo-suspenso',
    'desenvolvimento de ombros': 'desenvolvimento-de-ombro-com-kettlebell',
    'elevacao lateral no cabo': 'elevacao-frontal-lateral-com-elastico',
    'triceps frances unilateral': 'triceps-frances-unilateral-no-corss',
    'abdomen supra': 'abdominal-invertido',
    'puxada alta aberta': 'pulley-pegada-aberta-pronada',
    'pull down unilateral': 'pulldown-unilateral-no-cabo',
    'remada baixa neutra': 'remada-sentado-com-cabo-pegada-fechada',
    'remada articulada peito apoiado': 'remada-sentada-na-maquina',
    'face pull': 'crucifixo-invertido-com-gymstick-para-deltoides-posterior',
    'encolhimento halteres': 'encolhimento-em-paralelas',
    'encolhimento barra guiada': 'encolhimento-em-paralelas',
    'rosca martelo': 'rosca-biceps-com-faixa-elastica',
    'rosca direta barra w': 'rosca-biceps-com-faixa-elastica',
    'agachamento smith': 'agachamento-na-maquina',
    'elevacao de pernas': 'elevacao-de-pernas-estilo-sapo',
    'vacuum abdominal': 'abdominal-invertido',
    'supino reto': 'triceps-com-halteres-no-banco-reto',
    'elevacao conjunta': 'elevacao-lateral-de-bracos',
    'triceps frances': 'triceps-frances-com-faixa-elastica-acima-da-cabeca',
    'crucifixo': 'crucifixo-suspenso',
    'desenvolvimento arnold': 'desenvolvimento-de-ombro-com-kettlebell',
    'triceps na caixa ou nas argolas': 'mergulho-em-bancos',
    'supino alternado': 'triceps-com-halteres-no-banco-reto',
    'flexao': 'flexao',
    'eleveção de perna extendida': 'elevacao-de-pernas-estilo-sapo',
    'hip thrust - elevação pélvica': 'elevacao-pelvica-com-barra',
    'clamshell - ostra': 'abducao-de-quadril-em-pe',
    'deadlift': 'levantamento-terra-com-barra',
    'remada alternada': 'remada-unilateral-com-barra',
    'stiff unilateral': 'stiff-unilateral',
    'sumo': 'agachamento-unilateral-cruzado',
    'flexao de joelho em pe': 'flexao-de-joelhos',
    'flexao de joelho na mb': 'flexao-de-pernas-na-bola-de-estabilidade',
    'wall sit': 'wall-sit'
  };

  const cleanName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-_]/g, "")
    .trim();

  // Se houver sinônimo manual exato
  if (synonyms[cleanName]) {
    return `https://raw.githubusercontent.com/Narok94/Horus/main/assets/Exercicios/${synonyms[cleanName]}.gif`;
  }

  // Tentar encontrar por palavra-chave se houver sinônimo de substring
  for (const key of Object.keys(synonyms)) {
    if (cleanName.includes(key)) {
      return `https://raw.githubusercontent.com/Narok94/Horus/main/assets/Exercicios/${synonyms[key]}.gif`;
    }
  }

  // Se não houver sinônimo, vamos calcular o overlap de palavras com a lista de GIFs oficiais
  const inputWords = cleanName.split(/[\s-_]+/).filter(w => w.length > 2);
  
  if (inputWords.length === 0) {
    // Normalização padrão como último recurso
    const fallbackNormalized = cleanName.replace(/[\s\._\-]+/g, "-");
    return `https://raw.githubusercontent.com/Narok94/Horus/main/assets/Exercicios/${fallbackNormalized}.gif`;
  }

  let bestGif = '';
  let highestScore = 0;

  for (const gif of HORUS_EXERCISE_GIFS) {
    let score = 0;
    const gifWords = gif.split('-');

    // 1 ponto por cada palavra do input contida no nome do gif
    for (const w of inputWords) {
      if (gifWords.includes(w)) {
        score += 2; // correspondência de palavra exata ganha mais peso
      } else if (gif.includes(w)) {
        score += 1; // correspondência parcial de substring
      }
    }

    // Bônus se começar com a mesma palavra
    if (inputWords[0] && gifWords[0] === inputWords[0]) {
      score += 1.5;
    }

    if (score > highestScore) {
      highestScore = score;
      bestGif = gif;
    }
  }

  // Se encontramos alguma correspondência razoável (score > 1)
  if (highestScore > 1 && bestGif) {
    return `https://raw.githubusercontent.com/Narok94/Horus/main/assets/Exercicios/${bestGif}.gif`;
  }

  // Último recurso: normalizar normal
  const finalNormalized = cleanName.replace(/[\s\._\-]+/g, "-");
  return `https://raw.githubusercontent.com/Narok94/Horus/main/assets/Exercicios/${finalNormalized}.gif`;
};

export interface DetailedExerciseInfo {
  gif: string;
  instructions: string;
  muscles: string;
  technique: string;
  correctExecution: string;
  tips: string[];
  intensity: string;
}

export const getExerciseDetails = (name: string, muscleGroup = 'Geral'): DetailedExerciseInfo => {
  const gif = getHorusGifUrl(name);
  const mLower = (muscleGroup || '').toLowerCase();
  const nLower = name.toLowerCase();

  // Determine standard templates based on muscles or names
  if (mLower.includes('peito') || mLower.includes('peitoral')) {
    return {
      gif,
      instructions: "Mantenha o peito aberto, retraia as escápulas e empurre com potência, controlando o retorno.",
      muscles: "Peitoral Maior, Deltoide Anterior, Cabeça Lateral do Tríceps",
      technique: "Estabilize os ombros contra o banco o tempo todo. Evite esticar os braços ao ponto de relaxar os peitorais.",
      correctExecution: "Desça de forma progressiva e lenta por 3 segundos até sentir as fibras do peitoral alongarem por completo, depois empurre com explosão muscular.",
      tips: [
        "Foque em aproximar os bíceps na subida para contração e esmagamento total das fibras.",
        "Não bata as cargas no topo para reter a tensão constante."
      ],
      intensity: "Sobrecarga Progressiva • RPE 9 (perto da falha)"
    };
  }

  if (mLower.includes('costas') || mLower.includes('dorsal') || mLower.includes('tração') || nLower.includes('puxada') || nLower.includes('remada') || nLower.includes('serrote')) {
    return {
      gif,
      instructions: "Inicie o movimento puxando com os cotovelos e contraia as escápulas ao final da puxada.",
      muscles: "Latíssimo do Dorso, Trapézio, Redondo Maior, Deltoide Posterior e Bíceps Braquial",
      technique: "Evite balançar os quadris ou inclinar o tronco excessivamente. O peito deve permanecer aberto e estufado.",
      correctExecution: "Alongue completamente os braços na subida sentindo esticar o dorsal, e puxe esmagando as costas no pico de contração máxima por 1s.",
      tips: [
        "Imagine as suas mãos apenas como ganchos e puxe diretamente direcionando a força pelos cotovelos.",
        "Mantenha os ombros abaixados para evitar tensão desnecessária no trapézio superior."
      ],
      intensity: "Volume de Alto Estresse • RPE 8.5 (Foco em esforço excêntrico e contração prolongada)"
    };
  }

  if (mLower.includes('pernas') || mLower.includes('quadríceps') || mLower.includes('quadriceps') || mLower.includes('posterior') || mLower.includes('glúteo') || mLower.includes('gluteo') || mLower.includes('panturrilha') || nLower.includes('agachamento') || nLower.includes('leg press') || nLower.includes('stiff')) {
    return {
      gif,
      instructions: "Mantenha o calcanhar apoiado com firmeza e desça direcionando os joelhos para fora na linha dos pés.",
      muscles: "Quadríceps Femoral, Glúteo Máximo, Isquiotibiais, Eretores da Espinha",
      technique: "Mantenha o abdômen contraído o tempo inteiro para dar suporte à coluna lombar. Evite retroversão pélvica.",
      correctExecution: "Desça na amplitude completa mantendo a coluna firme e neutra. Empurre contra o chão espalhando a força pelos calcanhares na subida.",
      tips: [
        "Mantenha o alinhamento perfeito do joelho com os dedos do pé para estabilidade articular total.",
        "A descida controlada é o principal fator de ativação profunda de quadríceps e glúteos."
      ],
      intensity: "Estresse tensional máximo • RPE 9 (Foco na amplitude com sobriedade e técnica)"
    };
  }

  if (mLower.includes('ombro') || mLower.includes('deltoide') || nLower.includes('desenvolvimento') || nLower.includes('lateral') || nLower.includes('frontal')) {
    return {
      gif,
      instructions: "Abra os braços levemente à frente na linha escapular e erga os halteres sem encolher o pescoço.",
      muscles: "Deltoide Lateral, Deltoide Anterior, Trapézio e Serrátil",
      technique: "Não use impulsos dinâmicos do tronco inferior. O isolamento dos ombros requer corpo firme.",
      correctExecution: "Eleve os braços até a altura da linha paralela dos ombros, segure por 0.5s e desça segurando o peso de forma progressiva.",
      tips: [
        "Incline o tronco ligeiramente para a frente para alinhar o deltoide lateral perfeitamente contra a gravidade.",
        "Não trave as articulações no topo nos movimentos de empurrar."
      ],
      intensity: "Tensão de Isolamento • RPE 8 (Repetições estritas de alta qualidade)"
    };
  }

  if (mLower.includes('tríceps') || mLower.includes('triceps')) {
    return {
      gif,
      instructions: "Cole os cotovelos fixados na lateral das costelas e estenda completamente os antebraços.",
      muscles: "Tríceps Braquial (Cabeça Longa, Cabeça Lateral e Cabeça Medial)",
      technique: "Não use os ombros ou tronco superior para ajudar. Apenas o cotovelo deve mexer.",
      correctExecution: "Estenda completamente os braços contraindo com força o tríceps por 1 segundo, retorne controlando a subida em 3 segundos.",
      tips: [
        "No tríceps corda, afaste as pontas da corda na parte mais baixa para atingir contração e isolamento máximos.",
        "Mantenha os punhos firmes e travados."
      ],
      intensity: "Pump e Tensão Localizada • RPE 8.5 (Foco em queimação e densidade muscular)"
    };
  }

  if (mLower.includes('bíceps') || mLower.includes('biceps') || nLower.includes('rosca') || nLower.includes('martelo')) {
    return {
      gif,
      instructions: "Mantenha os cotovelos alinhados e suba a carga girando levemente as palmas para o teto.",
      muscles: "Bíceps Braquial, Braquial Anterior e Braquiorradial",
      technique: "Evite jogar os cotovelos para trás na subida para não transferir carga para a porção do ombro.",
      correctExecution: "Erga controladamente focado no bíceps, esmague no pico por 1s e retorne na descida completa sem relaxar e mantendo o músculo engajado.",
      tips: [
        "Gire levemente o dedo mindinho para fora no topo da rosca alternada para contrair ainda mais o pico do bíceps.",
        "Use uma base sólida com pernas levemente flexionadas."
      ],
      intensity: "Densidade Miofibrilar • RPE 8 (Repetições curadas com foco concêntrico e excêntrico estrito)"
    };
  }

  // Fallback for general CORE / Abdômen or unspecified
  return {
    gif,
    instructions: "Contraia o abdômen e estabilize os quadris, movimentando-se com amplitude e expiração ativa.",
    muscles: "CORE, Reto Abdominal, Oblíquo Interno/Externo e Estabilizadores Globais",
    technique: "Evite tensionar o pescoço ou puxar a cervical com as mãos. Toda força deve emanar do abdômen.",
    correctExecution: "Expulse todo o ar das vias respiratórias no topo do abdômen para forçar uma contração profunda do transverso abdominal.",
    tips: [
      "No vacuum ou prancha, mantenha a conexão mente-músculo apertando toda musculatura profunda.",
      "A respiração correta é o segredo para um abdômen estético e funcional."
    ],
    intensity: "Controle Neuromuscular • RPE 9.5 (Ativação profunda de estabilização postural)"
  };
};
