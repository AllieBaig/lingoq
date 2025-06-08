

// LingoQuest - French Translations
// ES6 Module for French language support
// Complete translation database for all UI elements

export const frTranslations = {
    // App metadata
    app: {
        title: 'LingoQuest',
        subtitle: 'Jeu de mots amusant',
        description: 'Découvrez de nouveaux mots avec LingoQuest'
    },
    
    // Navigation and actions
    navigation: {
        home: 'Accueil',
        game: 'Jeu',
        settings: 'Paramètres',
        instructions: 'Instructions',
        results: 'Résultats',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent'
    },
    
    // Common actions
    actions: {
        start: 'Commencer',
        play: 'Jouer',
        pause: 'Pause',
        resume: 'Reprendre',
        restart: 'Redémarrer',
        quit: 'Quitter',
        save: 'Sauvegarder',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        delete: 'Supprimer',
        edit: 'Modifier',
        ok: 'OK',
        yes: 'Oui',
        no: 'Non',
        close: 'Fermer',
        submit: 'Soumettre',
        reset: 'Réinitialiser'
    },

    // Libellés des boutons
    buttons: {
        start: 'Commencer le jeu',
        startHollyBolly: 'Commencer HollyBolly',
        howToPlay: 'Comment jouer',
        confirm: 'Confirmer la réponse',
        continue: 'Continuer le jeu',
        pause: 'Pause',
        quit: 'Quitter le jeu',
        mainMenu: 'Menu Principal',
        viewDetails: 'Voir les résultats détaillés',
        playAgain: 'Rejouer',
        tryDifferentMode: 'Essayer un autre mode',
        home: 'Accueil',
        share: 'Partager les résultats',
        exportData: 'Exporter mes données',
        resetData: 'Réinitialiser toutes les données',
        checkUpdates: 'Vérifier les mises à jour',
        privacyPolicy: 'Politique de confidentialité',
        termsService: "Conditions d'utilisation",
        startTutorial: 'Commencer le tutoriel',
        gotIt: 'Compris!'
    },
    
    // Game modes
    modes: {
        classic: {
            title: 'Mode Classique',
            description: 'Nom Lieu Animal Chose traditionnel'
        },
        easy: {
            title: 'Facile',
            description: 'Parfait pour les débutants'
        },
        medium: {
            title: 'Moyen',
            description: 'Défi équilibré'
        },
        hard: {
            title: 'Difficile',
            description: 'Pour les experts'
        },
        hollybolly: {
            title: 'Mode HollyBolly',
            description: 'Devinez les films avec des récompenses'
        }
    },
    
    // Game categories
    categories: {
        name: 'Nom',
        place: 'Lieu',
        animal: 'Animal',
        thing: 'Chose'
    },
    
    // Settings sections
    settings: {
        appearance: 'Apparence',
        language: 'Langue',
        gameplay: 'Gameplay',
        accessibility: 'Accessibilité',
        about: 'À propos',
        theme: 'Thème',
        fontSize: 'Taille de police',
        fontFamily: 'Police',
        buttonSize: 'Taille des boutons',
        selectLanguage: 'Choisir la langue',
        region: 'Région',
        userProfile: 'Profil utilisateur',
        notifications: 'Notifications',
        sound: 'Son',
        vibration: 'Vibration'
    },
    
    // Themes
    themes: {
        light: 'Clair',
        dark: 'Sombre',
        auto: 'Automatique',
        highContrast: 'Contraste élevé',
        sepia: 'Sépia',
        blueLight: 'Lumière bleue',
        neonGlow: 'Néon brillant',
        retroArcade: 'Arcade rétro',
        natureForest: 'Forêt naturelle',
        spaceGalaxy: 'Galaxie spatiale',
        candyPop: 'Bonbons pop',
        jetsons: 'Jetsons'
    },
    
    // User profiles
    profiles: {
        senior: 'Senior',
        student: 'Étudiant',
        adult: 'Adulte',
        educator: 'Éducateur'
    },
    
    // Game interface
    game: {
        score: 'Score',
        time: 'Temps',
        round: 'Manche',
        question: 'Question',
        answer: 'Réponse',
        hint: 'Indice',
        skip: 'Passer',
        submit: 'Soumettre',
        correct: 'Correct',
        incorrect: 'Incorrect',
        timeUp: 'Temps écoulé',
        gameOver: 'Jeu terminé',
        congratulations: 'Félicitations',
        finalScore: 'Score final',
        newHighScore: 'Nouveau record',
        playAgain: 'Rejouer'
    },
    
    // HollyBolly rewards
    hollybolly: {
        title: 'Mode HollyBolly',
        description: 'Devinez les films hollywoodiens avec des indices Bollywood',
        rewards: {
            boxOffice: 'Box-office révélé',
            director: 'Réalisateur révélé',
            hero: 'Acteur principal révélé'
        },
        clues: {
            place: 'Lieu',
            animal: 'Animal',
            thing: 'Objet'
        }
    },
    
    // Accessibility
    accessibility: {
        closeDialog: 'Fermer la boîte de dialogue',
        openMenu: 'Ouvrir le menu',
        loading: 'Chargement',
        error: 'Erreur',
        success: 'Succès',
        warning: 'Attention'
    },
    
    // Dialog messages
    dialog: {
        confirm: {
            title: 'Confirmer l\'action',
            message: 'Êtes-vous sûr de vouloir continuer ?'
        },
        success: {
            title: 'Succès',
            message: 'Action terminée avec succès !'
        },
        delete: {
            title: 'Supprimer l\'élément',
            message: 'Cette action ne peut pas être annulée. Êtes-vous sûr ?'
        }
    },
    
    // Error messages
    errors: {
        generic: 'Une erreur s\'est produite',
        network: 'Erreur de réseau',
        timeout: 'Délai d\'attente dépassé',
        notFound: 'Non trouvé',
        invalidInput: 'Entrée non valide'
    },
    
    // Success messages
    success: {
        saved: 'Sauvegardé avec succès',
        updated: 'Mis à jour avec succès',
        deleted: 'Supprimé avec succès'
    },
    
    // Welcome screen
    welcome: {
        title: 'Bienvenue dans LingoQuest',
        subtitle: 'Choisissez votre aventure',
        getStarted: 'Commencer'
    },
    
    // Instructions
    instructions: {
        title: 'Comment jouer',
        classic: 'Dans le mode classique, trouvez des mots pour chaque catégorie',
        hollybolly: 'Dans HollyBolly, devinez le film à partir des indices',
        scoring: 'Système de notation',
        tips: 'Conseils et astuces'
    },
    
    // Font families
    fontFamilies: {
        system: 'Police système',
        serif: 'Serif',
        sansSerif: 'Sans-serif',
        monospace: 'Monospace',
        dyslexic: 'Dyslexique'
    },
    
    // Button sizes
    buttonSizes: {
        small: 'Petit',
        normal: 'Normal',
        large: 'Grand',
        extraLarge: 'Très grand'
    },
    
    // Font sizes
    fontSizes: {
        small: 'Petit',
        medium: 'Moyen',
        large: 'Grand',
        extraLarge: 'Très grand'
    },
    
    // Regions
    regions: {
        us: 'États-Unis',
        uk: 'Royaume-Uni',
        ca: 'Canada',
        au: 'Australie',
        in: 'Inde',
        de: 'Allemagne',
        fr: 'France',
        es: 'Espagne',
        it: 'Italie',
        br: 'Brésil'
    }
};

