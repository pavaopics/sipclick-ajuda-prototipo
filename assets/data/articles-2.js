const ARTICLES_2 = [
  {
    id: "criar-ciclo-avaliacao",
    titulo: "Criar e ativar um ciclo de avaliação",
    resumo: "Datas, grau, fontes e flags: o que precisa estar certo antes de liberar as avaliações para o time.",
    modulo: "desempenho",
    etapa: "configurar",
    formato: "guia",
    papeis: ["admin_rh"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["ciclo", "avaliação", "criar ciclo", "ativo", "datas", "grau", "90", "180", "270", "360"],
    aliases: ["abrir avaliação", "iniciar ciclo", "configurar ciclo", "período de avaliação"],
    prerequisitos: ["Pessoas cadastradas e hierarquia conferida.", "Metodologia revisada (pesos e cortes)."],
    secoes: [
      {
        titulo: "Antes de criar",
        blocos: [
          list([
            "Só um ciclo fica ativo por vez. Os demais ficam com status derivado das datas.",
            "O grau define as fontes: 90 só líder; 180 auto + líder; 270 auto + líder + pares; 360 auto + líder + pares + liderados.",
            "O ciclo usa a metodologia congelada na primeira leitura. Mudanças posteriores valem para os próximos ciclos.",
          ], { check: true }),
        ],
      },
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Abra Ciclos de Avaliação", texto: "Fica dentro de Desempenho ou na engrenagem de configurações, conforme o seu menu." },
            { titulo: "Crie o ciclo", texto: "Informe nome, descrição, data de início e fim. Nome vazio ou data inválida bloqueiam." },
            { titulo: "Escolha o grau", texto: "90, 180, 270 ou 360. O grau manda nas fontes coletadas e na fila de cada pessoa." },
            { titulo: "Defina as flags", texto: "Autoavaliação, avaliação do líder, lembrete por e-mail e antecedência do lembrete. Em ciclos antigos, os pesos legados continuam disponíveis." },
            { titulo: "Ative", texto: "Ao ativar, o ciclo passa a orientar a Home, a fila de avaliação, metas e o Nine Box daquele período." },
            { titulo: "Comunique o prazo", texto: "A avaliação continua editável enquanto o ciclo estiver aberto. Depois do fim, o servidor recusa gravação." },
          ]),
        ],
      },
      {
        titulo: "Status do ciclo",
        blocos: [
          table(
            ["Status", "Quando aparece"],
            [
              ["Não iniciado", "A data de início ainda não chegou."],
              ["Em andamento", "Está dentro da janela de início e fim."],
              ["Finalizado", "A data de fim passou. O ciclo não aceita novas gravações."],
            ]
          ),
          callout("warn", "Data de fim não é relatório", "O ciclo finalizado encerra a janela de escrita, mas não gera sozinho um relatório de fechamento. Use a People Analytics para ler conclusão, cobertura e pendências."),
        ],
      },
    ],
    relacionados: ["graus-90-180-270-360", "avaliacao-pendente", "enviar-editar-avaliacao", "metodologia-pesos-cortes"],
  },

  {
    id: "graus-90-180-270-360",
    titulo: "Graus 90, 180, 270 e 360: quais avaliações o ciclo coleta",
    resumo: "O grau não é a nota. Ele define quais fontes existem no ciclo e quem avalia quem.",
    modulo: "desempenho",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["grau", "90", "180", "270", "360", "fontes", "autoavaliação", "pares", "liderados"],
    aliases: ["avaliação 360", "diferença 180 e 360", "quem me avalia"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "A tabela dos graus",
        blocos: [
          table(
            ["Grau", "Fontes coletadas", "Para quem faz sentido"],
            [
              ["90", "Avaliação do líder.", "Ciclo simples, foco no gestor imediato."],
              ["180", "Autoavaliação + avaliação do líder.", "Feedback com reflexão da pessoa e leitura do gestor."],
              ["270", "Autoavaliação + líder + pares.", "Times com trabalho transversal e necessidade de leitura lateral."],
              ["360", "Autoavaliação + líder + pares + liderados.", "Lideranças e papéis com impacto em várias direções."],
            ]
          ),
        ],
      },
      {
        titulo: "O que não é fonte",
        blocos: [
          p("Metas e potencial não são fontes de avaliação. São etapas dentro da avaliação gerencial: o líder responde metas; o líder responde potencial. A autoavaliação só recebe a etapa de metas em um modo específico de nota (média entre auto e gestor)."),
          callout("info", "Pares e liderados têm mínimo", "Por padrão, a média de pares e de liderados só conta com pelo menos 3 respostas. Abaixo disso, a fonte é anulada para preservar o anonimato."),
          callout("warn", "Grau não garante nota", "O grau define o que é coletado. O peso de cada fonte na nota final vem da metodologia do ciclo. No padrão legado, autoavaliação pode ter peso zero."),
        ],
      },
      {
        titulo: "Se o ciclo não tem grau explícito",
        blocos: [
          p("O sistema tenta derivar pelas flags antigas de autoavaliação e avaliação do líder. Sem nenhuma informação, assume 180. O grau explícito sempre vence."),
        ],
      },
    ],
    relacionados: ["criar-ciclo-avaliacao", "nota-competencias", "autoavaliacao", "avaliar-time"],
  },

  {
    id: "autoavaliacao",
    titulo: "Como fazer sua autoavaliação",
    resumo: "O que responder em cada etapa, como o rascunho é salvo e o que muda quando você envia.",
    modulo: "desempenho",
    etapa: "avaliar",
    formato: "guia",
    papeis: ["colaborador", "gestor", "admin_rh"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["autoavaliação", "avaliação", "responder", "rascunho", "envio", "competências", "metas"],
    aliases: ["minha avaliação", "responder avaliação", "salvar avaliação"],
    prerequisitos: ["Ciclo ativo com fonte de autoavaliação (grau 180, 270 ou 360).", "Estar vinculado ao organograma."],
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Abra a avaliação", texto: "Na Home, o card de Desempenho mostra a tarefa com o rótulo do seu papel (por exemplo, 'Minha autoavaliação')." },
            { titulo: "Percorra as etapas", texto: "As etapas nascem dos módulos ativos: uma por pilar de competência, metas quando o modo de nota prevê e finalização sempre." },
            { titulo: "Dê as notas", texto: "As competências usam a escala do ciclo (normalmente 0 a 10, passo 0,5). Nota ausente não vira zero; ela fica pendente." },
            { titulo: "Escreva os comentários", texto: "Comentários ajudam na conversa de feedback e no PDI. Não há penalidade por texto curto, mas evite deixar em branco quando o campo for pedido." },
            { titulo: "Revise a finalização", texto: "A tela final resume o que foi respondido. Enquanto o ciclo estiver aberto, você pode voltar e ajustar." },
            { titulo: "Envie", texto: "O envio grava a data de finalização. A avaliação deixa de aparecer como pendente, mas continua editável até o fim do ciclo." },
          ]),
        ],
      },
      {
        titulo: "O que acontece com a sua nota",
        blocos: [
          p("A autoavaliação é sempre coletada, mas o peso dela na nota final depende da metodologia do ciclo. No padrão legado, o peso é zero e ela serve para comparação. Em modelos mais novos, pode valer 50%."),
          callout("info", "Por que a nota final pode ser diferente da sua", "A nota final combina fontes com pesos e pode incluir metas. Sua autoavaliação é uma das entradas, não o resultado final."),
          callout("warn", "Enviar não é congelar", "O envio marca a finalização. Se o ciclo ainda estiver aberto, você pode reabrir, ajustar e enviar de novo. Depois do fim do ciclo, o servidor recusa gravação."),
        ],
      },
    ],
    relacionados: ["avaliar-time", "enviar-editar-avaliacao", "avaliacao-pendente", "nota-competencias"],
  },

  {
    id: "avaliar-time",
    titulo: "Como avaliar seu time (avaliação do líder)",
    resumo: "Competências, metas e potencial: a ordem das etapas e o que fazer quando falta informação.",
    modulo: "desempenho",
    etapa: "avaliar",
    formato: "guia",
    papeis: ["gestor", "admin_rh"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["avaliação do líder", "gerencial", "gestor", "liderados", "competências", "metas", "potencial"],
    aliases: ["avaliar equipe", "avaliação gerencial", "avaliar subordinado", "dar nota"],
    prerequisitos: ["Ciclo ativo com fonte de avaliação do líder.", "Liderados diretos vinculados no organograma."],
    secoes: [
      {
        titulo: "Quem você avalia",
        blocos: [
          p("A fila do ciclo é montada por pessoa. Como líder, você avalia seus liderados diretos. Em ciclos 270 e 360, também pode haver uma avaliação do seu próprio líder sobre você. Pares não entram na sua fila como avaliador nesta fase do produto."),
          callout("info", "Escopo", "Você só vê e avalia quem está na sua linha hierárquica. Se alguém não aparece, confira o organograma e o vínculo de gestor."),
        ],
      },
      {
        titulo: "As etapas da avaliação gerencial",
        blocos: [
          steps([
            { titulo: "Competências", texto: "Uma etapa por pilar ativo. Dê a nota de cada competência na escala do ciclo e complemente com comentário quando fizer sentido." },
            { titulo: "Metas", texto: "A etapa lê as metas canônicas do colaborador no ciclo. Metas canceladas ou não aplicáveis não são pendência. Se não houver nota medida, o sistema pode pedir a nota do gestor conforme a régua." },
            { titulo: "Potencial", texto: "Quando o potencial está ligado, responda os fatores (5 fatores ou 3 indicadores Korn Ferry). Fator sem resposta deixa o potencial incompleto." },
            { titulo: "Finalização", texto: "Revise o resumo por pessoa e envie. O sistema avança para o próximo alvo da fila." },
          ]),
        ],
      },
      {
        titulo: "Cuidados que evitam retrabalho",
        blocos: [
          list([
            "Nota ausente não é zero. Deixe pendente só quando realmente faltar informação; o envio fica bloqueado enquanto houver pendência ativa.",
            "Metas são lidas do módulo de Metas. Corrija a meta na origem, não tente sobrescrever a nota no wizard.",
            "Potencial não é desempenho. Um avaliado com entrega alta pode ter potencial baixo, e isso não é contradição.",
            "O comitê de calibração acontece depois, no Nine Box. Não tente ajustar a nota para 'corrigir' o quadrante.",
          ], { check: true }),
        ],
      },
    ],
    relacionados: ["autoavaliacao", "nota-competencias", "graus-90-180-270-360", "calibracao-comite"],
  },

  {
    id: "enviar-editar-avaliacao",
    titulo: "Enviar, editar e reabrir uma avaliação",
    resumo: "O que o envio grava, até quando você pode mudar e o que significa apagar uma avaliação para sempre.",
    modulo: "desempenho",
    etapa: "avaliar",
    formato: "guia",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["envio", "finalizar", "editar", "reabrir", "rascunho", "apagar", "ciclo"],
    aliases: ["mudei a nota", "reabrir avaliação", "apagar avaliação", "enviar avaliação"],
    prerequisitos: ["Ciclo em andamento."],
    secoes: [
      {
        titulo: "Rascunho, pronto e enviado",
        blocos: [
          table(
            ["Estado", "O que significa"],
            [
              ["Rascunho", "Você começou a responder. O sistema salva automaticamente com um pequeno atraso."],
              ["Pronta", "Todas as etapas ativas estão completas, mas o envio ainda não foi feito."],
              ["Enviada", "A data de finalização foi gravada. A avaliação não aparece mais como pendente."],
            ]
          ),
        ],
      },
      {
        titulo: "Até quando dá para editar",
        blocos: [
          p("Enquanto o ciclo estiver aberto, você pode voltar, ajustar notas e enviar de novo. O envio não congela o conteúdo. Depois da data de fim, o servidor recusa novas gravações, mesmo que a tela ainda permita abrir."),
          callout("info", "Autosave não é envio", "O salvamento automático protege o que você digitou, mas não marca a avaliação como enviada. Só o botão de envio faz isso."),
        ],
      },
      {
        titulo: "Apagar para sempre",
        blocos: [
          p("Existe uma ação de apagar as avaliações feitas por você no ciclo. Ela remove os registros e também os PDIs gerados a partir deles. É uma ação destrutiva, não um rascunho."),
          callout("danger", "Pense duas vezes", "Se a intenção é apenas corrigir uma nota, edite e envie de novo. Apagar para sempre serve para recomeçar do zero e pode derrubar o PDI vinculado."),
        ],
      },
    ],
    relacionados: ["autoavaliacao", "avaliar-time", "avaliacao-pendente", "gerar-pdi"],
  },

  {
    id: "avaliacao-pendente",
    titulo: "Por que minha avaliação aparece pendente",
    resumo: "Pendência não é erro. Veja os motivos mais comuns e o que fazer em cada um.",
    modulo: "desempenho",
    etapa: "resolver",
    formato: "problema",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["pendente", "não consigo enviar", "avaliação", "ciclo", "bloqueado", "nota faltando"],
    aliases: ["avaliação travada", "não finaliza", "por que pendente", "etapa incompleta"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Checklist rápido",
        blocos: [
          steps([
            { titulo: "Existe ciclo ativo?", texto: "Sem ciclo em andamento, não há fila de avaliação. Confirme as datas do ciclo." },
            { titulo: "Você está na fila certa?", texto: "A fila depende do grau e da hierarquia. Se você não é líder de ninguém e o ciclo é 90, por exemplo, pode não haver avaliação para você." },
            { titulo: "Falta alguma nota?", texto: "Competência sem nota, meta sem nota elegível ou fator de potencial sem resposta mantêm a etapa aberta." },
            { titulo: "Algum módulo está desligado?", texto: "Etapa de módulo desligado não é pendência. Se Competências ou Metas estão desligadas na metodologia, elas saem da jornada." },
            { titulo: "A avaliação foi enviada?", texto: "Completar todas as notas deixa a avaliação 'pronta', mas o envio é um clique separado." },
            { titulo: "O ciclo já terminou?", texto: "Depois do fim, o servidor recusa gravação. A pendência pode ser apenas janela fechada." },
          ]),
        ],
      },
      {
        titulo: "Sintoma x causa",
        blocos: [
          table(
            ["O que você vê", "Causa provável", "Ação"],
            [
              ["A etapa não fecha", "Falta nota em uma competência ou fator.", "Percorra a etapa e confira os itens sem resposta."],
              ["A meta está sem nota", "A meta não tem lançamento ou régua manual sem nota do gestor.", "Lance o resultado na origem ou peça ao gestor para fechar a nota."],
              ["O botão de enviar não responde", "Há pendência ativa ou o ciclo já terminou.", "Confira as pendências e as datas."],
              ["A avaliação sumiu", "Filtro de ciclo, troca de vínculo ou exclusão pelo autor.", "Confira o ciclo selecionado e o histórico."],
              ["O colaborador não aparece na minha fila", "Hierarquia desatualizada ou escopo diferente.", "Ajuste o gestor no organograma."],
            ]
          ),
        ],
      },
    ],
    relacionados: ["enviar-editar-avaliacao", "criar-ciclo-avaliacao", "graus-90-180-270-360", "meta-sem-nota-cancelada"],
  },

  {
    id: "nota-competencias",
    titulo: "Como a nota de competências é calculada",
    resumo: "Média por item ou por fonte, pesos, mínimo de respostas e a regra que nunca transforma dado ausente em zero.",
    modulo: "desempenho",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["nota", "competência", "cálculo", "média", "peso", "fonte", "líder", "autoavaliação", "pares"],
    aliases: ["como é calculada a nota", "média ponderada", "por que minha nota mudou", "peso da autoavaliação"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Primeiro, a média de cada fonte",
        blocos: [
          p("Cada fonte (autoavaliação, líder, pares, liderados) tem uma média de competências. A média pode ser plana — soma das notas válidas dividida pela quantidade — ou ponderada por competência, quando a metodologia define pesos."),
          formula("Média ponderada por competência", "nota = Σ(nota da competência × peso) ÷ Σ(peso)", "Se pesos não existirem, todas as competências valem 1 e o resultado é a média simples. Sem nenhuma nota, o resultado é nulo, nunca zero."),
        ],
      },
      {
        titulo: "Depois, a combinação entre fontes",
        blocos: [
          p("Há dois modos. Em 'por fonte', cada fonte vira uma média e as médias são ponderadas pelos pesos das fontes. Em 'por item', cada competência é combinada entre as fontes que responderam aquele item e só depois as competências são agregadas."),
          table(
            ["Modo", "Como combina", "Efeito prático"],
            [
              ["Por fonte", "Média de cada fonte × peso da fonte.", "Uma fonte sem nota pode ser excluída e os pesos renormalizados."],
              ["Por item", "Cada competência combina só as fontes presentes, renormalizando.", "Fonte que não respondeu um item não puxa aquele item para baixo."],
            ]
          ),
        ],
      },
      {
        titulo: "Pesos, mínimos e ausência",
        blocos: [
          list([
            "O peso da autoavaliação depende da metodologia. No padrão legado é 0; em modelos mais novos pode ser 50.",
            "Pares e liderados têm mínimo de respostas (padrão 3). Abaixo disso, a média da fonte é anulada.",
            "Competência sem nota não entra na conta. Zero é uma nota válida e diferente de ausência.",
            "Se nenhuma nota existe, a média é nula. O sistema não inventa zero.",
          ]),
          formula("Exemplo com duas fontes", "Líder 8,0 e auto 6,0", "Pesos 100/0 → 8,0. Pesos 50/50 → 7,0. Em 'por item', a conta é feita item a item antes da média final."),
          callout("warn", "Por que a nota mudou sem você mexer?", "Pode ter entrado uma avaliação mais recente, uma meta pode ter recebido lançamento, o ciclo pode usar outra metodologia congelada ou o comitê pode ter mudado o nível do eixo no Nine Box. O comitê não altera a nota de competências."),
        ],
      },
    ],
    relacionados: ["metodologia-pesos-cortes", "graus-90-180-270-360", "nine-box-como-calculado", "avaliacao-pendente"],
  },

  {
    id: "calibracao-comite",
    titulo: "Calibração: o que é e como funciona o comitê",
    resumo: "O comitê ajusta o nível dos eixos com justificativa e histórico. Ele não muda a nota e não decide carreira.",
    modulo: "desempenho",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["calibração", "comitê", "nine box", "ajuste", "justificativa", "histórico", "divergência"],
    aliases: ["comitê de calibração", "ajustar quadrante", "calibrar time"],
    prerequisitos: ["Ciclo com avaliações e Nine Box calculado."],
    secoes: [
      {
        titulo: "O que o comitê faz",
        blocos: [
          p("A calibração é uma conversa de liderança para revisar a classificação das pessoas. No sistema, o comitê pode ajustar o nível de desempenho e de potencial de uma pessoa, mas precisa registrar uma justificativa. O evento fica no histórico do ciclo."),
          list([
            "O ajuste muda o nível do eixo e, portanto, o quadrante.",
            "A pontuação automática continua visível; o comitê não reescreve a nota.",
            "O nível final é o do comitê, quando existe; senão, o calculado.",
            "O histórico é imutável: cada decisão tem autor, data e motivo.",
          ]),
        ],
      },
      {
        titulo: "Quem pode fazer",
        blocos: [
          p("Admin e RH escrevem. Gestor abre a tela em leitura. A sessão do comitê tem modo pessoa a pessoa, fila com avanço automático e filtro de divergência alta entre autoavaliação e líder."),
          callout("info", "Filtro de divergência", "Use o filtro para priorizar conversas em que a autoavaliação e a avaliação do líder estão muito distantes. Divergência não é erro; é sinal de que a conversa importa."),
        ],
      },
      {
        titulo: "O que o comitê não é",
        blocos: [
          callout("danger", "Calibração não é promoção nem demissão", "O Nine Box orienta desenvolvimento. O comitê ajusta leitura, não salário, cargo ou desligamento. O quadrante baixo-baixo sugere plano de recuperação e realocação, não desligamento automático."),
        ],
      },
    ],
    relacionados: ["nine-box-como-calculado", "quadrantes-nine-box", "pessoa-fora-nine-box", "papeis-e-permissoes"],
  },

  {
    id: "nine-box-como-calculado",
    titulo: "Como o Nine Box é calculado",
    resumo: "Eixo X combina competências e metas; eixo Y vem do potencial. Cortes e aproximação mudam o quadrante.",
    modulo: "ninebox",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["nine box", "cálculo", "desempenho", "potencial", "cortes", "quadrante", "matriz", "0 a 100"],
    aliases: ["como calcula nine box", "eixo x e y", "matriz 3x3", "por que estou nesse quadrante"],
    prerequisitos: ["Ciclo com avaliações e potencial medido ou regra de aproximação."],
    secoes: [
      {
        titulo: "Os dois eixos",
        blocos: [
          p("Desempenho (eixo X) combina a média de competências e a média de metas pelos pesos da metodologia. Potencial (eixo Y) vem da média dos fatores de potencial na escala do ciclo."),
          formula("Eixo X (0 a 100)", "X = (médiaCompetências × 10) × pesoCompetências + (médiaMetas × 10) × pesoMetas", "Com competências 8,0 e metas 6,0 em 70/30: 56 + 18 = 74. O produto exibe 7,4."),
          formula("Eixo Y (0 a 100)", "Y = médiaPotencial × (100 ÷ escalaMáxima)", "Na escala 1–5, média 4 = 80. Na escala 0–10, média 4 = 40. A escala vem da metodologia do ciclo."),
        ],
      },
      {
        titulo: "Como vira quadrante",
        blocos: [
          p("Cada eixo é classificado em baixo, médio ou alto pelos cortes da metodologia. O cruzamento gera uma chave como alto-medio, que recebe o nome configurado no ciclo. Se a combinação não existir, cai no quadrante padrão de profissional consistente."),
          table(
            ["Corte", "Regra"],
            [
              ["Alto", "Pontuação maior ou igual ao corte alto (cortes em 0–10, multiplicados por 10 no motor)."],
              ["Médio", "Pontuação maior ou igual ao corte médio e abaixo do alto."],
              ["Baixo", "Abaixo do corte médio."],
            ]
          ),
        ],
      },
      {
        titulo: "Potencial ausente",
        blocos: [
          p("Se o potencial não foi medido, a metodologia decide: aproximar pelo desempenho (Y = X), deixar só para o comitê ou não gerar Nine Box. Na aproximação, a tela mostra que o eixo não é potencial medido."),
          callout("warn", "Mudar a régua muda o quadrante", "O mesmo dado bruto pode cair em células diferentes se os cortes ou os pesos mudarem. O ciclo usa a metodologia congelada; mudanças na Central valem para os próximos ciclos."),
        ],
      },
    ],
    relacionados: ["quadrantes-nine-box", "potencial-fatores-korn-ferry", "pessoa-fora-nine-box", "metodologia-pesos-cortes"],
  },

  {
    id: "quadrantes-nine-box",
    titulo: "O que cada quadrante do Nine Box significa",
    resumo: "Os nove quadrantes, o que sugerem de ação e por que o nome pode mudar conforme a metodologia.",
    modulo: "ninebox",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 5,
    atualizado: "2026-10-27",
    tags: ["quadrante", "nine box", "estrela", "talento", "especialista", "atenção", "desenvolvimento", "ação"],
    aliases: ["significado dos quadrantes", "estrela top talent", "baixo baixo é demissão", "alto potencial"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "A matriz",
        blocos: [
          table(
            ["Desempenho × Potencial", "Nome no padrão atual", "O que sugere"],
            [
              ["Alto × Alto", "Talento estratégico", "Sucessão, projeto estratégico, exposição à liderança sênior, coaching."],
              ["Médio × Alto", "Talento em desenvolvimento", "Desafios crescentes, mentoria sênior, trilha por gap."],
              ["Baixo × Alto", "Potencial não realizado", "Plano de aceleração, PDI focado, check-ins mais curtos."],
              ["Alto × Médio", "Alto desempenho", "Ampliar escopo, projetos transversais, reconhecimento."],
              ["Médio × Médio", "Profissional consistente", "Melhoria contínua, formação por gap, rotação."],
              ["Baixo × Médio", "Desempenho abaixo do esperado", "PDI, feedback estruturado, diagnóstico de gaps."],
              ["Alto × Baixo", "Especialista consistente", "Trilha de especialista, reconhecimento técnico, mentoria técnica."],
              ["Médio × Baixo", "Desenvolvimento direcionado", "Metas de consistência, check-in mensal, capacitação."],
              ["Baixo × Baixo", "Atenção prioritária", "Plano de recuperação, diagnóstico, acompanhamento próximo, realocação interna."],
            ]
          ),
        ],
      },
      {
        titulo: "Os nomes podem mudar",
        blocos: [
          p("O rótulo de cada célula vem da metodologia do ciclo. O padrão legado usa nomes como Estrela, Talento Emergente e Especialista Valioso; o padrão atual usa Talento estratégico, Potencial não realizado e Especialista consistente. A posição é a mesma; o nome não."),
          callout("info", "Leia o nome do seu ciclo", "Antes de discutir o quadrante, confira o rótulo configurado na Metodologia. Times diferentes podem usar nomes diferentes para a mesma célula."),
        ],
      },
      {
        titulo: "O que o quadrante não é",
        blocos: [
          callout("danger", "Não é sentença", "O Nine Box não é nota, ranking, probabilidade de promoção nem medida de valor da pessoa. Não decide promoção, demissão ou remuneração. O quadrante baixo-baixo não significa desligamento; significa prioridade de desenvolvimento."),
          callout("warn", "Cuidado com o efeito rótulo", "Um rótulo forte pode enviesar a conversa. Use o quadrante para orientar ação e converse com a pessoa usando evidências do ciclo, não o nome da célula."),
        ],
      },
    ],
    relacionados: ["nine-box-como-calculado", "calibracao-comite", "potencial-fatores-korn-ferry", "pessoa-fora-nine-box"],
  },

  {
    id: "potencial-fatores-korn-ferry",
    titulo: "Potencial: 5 fatores, Korn Ferry e aproximação",
    resumo: "Como o eixo Y é medido, o que cada modelo exige e o que significa quando o potencial não foi medido.",
    modulo: "ninebox",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["potencial", "5 fatores", "korn ferry", "ability", "aspiration", "engagement", "aproximação", "escala"],
    aliases: ["como mede potencial", "fatores de potencial", "potencial aproximado", "korn ferry"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Modelo de 5 fatores",
        blocos: [
          p("O líder avalia cinco fatores: Aprendizagem, Adaptabilidade, Complexidade, Visão Estratégica e Influência e Liderança. Cada um recebe uma nota na escala do ciclo."),
          formula("Média do potencial", "média = Σ(nota × peso) ÷ Σ(peso)", "Com pesos 25/20/25/15/15 e notas 4, 3, 5, 4, 4 → 4,05. Na escala 0–10, a pontuação é 40,5; na escala 1–5, é 81."),
          list([
            "Com a exigência de todos os fatores ligada, faltar um deixa o potencial incompleto.",
            "Sem pesos configurados, a média é simples.",
            "A classificação usa os cortes da metodologia; sem cortes, cai na régua legada de 2,5 e 3,5.",
          ]),
        ],
      },
      {
        titulo: "Modelo Korn Ferry",
        blocos: [
          p("O modelo usa três indicadores de prontidão: Ability (consegue o papel maior), Aspiration (quer o papel maior) e Engagement (quer ficar na empresa). A média só existe com os três respondidos e usa os mesmos cortes do potencial."),
          table(
            ["Indicador", "Pergunta central"],
            [
              ["Ability", "A pessoa consegue assumir um papel de maior complexidade?"],
              ["Aspiration", "A pessoa quer esse papel?"],
              ["Engagement", "A pessoa quer permanecer e se engajar na empresa?"],
            ]
          ),
        ],
      },
      {
        titulo: "Quando o potencial não foi medido",
        blocos: [
          table(
            ["Regra", "O que acontece no Nine Box"],
            [
              ["Aproximação pelo desempenho", "Y = X. A tela mostra que é aproximação, não potencial medido."],
              ["Somente comitê", "Y fica ausente até o comitê definir. A pessoa pode aparecer como pendente."],
              ["Sem Nine Box", "Y ausente e a pessoa fica fora da matriz."],
            ]
          ),
          callout("warn", "Aproximação não é medição", "Quando o eixo Y repete o desempenho, não trate o quadrante como leitura de potencial. É um retrato provisório até haver avaliação de potencial."),
        ],
      },
    ],
    relacionados: ["nine-box-como-calculado", "pessoa-fora-nine-box", "quadrantes-nine-box", "metodologia-pesos-cortes"],
  },

  {
    id: "pessoa-fora-nine-box",
    titulo: "Por que uma pessoa não aparece no Nine Box",
    resumo: "Sem avaliação, sem nota, avaliação incompleta ou potencial ausente: entenda cada pendência.",
    modulo: "ninebox",
    etapa: "resolver",
    formato: "problema",
    papeis: ["admin_rh", "gestor"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["nine box", "pendente", "não aparece", "sem avaliação", "sem nota", "incompleto", "potencial"],
    aliases: ["pessoa fora da matriz", "nine box incompleto", "cadê no nine box", "pendências nine box"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Os quatro motivos",
        blocos: [
          table(
            ["Motivo", "O que significa", "Como resolver"],
            [
              ["Sem avaliação", "Não há nenhum registro de avaliação no ciclo.", "Verifique a fila e o envio da avaliação."],
              ["Sem notas", "Há avaliação, mas nenhuma nota elegível para o score.", "Complete as competências e as metas."],
              ["Incompleto", "A metodologia marca incompleto quando um componente ativo não tem nota.", "Feche a pendência ou ajuste a regra da metodologia."],
              ["Potencial não medido", "Y ausente por regra 'somente comitê' ou 'sem Nine Box', ou faltou o potencial.", "Responda o potencial ou peça ao comitê para definir o nível."],
            ]
          ),
        ],
      },
      {
        titulo: "O que a tela mostra",
        blocos: [
          p("A matriz é parcial: quem não tem dado suficiente aparece em uma lista de pendentes com o motivo, fora do desenho 3x3. Isso é proposital. Pessoa sem nota nunca vira baixo-baixo por ausência."),
          callout("info", "Matriz parcial não é erro", "Um Nine Box com 80% de cobertura ainda é útil, desde que a leitura deixe claro quem ficou de fora e por quê. Olhe a cobertura antes de concluir qualquer coisa sobre o time."),
        ],
      },
      {
        titulo: "Se o motivo não bate",
        blocos: [
          list([
            "Confira se o ciclo selecionado é o certo. Avaliação de outro ciclo não entra.",
            "Confira se a pessoa está no escopo do seu papel.",
            "Se a avaliação foi enviada, veja se alguma nota ficou em branco.",
            "Se a metodologia exige todos os fatores de potencial, um fator faltante já basta para a pendência.",
          ]),
        ],
      },
    ],
    relacionados: ["nine-box-como-calculado", "potencial-fatores-korn-ferry", "avaliacao-pendente", "calibracao-comite"],
  },
];
