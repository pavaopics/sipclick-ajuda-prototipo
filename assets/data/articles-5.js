const ARTICLES_5 = [
  {
    id: "avaliacao-de-impacto",
    titulo: "Existe avaliação de impacto no produto?",
    resumo: "Não existe um tipo de avaliação de impacto, nota de impacto por pessoa ou eixo de impacto no Nine Box. Entenda o que existe com esse nome.",
    modulo: "desempenho",
    etapa: "entender",
    formato: "faq",
    papeis: ["todos"],
    tempo: 2,
    atualizado: "2026-10-27",
    tags: ["impacto", "avaliação de impacto", "matriz de priorização", "urgência", "simulação", "pdi", "insight"],
    aliases: ["tem avaliação de impacto", "nota de impacto", "eixo de impacto", "impacto x urgência"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Resposta curta",
        blocos: [
          p("Não. Os tipos de avaliação do produto são autoavaliação, avaliação do líder, avaliação de pares e avaliação de liderados. Não existe um tipo chamado 'avaliação de impacto', uma nota de impacto por pessoa, um eixo de impacto no Nine Box nem uma etapa de impacto na jornada."),
          callout("info", "Se você procura medir efeito", "O produto mostra notas antes e depois no PDI e uma dispersão execução × mudança. Isso é associação observada, não prova de que o PDI causou a mudança."),
        ],
      },
      {
        titulo: "O que existe com o nome 'impacto'",
        blocos: [
          table(
            ["Onde", "O que é", "O que não é"],
            [
              ["Matriz de Priorização do PDI", "Uma visualização de impacto × urgência calculada pela média do pilar: impacto alto se média < 6, médio se < 7, baixo se ≥ 7; urgência alta se < 6, média se < 8, baixa se ≥ 8.", "Não é avaliação formal, nota de impacto ou decisão de carreira."],
              ["Simulação da Metodologia", "Prévia de quantas pessoas mudam de quadrante, entram ou saem da matriz ao trocar pesos e cortes.", "Não é avaliação de pessoas."],
              ["Insights e achados analíticos", "Score de priorização de alertas (alto, médio, baixo).", "Não é uma dimensão de desempenho."],
            ]
          ),
        ],
      },
      {
        titulo: "Como medir efeito sem inventar causalidade",
        blocos: [
          list([
            "Compare a nota da competência antes e depois de um ciclo de PDI.",
            "Olhe a dispersão execução × mudança com o rótulo correto: associação observada.",
            "Não afirme que o curso ou o PDI causou a melhora sem um grupo de comparação.",
            "Se a empresa precisa de avaliação de impacto formal, isso é um novo desenho de produto, não uma configuração da tela atual.",
          ], { check: true }),
        ],
      },
    ],
    relacionados: ["calibracao-comite", "kpis-analytics-formulas", "jornada-90-dias", "nota-competencias"],
  },
];
