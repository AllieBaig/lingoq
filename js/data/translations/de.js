






/**
 * Purpose: German language translations for LingoQuest application
 * Key features: Complete German localization, accessibility terms, game-specific vocabulary
 * Dependencies: Translation system, language manager, internationalization framework
 * Related helpers: Language validation, text formatting, cultural adaptations
 * Function names: N/A (data export module)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-07 | File: js/data/translations/de.js
 */

export const deTranslations = {
    // Application core
    app: {
        title: 'LingoQuest - Wortspiel',
        subtitle: 'Ein unterhaltsames Wortspiel für alle Altersgruppen',
        description: 'Verbessern Sie Ihr Vokabular mit diesem interaktiven Wortspiel',
        version: 'Version 1.0.0',
        loading: 'Lädt...',
        error: 'Fehler',
        success: 'Erfolg',
        warning: 'Warnung',
        info: 'Information'
    },

    // Navigation and menu items
    navigation: {
        home: 'Startseite',
        play: 'Spielen',
        instructions: 'Anleitung',
        settings: 'Einstellungen',
        about: 'Über uns',
        help: 'Hilfe',
        back: 'Zurück',
        menu: 'Menü',
        close: 'Schließen'
    },

    // Common actions and buttons
    actions: {
        start: 'Starten',
        stop: 'Stoppen',
        pause: 'Pausieren',
        resume: 'Fortsetzen',
        restart: 'Neu starten',
        continue: 'Weiter',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        ok: 'OK',
        yes: 'Ja',
        no: 'Nein',
        save: 'Speichern',
        load: 'Laden',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        submit: 'Absenden',
        reset: 'Zurücksetzen',
        retry: 'Erneut versuchen',
        skip: 'Überspringen',
        next: 'Weiter',
        previous: 'Zurück',
        finish: 'Beenden'
    },

    // Game modes
    gameModes: {
        classic: 'Klassisch',
        hollybolly: 'HollyBolly',
        mixlingo: 'MixLingo',
        selectMode: 'Spielmodus wählen',
        modeDescription: {
            classic: 'Traditionelle Wortlategorien: Namen, Orte, Tiere, Gegenstände',
            hollybolly: 'Erraten Sie Hollywood-Filme anhand von Bollywood-Hinweisen',
            mixlingo: 'Ergänzen Sie Sätze mit fremdsprachigen Wörtern'
        }
    },

    // Difficulty levels
    difficulty: {
        easy: 'Einfach',
        medium: 'Mittel',
        hard: 'Schwer',
        selectDifficulty: 'Schwierigkeitsgrad wählen',
        description: {
            easy: '2 Antwortmöglichkeiten - Perfekt für Anfänger',
            medium: '3 Antwortmöglichkeiten - Ausgewogene Herausforderung',
            hard: '4 Antwortmöglichkeiten - Für Wortspiel-Experten'
        }
    },

    // Word categories
    categories: {
        name: 'Name',
        place: 'Ort',
        animal: 'Tier',
        thing: 'Gegenstand',
        movie: 'Film',
        description: {
            name: 'Vorname einer Person (z.B. Anna, Max, Clara)',
            place: 'Stadt, Land oder Ort (z.B. Paris, Brasilien, Berg)',
            animal: 'Beliebiges Tier oder Lebewesen (z.B. Katze, Adler, Wal)',
            thing: 'Gegenstand oder Sache (z.B. Buch, Auto, Telefon)'
        }
    },

    // Game interface
    game: {
        category: 'Kategorie',
        letter: 'Buchstabe',
        question: 'Frage',
        answer: 'Antwort',
        score: 'Punkte',
        streak: 'Serie',
        timer: 'Zeit',
        progress: 'Fortschritt',
        round: 'Runde',
        level: 'Level',
        lives: 'Leben',
        hints: 'Hinweise',
        bonus: 'Bonus',
        multiplier: 'Multiplikator',
        combo: 'Kombination',
        perfect: 'Perfekt',
        excellent: 'Ausgezeichnet',
        good: 'Gut',
        tryAgain: 'Versuchen Sie es nochmal',
        correct: 'Richtig',
        incorrect: 'Falsch',
        timeout: 'Zeit abgelaufen',
        gameOver: 'Spiel beendet',
        newRecord: 'Neuer Rekord!',
        wellDone: 'Gut gemacht!',
        keepGoing: 'Weiter so!',
        almostThere: 'Fast geschafft!',
        nextReward: 'Nächste Belohnung bei {count} richtigen Antworten!'
    },

    // Questions and prompts
    questions: {
        choose: 'Wählen Sie',
        chooseA: 'Wählen Sie einen/eine/ein',
        thatStartsWith: 'der/die/das mit "{letter}" beginnt',
        name: 'einen NAMEN',
        place: 'einen ORT',
        animal: 'ein TIER',
        thing: 'einen GEGENSTAND',
        whichMovie: 'Welcher Film passt zu diesen Hinweisen?',
        completeWith: 'Ergänzen Sie mit dem richtigen Wort',
        selectBest: 'Wählen Sie die beste Antwort',
        matchClues: 'Ordnen Sie die Hinweise zu'
    },

    // Results and scoring
    results: {
        title: 'Spiel beendet!',
        finalScore: 'Endpunktzahl',
        correct: 'Richtige Antworten',
        incorrect: 'Falsche Antworten',
        accuracy: 'Genauigkeit',
        timeTaken: 'Benötigte Zeit',
        performance: 'Leistung',
        rating: 'Bewertung',
        excellent: 'Ausgezeichnet!',
        good: 'Gut!',
        fair: 'Ordentlich!',
        needsImprovement: 'Verbesserungsbedarf',
        playAgain: 'Nochmal spielen',
        tryDifferent: 'Anderen Modus versuchen',
        shareResults: 'Ergebnisse teilen',
        newHighScore: 'Neuer Höchststand!',
        personalBest: 'Persönliche Bestleistung!',
        improvement: 'Verbesserung um {percent}%',
        categoryBreakdown: 'Kategorien-Aufschlüsselung',
        questionReview: 'Fragen-Überprüfung',
        viewDetails: 'Details anzeigen',
        hideDetails: 'Details verbergen',
        achievements: 'Errungenschaften freigeschaltet',
        bestStreak: 'Beste Serie',
        consecutive: 'aufeinanderfolgend richtig',
        moviesDiscovered: 'Filme entdeckt'
    },

    // Instructions and help
    instructions: {
        title: 'Spielanleitung',
        objective: 'Spielziel',
        objectiveText: 'Wählen Sie das richtige Wort für jede Kategorie, das mit dem angegebenen Buchstaben beginnt.',
        categories: 'Kategorien',
        modes: 'Schwierigkeitsgrade',
        howToPlay: 'So spielen Sie',
        tips: 'Tipps',
        examples: 'Beispiele',
        step1: {
            title: 'Modus wählen',
            desc: 'Wählen Sie Einfach, Mittel oder Schwer'
        },
        step2: {
            title: 'Frage lesen',
            desc: 'Sehen Sie sich Kategorie und Anfangsbuchstaben an'
        },
        step3: {
            title: 'Antwort wählen',
            desc: 'Tippen Sie auf die richtige Antwort'
        },
        step4: {
            title: 'Bestätigen & Weiter',
            desc: 'Bestätigen Sie Ihre Antwort und gehen Sie zur nächsten Frage'
        },
        nameDesc: 'Vorname einer Person',
        placeDesc: 'Stadt, Land oder Ort',
        animalDesc: 'Beliebiges Tier oder Lebewesen',
        thingDesc: 'Gegenstand oder Sache',
        easyDesc: 'Wählen Sie aus 2 Optionen - Perfekt für Anfänger!',
        mediumDesc: 'Wählen Sie aus 3 Optionen - Ausgewogene Herausforderung',
        hardDesc: 'Wählen Sie aus 4 Optionen - Für Wortspiel-Experten!'
    },

    // HollyBolly specific
    hollybolly: {
        title: 'HollyBolly Herausforderung',
        objective: 'HollyBolly Herausforderung',
        objectiveText: 'Erraten Sie Hollywood-Filme anhand von Bollywood-inspirierten Hinweisen! Jeder Film hat einen einzigartigen Ort, ein Tier und einen Gegenstand.',
        clueTitle: 'Film-Hinweise',
        howItWorks: 'So funktioniert es',
        rewards: {
            title: 'Belohnungssystem',
            boxOffice: '1 richtige Antwort',
            boxOfficeDesc: 'Schalten Sie Kinokassen-Vergleiche zwischen Hollywood und Bollywood frei',
            director: '2 richtig hintereinander',
            directorDesc: 'Entdecken Sie das Nettovermögen von Regisseuren beider Industrien',
            hero: '3 richtig hintereinander',
            heroDesc: 'Erkunden Sie das Nettovermögen-Vergleich der Hauptdarsteller'
        },
        tips: 'Tipps für den Erfolg',
        tip1: 'Suchen Sie nach Verbindungen zwischen allen drei Hinweisen',
        tip2: 'Denken Sie an ikonische Filmszenen und unvergessliche Elemente',
        tip3: 'Halten Sie Ihre Serie aufrecht, um wertvollere Belohnungen freizuschalten!',
        easy: {
            description: '2 Film-Optionen + Belohnungen'
        },
        medium: {
            description: '3 Film-Optionen + Belohnungen'
        },
        hard: {
            description: '4 Film-Optionen + Belohnungen'
        }
    },

    // MixLingo specific
    mixlingo: {
        objective: 'MixLingo Herausforderung',
        objectiveText: 'Wählen Sie das richtige fremdsprachige Wort, um jeden deutschen Satz zu vervollständigen.',
        howItWorks: 'So funktioniert es',
        howItWorksText: 'Ein Wort im Satz wird durch Optionen aus der gewählten Sprache ersetzt. Wählen Sie das Wort, das am besten passt.',
        tips: 'Tipps für den Erfolg',
        tip1: 'Lesen Sie den ganzen Satz, bevor Sie wählen.',
        tip2: 'Sprechen Sie den Satz laut aus, um zu prüfen, ob er natürlich klingt.'
    },

    // Settings
    settings: {
        title: 'Einstellungen',
        appearance: 'Erscheinungsbild',
        theme: 'Design',
        fontSize: 'Schriftgröße',
        fontFamily: 'Schriftart',
        buttonSize: 'Button-Größe',
        language: 'Sprache & Region',
        selectLanguage: 'Sprache wählen',
        region: 'Region',
        game: 'Spiel',
        sound: 'Soundeffekte',
        music: 'Hintergrundmusik',
        vibration: 'Vibration',
        animations: 'Animationen',
        autoNext: 'Fragen automatisch weiterschalten',
        accessibility: 'Barrierefreiheit',
        highContrast: 'Hoher Kontrast',
        reducedMotion: 'Bewegung reduzieren',
        screenReader: 'Screenreader-Unterstützung',
        data: 'Daten & Datenschutz',
        saveProgress: 'Spielfortschritt speichern',
        analytics: 'Anonyme Analyse-Daten teilen',
        about: 'Über',
        version: 'Version',
        profile: 'Benutzerprofil',
        selectProfile: 'Ich bin ein/eine',
        profileHelp: 'Die Auswahl Ihres Profils empfiehlt geeignete Designs und Einstellungen.',
        themesAvailable: 'Verfügbare Designs',
        themeAnimations: 'Design-Animationen',
        themeAnimationsHelp: 'Spezielle Animationen für Studenten-Designs aktivieren',
        largeTouchTargets: 'Extra große Berührungsziele'
    },

    // Themes
    themes: {
        light: 'Hell',
        dark: 'Dunkel',
        auto: 'Automatisch (System)',
        highContrast: 'Hoher Kontrast',
        sepia: 'Sepia',
        blueLight: 'Blaulichtfilter',
        neonGlow: '✨ Neon-Glühen',
        retroArcade: '🕹️ Retro-Arcade',
        natureForest: '🌲 Natur-Wald',
        spaceGalaxy: '🚀 Weltraum-Galaxie',
        candyPop: '🍭 Süßigkeiten-Pop',
        campusClassic: '🎓 Campus-Klassiker',
        minimalFocus: '📘 Minimal Fokus',
        nightOwl: '🌙 Nacht-Eule',
        jetsons: '🤖 Jetsons'
    },

    // Font options
    fonts: {
        system: 'System-Standard',
        serif: 'Serif (Times)',
        sansSerif: 'Sans Serif (Arial)',
        monospace: 'Monospace (Courier)',
        dyslexic: 'Legasthenie-freundlich'
    },

    // Font sizes
    fontSize: {
        small: 'Klein',
        medium: 'Mittel',
        large: 'Groß',
        extraLarge: 'Extra groß',
        huge: 'Riesig'
    },

    // Button sizes
    buttonSize: {
        normal: 'Normal',
        large: 'Groß',
        extraLarge: 'Extra groß'
    },

    // User profiles
    profile: {
        senior: '👴 Senior (60+)',
        student: '🎓 Student (6-18)',
        adult: '👨 Erwachsener (19-59)',
        educator: '👩‍🏫 Pädagoge',
        custom: '⚙️ Benutzerdefiniert'
    },

    // Regions
    regions: {
        us: 'Vereinigte Staaten',
        uk: 'Vereinigtes Königreich',
        ca: 'Kanada',
        au: 'Australien',
        in: 'Indien',
        de: 'Deutschland',
        fr: 'Frankreich'
    },

    // Loading states
    loading: {
        title: 'LingoQuest',
        text: 'Lädt...',
        tip1: '💡 Tipp: Denken Sie an den ersten Buchstaben bei der Antwortauswahl!',
        tip2: '🎯 Tipp: Stellen Sie sicher, dass das Wort perfekt zur Kategorie passt!',
        tip3: '🔤 Tipp: Prüfen Sie die Schreibweise sorgfältig!',
        tip4: '🏆 Tipp: Übung macht den Meister bei Wortspielen!',
        tip5: '⚡ Tipp: Nehmen Sie sich Zeit zum Nachdenken vor der Auswahl!'
    },

    // Error messages
    errors: {
        generic: 'Ein Fehler ist aufgetreten',
        network: 'Netzwerkfehler - Bitte prüfen Sie Ihre Verbindung',
        timeout: 'Zeitüberschreitung - Bitte versuchen Sie es erneut',
        notFound: 'Nicht gefunden',
        serverError: 'Serverfehler - Bitte versuchen Sie es später erneut',
        invalidInput: 'Ungültige Eingabe',
        gameError: 'Spielfehler aufgetreten',
        loadError: 'Fehler beim Laden',
        saveError: 'Fehler beim Speichern',
        connectionLost: 'Verbindung verloren'
    },

    // Success messages
    success: {
        saved: 'Erfolgreich gespeichert',
        loaded: 'Erfolgreich geladen',
        updated: 'Erfolgreich aktualisiert',
        completed: 'Erfolgreich abgeschlossen',
        sent: 'Erfolgreich gesendet',
        connected: 'Erfolgreich verbunden'
    },

    // Achievements
    achievements: {
        boxOffice: 'Box Office Entdecker',
        director: 'Regisseur-Detektiv',
        hero: 'Star-Verfolger',
        perfectGame: 'Perfektes Spiel',
        speedRunner: 'Geschwindigkeitsläufer',
        streakMaster: 'Serien-Meister',
        categoryExpert: 'Kategorie-Experte',
        movieBuff: 'Film-Fan',
        wordWizard: 'Wort-Zauberer',
        linguist: 'Sprachwissenschaftler'
    },

    // Rewards
    rewards: {
        boxOffice: {
            title: 'Kinokassen-Einnahmen enthüllt! 💰'
        },
        director: {
            title: 'Regisseur-Details! 🎬'
        },
        hero: {
            title: 'Hauptdarsteller enthüllt! ⭐'
        }
    },

    // Ratings
    ratings: {
        excellent: 'Ausgezeichnet!',
        good: 'Gut!',
        fair: 'Ordentlich!',
        needsWork: 'Verbesserungsbedarf'
    },

    // Tutorial
    tutorial: {
        title: 'Willkommen bei LingoQuest!',
        dontShowAgain: 'Diese Anleitung nicht mehr anzeigen',
        step1: {
            title: 'Willkommen zu Ihrem Wort-Abenteuer!',
            description: 'LingoQuest ist ein unterhaltsames Wortspiel, bei dem Sie die richtigen Wörter wählen, die mit bestimmten Buchstaben beginnen. Lassen Sie uns eine kurze Tour machen!'
        },
        step2: {
            title: 'Wählen Sie Ihren Spielmodus',
            description: 'LingoQuest bietet verschiedene Spielmodi, die zu Ihrem Können und Ihren Interessen passen.',
            classic: 'Traditionelle Wort-Kategorien: Namen, Orte, Tiere, Gegenstände',
            hollybolly: 'Erraten Sie Hollywood-Filme anhand von Bollywood-Hinweisen!'
        },
        step3: {
            title: 'Wählen Sie Ihr Herausforderungslevel',
            description: 'Beginnen Sie mit dem einfachen Modus und arbeiten Sie sich hoch!',
            easy: '2 Antwortmöglichkeiten pro Frage',
            medium: '3 Antwortmöglichkeiten pro Frage',
            hard: '4 Antwortmöglichkeiten pro Frage'
        },
        step4: {
            title: 'So spielen Sie',
            description: 'Das Spielen ist einfach! Folgen Sie diesen einfachen Schritten:',
            read: 'Lesen Sie die Frage und Kategorie',
            choose: 'Wählen Sie die richtige Antwort',
            confirm: 'Bestätigen Sie Ihre Auswahl',
            continue: 'Weiter zur nächsten Frage'
        },
        step5: {
            title: 'Passen Sie Ihr Erlebnis an',
            description: 'Machen Sie LingoQuest perfekt für Sie mit unseren Barrierefreiheits- und Anpassungsoptionen.',
            themes: 'Designs & Farben',
            fonts: 'Schriftgröße & -stil',
            language: 'Sprachoptionen',
            accessibility: 'Barrierefreiheits-Funktionen'
        },
        step6: {
            title: 'Sie sind bereit zu spielen!',
            description: 'Das ist alles! Denken Sie daran, LingoQuest macht Spaß beim Lernen. Lassen Sie sich Zeit und machen Sie sich keine Sorgen über Fehler!',
            achievement: 'Bereit für das Abenteuer!',
            tip1: 'Nehmen Sie sich Zeit zum Nachdenken',
            tip2: 'Konzentrieren Sie sich auf den ersten Buchstaben',
            tip3: 'Übung macht den Meister!'
        }
    },

    // Buttons - comprehensive button labels
    buttons: {
        start: 'Starten',
        startGame: 'Spiel starten',
        startPlaying: 'Spielen beginnen!',
        startTutorial: 'Anleitung starten',
        startHollyBolly: 'HollyBolly starten',
        playAgain: 'Nochmal spielen',
        tryDifferentMode: 'Anderen Modus versuchen',
        home: 'Startseite',
        howToPlay: 'Spielanleitung',
        settings: 'Einstellungen',
        pause: 'Pausieren',
        resume: 'Fortsetzen',
        quit: 'Beenden',
        mainMenu: 'Hauptmenü',
        confirm: 'Bestätigen',
        cancel: 'Abbrechen',
        continue: 'Weiter',
        next: 'Weiter',
        previous: 'Zurück',
        finish: 'Beenden',
        close: 'Schließen',
        save: 'Speichern',
        load: 'Laden',
        reset: 'Zurücksetzen',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        share: 'Teilen',
        shareResults: 'Ergebnisse teilen',
        viewDetails: 'Details anzeigen',
        hideDetails: 'Details verbergen',
        gotIt: 'Verstanden!',
        skipTutorial: 'Anleitung überspringen',
        exportData: 'Daten exportieren',
        resetData: 'Alle Daten zurücksetzen',
        checkUpdates: 'Nach Updates suchen',
        privacyPolicy: 'Datenschutzrichtlinie',
        termsService: 'Nutzungsbedingungen',
        ok: 'OK'
    },

    // Dialog messages
    dialog: {
        confirm: {
            title: 'Aktion bestätigen',
            message: 'Sind Sie sicher, dass Sie fortfahren möchten?'
        },
        success: {
            title: 'Erfolg',
            message: 'Aktion erfolgreich abgeschlossen!'
        },
        delete: {
            title: 'Element löschen',
            message: 'Diese Aktion kann nicht rückgängig gemacht werden. Sind Sie sicher?'
        }
    },

    // Common UI elements
    ui: {
        search: 'Suchen',
        filter: 'Filter',
        sort: 'Sortieren',
        select: 'Auswählen',
        selectAll: 'Alle auswählen',
        clear: 'Löschen',
        apply: 'Anwenden',
        refresh: 'Aktualisieren',
        expand: 'Erweitern',
        collapse: 'Zusammenklappen',
        show: 'Anzeigen',
        hide: 'Verbergen',
        enable: 'Aktivieren',
        disable: 'Deaktivieren',
        on: 'An',
        off: 'Aus',
        toggle: 'Umschalten'
    }
};

// Export as default
export default deTranslations;



