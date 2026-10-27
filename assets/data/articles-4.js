const ARTICLES_4 = [
  {
    id: "metodologia-pesos-cortes",
    titulo: "Pesos, cortes e congelamento: como a metodologia manda no cálculo",
    resumo: "O que a Central de Metodologia controla, o que é regra fixa e por que o ciclo em andamento não recalcula.",
    modulo: "metodologia",
    etapa: "entender",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["metodologia", "pesos", "cortes", "congelamento", "ciclo", "baseline", "rascunho", "regras"],
    aliases: ["central de metodologia", "mudar peso", "cortes do nine box", "por que não recalcula"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "O que ela controla",
        blocos: [
          table(
            ["Bloco", "Controla"],
            [
              ["Componentes", "Se competências, metas e potencial estão ligados."],
              ["Pesos", "Quanto cada componente e cada fonte valem na nota."],
              ["Fontes", "Peso de autoavaliação, líder, pares e liderados; mínimo de respostas."],
              ["Cortes", "Onde termina o baixo, começa o médio e começa o alto."],
              ["Potencial", "Modelo (5 fatores, Korn Ferry ou desligado) e regra de ausência."],
              ["Quadrantes", "Nome, descrição, ações sugeridas e orientação de remuneração."],
            ]
          ),
        ],
      },
      {
        titulo: "Rascunho, revisão e congelamento",
        blocos: [
          p("A Central trabalha com uma baseline e um rascunho único compartilhado entre os assuntos. Você vê o diff humano antes de salvar, erros de validação aparecem por assunto e a gravação acontece na revisão. O ciclo usa a metodologia congelada na primeira leitura."),
          callout("warn", "Mudou hoje, vale para o próximo ciclo", "Alterar peso ou corte não recalcula o ciclo em andamento. Isso protege quem já foi avaliado com a régua combinada. A tela avisa quando o ciclo está congelado."),
        ],
      },
      {
        titulo: "Regras fixas",
        blocos: [
          list([
            "Dado faltante não vira zero.",
            "Pesos somam 100%.",
            "Arredondamento acontece só na exibição.",
            "Nine Box não decide carreira.",
            "O comitê pode ajustar o nível do eixo, com registro.",
          ], { check: true }),
          formula("Exemplo de peso", "Competências 40% + metas 60%", "Competências 8,0 e metas 6,0 → (8×10×0,40) + (6×10×0,60) = 32 + 36 = 68 (6,8)."),
        ],
      },
    ],
    relacionados: ["mudar-metodologia-ciclo-atual", "nota-competencias", "nine-box-como-calculado", "kpis-analytics-formulas"],
  },

  {
    id: "mudar-metodologia-ciclo-atual",
    titulo: "Mudar a metodologia muda o ciclo atual?",
    resumo: "Não. O ciclo usa a régua congelada. Veja o que fazer se a mudança precisa valer agora.",
    modulo: "metodologia",
    etapa: "entender",
    formato: "faq",
    papeis: ["admin_rh", "gestor"],
    tempo: 2,
    atualizado: "2026-10-27",
    tags: ["metodologia", "ciclo atual", "congelado", "recalcular", "mudança", "próximo ciclo"],
    aliases: ["mudar peso vale agora", "recalcular ciclo", "metodologia congelada"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Resposta curta",
        blocos: [
          p("Não. O ciclo em andamento mantém a metodologia congelada na primeira leitura. Mudanças na Central valem para os próximos ciclos. Essa é a proteção para não mudar a régua no meio do jogo."),
        ],
      },
      {
        titulo: "O que ainda é possível",
        blocos: [
          list([
            "Simular o impacto da mudança antes de salvar, vendo quem mudaria de quadrante.",
            "Salvar a mudança para o próximo ciclo.",
            "Ajustar o nível de uma pessoa no comitê, com justificativa, sem alterar a nota.",
            "Restaurar uma versão anterior da metodologia pelo histórico.",
          ]),
          callout("info", "Se a urgência é real", "A saída correta não é reescrever a nota. É registrar a decisão do comitê e planejar a mudança para o ciclo seguinte. Se o ciclo inteiro está errado, avalie encerrar e recriar com a régua certa."),
        ],
      },
      {
        titulo: "Por que o congelamento existe",
        blocos: [
          p("Sem congelamento, uma pessoa avaliada com uma régua poderia ser comparada com outra avaliada com outra no mesmo ciclo. O histórico perderia sentido e a conversa de calibração ficaria injusta."),
        ],
      },
    ],
    relacionados: ["metodologia-pesos-cortes", "calibracao-comite", "criar-ciclo-avaliacao", "nine-box-como-calculado"],
  },

  {
    id: "kpis-analytics-formulas",
    titulo: "KPIs da People Analytics e suas fórmulas",
    resumo: "Conclusão, cobertura, mediana, execução de PDI, prazo, aging e distribuição do Nine Box — com exemplos.",
    modulo: "analytics",
    etapa: "analisar",
    formato: "conceito",
    papeis: ["admin_rh", "gestor"],
    tempo: 5,
    atualizado: "2026-10-27",
    tags: ["analytics", "kpi", "indicador", "fórmula", "cobertura", "conclusão", "mediana", "pdi", "aging", "nine box"],
    aliases: ["como calcula kpi", "indicadores people analytics", "mediana de desempenho", "aging pdi"],
    prerequisitos: ["Dados do ciclo e do PDI.", "Acesso à central real (flag da empresa) ou à demonstração."],
    secoes: [
      {
        titulo: "Os indicadores principais",
        blocos: [
          table(
            ["Indicador", "Fórmula", "Leitura"],
            [
              ["Conclusão do ciclo", "pessoas com todas as avaliações requeridas ÷ elegíveis × 100", "Quanto do ciclo está concluído. Pares/liderados contam como uma exigência e precisam do mínimo de 3."],
              ["Cobertura de resultados", "pessoas com nota final calculável ÷ pessoas do recorte × 100", "Quanto da população tem resultado legível."],
              ["Desempenho (mediana)", "mediana das notas finais", "A variação é em pontos, não em porcentagem."],
              ["Execução de PDI", "ações concluídas ÷ ações válidas × 100", "Missões gamificadas ficam fora. Válidas = ações não canceladas."],
              ["Conclusão no prazo", "concluídas até o vencimento ÷ ações vencidas × 100", "Ação vencida em aberto continua no denominador."],
              ["Distribuição Nine Box", "pessoas por célula ÷ classificadas × 100", "Pendentes ficam fora do denominador."],
            ]
          ),
        ],
      },
      {
        titulo: "Aging e funil do PDI",
        blocos: [
          p("O aging separa ações abertas em a vencer, vencidas de 1 a 7 dias, de 8 a 30 dias e acima de 30 dias. As três faixas de vencidas são críticas. O funil mostra pessoas com plano, iniciados e concluídos; a etapa de elegíveis só aparece quando existe público-alvo cadastrado."),
          formula("Exemplo de prazo", "15 ações vencidas, 9 concluídas no prazo", "9 ÷ 15 = 60% de conclusão no prazo."),
        ],
      },
      {
        titulo: "O que a tela não prova",
        blocos: [
          callout("warn", "Associação não é causa", "A dispersão execução × mudança mostra pares de nota antes e depois. O próprio produto rotula 'associação observada, não prova de causa'. Não use isso para afirmar que o PDI causou a melhora."),
          callout("info", "Qualidade da avaliação", "Não existe um score único de qualidade. A central mostra cobertura, conclusão, fluxo, pendências por área, células com pelo menos uma nota e pessoas com auto e líder pareados."),
        ],
      },
    ],
    relacionados: ["indicador-vazio-cobertura", "ritmo-situacao-meta", "pessoa-fora-nine-box", "calibracao-comite"],
  },

  {
    id: "indicador-vazio-cobertura",
    titulo: "Indicador vazio: por que aparece ausente e não 0%",
    resumo: "Ausência de base, flag desligada, escopo ou dado não cadastrado. Aprenda a diferença entre vazio e zero.",
    modulo: "analytics",
    etapa: "resolver",
    formato: "problema",
    papeis: ["admin_rh", "gestor"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["analytics", "vazio", "ausente", "zero", "cobertura", "público-alvo", "flag", "escopo"],
    aliases: ["indicador não aparece", "cobertura vazia", "por que 0%", "analytics sem dados"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Vazio não é zero",
        blocos: [
          p("Quando não há denominador, o indicador fica ausente. Isso é diferente de 0%, que significaria existir base e ninguém ter feito. O produto usa ausência para não acusar a empresa por um dado que não existe."),
          table(
            ["Indicador", "Por que pode ficar vazio"],
            [
              ["Cobertura de PDI", "O público-alvo de PDI ainda não é cadastro no dado real; sem denominador, não há percentual."],
              ["Dispersão execução × mudança", "No dado real, nota antes e depois são nulas; sem pares, sem pontos."],
              ["Base de metas", "A base de metas do ciclo pode estar vazia."],
              ["Metas e talentos", "Ciclo sem notas ou com pendências em massa reduz a base."],
              ["Central real", "Flag de liberação desligada para o papel ou para a empresa."],
            ]
          ),
        ],
      },
      {
        titulo: "Confira nesta ordem",
        blocos: [
          steps([
            { titulo: "Escopo", texto: "Você pode estar vendo uma área ou população sem dados. Amplie o recorte." },
            { titulo: "Ciclo", texto: "O ciclo selecionado pode não ter avaliações ou metas." },
            { titulo: "Flag", texto: "A central real depende de liberação da empresa. Sem ela, o caminho é a demonstração." },
            { titulo: "Base", texto: "Confira se existe público-alvo, meta lançada ou par antes/depois." },
          ]),
          callout("info", "Demonstração x real", "A demonstração usa cortes fixos e dados fictícios; a central real usa o motor canônico e a metodologia do ciclo. Os mesmos números podem cair em quadrantes diferentes. Não compare os dois como se fossem a mesma régua."),
        ],
      },
      {
        titulo: "O que não fazer",
        blocos: [
          list([
            "Não preencha dado fictício para 'fazer o gráfico aparecer'.",
            "Não leia ausência como desempenho ruim.",
            "Não compare a demo com o real sem checar as réguas.",
          ]),
        ],
      },
    ],
    relacionados: ["kpis-analytics-formulas", "pessoa-fora-nine-box", "papeis-e-permissoes", "metodologia-pesos-cortes"],
  },

  {
    id: "primeiro-acesso-senha",
    titulo: "Primeiro acesso e troca de senha",
    resumo: "Como entrar pela primeira vez, o que fazer se o link expirar e onde trocar a senha depois.",
    modulo: "conta",
    etapa: "configurar",
    formato: "guia",
    papeis: ["todos"],
    tempo: 2,
    atualizado: "2026-10-27",
    tags: ["primeiro acesso", "senha", "login", "convite", "trocar senha", "link expirado"],
    aliases: ["não consigo entrar", "primeira vez", "definir senha", "link do convite"],
    prerequisitos: ["Conta criada com e-mail.", "Convite ou senha inicial recebidos."],
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Abra o convite", texto: "O e-mail leva para a tela de primeiro acesso com o seu e-mail preenchido." },
            { titulo: "Crie sua senha", texto: "Defina uma senha pessoal. A senha inicial deixa de ser exibida para o RH depois da troca." },
            { titulo: "Entre no sistema", texto: "Você cai na Home com as tarefas do seu papel." },
            { titulo: "Troque quando quiser", texto: "Em Meu Perfil, é possível atualizar a senha e a foto." },
          ]),
        ],
      },
      {
        titulo: "Se o link não funcionar",
        blocos: [
          list([
            "Use 'Esqueci minha senha' na tela de login para receber um novo link.",
            "Se o e-mail não chegar, confira spam e o endereço cadastrado.",
            "Se a conta estiver inativa, o admin/RH precisa liberar em Credenciais.",
            "Se você não tem e-mail cadastrado, não há como logar: peça o cadastro ao RH.",
          ]),
          callout("info", "Segurança", "Nunca compartilhe sua senha. O RH consegue ver a senha inicial apenas enquanto ela não foi trocada; depois disso, só consegue redefinir."),
        ],
      },
    ],
    relacionados: ["restaurar-senha-liberar-acesso", "convites-primeiro-acesso", "papeis-e-permissoes"],
  },

  {
    id: "papeis-e-permissoes",
    titulo: "Papéis e permissões: quem vê o quê",
    resumo: "Admin, RH, gestor, colaborador e super admin. A mesma matriz que bloqueia a rota esconde o atalho.",
    modulo: "conta",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["papéis", "permissões", "admin", "rh", "gestor", "colaborador", "super admin", "escopo", "acesso"],
    aliases: ["quem vê o quê", "permissão de gestor", "admin x rh", "não vejo a tela"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "A matriz, em resumo",
        blocos: [
          table(
            ["Papel", "Vê", "Não vê"],
            [
              ["Admin", "Tudo da empresa, lixeira e configurações funcionais.", "Nada fica oculto por papel, exceto páginas técnicas de outro super admin."],
              ["RH", "Quase tudo: pessoas, ciclos, metodologia, Nine Box, metas e Analytics.", "Lixeira e páginas técnicas de IA/backend."],
              ["Gestor", "A própria linha hierárquica; Nine Box e Metodologia em leitura.", "Configuração da empresa, credenciais e lixeira."],
              ["Colaborador", "A própria avaliação, metas, PDI e, se liberado, o próprio Nine Box.", "Organograma como página, Nine Box da equipe, metas de outras pessoas."],
              ["Super admin", "IA de PDI, IA de recrutamento e backend.", "Não é o mesmo que admin da empresa."],
            ]
          ),
        ],
      },
      {
        titulo: "Permissão não é a mesma coisa que escopo",
        blocos: [
          p("Permissão diz quais páginas e recursos o papel pode usar. Escopo diz quais registros ele enxerga. Um gestor tem permissão de avaliação, mas só dentro da própria linha. Um colaborador tem permissão de PDI, mas só para si."),
          list([
            "Admin/RH: empresa inteira.",
            "Gestor: a si e a toda a sua linha hierárquica.",
            "Colaborador: apenas a si, mesmo que tenha descendentes no organograma.",
            "Vínculo sem employeeId: não enxerga ninguém.",
          ]),
        ],
      },
      {
        titulo: "Casos que confundem",
        blocos: [
          table(
            ["Situação", "Por que acontece"],
            [
              ["O colaborador não vê o organograma no menu", "A página é gerente pra cima. Ele pode ter leitura via API em contextos específicos, mas não a tela."],
              ["O gestor abre Nine Box e não edita", "Gestor tem leitura no Nine Box. A escrita é de admin/RH."],
              ["O RH não vê a Lixeira", "Lixeira é só admin."],
              ["O admin não vê a tela de IA", "IA e backend são só do super admin do sistema (donos do ambiente)."],
              ["O colaborador vê o próprio Nine Box", "Depende do toggle 'Colaborador vê os próprios resultados' na configuração da empresa."],
            ]
          ),
          callout("warn", "Dois 'super admins'", "Admin da empresa é um papel. Super admin do sistema é a lista fixa de donos do ambiente. A mesma palavra aparece com sentidos diferentes no produto."),
        ],
      },
    ],
    relacionados: ["convites-primeiro-acesso", "restaurar-senha-liberar-acesso", "organograma-gestor-area-unidade", "mapa-da-sipclick"],
  },

  {
    id: "restaurar-senha-liberar-acesso",
    titulo: "Restaurar senha e liberar acesso de alguém",
    resumo: "O que admin e RH podem fazer em Credenciais, quando a senha inicial aparece e como agir com conta inativa.",
    modulo: "conta",
    etapa: "resolver",
    formato: "guia",
    papeis: ["admin_rh"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["senha", "redefinir", "credenciais", "conta inativa", "revogar", "liberar acesso", "primeiro acesso"],
    aliases: ["resetar senha", "desbloquear usuário", "senha não chega", "conta bloqueada"],
    prerequisitos: ["Acesso de admin ou RH à tela de Credenciais."],
    secoes: [
      {
        titulo: "O que a tela mostra",
        blocos: [
          list([
            "Contas ativas e inativas, separadas.",
            "A senha inicial enquanto a pessoa ainda não trocou.",
            "Ações de revelar, resetar e revogar.",
            "O status do primeiro acesso.",
          ]),
          callout("info", "Privacidade", "Depois que a pessoa define a própria senha, o RH não consegue vê-la. Só é possível redefinir ou orientar a recuperação por e-mail."),
        ],
      },
      {
        titulo: "Passo a passo", 
        blocos: [
          steps([
            { titulo: "Localize a pessoa", texto: "Abra Credenciais e busque pelo nome ou e-mail." },
            { titulo: "Confira o status", texto: "Conta inativa não loga. Ative antes de redefinir." },
            { titulo: "Resete ou revele", texto: "Se a pessoa nunca entrou, a senha inicial pode ser revelada. Se já entrou, só cabe redefinir." },
            { titulo: "Comunique com segurança", texto: "Envie o acesso por um canal combinado. Peça a troca no primeiro login." },
            { titulo: "Se o e-mail não chegar", texto: "Confira o endereço cadastrado, o spam e se o domínio está liberado. O reset pela tela é o caminho alternativo." },
          ]),
        ],
      },
      {
        titulo: "Quando revogar",
        blocos: [
          p("Revogar encerra o acesso. Use em desligamento, suspeita de compartilhamento de senha ou conta criada por engano. Revogar não apaga a pessoa do organograma nem o histórico; para isso, use arquivamento ou lixeira."),
          callout("danger", "Não confunda os fluxos", "Revogar acesso, arquivar pessoa e excluir na lixeira são ações diferentes. A primeira mexe no login; a segunda tira do organograma ativo; a terceira é exclusão com retenção."),
        ],
      },
    ],
    relacionados: ["primeiro-acesso-senha", "convites-primeiro-acesso", "arquivar-excluir-lixeira", "papeis-e-permissoes"],
  },
];
