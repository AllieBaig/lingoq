






/**
 * Purpose: Portuguese language translations for LingoQuest application
 * Key features: Complete UI translations, game content, accessibility labels
 * Dependencies: Translation engine, language manager, DOM translator
 * Related helpers: String interpolation, pluralization rules, formatting
 * Function names: N/A (data module)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:30 | File: js/data/translations/pt.js
 */

export const ptTranslations = {
    // Application metadata
    app: {
        title: 'LingoQuest',
        subtitle: 'Jogo de Palavras',
        description: 'Jogo de palavras amigável para idosos com múltiplos modos de dificuldade',
        version: '1.0.0'
    },

    // Navigation and main menu
    navigation: {
        home: 'Início',
        game: 'Jogo',
        settings: 'Configurações',
        instructions: 'Instruções',
        results: 'Resultados',
        about: 'Sobre'
    },

    // Common actions and buttons
    actions: {
        start: 'Começar',
        stop: 'Parar',
        pause: 'Pausar',
        resume: 'Continuar',
        restart: 'Reiniciar',
        next: 'Próximo',
        previous: 'Anterior',
        continue: 'Continuar',
        finish: 'Terminar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        ok: 'OK',
        yes: 'Sim',
        no: 'Não',
        save: 'Guardar',
        load: 'Carregar',
        delete: 'Eliminar',
        edit: 'Editar',
        close: 'Fechar',
        back: 'Voltar',
        submit: 'Enviar',
        reset: 'Repor'
    },

    // Home screen content
    home: {
        welcome: 'Bem-vindo ao LingoQuest',
        subtitle: 'Escolha a sua aventura!',
        selectMode: 'Selecione um modo de jogo',
        quickStart: 'Início Rápido',
        continueGame: 'Continuar Jogo',
        newGame: 'Novo Jogo'
    },

    // Game modes and difficulty levels
    gameModes: {
        classic: 'Modo Clássico',
        hollybolly: 'Modo HollyBolly',
        mixlingo: 'Modo MixLingo'
    },

    modes: {
        easy: {
            title: 'Fácil',
            description: '2 opções por pergunta',
            details: 'Perfeito para principiantes com escolhas simples'
        },
        medium: {
            title: 'Médio',
            description: '3 opções por pergunta',
            details: 'Desafio equilibrado para jogadores experientes'
        },
        hard: {
            title: 'Difícil',
            description: '4 opções por pergunta',
            details: 'Para especialistas em jogos de palavras!'
        }
    },

    // Game categories
    categories: {
        name: 'Nome',
        place: 'Lugar',
        animal: 'Animal',
        thing: 'Coisa'
    },

    // Game interface
    game: {
        category: 'Categoria',
        letter: 'Letra',
        question: 'Pergunta',
        score: 'Pontuação',
        time: 'Tempo',
        streak: 'Sequência',
        lives: 'Vidas',
        progress: 'Progresso',
        round: 'Ronda',
        level: 'Nível',
        nextReward: 'Próxima recompensa em {count} correcta!',
        currentStreak: 'Sequência Actual: {count}',
        bestStreak: 'Melhor Sequência: {count}',
        timeRemaining: 'Tempo Restante: {time}',
        questionNumber: 'Pergunta {current} de {total}'
    },

    // Instructions and help
    instructions: {
        title: 'Como Jogar',
        objective: 'Objectivo do Jogo',
        objectiveText: 'Escolha a palavra correcta para cada categoria que comece com a letra dada.',
        categories: 'Categorias',
        nameDesc: 'Um nome próprio de pessoa (ex: Alice, Bruno, Carlos)',
        placeDesc: 'Uma cidade, país ou local (ex: Paris, Brasil, Montanha)',
        animalDesc: 'Qualquer animal ou criatura (ex: Gato, Águia, Baleia)',
        thingDesc: 'Um objecto ou item (ex: Livro, Carro, Telefone)',
        modes: 'Modos de Dificuldade',
        easyDesc: 'Escolha entre 2 opções - Perfeito para principiantes!',
        mediumDesc: 'Escolha entre 3 opções - Um desafio equilibrado',
        hardDesc: 'Escolha entre 4 opções - Para especialistas em jogos de palavras!',
        howToPlay: 'Como Jogar',
        step1: {
            title: 'Escolha o Seu Modo',
            desc: 'Seleccione dificuldade Fácil, Médio ou Difícil'
        },
        step2: {
            title: 'Leia a Pergunta',
            desc: 'Veja a categoria e letra inicial'
        },
        step3: {
            title: 'Seleccione a Sua Resposta',
            desc: 'Toque na escolha correcta das opções'
        },
        step4: {
            title: 'Confirme e Continue',
            desc: 'Confirme a sua resposta e passe à próxima pergunta'
        },
        tips: 'Dicas Gerais'
    },

    // HollyBolly mode specific content
    hollybolly: {
        title: 'Desafio HollyBolly',
        description: 'Adivinhe filmes de Hollywood usando pistas inspiradas em Bollywood!',
        objective: 'Desafio HollyBolly',
        objectiveText: 'Adivinhe filmes de Hollywood usando pistas inspiradas em Bollywood! Cada filme tem um Lugar, Animal e Coisa únicos que aparecem no filme.',
        clueTitle: 'Pistas do Filme',
        howItWorks: 'Como Funciona',
        easy: {
            description: '2 opções de filmes + recompensas'
        },
        medium: {
            description: '3 opções de filmes + recompensas'
        },
        hard: {
            description: '4 opções de filmes + recompensas'
        },
        rewards: {
            title: 'Sistema de Recompensas',
            boxOffice: '1 Resposta Correcta',
            boxOfficeDesc: 'Desbloqueie comparação de receitas de bilheteira entre versões de Hollywood e Bollywood',
            director: '2 Seguidas Correctas',
            directorDesc: 'Descubra o valor líquido dos directores de ambas as indústrias',
            hero: '3 Seguidas Correctas',
            heroDesc: 'Explore a comparação do valor líquido dos actores principais'
        },
        tip1: 'Procure conexões entre as três pistas (Lugar + Animal + Coisa)',
        tip2: 'Pense em cenas icónicas de filmes e elementos memoráveis',
        tip3: 'Mantenha a sua sequência para desbloquear recompensas mais valiosas!'
    },

    // MixLingo mode content
    mixlingo: {
        objective: 'Desafio MixLingo',
        objectiveText: 'Escolha a palavra estrangeira correcta para completar cada frase em português.',
        howItWorks: 'Como Funciona',
        howItWorksText: 'Uma palavra na frase é substituída por opções da língua seleccionada. Escolha a palavra que melhor se adapta.',
        tip1: 'Leia toda a frase antes de escolher.',
        tip2: 'Diga a frase em voz alta para verificar se soa natural.'
    },

    // Results and scoring
    results: {
        title: 'Jogo Completo!',
        finalScore: 'Pontuação Final',
        correct: 'Respostas Correctas',
        incorrect: 'Respostas Incorrectas',
        accuracy: 'Precisão',
        timeTaken: 'Tempo Gasto',
        performance: 'Classificação de Desempenho',
        achievements: 'Conquistas Desbloqueadas',
        bestStreak: 'Melhor Sequência',
        consecutive: 'correctas consecutivas',
        moviesDiscovered: 'Filmes Descobertos',
        categoryBreakdown: 'Análise por Categoria',
        questionReview: 'Revisão de Perguntas'
    },

    // Performance ratings
    ratings: {
        excellent: 'Excelente!',
        verygood: 'Muito Bom!',
        good: 'Bom!',
        fair: 'Razoável',
        needswork: 'Precisa de Trabalho'
    },

    // Achievements system
    achievements: {
        boxOffice: 'Explorador de Bilheteira',
        director: 'Detective de Director',
        hero: 'Rastreador de Estrelas',
        streakMaster: 'Mestre da Sequência',
        perfectGame: 'Jogo Perfeito',
        speedster: 'Velocista',
        persistent: 'Persistente'
    },

    // Rewards content for HollyBolly mode
    rewards: {
        boxOffice: {
            title: 'Receitas de Bilheteira'
        },
        director: {
            title: 'Valor Líquido dos Directores'
        },
        hero: {
            title: 'Valor Líquido das Estrelas'
        }
    },

    // Settings interface
    settings: {
        title: 'Configurações',
        appearance: 'Aparência',
        theme: 'Tema',
        fontSize: 'Tamanho da Letra',
        fontFamily: 'Família da Letra',
        buttonSize: 'Tamanho dos Botões',
        profile: 'Perfil do Utilizador',
        selectProfile: 'Eu sou um(a)',
        profileHelp: 'Seleccionar o seu perfil recomendará temas e configurações apropriados para a melhor experiência.',
        language: 'Idioma e Região',
        selectLanguage: 'Seleccionar Idioma',
        region: 'Região',
        game: 'Configurações do Jogo',
        sound: 'Efeitos Sonoros',
        music: 'Música de Fundo',
        vibration: 'Vibração',
        animations: 'Animações',
        autoNext: 'Avançar Automaticamente',
        themeAnimations: 'Animações do Tema',
        themeAnimationsHelp: 'Activar animações especiais para temas de estudante (elementos flutuantes, efeitos)',
        accessibility: 'Acessibilidade',
        highContrast: 'Modo de Alto Contraste',
        reducedMotion: 'Reduzir Movimento',
        screenReader: 'Suporte para Leitor de Ecrã',
        largeTouchTargets: 'Alvos de Toque Extra Grandes',
        data: 'Dados e Privacidade',
        saveProgress: 'Guardar Progresso do Jogo',
        analytics: 'Partilhar Análises Anónimas',
        about: 'Sobre',
        version: 'Versão',
        themesAvailable: 'Temas Disponíveis'
    },

    // Theme names
    themes: {
        light: 'Claro',
        dark: 'Escuro',
        auto: 'Automático (Sistema)',
        highContrast: 'Alto Contraste',
        sepia: 'Sépia',
        blueLight: 'Filtro de Luz Azul',
        neonGlow: '✨ Brilho Néon',
        retroArcade: '🕹️ Arcade Retrô',
        natureForest: '🌲 Floresta Natural',
        spaceGalaxy: '🚀 Galáxia Espacial',
        candyPop: '🍭 Pop de Doces',
        jetsons: '🤖 Jetsons'
    },

    // Font sizes
    fontSize: {
        small: 'Pequeno',
        medium: 'Médio',
        large: 'Grande',
        extraLarge: 'Extra Grande',
        huge: 'Enorme'
    },

    // Font families
    fonts: {
        system: 'Padrão do Sistema',
        serif: 'Serif (Times)',
        sansSerif: 'Sans Serif (Arial)',
        monospace: 'Monospace (Courier)',
        dyslexic: 'Amigável para Dislexia'
    },

    // Button sizes
    buttonSize: {
        normal: 'Normal',
        large: 'Grande',
        extraLarge: 'Extra Grande'
    },

    // User profiles
    profile: {
        senior: '👴 Idoso (60+)',
        student: '🎓 Estudante (6-18)',
        adult: '👨 Adulto (19-59)',
        educator: '👩‍🏫 Educador',
        custom: '⚙️ Personalizado'
    },

    // Regions
    regions: {
        us: 'Estados Unidos',
        uk: 'Reino Unido',
        ca: 'Canadá',
        au: 'Austrália',
        in: 'Índia',
        de: 'Alemanha',
        fr: 'França'
    },

    // Common button labels
    buttons: {
        playAgain: 'Jogar Novamente',
        tryDifferentMode: 'Tentar Modo Diferente',
        home: 'Início',
        share: 'Partilhar',
        start: 'Começar',
        startGame: 'Começar Jogo',
        startHollyBolly: 'Começar HollyBolly',
        howToPlay: 'Como Jogar',
        confirm: 'Confirmar',
        continue: 'Continuar',
        pause: 'Pausar',
        quit: 'Sair',
        gotIt: 'Percebi!',
        startTutorial: 'Começar Tutorial',
        viewDetails: 'Ver Detalhes',
        exportData: 'Exportar os Meus Dados',
        resetData: 'Repor Todos os Dados',
        checkUpdates: 'Verificar Actualizações',
        privacyPolicy: 'Política de Privacidade',
        termsService: 'Termos de Serviço',
        share: 'Partilhar Resultados'
    },

    // Loading states
    loading: {
        title: 'LingoQuest',
        text: 'A carregar...',
        tip1: '💡 Dica: Pense na primeira letra ao escolher a sua resposta!',
        tip2: '🎯 Dica: Certifique-se de que a palavra se adapta perfeitamente à categoria!',
        tip3: '🔤 Dica: Verifique a ortografia cuidadosamente - cada letra conta!',
        tip4: '🏆 Dica: A prática faz a perfeição em jogos de palavras!',
        tip5: '⚡ Dica: Tome o seu tempo para pensar antes de seleccionar!'
    },

    // Error messages
    errors: {
        generic: 'Ocorreu um erro. Por favor, tente novamente.',
        network: 'Erro de ligação. Verifique a sua ligação à internet.',
        loading: 'Falha ao carregar. Por favor, actualize a página.',
        save: 'Falha ao guardar. Por favor, tente novamente.',
        invalidInput: 'Entrada inválida. Por favor, verifique os seus dados.',
        timeout: 'Tempo limite excedido. Por favor, tente novamente.'
    },

    // Success messages
    success: {
        saved: 'Guardado com sucesso!',
        updated: 'Actualizado com sucesso!',
        completed: 'Concluído com sucesso!',
        shared: 'Partilhado com sucesso!'
    },

    // Dialog and modal content
    dialog: {
        confirm: {
            title: 'Confirmar Acção',
            message: 'Tem a certeza de que quer continuar?'
        },
        success: {
            title: 'Sucesso',
            message: 'Acção concluída com sucesso!'
        },
        delete: {
            title: 'Eliminar Item',
            message: 'Esta acção não pode ser desfeita. Tem a certeza?'
        }
    },

    // Accessibility labels
    a11y: {
        menu: 'Menu principal',
        close: 'Fechar',
        open: 'Abrir',
        toggle: 'Alternar',
        previous: 'Anterior',
        next: 'Próximo',
        play: 'Reproduzir',
        pause: 'Pausar',
        stop: 'Parar',
        mute: 'Silenciar',
        unmute: 'Activar som',
        settings: 'Configurações',
        help: 'Ajuda',
        search: 'Pesquisar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        edit: 'Editar',
        delete: 'Eliminar',
        save: 'Guardar',
        cancel: 'Cancelar',
        loading: 'A carregar',
        error: 'Erro',
        warning: 'Aviso',
        info: 'Informação',
        success: 'Sucesso'
    },

    // Time and date formatting
    time: {
        seconds: 'segundos',
        minutes: 'minutos',
        hours: 'horas',
        days: 'dias',
        weeks: 'semanas',
        months: 'meses',
        years: 'anos',
        ago: 'atrás',
        now: 'agora',
        today: 'hoje',
        yesterday: 'ontem',
        tomorrow: 'amanhã'
    },

    // Tips for better gameplay
    tips: {
        think: 'Tome o seu tempo para pensar antes de seleccionar',
        spelling: 'Verifique a primeira letra cuidadosamente',
        category: 'Certifique-se de que a palavra se adapta à categoria',
        practice: 'A prática faz a perfeição!'
    }
};

export default ptTranslations;





