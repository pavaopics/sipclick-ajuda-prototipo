/* Central de Ajuda — protótipo navegável.
   Roteamento por hash, busca local, filtros, sanfonadas, player com capítulos
   e atalho de ajuda (painel lateral + tecla ?). Sem dependências externas. */

(() => {
  const { categories, stages, formats, roles, playlists, videos, articles, terms } = window.CONTENT;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const main = $("#conteudo");
  const sidebar = $("#sidebar");
  const roleSelect = $("#roleSelect");
  const quickOverlay = $("#quickOverlay");
  const quickPanel = $("#quickPanel");
  const quickSearch = $("#quickSearch");
  const quickBody = $("#quickBody");
  const toastEl = $("#toast");

  const byId = new Map(articles.map((a) => [a.id, a]));
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const stageById = new Map(stages.map((s) => [s.id, s]));
  const formatById = new Map(formats.map((f) => [f.id, f]));
  const roleById = new Map(roles.map((r) => [r.id, r]));
  const playlistById = new Map(playlists.map((p) => [p.id, p]));
  const videoById = new Map(videos.map((v) => [v.id, v]));

  const STORE_ROLE = "hc.role";
  let currentRole = localStorage.getItem(STORE_ROLE) || "admin_rh";
  if (!roleById.has(currentRole)) currentRole = "admin_rh";
  roleSelect.value = currentRole;

  const icons = {
    search: "i-search", help: "i-help", book: "i-book", users: "i-users", target: "i-target",
    chart: "i-chart", compass: "i-compass", video: "i-video", arrowRight: "i-arrow-right",
    chevronDown: "i-chevron-down", chevronRight: "i-chevron-right", x: "i-x", play: "i-play",
    clock: "i-clock", check: "i-check-circle", alert: "i-alert", calc: "i-calculator",
    sparkles: "i-sparkles", external: "i-external", message: "i-message", filter: "i-filter",
    shield: "i-shield", bookOpen: "i-book", grid: "i-grid", layers: "i-layers",
    arrowLeft: "i-arrow-left", info: "i-info", refresh: "i-refresh", route: "i-route", "check-circle": "i-check-circle",
  };

  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#${icons[name] || name}"/></svg>`;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

  const norm = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const slugText = (value) => norm(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const articleHref = (id) => `#/ajuda/artigo/${id}`;
  const categoryHref = (id) => id === "glossario" ? "#/ajuda/glossario" : `#/ajuda/categoria/${id}`;

  const categoryName = (id) => categoryById.get(id)?.nome || id;
  const stageName = (id) => stageById.get(id)?.nome || id;
  const formatName = (id) => formatById.get(id)?.nome || id;
  const formatClass = (id) => formatById.get(id)?.classe || "guia";

  const roleLabel = (ids) => (ids || []).map((id) => roleById.get(id)?.nome || id).join(" · ");
  const dateBR = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const articleCount = (categoryId) => categoryId === "glossario"
    ? terms.length
    : articles.filter((a) => a.modulo === categoryId).length;

  /* --------------------------------------------------------------------- */
  /* Índice de busca                                                        */
  /* --------------------------------------------------------------------- */

  function blockText(block) {
    if (!block) return "";
    switch (block.type) {
      case "p": return block.text || "";
      case "steps": return (block.items || []).map((i) => `${i.titulo} ${i.texto}`).join(" ");
      case "list": return (block.items || []).join(" ");
      case "callout": return `${block.titulo || ""} ${block.text || ""}`;
      case "formula": return `${block.label || ""} ${block.text || ""} ${block.exemplo || ""}`;
      case "table": return [block.headers, ...(block.rows || [])].flat().join(" ");
      case "faq": return (block.items || []).map((i) => `${i.q} ${i.a}`).join(" ");
      case "cta": return block.label || "";
      default: return "";
    }
  }

  function articleText(article) {
    return article.secoes.flatMap((section) => [section.titulo, ...section.blocos.map(blockText)]).join(" ");
  }

  const INDEX = articles.map((article) => {
    const body = norm(articleText(article));
    return {
      article,
      title: norm(article.titulo),
      aliases: norm((article.aliases || []).join(" ")),
      tags: norm((article.tags || []).join(" ")),
      summary: norm(article.resumo),
      categories: norm(`${categoryName(article.modulo)} ${stageName(article.etapa)} ${formatName(article.formato)}`),
      body,
      all: norm([article.titulo, article.resumo, (article.aliases || []).join(" "), (article.tags || []).join(" "), articleText(article), categoryName(article.modulo), stageName(article.etapa), formatName(article.formato)].join(" ")),
    };
  });

  function queryTokens(query) {
    return norm(query).split(/\s+/).map((t) => t.trim()).filter((t) => t.length > 1);
  }

  function searchArticles(query, filters = {}) {
    const tokens = queryTokens(query);
    const phrase = norm(query).trim();
    const results = [];

    for (const entry of INDEX) {
      const article = entry.article;
      if (filters.modulo && article.modulo !== filters.modulo) continue;
      if (filters.etapa && article.etapa !== filters.etapa) continue;
      if (filters.formato && article.formato !== filters.formato) continue;
      if (filters.papel && filters.papel !== "todos" && !article.papeis.includes("todos") && !article.papeis.includes(filters.papel)) continue;

      let score = 0;
      let ok = true;
      for (const token of tokens) {
        if (entry.title.includes(token)) score += 12;
        else if (entry.aliases.includes(token)) score += 8;
        else if (entry.tags.includes(token)) score += 6;
        else if (entry.summary.includes(token)) score += 4;
        else if (entry.categories.includes(token)) score += 2;
        else if (entry.body.includes(token)) score += 1;
        else { ok = false; break; }
      }
      if (!ok) continue;
      if (phrase.length > 3 && entry.title.includes(phrase)) score += 10;
      if (phrase.length > 3 && entry.aliases.includes(phrase)) score += 5;
      results.push({ article, score: tokens.length ? score : (article.formato === "video" ? 5 : 1) });
    }

    if (!filters.papel || filters.papel === "todos") {
      // Recomendados sobem um pouco quando a busca está vazia.
      if (!tokens.length) {
        const recs = recommendations();
        results.sort((a, b) => {
          const ia = recs.indexOf(a.article.id);
          const ib = recs.indexOf(b.article.id);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || b.article.tempo - a.article.tempo;
        });
        return results;
      }
    }

    return results.sort((a, b) => b.score - a.score || a.article.titulo.localeCompare(b.article.titulo));
  }

  function searchTerms(query) {
    const tokens = queryTokens(query);
    if (!tokens.length) return [];
    return terms.filter((term) => {
      const hay = norm(`${term.termo} ${term.definicao}`);
      return tokens.every((token) => hay.includes(token));
    });
  }

  function recommendations() {
    const map = {
      admin_rh: ["primeiros-15-minutos", "como-cadastrar-equipe", "criar-ciclo-avaliacao"],
      gestor: ["avaliar-time", "nine-box-como-calculado", "ritmo-situacao-meta"],
      colaborador: ["autoavaliacao", "lancar-resultado-atingimento", "gerar-pdi"],
      todos: ["mapa-da-sipclick", "como-cadastrar-equipe", "autoavaliacao"],
    };
    return map[currentRole] || map.admin_rh;
  }

  function contextModule(params, routeArticle) {
    if (routeArticle?.modulo) return routeArticle.modulo;
    const mod = params.get("modulo");
    return categoryById.has(mod) ? mod : null;
  }

  function shortcuts() {
    const ids = ["como-cadastrar-equipe", "criar-ciclo-avaliacao", "criar-distribuir-meta", "nine-box-como-calculado", "gerar-pdi", "papeis-e-permissoes"];
    return ids.map((id) => byId.get(id)).filter(Boolean);
  }

  /* --------------------------------------------------------------------- */
  /* HTML de componentes                                                    */
  /* --------------------------------------------------------------------- */

  function badge(article, extra = "") {
    if (article.videoId) return `<span class="hc-badge hc-badge--video">${icon("video")} Vídeo</span>`;
    return `<span class="hc-badge hc-badge--${formatClass(article.formato)}">${esc(formatName(article.formato))}</span>${extra}`;
  }

  function articleCard(article) {
    return `
      <a class="hc-card" href="${articleHref(article.id)}">
        <div class="hc-card-top">${badge(article)}</div>
        <h3>${esc(article.titulo)}</h3>
        <p>${esc(article.resumo)}</p>
        <div class="hc-card-meta">
          <span>${icon("clock", "icon--sm")} ${article.tempo} min</span>
          <span>${icon("compass", "icon--sm")} ${esc(categoryName(article.modulo))}</span>
          <span>${esc(roleLabel(article.papeis))}</span>
        </div>
      </a>`;
  }

  function videoFrame(video, { variant = "article" } = {}) {
    const label = video.youtubeId ? "YouTube" : "Prévia local";
    return `
      <div class="hc-video-frame" data-video-frame="${video.id}">
        <button class="hc-player-facade" type="button" data-play-video="${video.id}" aria-label="Assistir: ${esc(video.titulo)}">
          <img src="${video.poster}" alt="" loading="lazy" />
          <span class="hc-player-badge">${label}</span>
          <span class="hc-play-circle">${icon("play")}</span>
        </button>
      </div>`;
  }

  function chaptersList(video, { compact = false } = {}) {
    return `<div class="hc-chapters" aria-label="Capítulos do vídeo">
      ${video.capitulos.map((chapter) => `
        <button class="hc-chapter" type="button" data-chapter="${video.id}" data-seconds="${chapter.segundos}">
          ${icon("play", "icon--sm")}
          <span class="hc-chapter-time">${chapter.tempo}</span>
          <span>${esc(chapter.titulo)}</span>
        </button>`).join("")}
    </div>`;
  }

  function videoNotice() {
    return `<p class="hc-video-note">${icon("info", "icon--sm")} Prévia local. Na homologação, este player vira o embed do YouTube; o ID fica em um único campo do conteúdo.</p>`;
  }

  function articleVideoBlock(article) {
    const video = videoById.get(article.videoId);
    if (!video) return "";
    return `
      <div class="hc-article-video">
        ${videoFrame(video)}
        <div class="hc-video-meta">
          <p><strong>${esc(video.titulo)}</strong> · ${video.duracao}</p>
          <a class="hc-btn hc-btn--ghost hc-btn--sm" href="#/ajuda/videos/${video.playlist}">Ver na biblioteca ${icon("arrowRight", "icon--sm")}</a>
        </div>
        ${chaptersList(video)}
        ${videoNotice()}
      </div>`;
  }

  function renderCallout(block) {
    const toneIcon = {
      info: "info", warn: "alert", rule: "calc", danger: "alert", success: "check",
    }[block.tone] || "info";
    return `<div class="hc-callout hc-callout--${block.tone}">
      ${icon(toneIcon)}
      <div><strong>${esc(block.titulo)}</strong><p>${esc(block.text)}</p></div>
    </div>`;
  }

  function renderBlocks(blocks, articleId, sectionIndex) {
    return blocks.map((block, blockIndex) => {
      switch (block.type) {
        case "p":
          return `<p>${esc(block.text)}</p>`;
        case "steps":
          return `<ol class="hc-steps">${block.items.map((item, index) => `
            <li class="hc-step">
              <span class="hc-step-n">${index + 1}</span>
              <div><strong>${esc(item.titulo)}</strong><p>${esc(item.texto)}</p></div>
            </li>`).join("")}</ol>`;
        case "list":
          return `<ul class="hc-list ${block.check ? "hc-list--check" : ""}">${block.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
        case "callout":
          return renderCallout(block);
        case "formula":
          return `<div class="hc-formula">
            <div class="hc-formula-label">${esc(block.label)}</div>
            <code>${esc(block.text)}</code>
            ${block.exemplo ? `<div class="hc-formula-example"><strong>Exemplo:</strong> ${esc(block.exemplo)}</div>` : ""}
          </div>`;
        case "table":
          return `<div class="hc-table-wrap"><table class="hc-table">
            <thead><tr>${block.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
            <tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>`;
        case "faq":
          return `<div class="hc-acc">${block.items.map((item, index) => {
            const id = `faq-${articleId}-${sectionIndex}-${blockIndex}-${index}`;
            return `<div class="hc-acc-item">
              <button class="hc-acc-btn" type="button" data-acc="${id}" aria-expanded="false" aria-controls="${id}">
                <span class="hc-acc-title">${esc(item.q)}</span>${icon("chevronDown")}
              </button>
              <div class="hc-acc-panel" id="${id}"><p>${esc(item.a)}</p></div>
            </div>`;
          }).join("")}</div>`;
        case "cta":
          return `<a class="hc-btn hc-btn--ghost" href="${esc(block.href)}">${esc(block.label)} ${icon("arrowRight", "icon--sm")}</a>`;
        case "video": {
          const video = videoById.get(block.videoId);
          if (!video) return "";
          return `<div class="hc-article-video">${videoFrame(video)}<div class="hc-video-meta"><p>${esc(video.titulo)}</p></div>${chaptersList(video)}</div>`;
        }
        default:
          return "";
      }
    }).join("");
  }

  function articlePage(article, params) {
    const context = contextModule(params, article);
    const secs = article.secoes;
    const toc = secs.map((section, index) => `<a href="#artigo-sec-${index}" data-toc="${index}">${esc(section.titulo)}</a>`).join("");
    const prose = secs.map((section, index) => {
      const panelId = `artigo-sec-${index}`;
      return `<div class="hc-acc-item">
        <button class="hc-acc-btn" type="button" data-acc="${panelId}" aria-expanded="${index === 0}" aria-controls="${panelId}">
          <span class="hc-acc-title">${esc(section.titulo)}</span>${icon("chevronDown")}
        </button>
        <div class="hc-acc-panel ${index === 0 ? "is-open" : ""}" id="${panelId}">
          ${renderBlocks(section.blocos, article.id, index)}
        </div>
      </div>`;
    }).join("");

    const related = (article.relacionados || []).map((id) => byId.get(id)).filter(Boolean);
    const contextBanner = context ? `<div class="hc-context">${icon("compass")} <span>Você está em <strong>${esc(categoryName(context))}</strong>. Sugestões deste módulo aparecem na home e no atalho de ajuda.</span></div>` : "";

    return `
      <div class="hc-breadcrumb">
        <a href="#/ajuda">Ajuda</a>${icon("chevronRight", "icon--sm")}
        <a href="${categoryHref(article.modulo)}">${esc(categoryName(article.modulo))}</a>${icon("chevronRight", "icon--sm")}
        <span>${esc(article.titulo)}</span>
      </div>
      ${contextBanner}
      <header class="hc-article-head">
        <div class="hc-meta-row" style="margin-top:0">${badge(article)}<span class="hc-meta-chip">${icon("compass", "icon--sm")} ${esc(categoryName(article.modulo))}</span></div>
        <h1>${esc(article.titulo)}</h1>
        <p class="hc-summary">${esc(article.resumo)}</p>
        <div class="hc-meta-row">
          <span class="hc-meta-chip">${icon("clock", "icon--sm")} ${article.tempo} min de leitura</span>
          <span class="hc-meta-chip">${icon("route", "icon--sm")} ${esc(stageName(article.etapa))}</span>
          <span class="hc-meta-chip hc-meta-chip--role">${icon("shield", "icon--sm")} ${esc(roleLabel(article.papeis))}</span>
          <span class="hc-meta-chip">Atualizado em ${esc(dateBR(article.atualizado))}</span>
        </div>
      </header>

      ${article.prerequisitos?.length ? `<div class="hc-callout hc-callout--info" style="margin-top:18px">${icon("check")}<div><strong>Antes de começar</strong><p>${article.prerequisitos.map(esc).join(" · ")}</p></div></div>` : ""}
      ${articleVideoBlock(article)}

      <div class="hc-article-layout">
        <div class="hc-article-body">
          <article class="hc-prose">${prose}</article>
          <div class="hc-feedback" data-feedback-box>
            <p>Este conteúdo resolveu sua dúvida?</p>
            <button class="hc-btn hc-btn--ghost hc-btn--sm" type="button" data-feedback="sim">${icon("check", "icon--sm")} Sim</button>
            <button class="hc-btn hc-btn--ghost hc-btn--sm" type="button" data-feedback="nao">${icon("message", "icon--sm")} Ainda preciso de ajuda</button>
            <span class="hc-feedback-note">Feedback anônimo no produto real</span>
          </div>
          ${related.length ? `<section class="hc-related"><h2>Conteúdo relacionado</h2><div class="hc-related-grid">${related.map(articleCard).join("")}</div></section>` : ""}
        </div>
        <aside class="hc-article-aside">
          <nav class="hc-toc" aria-label="Nesta página"><h4>Nesta página</h4>${toc}</nav>
          <div class="hc-aside-card">
            <h4>Não encontrou?</h4>
            <p>Fale com o suporte e nos diga o que faltou. Buscas sem resultado viram fila de conteúdo.</p>
            <button class="hc-btn hc-btn--ghost hc-btn--sm" type="button" data-suporte>${icon("message", "icon--sm")} Falar com o suporte</button>
          </div>
          <a class="hc-btn hc-btn--text" href="${categoryHref(article.modulo)}">${icon("arrowLeft", "icon--sm")} Voltar ao assunto</a>
        </aside>
      </div>`;
  }

  /* --------------------------------------------------------------------- */
  /* Páginas                                                                */
  /* --------------------------------------------------------------------- */

  function renderHome(params) {
    const context = contextModule(params);
    const recs = recommendations().map((id) => byId.get(id)).filter(Boolean);
    const video = videos[0];
    const contextBanner = context ? `<div class="hc-context">${icon("compass")} <span>Você abriu a ajuda a partir de <strong>${esc(categoryName(context))}</strong>. Comece pelos conteúdos deste módulo ou busque uma tarefa.</span></div>` : "";
    const faqItems = [
      ["Preciso configurar tudo antes de usar?", "Não. O mínimo para rodar um ciclo é ter pessoas cadastradas, hierarquia conferida e um ciclo ativo. Metas, PDI e Analytics podem entrar depois."],
      ["Por que não vejo uma tela que meu colega vê?", "A permissão depende do papel e do vínculo. Admin, RH, gestor e colaborador veem coisas diferentes. Quem não pode acessar uma página não vê o atalho dela."],
      ["O Nine Box decide promoção ou demissão?", "Não. O Nine Box orienta desenvolvimento. Ele não é nota, não é ranking e não decide carreira. O comitê pode ajustar o nível do eixo com justificativa, mas não altera a nota."],
      ["Nota ausente é zero?", "Não. Dado ausente não entra na conta e pode deixar o resultado nulo. Zero só existe quando a régua ou a nota informada dá zero."],
      ["Consigo mudar a metodologia do ciclo em andamento?", "Não. O ciclo usa a metodologia congelada na primeira leitura. Mudanças valem para os próximos ciclos. Para o ciclo atual, use a calibração com justificativa."],
    ];

    return `
      <section class="hc-hero">
        <p class="hc-eyebrow">Central de Ajuda · Sipclick RH</p>
        <h1>Como podemos ajudar hoje?</h1>
        <p class="hc-hero-sub">Encontre o passo a passo, entenda como o sistema calcula e assista ao tutorial. Conteúdo organizado por tarefa, etapa e papel.</p>
        <form class="hc-hero-search" id="heroSearchForm" role="search">
          ${icon("search")}
          <input name="q" type="search" placeholder="Busque por 'planilha', 'ciclo', 'Nine Box', 'PDI'…" autocomplete="off" aria-label="Buscar na Central de Ajuda" />
          <button class="hc-btn hc-btn--teal" type="submit">Buscar</button>
        </form>
        <div class="hc-hero-chips">
          <a class="hc-chip" href="${articleHref("como-cadastrar-equipe")}">${icon("video", "icon--sm")} Cadastrar equipe</a>
          <a class="hc-chip" href="${articleHref("criar-ciclo-avaliacao")}">Criar ciclo</a>
          <a class="hc-chip" href="${articleHref("nine-box-como-calculado")}">Nine Box</a>
          <a class="hc-chip" href="${articleHref("gerar-pdi")}">PDI</a>
          <a class="hc-chip" href="#/ajuda/glossario">Glossário</a>
        </div>
      </section>

      ${contextBanner}

      <section class="hc-section">
        <div class="hc-section-head">
          <div><p class="hc-eyebrow">Para o seu papel</p><h2>Comece por aqui</h2><p>Três conteúdos que resolvem o primeiro obstáculo de ${esc(roleById.get(currentRole)?.nome || "quem está começando")}.</p></div>
          <a class="hc-link-more" href="#/ajuda/busca?papel=${encodeURIComponent(currentRole)}">Ver todos ${icon("arrowRight", "icon--sm")}</a>
        </div>
        <div class="hc-grid hc-grid--3">${recs.map(articleCard).join("")}</div>
      </section>

      <section class="hc-section">
        <div class="hc-section-head">
          <div><p class="hc-eyebrow">Vídeo em destaque</p><h2>Assista e faça junto</h2><p>Tutoriais curtos, com capítulos, para assistir enquanto executa a tarefa.</p></div>
          <a class="hc-link-more" href="#/ajuda/videos">Biblioteca de vídeos ${icon("arrowRight", "icon--sm")}</a>
        </div>
        <div class="hc-video-feature">
          <div class="hc-video-poster" data-video-frame="${video.id}">
            <img src="${video.posterHome || video.poster}" alt="Capa do vídeo: ${esc(video.titulo)}" />
            <button class="hc-play" type="button" data-play-video="${video.id}" aria-label="Assistir: ${esc(video.titulo)}">
              <span class="hc-play-circle">${icon("play")}</span>
              <span class="hc-play-label">Assistir agora</span>
            </button>
            <span class="hc-video-duration">${icon("clock", "icon--sm")} ${video.duracao}</span>
          </div>
          <div class="hc-video-info">
            <span class="hc-badge hc-badge--video">${icon("video")} Tutorial</span>
            <h3>${esc(video.titulo)}</h3>
            <p>${esc(video.resumo)}</p>
            ${chaptersList(video)}
            <a class="hc-btn hc-btn--primary hc-btn--sm" href="${articleHref(video.artigo)}">Ler o passo a passo ${icon("arrowRight", "icon--sm")}</a>
          </div>
        </div>
      </section>

      <section class="hc-section">
        <div class="hc-section-head">
          <div><p class="hc-eyebrow">Navegue por assunto</p><h2>O que você precisa resolver?</h2><p>Cada assunto tem guias, conceitos, soluções de problema e, quando existe, vídeo.</p></div>
        </div>
        <div class="hc-cat-grid">
          ${categories.map((category) => `
            <a class="hc-cat" href="${categoryHref(category.id)}">
              <span class="hc-cat-icon">${icon(category.icone.replace("i-", ""))}</span>
              <h3>${esc(category.nome)}</h3>
              <p>${esc(category.descricao)}</p>
              <div class="hc-cat-foot"><span class="hc-cat-count">${articleCount(category.id)} ${category.id === "glossario" ? "termos" : "conteúdos"}</span><span class="hc-cat-arrow">${icon("arrowRight", "icon--sm")}</span></div>
            </a>`).join("")}
        </div>
      </section>

      <section class="hc-section">
        <div class="hc-section-head">
          <div><p class="hc-eyebrow">Por etapa da jornada</p><h2>Onde você está agora?</h2><p>Filtre a busca pelo momento: entender, configurar, cadastrar, avaliar, acompanhar, desenvolver, analisar ou resolver.</p></div>
        </div>
        <div class="hc-stages">
          ${stages.map((stage, index) => `
            <a class="hc-stage" href="#/ajuda/busca?etapa=${stage.id}">
              <span class="hc-stage-n">${String(index + 1).padStart(2, "0")}</span>
              <div><strong>${stage.nome}</strong><small>${stage.descricao}</small></div>
            </a>`).join("")}
        </div>
      </section>

      <section class="hc-section">
        <div class="hc-section-head">
          <div><p class="hc-eyebrow">Dúvidas rápidas</p><h2>Perguntas frequentes</h2><p>Respostas curtas para o que mais gera dúvida antes de abrir um artigo.</p></div>
        </div>
        <div class="hc-acc">
          ${faqItems.map((item, index) => {
            const id = `home-faq-${index}`;
            return `<div class="hc-acc-item">
              <button class="hc-acc-btn" type="button" data-acc="${id}" aria-expanded="false" aria-controls="${id}">
                <span class="hc-acc-title">${esc(item[0])}</span>${icon("chevronDown")}
              </button>
              <div class="hc-acc-panel" id="${id}"><p>${esc(item[1])}</p></div>
            </div>`;
          }).join("")}
        </div>
      </section>

      <section class="hc-section">
        <div class="hc-panel-context" style="margin:0">
          ${icon("message")}
          <span><strong>Ainda precisa de ajuda?</strong> Fale com o suporte e conte o que você tentou fazer. A Central não substitui o atendimento.</span>
        </div>
      </section>`;
  }

  function renderCategory(categoryId, params) {
    const category = categoryById.get(categoryId);
    if (!category) return notFound("Assunto não encontrado.");
    if (categoryId === "glossario") return renderGlossary(params);

    const filters = {
      etapa: params.get("etapa") || "",
      papel: params.get("papel") || "",
      formato: params.get("formato") || "",
    };
    const list = articles
      .filter((a) => a.modulo === categoryId)
      .filter((a) => !filters.etapa || a.etapa === filters.etapa)
      .filter((a) => !filters.papel || filters.papel === "todos" || a.papeis.includes("todos") || a.papeis.includes(filters.papel))
      .filter((a) => !filters.formato || a.formato === filters.formato);

    return `
      <div class="hc-breadcrumb"><a href="#/ajuda">Ajuda</a>${icon("chevronRight", "icon--sm")}<span>${esc(category.nome)}</span></div>
      <header class="hc-page-head">
        <p class="hc-eyebrow">${articleCount(categoryId)} conteúdos</p>
        <h1>${esc(category.nome)}</h1>
        <p>${esc(category.descricao)}</p>
      </header>
      <div class="hc-filterbar">
        <span class="hc-filterbar-label">${icon("filter", "icon--sm")} Filtrar</span>
        <select class="hc-select" data-filter="etapa" aria-label="Filtrar por etapa">
          <option value="">Todas as etapas</option>
          ${stages.map((s) => `<option value="${s.id}" ${filters.etapa === s.id ? "selected" : ""}>${s.nome}</option>`).join("")}
        </select>
        <select class="hc-select" data-filter="papel" aria-label="Filtrar por papel">
          <option value="">Todos os papéis</option>
          ${roles.filter((r) => r.id !== "super_admin").map((r) => `<option value="${r.id}" ${filters.papel === r.id ? "selected" : ""}>${r.nome}</option>`).join("")}
        </select>
        <select class="hc-select" data-filter="formato" aria-label="Filtrar por formato">
          <option value="">Todos os formatos</option>
          ${formats.map((f) => `<option value="${f.id}" ${filters.formato === f.id ? "selected" : ""}>${f.nome}</option>`).join("")}
        </select>
        ${(filters.etapa || filters.papel || filters.formato) ? `<button class="hc-btn hc-btn--text hc-btn--sm hc-clear" type="button" data-clear-filters>Limpar</button>` : ""}
      </div>
      <p class="hc-result-count">${list.length} ${list.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}</p>
      ${list.length ? `<div class="hc-card-list">${list.map(articleCard).join("")}</div>` : emptyState("Nenhum conteúdo com esses filtros.", "Tente remover um filtro ou buscar em toda a Central.")}
    `;
  }

  function renderSearch(params) {
    const q = params.get("q") || "";
    const filters = {
      modulo: params.get("modulo") || "",
      etapa: params.get("etapa") || "",
      papel: params.get("papel") || "",
      formato: params.get("formato") || "",
    };
    const results = searchArticles(q, filters);
    const termResults = searchTerms(q);
    const hasFilters = Object.values(filters).some(Boolean);
    const label = q ? `Resultados para “${q}”` : (hasFilters ? "Conteúdos filtrados" : "Todos os conteúdos");

    return `
      <div class="hc-search-hero">
        <p class="hc-eyebrow">Busca</p>
        <h1>${esc(label)}</h1>
        <form class="hc-search-box" id="searchPageForm" role="search">
          ${icon("search")}
          <input name="q" type="search" value="${esc(q)}" placeholder="Busque por uma tarefa, dúvida ou termo" autocomplete="off" aria-label="Buscar na Central de Ajuda" />
          <button class="hc-btn hc-btn--teal hc-btn--sm" type="submit">Buscar</button>
        </form>
      </div>
      <div class="hc-filterbar">
        <span class="hc-filterbar-label">${icon("filter", "icon--sm")} Filtrar</span>
        <select class="hc-select" data-filter="modulo" aria-label="Filtrar por assunto">
          <option value="">Todos os assuntos</option>
          ${categories.map((c) => `<option value="${c.id}" ${filters.modulo === c.id ? "selected" : ""}>${c.nome}</option>`).join("")}
        </select>
        <select class="hc-select" data-filter="etapa" aria-label="Filtrar por etapa">
          <option value="">Todas as etapas</option>
          ${stages.map((s) => `<option value="${s.id}" ${filters.etapa === s.id ? "selected" : ""}>${s.nome}</option>`).join("")}
        </select>
        <select class="hc-select" data-filter="papel" aria-label="Filtrar por papel">
          <option value="">Todos os papéis</option>
          ${roles.filter((r) => r.id !== "super_admin").map((r) => `<option value="${r.id}" ${filters.papel === r.id ? "selected" : ""}>${r.nome}</option>`).join("")}
        </select>
        <select class="hc-select" data-filter="formato" aria-label="Filtrar por formato">
          <option value="">Todos os formatos</option>
          ${formats.map((f) => `<option value="${f.id}" ${filters.formato === f.id ? "selected" : ""}>${f.nome}</option>`).join("")}
        </select>
        ${hasFilters ? `<button class="hc-btn hc-btn--text hc-btn--sm hc-clear" type="button" data-clear-filters>Limpar filtros</button>` : ""}
      </div>
      <p class="hc-result-count">${results.length} ${results.length === 1 ? "resultado" : "resultados"}${hasFilters ? " com os filtros atuais" : ""}</p>
      ${results.length ? `<div class="hc-card-list">${results.map(({ article }) => articleCard(article)).join("")}</div>` : emptyState("Nada encontrado com esses termos.", "Tente uma palavra mais simples, como “planilha”, “ciclo” ou “PDI”. Você também pode falar com o suporte.")}
      ${termResults.length ? `
        <section class="hc-section">
          <div class="hc-section-head"><div><p class="hc-eyebrow">Glossário</p><h2>Termos que combinam com a busca</h2></div><a class="hc-link-more" href="#/ajuda/glossario">Abrir glossário ${icon("arrowRight", "icon--sm")}</a></div>
          ${termResults.slice(0, 6).map((term) => `<div class="hc-term"><h3>${esc(term.termo)}</h3><p>${esc(term.definicao)}</p>${term.artigo ? `<a href="${articleHref(term.artigo)}">Ler o artigo relacionado ${icon("arrowRight", "icon--sm")}</a>` : ""}</div>`).join("")}
        </section>` : ""}
    `;
  }

  function renderVideos(selectedPlaylistId, selectedVideoId) {
    const firstWithVideo = playlists.find((p) => videos.some((v) => v.playlist === p.id))?.id || playlists[0].id;
    const playlistId = playlistById.has(selectedPlaylistId) ? selectedPlaylistId : firstWithVideo;
    const playlist = playlistById.get(playlistId);
    const list = videos.filter((v) => v.playlist === playlistId);
    const selected = list.find((v) => v.id === selectedVideoId) || list[0];

    const stage = selected ? `
      <div class="hc-video-stage">
        ${videoFrame(selected)}
        <div class="hc-video-stage-body">
          <span class="hc-badge hc-badge--video">${icon("video")} Tutorial · ${selected.duracao}</span>
          <h2>${esc(selected.titulo)}</h2>
          <p>${esc(selected.resumo)}</p>
          ${chaptersList(selected)}
          ${videoNotice()}
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
            <a class="hc-btn hc-btn--primary hc-btn--sm" href="${articleHref(selected.artigo)}">Ler o passo a passo ${icon("arrowRight", "icon--sm")}</a>
            <a class="hc-btn hc-btn--ghost hc-btn--sm" href="${categoryHref("pessoas")}">Ver artigos de Pessoas</a>
          </div>
        </div>
      </div>` : `
      <div class="hc-empty">
        <h3>${esc(playlist.nome)} está em produção</h3>
        <p>Esta playlist ainda não tem vídeo publicado. Enquanto isso, o assunto está coberto em texto na Central.</p>
        <a class="hc-btn hc-btn--primary hc-btn--sm" href="${categoryHref(playlistId)}">Ver conteúdos de ${esc(playlist.nome)} ${icon("arrowRight", "icon--sm")}</a>
      </div>`;

    return `
      <div class="hc-breadcrumb"><a href="#/ajuda">Ajuda</a>${icon("chevronRight", "icon--sm")}<span>Vídeos</span></div>
      <header class="hc-page-head">
        <p class="hc-eyebrow">Biblioteca de vídeos</p>
        <h1>Aprenda assistindo</h1>
        <p>Tutoriais curtos, com capítulos. O vídeo complementa o artigo; o texto continua sendo a fonte completa.</p>
      </header>
      <div class="hc-video-layout">
        <aside class="hc-playlists" aria-label="Playlists">
          ${playlists.map((p) => `
            <button class="hc-playlist ${p.id === playlistId ? "is-active" : ""}" type="button" data-playlist="${p.id}">
              ${icon("video")}<span>${esc(p.nome)}</span><small>${esc(p.status)}</small>
            </button>`).join("")}
        </aside>
        <div class="hc-video-main">
          <div class="hc-context" style="margin:0">${icon("video")} <span><strong>${esc(playlist.nome)}</strong> · ${esc(playlist.descricao)}</span></div>
          ${stage}
          ${list.length > 1 ? `<div class="hc-card-list">${list.filter((v) => v.id !== selected?.id).map((v) => `<a class="hc-card" href="#/ajuda/videos/${playlistId}/${v.id}"><h3>${esc(v.titulo)}</h3><p>${esc(v.resumo)}</p></a>`).join("")}</div>` : ""}
        </div>
      </div>`;
  }

  function renderGlossary(params) {
    const q = params.get("q") || "";
    const filtered = q ? searchTerms(q) : terms;
    const groups = new Map();
    filtered.forEach((term) => {
      const letter = norm(term.termo)[0]?.toUpperCase() || "#";
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter).push(term);
    });
    const sorted = Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));

    return `
      <div class="hc-breadcrumb"><a href="#/ajuda">Ajuda</a>${icon("chevronRight", "icon--sm")}<span>Glossário</span></div>
      <header class="hc-page-head">
        <p class="hc-eyebrow">${terms.length} termos</p>
        <h1>Glossário da Sipclick</h1>
        <p>Definições curtas para não confundir ciclo, grau, fonte, competência, potencial e Nine Box.</p>
      </header>
      <div class="hc-search-box hc-glossary-search">
        ${icon("search")}
        <input id="glossarySearch" type="search" value="${esc(q)}" placeholder="Busque um termo: nine box, potencial, ciclo…" autocomplete="off" aria-label="Buscar termo no glossário" />
      </div>
      <div id="glossaryList">
        ${sorted.length ? sorted.map(([letter, items]) => `
          <section class="hc-glossary-group" data-glossary-group>
            <div class="hc-glossary-letter">${esc(letter)}</div>
            ${items.map((term) => `<div class="hc-term" data-term-text="${esc(norm(`${term.termo} ${term.definicao}`))}">
              <h3>${esc(term.termo)}</h3>
              <p>${esc(term.definicao)}</p>
              ${term.artigo ? `<a href="${articleHref(term.artigo)}">Ler o artigo relacionado ${icon("arrowRight", "icon--sm")}</a>` : ""}
            </div>`).join("")}
          </section>`).join("") : emptyState("Termo não encontrado.", "Tente outra palavra ou abra a busca completa.")}
      </div>`;
  }

  function emptyState(title, text) {
    return `<div class="hc-empty"><h3>${esc(title)}</h3><p>${esc(text)}</p><button class="hc-btn hc-btn--ghost hc-btn--sm" type="button" data-suporte>${icon("message", "icon--sm")} Falar com o suporte</button></div>`;
  }

  function notFound(message) {
    return `<div class="hc-empty" style="margin-top:40px"><h3>Conteúdo não encontrado</h3><p>${esc(message)}</p><a class="hc-btn hc-btn--primary hc-btn--sm" href="#/ajuda">Voltar para a Central</a></div>`;
  }

  /* --------------------------------------------------------------------- */
  /* Sidebar                                                                */
  /* --------------------------------------------------------------------- */

  function renderSidebar(route) {
    const links = [
      { id: "home", label: "Início", href: "#/ajuda", icon: "i-help", active: route.name === "home" },
      ...categories.map((c) => ({
        id: c.id, label: c.nome, href: categoryHref(c.id), icon: c.icone,
        count: articleCount(c.id), active: (route.name === "category" && route.category === c.id) || (route.name === "glossary" && c.id === "glossario") || (route.name === "article" && byId.get(route.articleId)?.modulo === c.id),
      })),
      { id: "videos", label: "Vídeos", href: "#/ajuda/videos", icon: "i-video", count: videos.length, active: route.name === "videos" },
    ];

    sidebar.innerHTML = `
      <div class="hc-side-title">Navegar</div>
      <nav class="hc-side-nav">
        ${links.map((link) => `
          <a class="hc-side-link ${link.active ? "is-active" : ""}" href="${link.href}">
            ${icon(link.icon.replace("i-", ""))}
            <span>${esc(link.label)}</span>
            ${typeof link.count === "number" ? `<span class="hc-side-count">${link.count}</span>` : ""}
          </a>`).join("")}
      </nav>
      <div class="hc-side-sep"></div>
      <div class="hc-side-card">
        <h3>Precisa de ajuda agora?</h3>
        <p>Abra o atalho em qualquer tela, sem perder o que estava fazendo.</p>
        <button class="hc-btn hc-btn--ghost hc-btn--sm" type="button" data-open-quick>${icon("help", "icon--sm")} Abrir atalho de ajuda</button>
      </div>`;
  }

  /* --------------------------------------------------------------------- */
  /* Router                                                                 */
  /* --------------------------------------------------------------------- */

  function parseRoute() {
    const raw = location.hash.replace(/^#/, "") || "/ajuda";
    const [path, query = ""] = raw.split("?");
    const params = new URLSearchParams(query);
    const parts = path.split("/").filter(Boolean);

    if (parts[0] !== "ajuda") return { name: "home", params, path: "/ajuda" };
    if (!parts[1]) return { name: "home", params };
    if (parts[1] === "categoria" && parts[2]) return { name: "category", category: parts[2], params };
    if (parts[1] === "artigo" && parts[2]) return { name: "article", articleId: parts[2], params };
    if (parts[1] === "videos") return { name: "videos", playlist: parts[2], video: parts[3], params };
    if (parts[1] === "glossario") return { name: "glossary", params };
    if (parts[1] === "busca") return { name: "search", params };
    return { name: "home", params };
  }

  function setTitle(title) {
    document.title = `${title} — Central de Ajuda Sipclick`;
  }

  function render() {
    const route = parseRoute();
    let html = "";
    let title = "Central de Ajuda";

    switch (route.name) {
      case "category":
        html = renderCategory(route.category, route.params);
        title = categoryName(route.category);
        break;
      case "article": {
        const article = byId.get(route.articleId);
        html = article ? articlePage(article, route.params) : notFound("Este artigo não existe ou foi renomeado.");
        title = article ? article.titulo : "Conteúdo não encontrado";
        break;
      }
      case "videos":
        html = renderVideos(route.playlist, route.video);
        title = "Vídeos";
        break;
      case "glossary":
        html = renderGlossary(route.params);
        title = "Glossário";
        break;
      case "search": {
        const q = route.params.get("q") || "";
        html = renderSearch(route.params);
        title = q ? `Busca: ${q}` : "Busca";
        break;
      }
      default:
        html = renderHome(route.params);
        title = "Central de Ajuda";
    }

    main.innerHTML = html;
    renderSidebar(route);
    setTitle(title);
    closeQuick(false);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function updateQuery(param, value, base) {
    const route = parseRoute();
    const current = new URLSearchParams(route.params.toString());
    if (value) current.set(param, value);
    else current.delete(param);
    const query = current.toString();
    location.hash = `${base || location.hash.split("?")[0]}${query ? `?${query}` : ""}`;
  }

  function clearFilters() {
    const path = location.hash.split("?")[0];
    location.hash = path;
  }

  /* --------------------------------------------------------------------- */
  /* Atalho rápido                                                          */
  /* --------------------------------------------------------------------- */

  let lastFocus = null;
  let quickQuery = "";

  function quickModule() {
    const route = parseRoute();
    if (route.name === "article") return byId.get(route.articleId)?.modulo || null;
    if (route.name === "category") return route.category;
    return null;
  }

  function quickArticles() {
    const mod = quickModule();
    if (mod) {
      const list = articles.filter((a) => a.modulo === mod);
      if (list.length) return list.slice(0, 5);
    }
    return recommendations().map((id) => byId.get(id)).filter(Boolean);
  }

  function renderQuick() {
    const q = quickQuery.trim();
    const mod = quickModule();
    if (q) {
      const results = searchArticles(q).slice(0, 6);
      quickBody.innerHTML = `
        <h3>Resultados</h3>
        ${results.length ? results.map(({ article }) => `
          <a class="hc-panel-item" href="${articleHref(article.id)}">
            ${icon(article.videoId ? "video" : "book")}
            <span>${esc(article.titulo)}</span>
            <small>${esc(formatName(article.formato))}</small>
          </a>`).join("") : `<p class="hc-panel-empty">Nada encontrado. Tente “planilha”, “ciclo”, “meta” ou “PDI”.</p>`}
        <h3>Buscar em toda a Central</h3>
        <a class="hc-panel-item" href="#/ajuda/busca?q=${encodeURIComponent(q)}">${icon("search")} <span>Ver todos os resultados para “${esc(q)}”</span>${icon("arrowRight", "icon--sm")}</a>`;
      return;
    }

    quickBody.innerHTML = `
      ${mod ? `<div class="hc-panel-context">${icon("compass")} <span>Você está em <strong>${esc(categoryName(mod))}</strong></span></div>` : ""}
      <h3>Sugeridos para você</h3>
      ${quickArticles().map((article) => `
        <a class="hc-panel-item" href="${articleHref(article.id)}">
          ${icon(article.videoId ? "video" : "book")}
          <span>${esc(article.titulo)}</span>
          <small>${article.tempo} min</small>
        </a>`).join("")}
      <h3>Atalhos</h3>
      ${shortcuts().map((article) => `
        <a class="hc-panel-item" href="${articleHref(article.id)}">
          ${icon("arrowRight")}<span>${esc(article.titulo)}</span>
        </a>`).join("")}`;
  }

  function openQuick() {
    lastFocus = document.activeElement;
    renderQuick();
    quickOverlay.hidden = false;
    quickPanel.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => quickSearch.focus(), 40);
  }

  function closeQuick(restore = true) {
    if (quickPanel.hidden) return;
    quickPanel.hidden = true;
    quickOverlay.hidden = true;
    document.body.style.overflow = "";
    quickSearch.value = "";
    quickQuery = "";
    if (restore && lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function trapFocus(event) {
    if (quickPanel.hidden || event.key !== "Tab") return;
    const focusables = $$("a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex='-1'])", quickPanel)
      .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* --------------------------------------------------------------------- */
  /* Vídeo                                                                  */
  /* --------------------------------------------------------------------- */

  function startVideo(container, videoId, seconds = 0) {
    const video = videoById.get(videoId);
    if (!video || !container) return;
    container.classList.add("is-playing");
    container.innerHTML = `<video controls autoplay playsinline preload="metadata" poster="${video.poster}">
      <source src="${video.src}" type="video/mp4" />
      Seu navegador não suporta vídeo HTML5.
    </video>`;
    const element = $("video", container);
    if (seconds > 0) {
      element.addEventListener("loadedmetadata", () => { element.currentTime = seconds; }, { once: true });
    }
    element.play().catch(() => {});
  }

  function playVideo(videoId, seconds = 0) {
    const frame = $(`[data-video-frame="${videoId}"]`);
    if (!frame) return;
    const already = $("video", frame);
    if (already) {
      if (seconds > 0) already.currentTime = seconds;
      already.play().catch(() => {});
      return;
    }
    startVideo(frame, videoId, seconds);
  }

  /* --------------------------------------------------------------------- */
  /* Eventos                                                                */
  /* --------------------------------------------------------------------- */

  document.addEventListener("click", (event) => {
    if (event.target.closest('#quickPanel a[href^="#/"]')) {
      setTimeout(() => closeQuick(false), 10);
    }

    const acc = event.target.closest("[data-acc]");
    if (acc) {
      const panel = document.getElementById(acc.dataset.acc);
      const open = acc.getAttribute("aria-expanded") === "true";
      acc.setAttribute("aria-expanded", String(!open));
      panel?.classList.toggle("is-open", !open);
      return;
    }

    const play = event.target.closest("[data-play-video]");
    if (play) {
      event.preventDefault();
      playVideo(play.dataset.playVideo, 0);
      return;
    }

    const chapter = event.target.closest("[data-chapter]");
    if (chapter) {
      event.preventDefault();
      playVideo(chapter.dataset.chapter, Number(chapter.dataset.seconds || 0));
      return;
    }

    const feedback = event.target.closest("[data-feedback]");
    if (feedback) {
      const box = feedback.closest("[data-feedback-box]");
      if (box) {
        box.innerHTML = `<p>${feedback.dataset.feedback === "sim" ? "Que bom. Obrigado pelo retorno." : "Obrigado. Vamos usar esse sinal para melhorar o conteúdo."}</p><span class="hc-feedback-note">Feedback registrado apenas neste protótipo</span>`;
      }
      showToast(feedback.dataset.feedback === "sim" ? "Feedback registrado: resolveu." : "Feedback registrado: precisa melhorar.");
      return;
    }

    if (event.target.closest("[data-suporte]")) {
      showToast("No produto, abre o canal de suporte ou o formulário de contato.");
      return;
    }

    const openQuickBtn = event.target.closest("[data-open-quick]");
    if (openQuickBtn) {
      event.preventDefault();
      openQuick();
      return;
    }

    const playlist = event.target.closest("[data-playlist]");
    if (playlist) {
      location.hash = `#/ajuda/videos/${playlist.dataset.playlist}`;
      return;
    }

    const clear = event.target.closest("[data-clear-filters]");
    if (clear) {
      event.preventDefault();
      clearFilters();
      return;
    }

    const toc = event.target.closest("[data-toc]");
    if (toc) {
      event.preventDefault();
      const target = document.getElementById(`artigo-sec-${toc.dataset.toc}`);
      if (target) {
        const panel = target;
        if (!panel.classList.contains("is-open")) {
          const button = panel.previousElementSibling;
          button?.click();
        }
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (event.target.closest("#openFullHelp")) {
      closeQuick(false);
      return;
    }

    if (event.target.closest(".hc-back-app")) {
      event.preventDefault();
      showToast("No produto, este link volta para a última tela sem perder o contexto.");
      return;
    }

    if (event.target.closest("#headerSearch")) {
      event.preventDefault();
      openQuick();
    }
  });

  document.addEventListener("change", (event) => {
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      const route = parseRoute();
      const base = route.name === "search" ? "#/ajuda/busca" : `#/ajuda/categoria/${route.category}`;
      updateQuery(filter.dataset.filter, filter.value, base);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "heroSearchForm" || event.target.id === "searchPageForm") {
      event.preventDefault();
      const q = new FormData(event.target).get("q") || "";
      location.hash = `#/ajuda/busca?q=${encodeURIComponent(String(q).trim())}`;
    }
    if (event.target.id === "quickSearchForm") {
      event.preventDefault();
      const q = quickSearch.value.trim();
      if (q) {
        closeQuick(false);
        location.hash = `#/ajuda/busca?q=${encodeURIComponent(q)}`;
      }
    }
  });

  quickSearch.addEventListener("input", () => {
    quickQuery = quickSearch.value;
    renderQuick();
  });

  roleSelect.addEventListener("change", () => {
    currentRole = roleSelect.value;
    localStorage.setItem(STORE_ROLE, currentRole);
    render();
    showToast(`Agora a Central mostra as recomendações de ${roleById.get(currentRole)?.nome || currentRole}.`);
  });

  $("#helpFab").addEventListener("click", openQuick);
  $("#quickClose").addEventListener("click", () => closeQuick());
  quickOverlay.addEventListener("click", () => closeQuick());

  document.addEventListener("keydown", (event) => {
    trapFocus(event);

    if (event.key === "Escape" && !quickPanel.hidden) {
      event.preventDefault();
      closeQuick();
      return;
    }

    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if (!typing && (event.key === "?" || (event.key === "/"))) {
      event.preventDefault();
      openQuick();
    }
  });

  // Busca local do glossário, sem recarregar a rota.
  document.addEventListener("input", (event) => {
    if (event.target.id !== "glossarySearch") return;
    const q = norm(event.target.value);
    $$("[data-glossary-group]").forEach((group) => {
      let visible = 0;
      $$("[data-term-text]", group).forEach((term) => {
        const show = !q || term.dataset.termText.includes(q);
        term.style.display = show ? "" : "none";
        if (show) visible += 1;
      });
      group.style.display = visible ? "" : "none";
    });
  });

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  window.addEventListener("hashchange", render);
  if (!location.hash) history.replaceState(null, "", "#/ajuda");
  render();
})();
