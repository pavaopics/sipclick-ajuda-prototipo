const ARTICLES_3 = [
  {
    id: "objetivo-meta-lancamento",
    titulo: "Objetivo, meta e lançamento: a diferença",
    resumo: "Objetivo dá a direção, meta define o resultado esperado e lançamento registra o realizado. Um não substitui o outro.",
    modulo: "metas",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["objetivo", "meta", "lançamento", "okr", "indicador", "resultado", "definição", "atribuição"],
    aliases: ["diferença objetivo e meta", "o que é lançamento", "okr sipclick", "meta de área"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "As três camadas",
        blocos: [
          table(
            ["Camada", "Pergunta que responde", "Exemplo"],
            [
              ["Objetivo", "Para onde o ciclo deve levar a empresa, a área ou a pessoa?", "Reduzir o tempo de resposta ao cliente."],
              ["Meta", "Qual resultado, em quanto tempo e com qual régua?", "Tempo médio de resposta abaixo de 4 horas até 31/12, reduzindo a partir de 8 horas."],
              ["Lançamento", "O que aconteceu de fato neste período?", "Em janeiro, 6,2 horas; em fevereiro, 5,4 horas."],
            ]
          ),
        ],
      },
      {
        titulo: "Como se conectam",
        blocos: [
          steps([
            { titulo: "O objetivo agrupa metas", texto: "Um objetivo pode ter várias metas. Ele não recebe nota; orienta a leitura." },
            { titulo: "A meta é uma definição", texto: "Ela descreve o que medir, o alvo, o ponto de partida e a direção. Ainda não é a meta de uma pessoa." },
            { titulo: "A atribuição liga a meta a alguém", texto: "Distribuir cria a meta da pessoa ou da área. A mesma definição pode valer para várias pessoas, com ajustes." },
            { titulo: "O lançamento registra o realizado", texto: "Cada lançamento é uma medição. O acumulado é o que conta para o atingimento, conforme a consolidação do indicador." },
            { titulo: "A régua transforma resultado em nota", texto: "A nota da meta é calculada pela régua escolhida: atingimento, binária, faixas ou manual." },
          ]),
        ],
      },
      {
        titulo: "Quem cria o quê",
        blocos: [
          p("Admin e RH criam sempre. Gestor cria conforme a regra da empresa. Colaborador pode propor meta para si quando a empresa permite proposta; nesse caso, a meta nasce pendente de aprovação."),
          callout("info", "Status importa", "Só metas ativas ou concluídas contam na média. Cancelada e não aplicável não contam e não são pendência."),
        ],
      },
    ],
    relacionados: ["criar-distribuir-meta", "lancar-resultado-atingimento", "reguas-nota-meta", "ritmo-situacao-meta"],
  },

  {
    id: "criar-distribuir-meta",
    titulo: "Criar e distribuir uma meta",
    resumo: "Os três passos do cadastro, os tipos de métrica e o que o recibo de publicação informa.",
    modulo: "metas",
    etapa: "configurar",
    formato: "guia",
    papeis: ["admin_rh", "gestor"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["criar meta", "distribuir", "alvo", "baseline", "unidade", "direção", "tipo de meta", "publicar"],
    aliases: ["cadastrar meta", "atribuir meta", "meta por área", "distribuição de metas"],
    prerequisitos: ["Ciclo ativo.", "Objetivo ou contexto definido.", "Permissão de criação no módulo."],
    secoes: [
      {
        titulo: "Os três passos",
        blocos: [
          steps([
            { titulo: "O quê", texto: "Escolha o tipo de métrica (quantidade, valor em R$, percentual, sim/não ou etapas) e dê um título claro. Evite nomes genéricos como 'Melhorar indicador'." },
            { titulo: "Quanto", texto: "Defina alvo, baseline (ponto de partida), unidade e direção (crescer ou reduzir). Em metas por etapas, cadastre os marcos." },
            { titulo: "Quem", texto: "Escolha pessoas, uma área inteira ou deixe para distribuir depois. É possível ajustar o alvo por pessoa." },
          ]),
        ],
      },
      {
        titulo: "Antes de publicar",
        blocos: [
          list([
            "Alvo e baseline precisam fazer sentido na mesma unidade. Não misture horas com percentual.",
            "Cadastrar depois do início do ciclo não bloqueia: a meta passa a valer retroativamente desde o início. O sistema avisa e pede confirmação.",
            "O teto padrão é de 5 metas por pessoa por ciclo, com faixa configurável de 1 a 20.",
          ]),
          callout("warn", "Cadastro retroativo", "Se a meta começa a valer antes de existir, o histórico pode parecer injusto. Avise o time e considere um baseline honesto."),
        ],
      },
      {
        titulo: "O recibo de publicação",
        blocos: [
          p("Ao publicar, o sistema informa quantas pessoas receberam a meta, quantas já tinham, quais foram bloqueadas e por quê. Se a atribuição falhar, a meta é criada e o caminho é a aba Distribuição."),
          table(
            ["Situação", "O que fazer"],
            [
              ["Recebeu", "Nada. A meta está ativa para a pessoa."],
              ["Já tinha", "Verifique se é duplicidade ou se a regra permite mais de uma."],
              ["Bloqueada", "Veja o motivo no recibo: limite, escopo ou permissão."],
              ["Falha na atribuição", "Abra Distribuição e conclua manualmente."],
            ]
          ),
        ],
      },
    ],
    relacionados: ["objetivo-meta-lancamento", "lancar-resultado-atingimento", "meta-sem-nota-cancelada", "reguas-nota-meta"],
  },

  {
    id: "lancar-resultado-atingimento",
    titulo: "Lançar resultado e entender o atingimento",
    resumo: "O período vem preenchido, a prévia mostra o efeito e cada lançamento é uma nova medição. Veja como o número vira nota.",
    modulo: "metas",
    etapa: "acompanhar",
    formato: "guia",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["lançar resultado", "atingimento", "medição", "check-in", "realizado", "alvo", "nota da meta"],
    aliases: ["atualizar meta", "registrar resultado", "check-in de meta", "medir meta"],
    prerequisitos: ["Meta ativa atribuída a você ou à sua área.", "Permissão de lançamento."],
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Escolha a meta", texto: "Abra Minhas metas ou Acompanhamento e selecione a meta que recebeu resultado." },
            { titulo: "Confira o período", texto: "O período da competência já vem preenchido. Não troque sem necessidade: o lançamento pertence àquele intervalo." },
            { titulo: "Digite o realizado", texto: "Use a unidade da meta. O campo é focado para agilizar." },
            { titulo: "Veja a prévia", texto: "Antes de salvar, a tela mostra o efeito no atingimento e na situação. Use a prévia para detectar número digitado errado." },
            { titulo: "Salve", texto: "Cada salvamento é uma nova medição. O total acumulado é o que conta, conforme a consolidação do indicador." },
          ]),
        ],
      },
      {
        titulo: "Como o número vira nota",
        blocos: [
          formula("Atingimento (crescer)", "atingimento = realizado ÷ alvo", "Alvo 100, realizado 90 → 0,90 = 90% do alvo."),
          formula("Atingimento (reduzir com baseline)", "atingimento = (baseline − realizado) ÷ (baseline − alvo)", "Baseline 8 h, alvo 4 h, realizado 6 h → (8−6) ÷ (8−4) = 0,50."),
          p("A régua da meta transforma o atingimento em nota. Na régua de atingimento, 100% = 10; acima disso satura no teto. Na régua de faixas, o percentual é arredondado para baixo antes de escolher a faixa."),
        ],
      },
      {
        titulo: "O que não existe",
        blocos: [
          callout("info", "Não há botão de 'concluir meta'", "O que existe é o status da meta, o lançamento, a nota e os alertas de fim de ciclo. A meta não é um projeto com botão de encerrar."),
          callout("warn", "Atualizar não é reescrever o passado", "Cada lançamento é uma medição do período. Se errou um número, corrija na origem conforme a regra de substituição/anulação do indicador."),
        ],
      },
    ],
    relacionados: ["objetivo-meta-lancamento", "ritmo-situacao-meta", "reguas-nota-meta", "meta-sem-nota-cancelada"],
  },

  {
    id: "ritmo-situacao-meta",
    titulo: "Ritmo e situação: por que minha meta está em risco",
    resumo: "Atingimento olha o alvo final; ritmo olha o esperado até hoje. As cores e os rótulos vêm de réguas diferentes.",
    modulo: "metas",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["ritmo", "situação", "em risco", "atenção", "no caminho", "adiantada", "esperado", "cor", "saúde"],
    aliases: ["meta em risco", "cor da meta", "por que atenção", "ritmo da meta"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Duas perguntas diferentes",
        blocos: [
          table(
            ["Indicador", "Pergunta", "Fórmula"],
            [
              ["Atingimento", "Quanto do alvo final já foi feito?", "realizado ÷ alvo, ajustado pela direção."],
              ["Ritmo", "Estou no caminho certo para a data?", "realizado relativo ÷ esperado até a data."],
            ]
          ),
          p("Uma meta pode ter bom atingimento e ritmo ruim se o prazo está curto. Ou atingimento baixo e ritmo bom se ainda há muito tempo."),
        ],
      },
      {
        titulo: "Como o esperado é calculado",
        blocos: [
          list([
            "Linear: fração de dias decorridos sobre os dias totais.",
            "Mensal: soma dos meses completos mais a fração do mês corrente.",
            "Marcos: usa o último marco cuja data já passou.",
            "Conclusão/binária: 0 até o fim e alvo no encerramento.",
            "Etapas e fluxo: alvo × fração do período.",
            "Estoque com baseline: baseline + (alvo − baseline) × fração.",
          ]),
        ],
      },
      {
        titulo: "As situações",
        blocos: [
          table(
            ["Ritmo", "Situação", "Leitura"],
            [
              ["≥ 1,10", "Adiantada", "Acima do esperado para a data."],
              ["≥ 0,95", "No caminho", "Dentro do esperado."],
              ["≥ 0,80", "Atenção", "Um pouco atrás; dá para recuperar."],
              ["< 0,80", "Em risco", "Precisa de ação."],
              ["—", "Sem atualização", "A última competência exigível está atrasada."],
              ["—", "Não iniciada", "Período futuro ou sem competência exigível."],
              ["—", "Encerrada", "Ciclo fechado ou status que não conta."],
            ]
          ),
          callout("info", "Uma régua de cor só", "As cores de meta agora seguem a mesma régua da situação: 1,10 / 0,95 / 0,80. O rótulo (Adiantada, No caminho, Atenção, Em risco) e a cor contam a mesma história em qualquer tela."),
        ],
      },
    ],
    relacionados: ["lancar-resultado-atingimento", "reguas-nota-meta", "meta-sem-nota-cancelada", "kpis-analytics-formulas"],
  },

  {
    id: "reguas-nota-meta",
    titulo: "Réguas de nota: atingimento, faixas, binária e manual",
    resumo: "Quatro formas de transformar resultado em nota de 0 a 10, com exemplos e a regra de ausência.",
    modulo: "metas",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["régua", "nota", "faixas", "binária", "manual", "atingimento", "teto", "arredondamento"],
    aliases: ["como a meta vira nota", "nota da meta", "faixa 80 99", "nota manual"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "As quatro réguas",
        blocos: [
          table(
            ["Régua", "Como calcula", "Exemplo"],
            [
              ["Atingimento", "relativo × 10, limitado ao teto (padrão 10).", "90% do alvo → 9,0; 100% → 10; 110% → 10."],
              ["Binária", "Cumpriu = 10; não cumpriu = 0. Crescer aceita tolerância de 0,5%; reduzir compara com o alvo.", "Alvo 100, realizado 99,6 → cumpriu; realizado 99,4 → não cumpriu."],
              ["Faixas", "Percentual inteiro com floor; primeira faixa cujo limite ≥ percentual define a nota.", "79,5% vira 79 → nota 4; 80% → 7; 100% → 10."],
              ["Manual", "O gestor digita de 0 a 10 com justificativa no fechamento.", "Sem nota informada, o resultado é nulo, não zero."],
            ]
          ),
        ],
      },
      {
        titulo: "Modos de nota da empresa",
        blocos: [
          list([
            "Resultado medido: usa a régua da meta.",
            "Média entre auto e gestor: (notaAuto + notaGestor) ÷ 2; se só uma existe, usa a que existe.",
            "Gestor: a nota do gestor com justificativa.",
          ]),
          p("A meta pode ter modo explícito, que vence a regra da empresa. Meta objetiva com alvo e régua não manual prioriza o resultado medido."),
        ],
      },
      {
        titulo: "Regras que evitam distorção",
        blocos: [
          callout("rule", "Ausente não é zero", "Sem lançamento, sem alvo ou sem nota manual, o resultado é nulo. Zero só existe quando a régua ou a nota informada dá zero."),
          callout("info", "Nota medida é protegida", "A nota calculada pela régua não é sobrescrita por uma nota digitada, salvo quando a régua é manual ou a trava está desligada. Meta concluída nunca é sobrescrita."),
        ],
      },
    ],
    relacionados: ["lancar-resultado-atingimento", "meta-sem-nota-cancelada", "ritmo-situacao-meta", "nota-competencias"],
  },

  {
    id: "meta-sem-nota-cancelada",
    titulo: "Metas canceladas, não aplicáveis e sem nota",
    resumo: "Nem toda meta entra na média. Entenda status, ausência de lançamento e por que a nota pode ficar vazia.",
    modulo: "metas",
    etapa: "resolver",
    formato: "problema",
    papeis: ["admin_rh", "gestor", "colaborador"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["meta cancelada", "não aplicável", "sem nota", "média", "status", "pendência", "nota zero"],
    aliases: ["meta não conta", "meta sem nota", "por que média vazia", "cancelar meta"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Quais metas contam",
        blocos: [
          table(
            ["Status", "Conta na média?", "É pendência?"],
            [
              ["Ativa", "Sim", "Sim, se estiver sem nota no fechamento."],
              ["Concluída", "Sim", "Não."],
              ["Rascunho", "Não", "Não."],
              ["Pendente de aprovação", "Não", "Não."],
              ["Cancelada", "Não", "Não."],
              ["Não aplicável", "Não", "Não."],
            ]
          ),
        ],
      },
      {
        titulo: "Por que a nota está vazia",
        blocos: [
          list([
            "Não há lançamento válido para o período.",
            "A meta não tem alvo definido e a régua depende de alvo.",
            "A régua é manual e o gestor ainda não informou a nota.",
            "Todos os lançamentos foram substituídos ou anulados.",
            "A meta está fora da janela do ciclo.",
          ]),
          callout("info", "Ausente é diferente de zero", "Se a média aparece como \"Sem nota\", não significa desempenho zero. Significa que não há dado elegível. O sistema evita transformar falta de dado em nota ruim."),
        ],
      },
      {
        titulo: "O que fazer",
        blocos: [
          steps([
            { titulo: "Confira o status", texto: "Cancelada e não aplicável não devem ser tratadas como pendência." },
            { titulo: "Confira o lançamento", texto: "Abra o detalhe da meta e veja se existe medição válida no período." },
            { titulo: "Confira a régua", texto: "Se for manual, a nota depende do gestor no fechamento." },
            { titulo: "Corrija na origem", texto: "Ajuste a meta ou o lançamento no módulo de Metas. Não tente sobrescrever a nota na avaliação." },
          ]),
        ],
      },
    ],
    relacionados: ["reguas-nota-meta", "avaliacao-pendente", "pessoa-fora-nine-box", "criar-distribuir-meta"],
  },

  {
    id: "gerar-pdi",
    titulo: "Como gerar o PDI",
    resumo: "Pré-requisitos, o que a IA usa como base e o que fazer quando o botão está bloqueado.",
    modulo: "pdi",
    etapa: "desenvolver",
    formato: "guia",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["pdi", "gerar", "plano de desenvolvimento", "ia", "competências", "nine box", "pré-requisitos"],
    aliases: ["criar pdi", "gerar plano", "pdi bloqueado", "plano de desenvolvimento"],
    prerequisitos: ["Vínculo com o organograma.", "Ciclo ativo.", "Avaliação canônica no ciclo com pelo menos uma nota.", "A IA generativa é opcional: sem ela, o plano é montado pela inteligência determinística do Sipclick."],
    secoes: [
      {
        titulo: "O que o PDI usa",
        blocos: [
          p("O plano parte da avaliação canônica do ciclo (líder ou auto), das competências, das metas, do potencial, do Nine Box, do ciclo anterior e da aspiração da pessoa. As competências foco saem das três menores notas (gaps) ou, se não houver gap, das três maiores forças."),
          callout("info", "Gap é contra a nota-alvo", "O gap usa uma nota-alvo de 8,0. A diferença entre autoavaliação e líder também é considerada quando é igual ou maior que 1,5."),
        ],
      },
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Abra o PDI", texto: "Em Desempenho > PDI. Colaborador vê o próprio; gestor vê o próprio e a linha; RH/admin escolhem a pessoa." },
            { titulo: "Confira a base do plano", texto: "A tela mostra ciclo, avaliação-base, notas, Nine Box (automático ou calibrado) e avisos de avaliação incompleta." },
            { titulo: "Gere o plano", texto: "Com a IA generativa configurada, ela escreve o plano. Sem ela, o servidor usa a inteligência determinística com a base da avaliação e do Nine Box." },
            { titulo: "Revise o objetivo e as ações", texto: "O plano tem 1 a 8 ações, checkpoints de 30/60/90 dias e perguntas de conversa. A primeira ação não pode ser de estudo." },
            { titulo: "Compartilhe e colha o aceite", texto: "O colaborador aceita o plano e o gestor valida. O aceite fica como selo até cada lado agir." },
          ]),
        ],
      },
      {
        titulo: "Quando o botão está bloqueado",
        blocos: [
          table(
            ["Bloqueio", "Motivo"],
            [
              ["Sem vínculo ao organograma", "A pessoa não tem employeeId ativo."],
              ["Sem ciclo ativo", "Não há período para ancorar a avaliação."],
              ["Sem avaliação", "Não existe avaliação canônica no ciclo."],
              ["Sem notas", "A avaliação existe, mas nenhuma nota elegível."],
            ]
          ),
          callout("info", "IA generativa é opcional", "Com a IA generativa configurada, ela escreve o plano. Sem ela, o servidor monta o PDI com a inteligência determinística, usando avaliação, competências, metas e Nine Box. O botão não é mais bloqueado."),
        ],
      },
    ],
    relacionados: ["jornada-90-dias", "concluir-acao-aceite", "pdi-nao-gera", "nine-box-como-calculado"],
  },

  {
    id: "jornada-90-dias",
    titulo: "Ações, missões e a jornada de 30/60/90 dias",
    resumo: "Como o plano vira 12 semanas, o que é missão, desafio-chefe e por que a gamificação não altera nota.",
    modulo: "pdi",
    etapa: "desenvolver",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["pdi", "jornada", "30 60 90", "missão", "desafio chefe", "gamificação", "evidência", "capítulo"],
    aliases: ["jornada do pdi", "missões", "desafio chefe", "plano de 90 dias"],
    prerequisitos: ["PDI gerado."],
    secoes: [
      {
        titulo: "A estrutura",
        blocos: [
          p("A jornada tem 3 capítulos de 4 semanas cada, 12 semanas no total. Cada ação do plano gera missões. Uma ação de prática gera 'planeje' e 'aplique'; uma de pessoas gera 'marque a conversa' e 'conversa realizada'; uma de estudo gera 'estude' e 'aplique uma ideia'."),
          table(
            ["Prazo da ação", "Capítulo"],
            [
              ["30 dias", "Capítulo 1"],
              ["60 dias", "Capítulo 2"],
              ["90 dias", "Capítulo 3"],
            ]
          ),
        ],
      },
      {
        titulo: "Missão, desafio-chefe e evidência",
        blocos: [
          list([
            "Missão é a quebra semanal da ação. Tem tipo: aprender, aplicar, conectar, refletir ou desafio-chefe.",
            "Desafio-chefe é a missão de fechamento do capítulo e precisa de validação do gestor direto.",
            "A pessoa pode pedir ajuda ou travar uma missão.",
            "A conclusão de uma ação marca as missões dela como enviadas e concede os pontos uma única vez.",
          ]),
          callout("info", "Pesos de progresso", "Micro 1, missão 2, desafio-chefe 5. Missões dispensadas saem do denominador. A barra da semana olha a semana atual; a da jornada olha o esperado até hoje."),
        ],
      },
      {
        titulo: "Gamificação não é desempenho",
        blocos: [
          p("Pontos medem esforço, não nota. A gamificação não altera nota, Nine Box, promoção ou remuneração. O teto semanal e os níveis existem para dar ritmo, não para ranquear pessoas."),
          callout("warn", "Constância tem folga", "A semana em andamento sem atividade é 'pausada', não 'falta'. Uma folga por temporada não quebra a constância; faltas repetidas quebram."),
        ],
      },
    ],
    relacionados: ["gerar-pdi", "concluir-acao-aceite", "pdi-nao-gera", "calibracao-comite"],
  },

  {
    id: "concluir-acao-aceite",
    titulo: "Concluir ação com evidência e dar aceite no plano",
    resumo: "Status, evidência, primeira data de conclusão, versões e o aceite do colaborador e do gestor.",
    modulo: "pdi",
    etapa: "desenvolver",
    formato: "guia",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["pdi", "concluir ação", "evidência", "aceite", "versão", "histórico", "reabrir"],
    aliases: ["marcar ação concluída", "anexar evidência", "aceitar pdi", "validar plano"],
    prerequisitos: ["PDI gerado e ação atribuída a você."],
    secoes: [
      {
        titulo: "Concluir uma ação",
        blocos: [
          steps([
            { titulo: "Abra a ação", texto: "Em Minhas ações ou no quadro do PDI." },
            { titulo: "Mude o status", texto: "A fazer, em andamento ou concluída. A mudança fica no histórico curto." },
            { titulo: "Registre a evidência", texto: "Texto de até 200 caracteres e, quando houver, anexo. Evidência é o que comprova a execução." },
            { titulo: "Salve", texto: "A primeira data de conclusão é gravada uma única vez. Reabrir e concluir de novo não muda essa data." },
          ]),
          callout("info", "Histórico curto", "A ação guarda até 20 eventos de atualização. Isso ajuda a lembrar o caminho, mas não é uma auditoria completa."),
        ],
      },
      {
        titulo: "Aceite do plano",
        blocos: [
          p("O colaborador aceita o plano e o gestor valida. Os dois lados têm selos próprios. O plano não tem um botão de 'concluir PDI'; o que fecha o ciclo são as ações e missões concluídas, o percentual e o aceite."),
          callout("warn", "Aceite não é nota", "Aceitar o plano não altera avaliação, Nine Box ou remuneração. É um compromisso de execução."),
        ],
      },
      {
        titulo: "Regenerar e preservar",
        blocos: [
          p("O plano tem versões. Regenerar exige motivo e preserva o vínculo das ações por título normalizado mais competência. Ação que sumiu vira arquivada; ação nova nasce pendente. Evidência e primeira conclusão são preservadas quando a ação é reconhecida."),
        ],
      },
    ],
    relacionados: ["gerar-pdi", "jornada-90-dias", "pdi-nao-gera", "avaliacao-pendente"],
  },

  {
    id: "pdi-nao-gera",
    titulo: "Por que o PDI não gera",
    resumo: "Os bloqueios mais comuns, do vínculo à avaliação, e como confirmar cada um.",
    modulo: "pdi",
    etapa: "resolver",
    formato: "problema",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["pdi", "não gera", "bloqueado", "sem avaliação", "sem ciclo", "erro", "modo assistido"],
    aliases: ["pdi não abre", "botão bloqueado", "não consigo gerar pdi", "erro no pdi"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Os bloqueios",
        blocos: [
          table(
            ["O que falta", "Como confirmar", "O que fazer"],
            [
              ["Vínculo com o organograma", "A pessoa não tem employeeId ativo.", "Peça ao RH para conferir o cadastro e o vínculo."],
              ["Ciclo ativo", "Nenhum ciclo em andamento.", "Admin/RH precisa criar ou ativar um ciclo."],
              ["Avaliação no ciclo", "Não há avaliação canônica.", "Conclua e envie a avaliação do líder ou a autoavaliação."],
              ["Notas na avaliação", "A avaliação existe, mas está sem nota.", "Feche as competências e as metas."],
            ]
          ),
        ],
      },
      {
        titulo: "O que a tela e o servidor exigem",
        blocos: [
          p("O servidor e a tela agora seguem a mesma regra: ciclo ativo, vínculo com o organograma e uma avaliação canônica com pelo menos uma nota. A IA não é pré-requisito; ela só melhora o texto final."),
          callout("info", "PDI manual faz parte do produto", "Sem a IA generativa, o sistema monta um plano completo com a inteligência determinística, a partir da avaliação. O resultado é um PDI assistido, não um texto em branco."),
        ],
      },
      {
        titulo: "Se o erro persistir",
        blocos: [
          list([
            "Anote a pessoa, o ciclo e a mensagem exibida.",
            "Confira se a avaliação está enviada, não apenas pronta.",
            "Confira se a metodologia do ciclo tem competências ou metas ativas.",
            "Acione o suporte com essas informações; não tente contornar criando dados falsos.",
          ]),
        ],
      },
    ],
    relacionados: ["gerar-pdi", "avaliacao-pendente", "pessoa-fora-nine-box", "metodologia-pesos-cortes"],
  },
];
