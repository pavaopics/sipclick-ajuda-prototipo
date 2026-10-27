/* Conteúdo da Central de Ajuda — protótipo.
   Fonte das regras: código do produto em src/app/domain e src/app/supabase/functions/server.
   Regra editorial: não prometer tela ou automação que o código não entrega. */

const p = (text) => ({ type: "p", text });
const steps = (items) => ({ type: "steps", items });
const list = (items, opts = {}) => ({ type: "list", items, check: Boolean(opts.check) });
const callout = (tone, titulo, text) => ({ type: "callout", tone, titulo, text });
const formula = (label, text, exemplo = "") => ({ type: "formula", label, text, exemplo });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });
const cta = (label, href) => ({ type: "cta", label, href });
const videoBlock = (videoId) => ({ type: "video", videoId });

const CATEGORIES = [
  { id: "comecar", nome: "Comece por aqui", descricao: "O mapa do produto, os primeiros passos e o vocabulário.", icone: "i-compass" },
  { id: "pessoas", nome: "Pessoas", descricao: "Organograma, cadastro, importação, convites e lixeira.", icone: "i-users" },
  { id: "desempenho", nome: "Desempenho", descricao: "Ciclos, avaliações, notas de competência e calibração.", icone: "i-check-circle" },
  { id: "ninebox", nome: "Nine Box e potencial", descricao: "Como a matriz é calculada e o que cada quadrante significa.", icone: "i-grid" },
  { id: "metas", nome: "Metas", descricao: "Objetivos, distribuição, lançamentos, réguas e ritmo.", icone: "i-target" },
  { id: "pdi", nome: "PDI", descricao: "Geração do plano, jornada de 90 dias, ações e aceite.", icone: "i-route" },
  { id: "metodologia", nome: "Metodologia", descricao: "Pesos, cortes, congelamento e o que muda no cálculo.", icone: "i-layers" },
  { id: "analytics", nome: "People Analytics", descricao: "Indicadores, fórmulas, cobertura e leitura honesta.", icone: "i-chart" },
  { id: "conta", nome: "Conta e acesso", descricao: "Primeiro acesso, senha, papéis e permissões.", icone: "i-shield" },
  { id: "glossario", nome: "Glossário", descricao: "Os termos da Sipclick explicados em uma frase.", icone: "i-book" },
];

const STAGES = [
  { id: "entender", nome: "Entender", descricao: "Conceitos e regras" },
  { id: "configurar", nome: "Configurar", descricao: "Empresa, ciclo e réguas" },
  { id: "cadastrar", nome: "Cadastrar", descricao: "Pessoas, metas e dados" },
  { id: "avaliar", nome: "Avaliar", descricao: "Responder e conduzir" },
  { id: "acompanhar", nome: "Acompanhar", descricao: "Resultados e pendências" },
  { id: "desenvolver", nome: "Desenvolver", descricao: "PDI e ações" },
  { id: "analisar", nome: "Analisar", descricao: "Indicadores e decisão" },
  { id: "resolver", nome: "Resolver", descricao: "Destravar o que trava" },
];

const FORMATS = [
  { id: "video", nome: "Vídeo", classe: "video" },
  { id: "guia", nome: "Passo a passo", classe: "guia" },
  { id: "conceito", nome: "Como funciona", classe: "conceito" },
  { id: "problema", nome: "Solução de problema", classe: "problema" },
  { id: "faq", nome: "Pergunta frequente", classe: "faq" },
  { id: "glossario", nome: "Glossário", classe: "glossario" },
];

const ROLES = [
  { id: "admin_rh", nome: "Admin / RH" },
  { id: "gestor", nome: "Gestor" },
  { id: "colaborador", nome: "Colaborador" },
  { id: "todos", nome: "Todos" },
  { id: "super_admin", nome: "Super admin" },
];

const PLAYLISTS = [
  { id: "primeiros-passos", nome: "Primeiros passos", descricao: "O essencial para começar sem se perder.", status: "em produção" },
  { id: "pessoas", nome: "Pessoas e estrutura", descricao: "Cadastro, importação e organograma.", status: "1 vídeo" },
  { id: "ciclo-avaliacao", nome: "Ciclo e avaliação", descricao: "Do ciclo ao envio da avaliação.", status: "em produção" },
  { id: "metas", nome: "Metas", descricao: "Criar, distribuir e acompanhar metas.", status: "em produção" },
  { id: "pdi", nome: "PDI e desenvolvimento", descricao: "Plano, jornada e evidências.", status: "em produção" },
  { id: "nine-box", nome: "Nine Box e talento", descricao: "Matriz, potencial e calibração.", status: "1 vídeo" },
  { id: "analytics", nome: "People Analytics", descricao: "Como ler os indicadores.", status: "em produção" },
];

const VIDEOS = [
  {
    id: "nine-box",
    titulo: "Nine Box no Sipclick RH: como funciona e como calibrar",
    resumo: "Entenda de onde vêm as notas, como cada pessoa cai em uma das 9 caixas e como o comitê calibra a classificação.",
    playlist: "nine-box",
    artigo: "nine-box-como-calculado",
    duracao: "1:41",
    poster: "assets/media/poster-nine-box.jpg",
    posterHome: "assets/media/poster-home-nine-box.jpg",
    src: "assets/media/nine-box.mp4",
    youtubeId: null,
    capitulos: [
      { segundos: 0, tempo: "0:00", titulo: "Introdução" },
      { segundos: 4, tempo: "0:04", titulo: "O que é o Nine Box" },
      { segundos: 18, tempo: "0:18", titulo: "De onde vêm as notas" },
      { segundos: 41, tempo: "0:41", titulo: "A matriz no sistema" },
      { segundos: 57, tempo: "0:57", titulo: "Calibração na Gestão Rápida" },
      { segundos: 78, tempo: "1:18", titulo: "Resultado e histórico" },
    ],
  },
  {
    id: "cadastrar-equipe",
    titulo: "Como cadastrar sua equipe no Sipclick RH",
    resumo: "Os dois caminhos para cadastrar o time: planilha modelo na configuração inicial ou cadastro direto no organograma.",
    playlist: "pessoas",
    artigo: "como-cadastrar-equipe",
    duracao: "1:09",
    poster: "assets/media/poster.jpg",
    posterHome: "assets/media/poster-home.jpg",
    src: "assets/media/cadastrar-equipe.mp4",
    youtubeId: null,
    capitulos: [
      { segundos: 0, tempo: "0:00", titulo: "Introdução e os dois caminhos" },
      { segundos: 11, tempo: "0:11", titulo: "Configuração inicial: planilha modelo" },
      { segundos: 24, tempo: "0:24", titulo: "Enviar e revisar a planilha" },
      { segundos: 37, tempo: "0:37", titulo: "Cadastrar direto no organograma" },
      { segundos: 56, tempo: "0:56", titulo: "Resultado" },
    ],
  },
];
