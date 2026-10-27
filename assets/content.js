/* Agrega os arquivos de dados. Carregado depois de data/*.js. */
const ARTICLES = [...ARTICLES_1, ...ARTICLES_2, ...ARTICLES_3, ...ARTICLES_4, ...ARTICLES_5];

const CONTENT = {
  categories: CATEGORIES,
  stages: STAGES,
  formats: FORMATS,
  roles: ROLES,
  playlists: PLAYLISTS,
  videos: VIDEOS,
  articles: ARTICLES,
  terms: TERMS,
};

window.CONTENT = CONTENT;
