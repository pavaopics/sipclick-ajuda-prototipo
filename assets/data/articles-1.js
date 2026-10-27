const ARTICLES_1 = [
  {
    id: "mapa-da-sipclick",
    titulo: "Mapa da Sipclick: o que cada módulo faz",
    resumo: "Entenda como Pessoas, Desempenho, Metas, PDI e People Analytics se conectam antes de configurar qualquer coisa.",
    modulo: "comecar",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["visão geral", "módulos", "mapa", "arquitetura", "como funciona"],
    aliases: ["o que é sipclick", "por onde começo", "módulos do sistema"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "O que a Sipclick faz",
        blocos: [
          p("A Sipclick organiza a gestão de pessoas em cinco frentes que conversam entre si: quem é a equipe, o que ela precisa entregar, como o desempenho é avaliado, como cada pessoa se desenvolve e o que os dados mostram."),
          table(
            ["Módulo", "O que resolve", "Primeiro uso típico"],
            [
              ["Pessoas", "Cadastro, organograma, áreas, gestores e acesso.", "Subir a equipe por planilha ou cadastrar no organograma."],
              ["Desempenho", "Ciclo, autoavaliação, avaliação do líder, notas de competência e Nine Box.", "Criar o ciclo e liberar as avaliações."],
              ["Metas", "Objetivos, metas, distribuição, lançamentos e acompanhamento.", "Definir o que cada pessoa precisa alcançar."],
              ["PDI", "Plano de desenvolvimento de 90 dias, ações, missões e evidências.", "Gerar o plano a partir da avaliação."],
              ["People Analytics", "Leitura consolidada de desempenho, talentos, metas e desenvolvimento.", "Entender cobertura, pendências e tendências."],
            ]
          ),
        ],
      },
      {
        titulo: "Como as peças se conectam",
        blocos: [
          steps([
            { titulo: "Pessoas é a fundação", texto: "Sem pessoas e hierarquia, não existe escopo de avaliação, meta nem PDI. O organograma define quem avalia quem e o que cada papel enxerga." },
            { titulo: "Metas definem o resultado esperado", texto: "Objetivos agrupam metas. As metas são distribuídas para pessoas ou áreas e recebem lançamentos ao longo do ciclo." },
            { titulo: "O ciclo coleta as avaliações", texto: "O grau do ciclo define quais fontes entram: líder, autoavaliação, pares e liderados. Metas e potencial são etapas da avaliação gerencial." },
            { titulo: "O Nine Box cruza dois eixos", texto: "Desempenho (competências + metas) e potencial geram a matriz 3x3. O comitê pode calibrar o nível dos eixos, mas não altera a nota." },
            { titulo: "PDI e Analytics fecham o loop", texto: "O PDI parte da avaliação e do Nine Box para propor ações. O Analytics lê o conjunto e mostra onde agir, com as limitações de cada indicador." },
          ]),
          callout("info", "Regra de ouro", "O sistema não é uma esteira obrigatória. Você pode começar só por Pessoas, depois ligar Metas e só então rodar um ciclo. A ordem recomendada é a que reduz retrabalho: pessoas, metodologia, ciclo, metas, avaliação, Nine Box, PDI e leitura."),
        ],
      },
      {
        titulo: "O que você vê depende do seu papel",
        blocos: [
          p("A mesma tela não é oferecida a todos. A permissão nasce do vínculo da pessoa com a empresa e do papel: admin, RH, gestor ou colaborador. Quem não pode acessar uma página não vê o atalho dela."),
          table(
            ["Papel", "Em geral, enxerga"],
            [
              ["Admin", "Tudo da empresa, incluindo lixeira e configurações funcionais."],
              ["RH", "Quase tudo, exceto lixeira e páginas técnicas de IA/backend."],
              ["Gestor", "A própria linha hierárquica; Nine Box e Metodologia em leitura."],
              ["Colaborador", "Os próprios resultados, metas, avaliação e PDI. O Nine Box próprio depende de um toggle da empresa."],
            ]
          ),
        ],
      },
      {
        titulo: "O que está em breve",
        blocos: [
          callout("warn", "Não procure o que ainda não abriu", "Recrutamento & Seleção e Clima & Cultura aparecem como módulos em construção. As rotas ficam fechadas para todos os papéis, inclusive admin e RH. A Ajuda não ensina fluxos que ainda não podem ser usados."),
        ],
      },
    ],
    relacionados: ["primeiros-15-minutos", "papeis-e-permissoes", "criar-ciclo-avaliacao"],
  },

  {
    id: "primeiros-15-minutos",
    titulo: "Seus primeiros 15 minutos como admin ou RH",
    resumo: "A sequência mínima para sair da tela vazia e chegar ao primeiro ciclo de avaliação sem retrabalho.",
    modulo: "comecar",
    etapa: "configurar",
    formato: "guia",
    papeis: ["admin_rh"],
    tempo: 5,
    atualizado: "2026-10-27",
    tags: ["onboarding", "setup", "primeiros passos", "configuração inicial", "admin", "rh"],
    aliases: ["por onde começar", "configurar empresa", "primeiro acesso admin"],
    prerequisitos: ["Estar logado como admin ou RH.", "Ter em mãos a lista de pessoas, cargos, áreas e gestores."],
    secoes: [
      {
        titulo: "A ordem que funciona",
        blocos: [
          steps([
            { titulo: "Confirme a empresa e a identidade", texto: "No assistente de configuração, revise nome, CNPJ, logo e cores. Isso aparece para o time e não deve ser refeito depois." },
            { titulo: "Cadastre as pessoas", texto: "Prefira a planilha modelo na etapa Pessoas. Preencha nome, e-mail, cargo, área e gestor. Quem tem e-mail ganha acesso; quem não tem fica como registro." },
            { titulo: "Confira o organograma", texto: "Abra Pessoas > Organograma e verifique se cada pessoa está abaixo do gestor certo. A hierarquia define o escopo de avaliação e de metas." },
            { titulo: "Revise pilares e competências", texto: "O padrão de fábrica já vem com uma estrutura. Só troque se a empresa tiver um modelo próprio. A metodologia é o que dá sentido às notas." },
            { titulo: "Crie o ciclo de avaliação", texto: "Defina datas, grau (90, 180, 270 ou 360) e fontes. Só um ciclo fica ativo por vez. O grau define quais avaliações serão coletadas." },
            { titulo: "Comunique o time", texto: "Avise o prazo e o que cada pessoa precisa fazer. A Home do colaborador mostra as tarefas e o rótulo didático de cada etapa." },
            { titulo: "Acompanhe as pendências", texto: "Use People Analytics para ver conclusão do ciclo, cobertura e quem ainda não enviou. Pendência não é erro: é ação de acompanhamento." },
          ]),
        ],
      },
      {
        titulo: "Atalhos que economizam tempo",
        blocos: [
          list([
            "A planilha é o caminho mais rápido para mais de 10 pessoas. O cadastro no organograma é melhor para ajustes pontuais.",
            "A importação faz merge por e-mail: atualiza campos vazios e não substitui a base inteira.",
            "O setup grava em segundo plano. Você pode sair e continuar depois; o progresso fica salvo.",
            "A Central de Metodologia mostra o impacto da mudança antes de salvar. Use a simulação antes de mexer em pesos.",
          ], { check: true }),
          callout("info", "Você não precisa configurar tudo hoje", "O mínimo para rodar um ciclo é: pessoas cadastradas, hierarquia conferida e ciclo ativo. Metas, PDI e Analytics podem entrar depois, sem apagar o que já existe."),
        ],
      },
    ],
    relacionados: ["mapa-da-sipclick", "como-cadastrar-equipe", "criar-ciclo-avaliacao", "papeis-e-permissoes"],
  },

  {
    id: "glossario-rapido",
    titulo: "Glossário rápido: os 10 termos que mais aparecem",
    resumo: "Um resumo para não confundir ciclo, grau, fonte, competência, meta, potencial e Nine Box.",
    modulo: "comecar",
    etapa: "entender",
    formato: "glossario",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["glossário", "termos", "dicionário", "conceitos"],
    aliases: ["o que significa", "vocabulário", "dicionário sipclick"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Os termos essenciais",
        blocos: [
          table(
            ["Termo", "Em uma frase"],
            [
              ["Ciclo", "O período em que avaliações, metas e PDI acontecem. Tem início, fim e status pelas datas."],
              ["Grau", "90, 180, 270 ou 360: define quais fontes o ciclo coleta."],
              ["Fonte", "Quem responde: autoavaliação, líder, pares ou liderados."],
              ["Competência", "A habilidade avaliada dentro de um pilar. Também existe competência de medição (diária, mensal etc.), que é outra coisa."],
              ["Desempenho", "Eixo que combina competências e metas pelos pesos da metodologia."],
              ["Potencial", "Eixo que mede prontidão para crescer, em 5 fatores ou no modelo Korn Ferry."],
              ["Nine Box", "Matriz 3x3 que cruza desempenho e potencial. Não é nota e não decide carreira."],
              ["Meta", "O resultado esperado de uma pessoa ou área, com alvo, prazo e régua de nota."],
              ["PDI", "Plano de desenvolvimento individual de 90 dias, com ações e missões."],
              ["Metodologia", "O conjunto de pesos, cortes e regras que manda no cálculo do ciclo."],
            ]
          ),
          callout("warn", "Cuidado com dois homônimos", "Competência comportamental é a habilidade avaliada. Competência de medição é a frequência com que uma meta é lançada (diária, semanal, mensal etc.). O contexto muda o significado."),
          cta("Ver o glossário completo, com 40 termos", "#/glossario"),
        ],
      },
    ],
    relacionados: ["mapa-da-sipclick", "nota-competencias", "nine-box-como-calculado", "metodologia-pesos-cortes"],
  },

  {
    id: "como-cadastrar-equipe",
    titulo: "Como cadastrar sua equipe",
    resumo: "Veja os dois caminhos — planilha modelo ou cadastro no organograma — e o que acontece com o acesso de cada pessoa.",
    modulo: "pessoas",
    etapa: "cadastrar",
    formato: "video",
    papeis: ["admin_rh"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["cadastrar equipe", "planilha", "importar", "organograma", "colaboradores", "funcionários"],
    aliases: ["subir planilha", "importar funcionários", "cadastrar colaborador", "adicionar pessoa", "montar organograma"],
    prerequisitos: ["Estar logado como admin ou RH.", "Para a planilha: baixar o modelo dentro da etapa Pessoas.", "Para o cadastro manual: saber quem será o gestor da pessoa."],
    videoId: "cadastrar-equipe",
    secoes: [
      {
        titulo: "Antes de começar",
        blocos: [
          p("Existem dois caminhos e eles podem conviver. A planilha é melhor para volumes maiores; o organograma é melhor para uma pessoa por vez ou para ajustar a hierarquia na hora."),
          callout("info", "O que a planilha precisa ter", "Nome, e-mail, cargo, área e gestor. O e-mail é o que cria o acesso. Quem não tem e-mail entra como registro no organograma, mas não consegue logar."),
        ],
      },
      {
        titulo: "Caminho 1: pela planilha modelo",
        blocos: [
          steps([
            { titulo: "Abra a configuração inicial", texto: "Na Home, entre em Configuração inicial e vá até a etapa Pessoas. Se preferir, o mesmo recurso existe dentro de Pessoas > Organograma." },
            { titulo: "Baixe o modelo", texto: "Use a planilha modelo do próprio sistema para evitar colunas com nome errado. Preencha uma linha por pessoa." },
            { titulo: "Preencha os campos", texto: "Nome, e-mail, cargo, área e gestor. O gestor é resolvido pelo nome ou pelo e-mail, conforme o modelo. Revise se não há e-mails repetidos." },
            { titulo: "Envie e analise a prévia", texto: "O sistema lê o arquivo, cataloga os dados, monta a hierarquia, agrupa departamentos e prepara as contas. Nada é aplicado antes de você confirmar." },
            { titulo: "Revise erros e avisos", texto: "Linhas com problema aparecem na prévia. Corrija na planilha e envie de novo, ou confirme apenas o que está válido." },
            { titulo: "Confirme a importação", texto: "Ao confirmar, a base é atualizada por e-mail: campos vazios são preenchidos e registros existentes são atualizados. A base inteira nunca é substituída." },
          ]),
        ],
      },
      {
        titulo: "Caminho 2: direto no organograma",
        blocos: [
          steps([
            { titulo: "Encontre o gestor", texto: "Abra Pessoas > Organograma e localize o card da pessoa que será o gestor." },
            { titulo: "Passe o mouse e clique no +", texto: "O menu rápido permite criar um liderado, um colega ou um superior. Para cadastrar alguém abaixo de um gestor, escolha liderado." },
            { titulo: "Preencha os dados", texto: "Nome, e-mail, cargo e área. A pessoa já nasce ligada ao gestor escolhido." },
            { titulo: "Ajuste arrastando, se precisar", texto: "Você pode arrastar um card sobre outro para definir o gestor. O sistema bloqueia auto-vínculo e ciclos na hierarquia." },
          ]),
        ],
      },
      {
        titulo: "O que você vê depois",
        blocos: [
          list([
            "O organograma é montado com a hierarquia informada.",
            "As áreas da empresa são detectadas e agrupadas automaticamente.",
            "Quem tem e-mail recebe uma conta com papel colaborador. A senha inicial fica visível em Credenciais enquanto não for trocada.",
            "Quem não tem e-mail existe no organograma, mas não acessa o sistema.",
            "A pessoa passa a poder receber metas e entrar na fila de avaliação conforme a hierarquia e as fontes do ciclo.",
          ], { check: true }),
        ],
      },
      {
        titulo: "Se algo não acontecer",
        blocos: [
          table(
            ["Sintoma", "Causa provável", "O que fazer"],
            [
              ["A pessoa não aparece no organograma", "Linha ficou fora da prévia ou importação não foi confirmada.", "Refaça a importação e confirme; nada é aplicado sem confirmação."],
              ["A pessoa aparece, mas não consegue logar", "Não tem e-mail ou a conta ainda não foi ativada.", "Cadastre o e-mail e confira Credenciais."],
              ["O gestor ficou errado", "Nome ambíguo ou grafia diferente na planilha.", "Arraste o card no organograma para corrigir a hierarquia."],
              ["A importação não atualizou um dado", "O merge não sobrescreve tudo e prioriza o e-mail como chave.", "Edite a pessoa no cadastro; evite duplicar o registro."],
            ]
          ),
          callout("warn", "A importação não é um reset", "Ela faz merge por e-mail. Se você precisa limpar a base, isso é outro fluxo, com impacto em avaliações, metas e PDI. Não use planilha para tentar apagar gente."),
        ],
      },
    ],
    relacionados: ["importar-colaboradores-planilha", "cadastrar-no-organograma", "convites-primeiro-acesso", "organograma-gestor-area-unidade"],
  },

  {
    id: "importar-colaboradores-planilha",
    titulo: "Importar colaboradores por planilha",
    resumo: "Como preparar o arquivo, interpretar a prévia e confirmar sem duplicar pessoas nem perder hierarquia.",
    modulo: "pessoas",
    etapa: "cadastrar",
    formato: "guia",
    papeis: ["admin_rh"],
    tempo: 4,
    atualizado: "2026-10-27",
    tags: ["planilha", "importação", "excel", "csv", "merge", "e-mail", "colaboradores"],
    aliases: ["subir excel", "importar csv", "planilha de funcionários", "carga de pessoas"],
    prerequisitos: ["Modelo de planilha baixado no próprio sistema.", "Lista de pessoas com e-mail, cargo, área e gestor."],
    secoes: [
      {
        titulo: "O que a importação faz",
        blocos: [
          p("A importação lê o arquivo em seis fases: lendo planilha, catalogando dados, construindo hierarquia, agrupando departamentos, criando contas e ativando contas. Você acompanha o progresso e nada é aplicado antes da confirmação."),
          callout("info", "A chave é o e-mail", "O sistema usa o e-mail para reconhecer quem já existe. Registros sem e-mail não têm como ser mesclados com segurança e não geram acesso."),
        ],
      },
      {
        titulo: "Passo a passo",
        blocos: [
          steps([
            { titulo: "Baixe o modelo atual", texto: "Não reaproveite uma planilha antiga com colunas renomeadas. O modelo garante que o sistema reconheça cada campo." },
            { titulo: "Preencha uma linha por pessoa", texto: "Nome, e-mail, cargo, área e gestor. Use o nome do gestor como está no sistema. Para o topo da hierarquia, deixe o gestor vazio." },
            { titulo: "Envie o arquivo", texto: "A prévia mostra o que será criado, atualizado e o que tem erro. Erros de e-mail repetido e gestor não encontrado costumam aparecer aqui." },
            { titulo: "Confirme", texto: "Só depois da revisão. A importação atualiza campos vazios e não sobrescreve a base inteira." },
            { titulo: "Distribua as credenciais", texto: "Quem tem e-mail ganha conta. O relatório de credenciais permite copiar os acessos iniciais para comunicar o time." },
          ]),
        ],
      },
      {
        titulo: "Erros comuns",
        blocos: [
          table(
            ["Erro", "Por que acontece", "Como resolver"],
            [
              ["E-mail duplicado", "Duas linhas com o mesmo endereço.", "Una em uma linha só; o e-mail é a identidade da pessoa."],
              ["Gestor não encontrado", "Nome diferente do cadastro ou gestor na mesma planilha ainda não criado.", "Padronize o nome ou cadastre o gestor primeiro."],
              ["Área inconsistente", "Variações de grafia (RH, Rh, Recursos Humanos).", "Padronize antes de importar; o sistema agrupa pelo texto."],
              ["Ciclo na hierarquia", "Uma pessoa aponta para outra que aponta de volta.", "Defina um topo único e corrija a corrente."],
            ]
          ),
          callout("warn", "Não existe desfazer automático", "Se confirmar com erro, corrija pessoa por pessoa ou reimporte com a chave de e-mail. A lixeira é para exclusão com retenção, não para desfazer planilha."),
        ],
      },
    ],
    relacionados: ["como-cadastrar-equipe", "organograma-gestor-area-unidade", "convites-primeiro-acesso", "arquivar-excluir-lixeira"],
  },

  {
    id: "cadastrar-no-organograma",
    titulo: "Cadastrar uma pessoa direto no organograma",
    resumo: "Use o menu rápido do card para criar liderado, colega ou superior e ajustar a hierarquia arrastando.",
    modulo: "pessoas",
    etapa: "cadastrar",
    formato: "guia",
    papeis: ["admin_rh", "gestor"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["organograma", "cadastro manual", "liderado", "gestor", "arrastar", "hierarquia"],
    aliases: ["adicionar pessoa no organograma", "criar subordinado", "mudar gestor"],
    prerequisitos: ["Permissão de escrita no organograma. Gestor edita apenas dentro do próprio escopo."],
    secoes: [
      {
        titulo: "Criar a pessoa",
        blocos: [
          steps([
            { titulo: "Localize o card de referência", texto: "Passe o mouse no card do gestor (ou no card ao lado de quem a pessoa deve ficar)." },
            { titulo: "Clique no +", texto: "Escolha liderado para criar abaixo, colega para criar no mesmo nível ou superior para criar acima." },
            { titulo: "Preencha e salve", texto: "Informe nome, e-mail, cargo e área. A posição na hierarquia já sai definida pela origem." },
          ]),
        ],
      },
      {
        titulo: "Mover e corrigir",
        blocos: [
          list([
            "Arraste um card sobre outro para definir que aquele é o novo gestor.",
            "O sistema bloqueia auto-vínculo, vínculo duplicado e ciclo na hierarquia.",
            "Recolher a equipe ajuda a enxergar a estrutura sem poluir a tela.",
            "Excluir pelo card abre o arquivamento, não a exclusão definitiva. O histórico continua.",
          ]),
          callout("info", "Arquivar preserva o histórico", "Avaliações, PDI e Nine Box apontam para o id da pessoa. Arquivar tira do organograma ativo e mantém o passado. A exclusão definitiva é feita na Lixeira, por admin, com retenção."),
        ],
      },
    ],
    relacionados: ["como-cadastrar-equipe", "organograma-gestor-area-unidade", "arquivar-excluir-lixeira", "por-que-pessoa-nao-aparece"],
  },

  {
    id: "organograma-gestor-area-unidade",
    titulo: "Como o organograma se organiza: gestor, área e unidade",
    resumo: "Hierarquia, área, cargo e unidade não são a mesma coisa. Entenda o que cada campo muda no escopo e nos relatórios.",
    modulo: "pessoas",
    etapa: "entender",
    formato: "conceito",
    papeis: ["todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["organograma", "área", "departamento", "unidade", "cargo", "gestor", "hierarquia", "escopo"],
    aliases: ["diferença área e unidade", "departamento", "vertical", "quem vê quem"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Os quatro conceitos",
        blocos: [
          table(
            ["Conceito", "O que é", "O que muda"],
            [
              ["Gestor", "A pessoa imediatamente acima na hierarquia.", "Define quem avalia quem e o alcance do escopo do gestor."],
              ["Área", "O agrupamento de trabalho (RH, Vendas, Tecnologia).", "Filtra relatórios, metas por área e leitura do Nine Box."],
              ["Cargo", "O título da pessoa na empresa.", "Pode liberar visão do organograma acima de coordenador, mas não amplia dados de avaliação."],
              ["Unidade organizacional", "Estrutura configurável derivada do organograma.", "Permite recortes gerenciais e relatórios por unidade."],
            ]
          ),
        ],
      },
      {
        titulo: "Quem enxerga quem",
        blocos: [
          p("O escopo é separado da permissão de página. Admin e RH enxergam a empresa inteira. Gestor enxerga a própria linha hierárquica. Colaborador enxerga apenas a si. Quem tem subordinado ativo passa a ser tratado como gestor para fins de escopo."),
          callout("warn", "Cargo não é permissão", "O cargo pode abrir a visualização do organograma em alguns casos, mas não dá acesso a avaliações, Nine Box ou dados de outra pessoa. Permissão e escopo são camadas diferentes."),
          callout("info", "Pessoa arquivada", "Sai do organograma ativo, mas o histórico permanece. Se tinha liderados, o sistema mostra o impacto antes de confirmar o arquivamento."),
        ],
      },
    ],
    relacionados: ["papeis-e-permissoes", "cadastrar-no-organograma", "arquivar-excluir-lixeira", "por-que-pessoa-nao-aparece"],
  },

  {
    id: "convites-primeiro-acesso",
    titulo: "Convites, primeiro acesso e senha inicial",
    resumo: "Como a conta nasce, o que a pessoa recebe e por que a senha precisa ser trocada no primeiro acesso.",
    modulo: "pessoas",
    etapa: "configurar",
    formato: "guia",
    papeis: ["admin_rh", "todos"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["convite", "primeiro acesso", "senha", "conta", "credenciais", "email", "login"],
    aliases: ["não consigo entrar", "senha inicial", "convite expirado", "ativar conta"],
    prerequisitos: ["Pessoa cadastrada com e-mail.", "Acesso ativo à tela de Credenciais (admin/RH)."],
    secoes: [
      {
        titulo: "Como a conta é criada",
        blocos: [
          list([
            "Na importação por planilha, quem tem e-mail ganha conta automaticamente com papel colaborador.",
            "No cadastro manual, a conta também pode ser criada a partir do e-mail informado.",
            "O admin/RH pode convidar ou criar a conta na tela de Gestão de Colaboradores.",
            "Sem e-mail, a pessoa existe no organograma, mas não loga.",
          ]),
        ],
      },
      {
        titulo: "O primeiro acesso",
        blocos: [
          steps([
            { titulo: "Receba o convite ou a senha inicial", texto: "O convite chega por e-mail. Quando a conta é criada pelo RH, a senha inicial fica visível em Credenciais enquanto não for trocada." },
            { titulo: "Abra o link ou entre com a senha inicial", texto: "O primeiro acesso pode vir por link com e-mail preenchido ou pela tela de login normal." },
            { titulo: "Defina uma senha pessoal", texto: "A troca é obrigatória. Depois disso, a senha inicial deixa de aparecer para o RH." },
            { titulo: "Confira o que você vê", texto: "O papel define as telas. Colaborador vê as próprias tarefas; gestor vê a equipe; admin/RH vê a empresa." },
          ]),
          callout("info", "Esqueceu a senha?", "Use o link de recuperação na tela de login. Se o e-mail não chegar ou a conta estiver inativa, o admin/RH pode redefinir em Credenciais."),
        ],
      },
    ],
    relacionados: ["primeiro-acesso-senha", "restaurar-senha-liberar-acesso", "papeis-e-permissoes", "como-cadastrar-equipe"],
  },

  {
    id: "arquivar-excluir-lixeira",
    titulo: "Arquivar pessoa x excluir na lixeira",
    resumo: "Arquivar preserva o histórico. A lixeira é exclusão lógica com retenção e purga. Veja quando usar cada uma.",
    modulo: "pessoas",
    etapa: "resolver",
    formato: "conceito",
    papeis: ["admin_rh"],
    tempo: 3,
    atualizado: "2026-10-27",
    tags: ["arquivar", "excluir", "lixeira", "restaurar", "retenção", "histórico", "desligamento"],
    aliases: ["demitir no sistema", "remover pessoa", "recuperar colaborador", "apagar colaborador"],
    prerequisitos: ["Arquivar: admin/RH. Excluir e restaurar: admin."],
    secoes: [
      {
        titulo: "A diferença",
        blocos: [
          table(
            ["Ação", "O que acontece", "Quando usar"],
            [
              ["Arquivar", "A pessoa sai do organograma ativo, mas o histórico de avaliações, metas e PDI fica preservado.", "Desligamento ou afastamento sem intenção de apagar o passado."],
              ["Excluir (lixeira)", "Exclusão lógica com data e autor. O item fica retido por 6 meses antes da purga.", "Registro criado por engano ou dado que não deve mais existir."],
              ["Restaurar", "Devolve o item da lixeira para o estado anterior.", "Exclusão indevida ou mudança de decisão."],
            ]
          ),
        ],
      },
      {
        titulo: "O que pensar antes",
        blocos: [
          list([
            "Arquivar uma pessoa com liderados pode quebrar a hierarquia. O sistema mostra o impacto antes de confirmar.",
            "A exclusão definitiva não é botão de rotina: avaliações, PDI e Nine Box podem apontar para aquele id.",
            "A lixeira é só de admin. RH vê o organograma, mas não a lixeira.",
            "Quem foi arquivado não deve ser confundido com quem não tem acesso: são estados diferentes.",
          ]),
          callout("danger", "Purga é irreversível", "Depois do prazo de retenção, a exclusão definitiva não tem volta. Na dúvida, arquive."),
        ],
      },
    ],
    relacionados: ["cadastrar-no-organograma", "organograma-gestor-area-unidade", "por-que-pessoa-nao-aparece"],
  },

  {
    id: "por-que-pessoa-nao-aparece",
    titulo: "Por que uma pessoa não aparece no organograma",
    resumo: "Filtro, equipe recolhida, escopo, arquivamento ou busca errada: os motivos mais comuns e como confirmar.",
    modulo: "pessoas",
    etapa: "resolver",
    formato: "problema",
    papeis: ["admin_rh", "gestor"],
    tempo: 2,
    atualizado: "2026-10-27",
    tags: ["não aparece", "sumiu", "organograma", "filtro", "arquivado", "escopo", "busca"],
    aliases: ["cadê a pessoa", "colaborador não aparece", "organograma vazio"],
    prerequisitos: [],
    secoes: [
      {
        titulo: "Confira nesta ordem",
        blocos: [
          steps([
            { titulo: "Limpe busca e filtros", texto: "A tela pode estar filtrada por área, gestor ou texto. O filtro não apaga a pessoa, só esconde." },
            { titulo: "Expanda a equipe", texto: "O card do gestor pode estar recolhido. Clique para expandir a equipe." },
            { titulo: "Verifique o escopo", texto: "Gestor vê a própria linha; colaborador vê só a si. Se a pessoa está em outra linha, você não tem permissão de vê-la." },
            { titulo: "Veja se está arquivada", texto: "Pessoa arquivada sai do organograma ativo. O histórico continua. Admin/RH pode consultar a situação." },
            { titulo: "Confirme se a importação foi concluída", texto: "Prévia analisada não é importação confirmada. Nada é aplicado sem confirmação." },
          ]),
        ],
      },
      {
        titulo: "Sinais de que não é erro",
        blocos: [
          table(
            ["O que você vê", "Provável causa"],
            [
              ["A pessoa aparece na busca, mas não no desenho", "Card recolhido ou filtro de área."],
              ["A pessoa existe no cadastro e não no organograma", "Arquivada ou sem vínculo de gestor em uma árvore que você enxerga."],
              ["O gestor não vê a pessoa, mas o RH vê", "Escopo hierárquico: a pessoa pode estar em outra linha."],
              ["A pessoa não loga", "Sem e-mail ou conta inativa. Isso não a remove do organograma."],
            ]
          ),
        ],
      },
    ],
    relacionados: ["organograma-gestor-area-unidade", "arquivar-excluir-lixeira", "importar-colaboradores-planilha", "papeis-e-permissoes"],
  },
];
