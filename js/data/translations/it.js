







/**
 * Purpose: Italian language translations for LingoQuest PWA
 * Key features: Complete Italian localization, game terminology, UI elements
 * Dependencies: Translation engine, language manager, DOM translator
 * Related helpers: Translation keys, pluralization rules, context handling
 * Function names: N/A (data module)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:30 | File: js/data/translations/it.js
 */

export const itTranslations = {
    // Application metadata
    app: {
        title: 'LingoQuest',
        subtitle: 'Gioco di Parole Intelligente',
        description: 'Un gioco di parole progressivo progettato per anziani e studenti',
        version: '1.0.0',
        author: 'Team LingoQuest'
    },

    // Navigation and menu items
    navigation: {
        home: 'Casa',
        game: 'Gioco',
        settings: 'Impostazioni',
        instructions: 'Istruzioni',
        results: 'Risultati',
        profile: 'Profilo',
        help: 'Aiuto',
        about: 'Informazioni'
    },

    // Common actions and buttons
    actions: {
        start: 'Inizia',
        stop: 'Ferma',
        pause: 'Pausa',
        resume: 'Riprendi',
        restart: 'Ricomincia',
        continue: 'Continua',
        next: 'Avanti',
        previous: 'Indietro',
        back: 'Torna',
        close: 'Chiudi',
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva',
        delete: 'Elimina',
        edit: 'Modifica',
        reset: 'Ripristina',
        refresh: 'Aggiorna',
        submit: 'Invia',
        retry: 'Riprova',
        skip: 'Salta',
        finish: 'Finisci',
        exit: 'Esci',
        ok: 'OK',
        yes: 'Sì',
        no: 'No'
    },

    // Button labels
    buttons: {
        playAgain: 'Gioca Ancora',
        newGame: 'Nuovo Gioco',
        continueGame: 'Continua Gioco',
        howToPlay: 'Come Giocare',
        viewDetails: 'Visualizza Dettagli',
        hideDetails: 'Nascondi Dettagli',
        fullScreen: 'Schermo Intero',
        exitFullScreen: 'Esci da Schermo Intero',
        mute: 'Silenzia',
        unmute: 'Riattiva Audio',
        share: 'Condividi',
        download: 'Scarica',
        print: 'Stampa',
        copy: 'Copia',
        paste: 'Incolla',
        selectAll: 'Seleziona Tutto',
        undo: 'Annulla',
        redo: 'Ripeti',
        startTutorial: 'Inizia Tutorial',
        skipTutorial: 'Salta Tutorial',
        gotIt: 'Capito!',
        learnMore: 'Scopri di Più',
        tryAgain: 'Riprova',
        goHome: 'Vai alla Home',
        contactSupport: 'Contatta Supporto',
        reportBug: 'Segnala Bug',
        giveFeedback: 'Invia Feedback',
        rateApp: 'Valuta App',
        upgradeNow: 'Aggiorna Ora',
        getStarted: 'Inizia Ora',
        customize: 'Personalizza',
        advanced: 'Avanzate'
    },

    // Home screen content
    home: {
        welcome: 'Benvenuto in LingoQuest',
        subtitle: 'Scegli la tua avventura!',
        quickStart: 'Avvio Rapido',
        recentGames: 'Giochi Recenti',
        achievements: 'Obiettivi',
        statistics: 'Statistiche',
        dailyChallenge: 'Sfida Giornaliera',
        weeklyGoal: 'Obiettivo Settimanale',
        personalBest: 'Record Personale',
        totalScore: 'Punteggio Totale',
        gamesPlayed: 'Giochi Giocati',
        averageScore: 'Punteggio Medio',
        timeSpent: 'Tempo Trascorso',
        streakDays: 'Giorni Consecutivi'
    },

    // Game modes and difficulties
    gameModes: {
        classic: 'Modalità Classica',
        hollybolly: 'Modalità HollyBolly',
        mixlingo: 'Modalità MixLingo',
        tournament: 'Torneo',
        practice: 'Allenamento',
        challenge: 'Sfida'
    },

    modes: {
        easy: {
            title: 'Facile',
            description: '2 scelte per domanda',
            details: 'Perfetto per principianti con opzioni limitate'
        },
        medium: {
            title: 'Medio',
            description: '3 scelte per domanda',
            details: 'Sfida equilibrata per giocatori intermedi'
        },
        hard: {
            title: 'Difficile',
            description: '4 scelte per domanda',
            details: 'Per esperti di giochi di parole!'
        }
    },

    // Game categories
    categories: {
        name: 'Nome',
        place: 'Luogo',
        animal: 'Animale',
        thing: 'Cosa',
        food: 'Cibo',
        color: 'Colore',
        profession: 'Professione',
        sport: 'Sport',
        hobby: 'Hobby',
        vehicle: 'Veicolo',
        clothing: 'Abbigliamento',
        furniture: 'Mobili',
        technology: 'Tecnologia',
        nature: 'Natura',
        weather: 'Tempo',
        emotion: 'Emozione',
        action: 'Azione',
        adjective: 'Aggettivo'
    },

    // Game interface
    game: {
        loading: 'Caricamento gioco...',
        starting: 'Iniziando gioco...',
        category: 'Categoria',
        letter: 'Lettera',
        question: 'Domanda',
        answer: 'Risposta',
        score: 'Punteggio',
        time: 'Tempo',
        timer: 'Timer',
        timeLeft: 'Tempo rimasto',
        timeUp: 'Tempo scaduto!',
        pause: 'Pausa',
        resume: 'Riprendi',
        quit: 'Esci',
        streak: 'Serie',
        currentStreak: 'Serie Attuale',
        bestStreak: 'Migliore Serie',
        nextReward: 'Prossimo premio a {count} corrette!',
        progress: 'Progresso',
        level: 'Livello',
        round: 'Round',
        turn: 'Turno',
        attempt: 'Tentativo',
        hint: 'Suggerimento',
        showHint: 'Mostra Suggerimento',
        hideHint: 'Nascondi Suggerimento',
        correct: 'Corretto!',
        incorrect: 'Sbagliato!',
        excellent: 'Eccellente!',
        good: 'Bravo!',
        tryAgain: 'Riprova!',
        almostThere: 'Quasi!',
        keepGoing: 'Continua così!',
        wellDone: 'Ben fatto!',
        perfect: 'Perfetto!',
        amazing: 'Incredibile!',
        outstanding: 'Eccezionale!',
        phenomenal: 'Fenomenale!'
    },

    // Question prompts
    questions: {
        chooseName: 'Scegli un NOME che inizia con "{letter}"',
        choosePlace: 'Scegli un LUOGO che inizia con "{letter}"',
        chooseAnimal: 'Scegli un ANIMALE che inizia con "{letter}"',
        chooseThing: 'Scegli una COSA che inizia con "{letter}"',
        selectCorrect: 'Seleziona la risposta corretta',
        whatIs: 'Che cos\'è?',
        whichOne: 'Quale?',
        findThe: 'Trova il/la',
        identify: 'Identifica',
        match: 'Abbina',
        complete: 'Completa',
        fill: 'Riempi',
        choose: 'Scegli',
        pick: 'Seleziona'
    },

    // HollyBolly mode specific
    hollybolly: {
        title: 'Sfida HollyBolly',
        subtitle: 'Indovina i film di Hollywood da indizi in stile Bollywood!',
        description: 'Ogni film ha un Luogo, Animale e Cosa unici che appaiono nel film.',
        clueTitle: 'Indizi del Film',
        movieTitle: 'Titolo del Film',
        guessMovie: 'Indovina il film',
        hint: 'Suggerimento: Pensa alle scene iconiche!',
        
        // Reward descriptions
        rewards: {
            boxOffice: {
                title: 'Incassi Rivelati!',
                description: 'Confronto degli incassi al botteghino'
            },
            director: {
                title: 'Dettagli del Regista!',
                description: 'Patrimonio netto del regista rivelato'
            },
            hero: {
                title: 'Attore Principale Rivelato!',
                description: 'Patrimonio netto della star del cinema'
            }
        },

        // Achievement descriptions
        achievements: {
            movieBuff: 'Esperto di Cinema',
            hollywoodExpert: 'Esperto di Hollywood',
            bollywoodFan: 'Fan di Bollywood',
            triviaMaster: 'Maestro di Quiz',
            streakKing: 'Re delle Serie',
            perfectScore: 'Punteggio Perfetto'
        }
    },

    // MixLingo mode specific
    mixlingo: {
        title: 'Sfida MixLingo',
        subtitle: 'Completa le frasi con parole straniere!',
        description: 'Scegli la parola straniera corretta per completare ogni frase italiana.',
        sentence: 'Frase',
        complete: 'Completa la frase',
        chooseWord: 'Scegli la parola corretta',
        language: 'Lingua',
        difficulty: 'Difficoltà',
        context: 'Contesto',
        meaning: 'Significato',
        translation: 'Traduzione',
        pronunciation: 'Pronuncia',
        etymology: 'Etimologia',
        usage: 'Uso',
        example: 'Esempio'
    },

    // Results and scoring
    results: {
        title: 'Gioco Completato!',
        gameComplete: 'Gioco Completato',
        congratulations: 'Congratulazioni!',
        finalScore: 'Punteggio Finale',
        correct: 'Risposte Corrette',
        incorrect: 'Risposte Sbagliate',
        accuracy: 'Precisione',
        timeTaken: 'Tempo Impiegato',
        averageTime: 'Tempo Medio',
        bestTime: 'Miglior Tempo',
        performance: 'Prestazione',
        rating: 'Valutazione',
        grade: 'Voto',
        rank: 'Posizione',
        percentile: 'Percentile',
        improvement: 'Miglioramento',
        comparison: 'Confronto',
        achievements: 'Obiettivi Sbloccati',
        newRecord: 'Nuovo Record!',
        personalBest: 'Record Personale!',
        categoryBreakdown: 'Ripartizione per Categoria',
        questionReview: 'Revisione Domande',
        detailedResults: 'Risultati Dettagliati',
        summary: 'Riassunto',
        analysis: 'Analisi',
        feedback: 'Feedback',
        recommendations: 'Raccomandazioni',
        nextSteps: 'Prossimi Passi',
        practiceAreas: 'Aree da Praticare',
        strengths: 'Punti di Forza',
        weaknesses: 'Aree di Miglioramento',
        
        // Performance ratings
        ratings: {
            excellent: 'Eccellente!',
            verygood: 'Molto Bravo!',
            good: 'Bravo!',
            average: 'Nella Media',
            needsImprovement: 'Migliorabile',
            poor: 'Debole'
        },

        // Streak information
        bestStreak: 'Migliore Serie',
        consecutive: 'consecutive corrette',
        streakBroken: 'Serie interrotta a {count}',
        newStreakRecord: 'Nuovo record di serie!',
        
        // HollyBolly specific results
        moviesDiscovered: 'Film Scoperti',
        hollywoodKnowledge: 'Conoscenza di Hollywood',
        bollywoodConnection: 'Connessione Bollywood',
        culturalInsight: 'Intuizione Culturale',
        
        // Time-based results
        speedBonus: 'Bonus Velocità',
        timeBonus: 'Bonus Tempo',
        efficiencyScore: 'Punteggio Efficienza',
        consistencyRating: 'Valutazione Coerenza'
    },

    // Settings interface
    settings: {
        title: 'Impostazioni',
        account: 'Account',
        profile: 'Profilo',
        preferences: 'Preferenze',
        appearance: 'Aspetto',
        gameplay: 'Gameplay',
        audio: 'Audio',
        notifications: 'Notifiche',
        privacy: 'Privacy',
        accessibility: 'Accessibilità',
        language: 'Lingua',
        region: 'Regione',
        advanced: 'Avanzate',
        
        // Appearance settings
        theme: 'Tema',
        fontSize: 'Dimensione Font',
        fontFamily: 'Famiglia Font',
        colorScheme: 'Schema Colori',
        contrast: 'Contrasto',
        brightness: 'Luminosità',
        animations: 'Animazioni',
        transitions: 'Transizioni',
        
        // Game settings
        difficulty: 'Difficoltà Predefinita',
        timeLimit: 'Limite di Tempo',
        hints: 'Suggerimenti',
        autoAdvance: 'Avanzamento Automatico',
        confirmAnswers: 'Conferma Risposte',
        showTimer: 'Mostra Timer',
        pauseOnBlur: 'Pausa quando non in Focus',
        
        // Audio settings
        masterVolume: 'Volume Principale',
        effectsVolume: 'Volume Effetti',
        musicVolume: 'Volume Musica',
        voiceVolume: 'Volume Voce',
        soundEnabled: 'Audio Abilitato',
        musicEnabled: 'Musica Abilitata',
        voiceEnabled: 'Voce Abilitata',
        
        // Accessibility settings
        highContrast: 'Alto Contrasto',
        largeText: 'Testo Grande',
        reducedMotion: 'Movimento Ridotto',
        screenReader: 'Supporto Screen Reader',
        keyboardNavigation: 'Navigazione da Tastiera',
        colorBlindSupport: 'Supporto Daltonismo',
        
        // Privacy settings
        dataCollection: 'Raccolta Dati',
        analytics: 'Analitici',
        crashReports: 'Report Crash',
        personalizedAds: 'Pubblicità Personalizzate',
        locationServices: 'Servizi di Localizzazione',
        
        // Account settings
        username: 'Nome Utente',
        email: 'Email',
        password: 'Password',
        avatar: 'Avatar',
        displayName: 'Nome Visualizzato',
        bio: 'Biografia',
        birthday: 'Compleanno',
        location: 'Posizione',
        
        // Data management
        exportData: 'Esporta Dati',
        importData: 'Importa Dati',
        clearData: 'Cancella Dati',
        resetSettings: 'Ripristina Impostazioni',
        backupData: 'Backup Dati',
        restoreData: 'Ripristina Dati',
        
        // Help text
        helpText: {
            theme: 'Scegli l\'aspetto dell\'app',
            fontSize: 'Regola la dimensione del testo per una migliore leggibilità',
            difficulty: 'Imposta il livello di difficoltà predefinito per i nuovi giochi',
            timeLimit: 'Imposta quanto tempo hai per rispondere a ogni domanda',
            highContrast: 'Aumenta il contrasto per una migliore visibilità',
            analytics: 'Aiutaci a migliorare l\'app condividendo dati di utilizzo anonimi'
        }
    },

    // Instructions and help
    instructions: {
        title: 'Come Giocare',
        welcome: 'Benvenuto in LingoQuest!',
        overview: 'Panoramica',
        objective: 'Obiettivo del Gioco',
        categories: 'Categorie',
        howToPlay: 'Come Giocare',
        tips: 'Consigli',
        controls: 'Controlli',
        scoring: 'Punteggio',
        modes: 'Modalità di Gioco',
        
        // Objective text
        objectiveText: 'Scegli la parola corretta per ogni categoria che inizia con la lettera data.',
        
        // Category descriptions
        nameDesc: 'Il nome di una persona (es. Alice, Bob, Charlie)',
        placeDesc: 'Una città, paese o luogo (es. Parigi, Brasile, Montagna)',
        animalDesc: 'Qualsiasi animale o creatura (es. Gatto, Aquila, Balena)',
        thingDesc: 'Un oggetto o elemento (es. Libro, Auto, Telefono)',
        
        // How to play steps
        step1: {
            title: 'Scegli la Tua Modalità',
            description: 'Seleziona Facile, Medio o Difficile'
        },
        step2: {
            title: 'Leggi la Domanda',
            description: 'Vedi la categoria e la lettera iniziale'
        },
        step3: {
            title: 'Seleziona la Tua Risposta',
            description: 'Tocca la scelta corretta dalle opzioni'
        },
        step4: {
            title: 'Conferma e Continua',
            description: 'Conferma la tua risposta e passa alla domanda successiva'
        },
        
        // Game tips
        tips: {
            think: 'Prenditi il tempo per pensare prima di selezionare',
            spelling: 'Controlla attentamente la prima lettera',
            category: 'Assicurati che la parola si adatti alla categoria',
            practice: 'La pratica rende perfetti!'
        },
        
        // Controls
        controls: {
            mouse: 'Usa il mouse per cliccare sulle risposte',
            keyboard: 'Usa i tasti numerici 1-4 per selezionare le risposte',
            touch: 'Tocca le risposte sui dispositivi touch',
            space: 'Premi Spazio per confermare la risposta',
            enter: 'Premi Invio per continuare',
            escape: 'Premi Esc per mettere in pausa'
        },
        
        // Scoring explanation
        scoring: {
            basic: 'Guadagna punti per ogni risposta corretta',
            bonus: 'Ottieni punti bonus per risposte veloci',
            streak: 'Costruisci serie per moltiplicatori bonus',
            time: 'Le risposte più veloci guadagnano più punti',
            difficulty: 'Modalità più difficili danno più punti'
        }
    },

    // Loading states
    loading: {
        title: 'LingoQuest',
        text: 'Caricamento...',
        preparing: 'Preparando il gioco...',
        generating: 'Generando domande...',
        shuffling: 'Mescolando le opzioni...',
        loading: 'Caricamento contenuto...',
        saving: 'Salvando progresso...',
        processing: 'Elaborazione...',
        connecting: 'Connessione...',
        downloading: 'Scaricamento...',
        uploading: 'Caricamento...',
        syncing: 'Sincronizzazione...',
        updating: 'Aggiornamento...',
        
        // Loading tips
        tip1: '💡 Suggerimento: Pensa alla prima lettera quando scegli la tua risposta!',
        tip2: '🎯 Suggerimento: Assicurati che la parola si adatti perfettamente alla categoria!',
        tip3: '🔤 Suggerimento: Controlla l\'ortografia attentamente - ogni lettera conta!',
        tip4: '🏆 Suggerimento: La pratica rende perfetti nei giochi di parole!',
        tip5: '⚡ Suggerimento: Prenditi il tempo per pensare prima di selezionare!'
    },

    // Error messages
    errors: {
        general: 'Si è verificato un errore',
        network: 'Errore di connessione di rete',
        timeout: 'Richiesta scaduta',
        notFound: 'Contenuto non trovato',
        unauthorized: 'Accesso non autorizzato',
        forbidden: 'Accesso negato',
        serverError: 'Errore del server interno',
        validation: 'Errore di validazione',
        gameLoad: 'Impossibile caricare il gioco',
        saveGame: 'Impossibile salvare il progresso del gioco',
        loadProgress: 'Impossibile caricare il progresso salvato',
        noInternet: 'Nessuna connessione internet',
        browserNotSupported: 'Browser non supportato',
        storageQuotaExceeded: 'Quota di archiviazione superata',
        microphoneAccess: 'Accesso al microfono negato',
        cameraAccess: 'Accesso alla camera negato',
        locationAccess: 'Accesso alla posizione negato',
        
        // Specific game errors
        invalidAnswer: 'Risposta non valida',
        timeExpired: 'Tempo scaduto',
        gameNotFound: 'Gioco non trovato',
        progressLost: 'Progresso perso',
        settingsCorrupted: 'Impostazioni corrotte',
        dataCorrupted: 'Dati corrotti',
        versionMismatch: 'Versione non compatibile',
        
        // User actions
        tryAgain: 'Riprova',
        reload: 'Ricarica',
        goBack: 'Torna Indietro',
        contactSupport: 'Contatta Supporto',
        reportIssue: 'Segnala Problema',
        dismiss: 'Ignora'
    },

    // Success messages
    success: {
        general: 'Operazione completata con successo',
        gameSaved: 'Gioco salvato',
        settingsSaved: 'Impostazioni salvate',
        progressSaved: 'Progresso salvato',
        achievementUnlocked: 'Obiettivo sbloccato!',
        levelCompleted: 'Livello completato!',
        newRecord: 'Nuovo record stabilito!',
        dataExported: 'Dati esportati con successo',
        dataImported: 'Dati importati con successo',
        accountCreated: 'Account creato con successo',
        passwordChanged: 'Password cambiata con successo',
        emailVerified: 'Email verificata',
        profileUpdated: 'Profilo aggiornato',
        feedbackSent: 'Feedback inviato',
        reportSubmitted: 'Segnalazione inviata',
        subscribed: 'Iscrizione completata',
        unsubscribed: 'Disiscrizione completata'
    },

    // Confirmation dialogs
    confirm: {
        title: 'Conferma',
        message: 'Sei sicuro di voler continuare?',
        deleteMessage: 'Questa azione non può essere annullata. Sei sicuro?',
        resetMessage: 'Questo ripristinerà tutte le impostazioni. Continuare?',
        quitMessage: 'Il tuo progresso andrà perso. Vuoi davvero uscire?',
        overwriteMessage: 'Questo sovrascriverà i dati esistenti. Continuare?',
        permanentAction: 'Questa è un\'azione permanente',
        dataLoss: 'Questo comporterà la perdita di dati',
        
        // Specific confirmations
        deleteAccount: 'Eliminare definitivamente il tuo account?',
        clearProgress: 'Cancellare tutto il progresso del gioco?',
        resetSettings: 'Ripristinare tutte le impostazioni ai valori predefiniti?',
        enableLocation: 'Consentire l\'accesso alla posizione?',
        enableNotifications: 'Abilitare le notifiche?',
        shareData: 'Condividere questi dati?'
    },

    // Tooltips and help text
    tooltips: {
        home: 'Torna alla schermata principale',
        settings: 'Apri impostazioni app',
        help: 'Visualizza istruzioni di aiuto',
        profile: 'Visualizza il tuo profilo',
        achievements: 'Visualizza obiettivi sbloccati',
        leaderboard: 'Visualizza classifica',
        stats: 'Visualizza le tue statistiche',
        fullscreen: 'Modalità schermo intero',
        mute: 'Silenzia/riattiva audio',
        pause: 'Metti in pausa il gioco',
        hint: 'Ottieni un suggerimento',
        skip: 'Salta questa domanda',
        shuffle: 'Mescola le opzioni',
        zoom: 'Ingrandisci testo',
        theme: 'Cambia tema app',
        language: 'Cambia lingua',
        feedback: 'Invia feedback',
        share: 'Condividi risultato',
        download: 'Scarica risultati',
        print: 'Stampa risultati',
        copy: 'Copia negli appunti',
        
        // Game-specific tooltips
        timer: 'Tempo rimanente per questa domanda',
        score: 'Il tuo punteggio attuale',
        streak: 'Risposte corrette consecutive',
        progress: 'Progresso del gioco',
        difficulty: 'Livello di difficoltà attuale',
        category: 'Categoria della domanda attuale',
        letter: 'Lettera iniziale richiesta',
        
        // Accessibility tooltips
        highContrast: 'Attiva modalità alto contrasto',
        largeText: 'Aumenta dimensione testo',
        reducedMotion: 'Riduci animazioni',
        screenReader: 'Ottimizza per screen reader',
        keyboardNav: 'Abilita navigazione da tastiera'
    },

    // Accessibility labels
    accessibility: {
        menuButton: 'Pulsante menu',
        closeButton: 'Pulsante chiudi',
        playButton: 'Pulsante riproduci',
        pauseButton: 'Pulsante pausa',
        stopButton: 'Pulsante stop',
        nextButton: 'Pulsante avanti',
        previousButton: 'Pulsante indietro',
        submitButton: 'Pulsante invia',
        cancelButton: 'Pulsante annulla',
        
        // Game elements
        gameBoard: 'Tabellone di gioco',
        questionText: 'Testo della domanda',
        answerOptions: 'Opzioni di risposta',
        scoreDisplay: 'Visualizzazione punteggio',
        timerDisplay: 'Visualizzazione timer',
        progressBar: 'Barra di progresso',
        
        // Form elements
        textInput: 'Campo di inserimento testo',
        selectDropdown: 'Menu a tendina di selezione',
        checkbox: 'Casella di controllo',
        radioButton: 'Pulsante radio',
        slider: 'Cursore',
        
        // Status messages
        loading: 'Caricamento in corso',
        error: 'Messaggio di errore',
        success: 'Messaggio di successo',
        warning: 'Messaggio di avviso',
        information: 'Messaggio informativo',
        
        // Navigation
        breadcrumb: 'Percorso di navigazione',
        pagination: 'Navigazione pagine',
        tabList: 'Elenco schede',
        tabPanel: 'Pannello scheda',
        
        // Regions
        header: 'Intestazione',
        navigation: 'Navigazione',
        main: 'Contenuto principale',
        sidebar: 'Barra laterale',
        footer: 'Piè di pagina',
        
        // Actions
        expand: 'Espandi',
        collapse: 'Comprimi',
        toggle: 'Attiva/disattiva',
        sort: 'Ordina',
        filter: 'Filtra',
        search: 'Cerca',
        
        // States
        selected: 'Selezionato',
        unselected: 'Non selezionato',
        checked: 'Spuntato',
        unchecked: 'Non spuntato',
        enabled: 'Abilitato',
        disabled: 'Disabilitato',
        expanded: 'Espanso',
        collapsed: 'Compresso',
        required: 'Obbligatorio',
        optional: 'Opzionale',
        invalid: 'Non valido',
        valid: 'Valido'​​​​​​​​​​​​​​​​
        
        
        
        