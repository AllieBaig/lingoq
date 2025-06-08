


/**
 * Purpose: Spanish translation file for LingoQuest internationalization
 * Key features: Complete Spanish localization, game terminology, UI elements
 * Dependencies: Translation engine, language manager, DOM translator
 * Related helpers: Translation keys, pluralization rules, text formatting
 * Function names: N/A (data file)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:30 | File: js/data/translations/es.js
 */

export const esTranslations = {
    // Application metadata
    app: {
        title: 'LingoQuest',
        tagline: '¡Juego de palabras para todas las edades!',
        description: 'Una aplicación web progresiva con juegos de palabras accesibles',
        version: 'Versión 1.0.0'
    },

    // Navigation and menu items
    navigation: {
        home: 'Inicio',
        game: 'Juego',
        settings: 'Configuración',
        instructions: 'Instrucciones',
        results: 'Resultados',
        about: 'Acerca de',
        help: 'Ayuda',
        profile: 'Perfil'
    },

    // Common actions and buttons
    actions: {
        start: 'Comenzar',
        stop: 'Parar',
        pause: 'Pausar',
        resume: 'Continuar',
        restart: 'Reiniciar',
        continue: 'Continuar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        ok: 'Aceptar',
        yes: 'Sí',
        no: 'No',
        save: 'Guardar',
        load: 'Cargar',
        delete: 'Eliminar',
        edit: 'Editar',
        close: 'Cerrar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        submit: 'Enviar',
        reset: 'Restablecer',
        clear: 'Limpiar'
    },

    // Home screen content
    home: {
        welcome: 'Bienvenido a LingoQuest',
        subtitle: '¡Elige tu aventura!',
        selectMode: 'Selecciona un modo de juego',
        recentGames: 'Juegos recientes',
        achievements: 'Logros',
        statistics: 'Estadísticas'
    },

    // Game modes
    gameModes: {
        classic: 'Modo Clásico',
        hollybolly: 'Modo HollyBolly',
        mixlingo: 'Modo MixLingo'
    },

    // Difficulty levels
    modes: {
        easy: {
            title: 'Fácil',
            description: '2 opciones por pregunta',
            details: 'Perfecto para principiantes'
        },
        medium: {
            title: 'Medio',
            description: '3 opciones por pregunta',
            details: 'Un desafío equilibrado'
        },
        hard: {
            title: 'Difícil',
            description: '4 opciones por pregunta',
            details: '¡Para expertos en juegos de palabras!'
        }
    },

    // Game categories
    categories: {
        name: 'Nombres',
        place: 'Lugares',
        animal: 'Animales',
        thing: 'Objetos'
    },

    // Game interface
    game: {
        category: 'Categoría',
        letter: 'Letra',
        question: 'Pregunta',
        options: 'Opciones',
        score: 'Puntuación',
        timer: 'Tiempo',
        streak: 'Racha',
        progress: 'Progreso',
        nextReward: 'Próxima recompensa en {count} correcta',
        timeRemaining: 'Tiempo restante',
        currentQuestion: 'Pregunta actual',
        totalQuestions: 'Total de preguntas',
        correctAnswers: 'Respuestas correctas',
        incorrectAnswers: 'Respuestas incorrectas'
    },

    // Buttons
    buttons: {
        start: 'Comenzar',
        startGame: 'Comenzar Juego',
        startHollyBolly: 'Comenzar HollyBolly',
        playAgain: 'Jugar de Nuevo',
        tryDifferentMode: 'Probar Modo Diferente',
        home: 'Inicio',
        share: 'Compartir',
        howToPlay: 'Cómo Jugar',
        settings: 'Configuración',
        confirm: 'Confirmar',
        confirmAnswer: 'Confirmar Respuesta',
        continue: 'Continuar',
        pause: 'Pausar',
        quit: 'Salir',
        gotIt: 'Entendido',
        startTutorial: 'Comenzar Tutorial',
        viewDetails: 'Ver Detalles',
        exportData: 'Exportar Datos',
        resetData: 'Restablecer Datos',
        checkUpdates: 'Buscar Actualizaciones',
        privacyPolicy: 'Política de Privacidad',
        termsService: 'Términos de Servicio'
    },

    // Instructions screen
    instructions: {
        title: 'Cómo Jugar',
        objective: 'Objetivo del Juego',
        objectiveText: 'Elige la palabra correcta para cada categoría que comience con la letra dada.',
        categories: 'Categorías',
        nameDesc: 'Un nombre de persona (ej. Ana, Bob, Carlos)',
        placeDesc: 'Una ciudad, país o ubicación (ej. París, Brasil, Montaña)',
        animalDesc: 'Cualquier animal o criatura (ej. Gato, Águila, Ballena)',
        thingDesc: 'Un objeto o artículo (ej. Libro, Coche, Teléfono)',
        modes: 'Modos de Dificultad',
        easyDesc: 'Elige entre 2 opciones - ¡Perfecto para principiantes!',
        mediumDesc: 'Elige entre 3 opciones - Un desafío equilibrado',
        hardDesc: 'Elige entre 4 opciones - ¡Para expertos en juegos de palabras!',
        howToPlay: 'Cómo Jugar',
        step1: {
            title: 'Elige Tu Modo',
            desc: 'Selecciona dificultad Fácil, Medio o Difícil'
        },
        step2: {
            title: 'Lee la Pregunta',
            desc: 'Observa la categoría y la letra inicial'
        },
        step3: {
            title: 'Selecciona Tu Respuesta',
            desc: 'Toca la opción correcta entre las opciones'
        },
        step4: {
            title: 'Confirma y Continúa',
            desc: 'Confirma tu respuesta y pasa a la siguiente pregunta'
        },
        tips: 'Consejos Generales'
    },

    // HollyBolly mode specific
    hollybolly: {
        title: 'Desafío HollyBolly',
        description: '¡Adivina películas de Hollywood usando pistas al estilo Bollywood!',
        clueTitle: 'Pistas de Película',
        objective: 'Desafío HollyBolly',
        objectiveText: '¡Adivina películas de Hollywood usando pistas inspiradas en Bollywood! Cada película tiene un lugar, animal y objeto únicos que aparecen en la película.',
        howItWorks: 'Cómo Funciona',
        easy: {
            description: '2 opciones de películas + recompensas'
        },
        medium: {
            description: '3 opciones de películas + recompensas'
        },
        hard: {
            description: '4 opciones de películas + recompensas'
        },
        rewards: {
            title: 'Sistema de Recompensas',
            boxOffice: '1 Respuesta Correcta: Ganancias de Taquilla',
            director: '2 Seguidas: Patrimonio del Director',
            hero: '3 Seguidas: Patrimonio del Actor Principal',
            boxOfficeDesc: 'Desbloquea comparación de ganancias de taquilla entre versiones de Hollywood y Bollywood',
            directorDesc: 'Descubre el patrimonio neto de directores de ambas industrias',
            heroDesc: 'Explora la comparación del patrimonio neto de actores principales'
        },
        tips: 'Consejos para el Éxito',
        tip1: 'Busca conexiones entre las tres pistas (Lugar + Animal + Objeto)',
        tip2: 'Piensa en escenas icónicas de películas y elementos memorables',
        tip3: '¡Mantén tu racha para desbloquear recompensas más valiosas!'
    },

    // MixLingo mode specific
    mixlingo: {
        objective: 'Desafío MixLingo',
        objectiveText: 'Elige la palabra extranjera correcta para completar cada oración en español.',
        howItWorks: 'Cómo Funciona',
        howItWorksText: 'Una palabra en la oración es reemplazada con opciones del idioma seleccionado. Elige la palabra que mejor encaje.',
        tip1: 'Lee toda la oración antes de elegir.',
        tip2: 'Di la oración en voz alta para verificar si suena natural.'
    },

    // Results screen
    results: {
        title: '¡Juego Completado!',
        achievements: 'Logros Desbloqueados',
        bestStreak: 'Mejor Racha',
        consecutive: 'correctas consecutivas',
        moviesDiscovered: 'Películas Descubiertas',
        correct: 'Respuestas Correctas:',
        incorrect: 'Respuestas Incorrectas:',
        accuracy: 'Precisión:',
        timeTaken: 'Tiempo Empleado:',
        performance: 'Calificación de Rendimiento',
        categoryBreakdown: 'Desglose por Categoría',
        questionReview: 'Revisión de Preguntas'
    },

    // Performance ratings
    ratings: {
        excellent: '¡Excelente!',
        good: '¡Bien!',
        fair: 'Regular',
        needsImprovement: 'Necesita Mejorar'
    },

    // Achievements
    achievements: {
        boxOffice: 'Explorador de Taquilla',
        director: 'Detective Director',
        hero: 'Rastreador de Estrellas'
    },

    // Settings screen
    settings: {
        title: 'Configuración',
        appearance: 'Apariencia',
        theme: 'Tema:',
        fontSize: 'Tamaño de Fuente:',
        fontFamily: 'Familia de Fuente:',
        buttonSize: 'Tamaño de Botón:',
        profile: 'Perfil de Usuario',
        selectProfile: 'Soy un:',
        profileHelp: 'Seleccionar tu perfil recomendará temas y configuraciones apropiadas para la mejor experiencia.',
        language: 'Idioma y Región',
        selectLanguage: 'Seleccionar Idioma:',
        region: 'Región:',
        game: 'Configuración del Juego',
        sound: 'Efectos de Sonido',
        music: 'Música de Fondo',
        vibration: 'Vibración',
        animations: 'Animaciones',
        autoNext: 'Avanzar Preguntas Automáticamente',
        themeAnimations: 'Animaciones del Tema',
        themeAnimationsHelp: 'Habilitar animaciones especiales para temas estudiantiles (elementos flotantes, efectos)',
        accessibility: 'Accesibilidad',
        highContrast: 'Modo de Alto Contraste',
        reducedMotion: 'Reducir Movimiento',
        screenReader: 'Soporte para Lector de Pantalla',
        largeTouchTargets: 'Objetivos de Toque Extra Grandes',
        data: 'Datos y Privacidad',
        saveProgress: 'Guardar Progreso del Juego',
        analytics: 'Compartir Análisis Anónimos',
        about: 'Acerca de',
        version: 'Versión:',
        themesAvailable: 'Temas Disponibles:'
    },

    // Themes
    themes: {
        light: 'Claro',
        dark: 'Oscuro',
        auto: 'Automático (Sistema)',
        highContrast: 'Alto Contraste',
        sepia: 'Sepia',
        blueLight: 'Filtro de Luz Azul',
        neonGlow: '✨ Brillo Neón',
        retroArcade: '🕹️ Arcade Retro',
        natureForest: '🌲 Bosque Natural',
        spaceGalaxy: '🚀 Galaxia Espacial',
        candyPop: '🍭 Dulce Pop',
        jetsons: '🤖 Los Supersónicos'
    },

    // Font sizes
    fontSize: {
        small: 'Pequeño',
        medium: 'Mediano',
        large: 'Grande',
        extraLarge: 'Extra Grande',
        huge: 'Enorme'
    },

    // Font families
    fonts: {
        system: 'Predeterminado del Sistema',
        serif: 'Serif (Times)',
        sansSerif: 'Sans Serif (Arial)',
        monospace: 'Monospace (Courier)',
        dyslexic: 'Amigable para Dislexia'
    },

    // Button sizes
    buttonSize: {
        normal: 'Normal',
        large: 'Grande',
        extraLarge: 'Extra Grande'
    },

    // User profiles
    profile: {
        senior: '👴 Mayor (60+)',
        student: '🎓 Estudiante (6-18)',
        adult: '👨 Adulto (19-59)',
        educator: '👩‍🏫 Educador',
        custom: '⚙️ Personalizado'
    },

    // Regions
    regions: {
        us: 'Estados Unidos',
        uk: 'Reino Unido',
        ca: 'Canadá',
        au: 'Australia',
        in: 'India',
        de: 'Alemania',
        fr: 'Francia'
    },

    // Loading messages
    loading: {
        title: 'LingoQuest',
        text: 'Cargando...',
        tip1: '💡 Consejo: ¡Piensa en la primera letra al elegir tu respuesta!',
        gameStart: 'Iniciando juego...',
        loadingQuestions: 'Cargando preguntas...',
        preparingGame: 'Preparando el juego...'
    },

    // Tips
    tips: {
        think: 'Tómate tu tiempo para pensar antes de seleccionar',
        spelling: 'Revisa cuidadosamente la primera letra',
        category: 'Asegúrate de que la palabra encaje en la categoría',
        practice: '¡La práctica hace al maestro!'
    },

    // Error messages
    errors: {
        generic: 'Ha ocurrido un error',
        networkError: 'Error de conexión de red',
        loadingFailed: 'Error al cargar',
        gameError: 'Error del juego',
        saveFailed: 'Error al guardar',
        invalidInput: 'Entrada inválida',
        sessionExpired: 'Sesión expirada',
        notFound: 'No encontrado'
    },

    // Success messages
    success: {
        saved: 'Guardado exitosamente',
        updated: 'Actualizado exitosamente',
        gameCompleted: '¡Juego completado!',
        achievementUnlocked: '¡Logro desbloqueado!',
        settingsApplied: 'Configuración aplicada'
    },

    // Warnings
    warnings: {
        unsavedChanges: 'Tienes cambios sin guardar',
        lowBattery: 'Batería baja',
        slowConnection: 'Conexión lenta detectada',
        storageLimit: 'Límite de almacenamiento alcanzado'
    },

    // Dialog boxes
    dialog: {
        confirm: {
            title: 'Confirmar Acción',
            message: '¿Estás seguro de que quieres continuar?'
        },
        success: {
            title: 'Éxito',
            message: '¡Acción completada exitosamente!'
        },
        delete: {
            title: 'Eliminar Elemento',
            message: 'Esta acción no se puede deshacer. ¿Estás seguro?'
        }
    },

    // Time formats
    time: {
        seconds: 'segundos',
        minutes: 'minutos',
        hours: 'horas',
        days: 'días'
    },

    // Numbers and counting
    numbers: {
        zero: 'cero',
        one: 'uno',
        two: 'dos',
        few: 'pocos',
        many: 'muchos',
        other: 'otros'
    },

    // Game status
    status: {
        ready: 'Listo',
        playing: 'Jugando',
        paused: 'Pausado',
        completed: 'Completado',
        loading: 'Cargando',
        error: 'Error'
    },

    // Rewards system
    rewards: {
        boxOffice: {
            title: 'Ganancias de Taquilla'
        },
        director: {
            title: 'Detalles del Director'
        },
        hero: {
            title: 'Actor Principal Revelado'
        }
    }
};

// Export default for easy importing
export default esTranslations;


