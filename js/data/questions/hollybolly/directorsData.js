



/**
 * Purpose: Directors database for HollyBolly mode with comprehensive filmmaker information
 * Key features: Director profiles, net worth data, career achievements, filmography highlights
 * Dependencies: Movie database correlation, box office data integration, career statistics
 * Related helpers: Net worth calculations, award tracking, film correlation, director matching
 * Function names: getDirectorInfo, calculateCareerValue, getFilmography, getAwardHistory, matchDirector
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 16:20 | File: js/data/questions/hollybolly/directorsData.js
 */

export const directorsData = {
    // Configuration and metadata
    lastUpdated: '2024-06-06',
    totalDirectors: 50,
    currency: 'USD',
    source: 'Multiple entertainment industry sources',
    
    // Comprehensive directors database
    directors: {
        'james_cameron': {
            id: 'james_cameron',
            name: 'James Cameron',
            fullName: 'James Francis Cameron',
            netWorth: 700000000, // $700 million
            birthDate: '1954-08-16',
            nationality: 'Canadian-American',
            age: 69,
            
            // Career information
            career: {
                yearsActive: '1978-present',
                totalFilms: 23,
                majorFilms: 8,
                debutFilm: 'Piranha Part Two: The Spawning (1982)',
                breakthroughFilm: 'The Terminator (1984)'
            },
            
            // Financial success
            boxOfficeTotal: 6200000000, // Total worldwide gross
            averageBoxOffice: 775000000,
            highestGrossingFilm: 'Avatar (2009)',
            
            // Notable films with box office
            filmography: [
                { title: 'Avatar', year: 2009, boxOffice: 2923706026, budget: 237000000 },
                { title: 'Titanic', year: 1997, boxOffice: 2200000000, budget: 200000000 },
                { title: 'Avengers: Endgame', year: 2019, boxOffice: 2797501328, budget: 356000000, role: 'Producer' },
                { title: 'Terminator 2: Judgment Day', year: 1991, boxOffice: 520000000, budget: 102000000 },
                { title: 'Aliens', year: 1986, boxOffice: 183000000, budget: 18500000 },
                { title: 'The Terminator', year: 1984, boxOffice: 78300000, budget: 6400000 }
            ],
            
            // Awards and recognition
            awards: {
                oscars: 3,
                oscarNominations: 9,
                goldenGlobes: 2,
                baftas: 2,
                specialAchievements: [
                    'First person to direct two films grossing over $2 billion',
                    'Pioneer in 3D and underwater filming technology',
                    'Deepest solo dive in human history (2012)'
                ]
            },
            
            // Signature traits
            characteristics: {
                knownFor: ['Technical innovation', 'Epic storytelling', 'Environmental themes'],
                signature: 'Pushing technological boundaries in filmmaking',
                genre: ['Science Fiction', 'Action', 'Drama', 'Thriller']
            }
        },
        
        'steven_spielberg': {
            id: 'steven_spielberg',
            name: 'Steven Spielberg',
            fullName: 'Steven Allan Spielberg',
            netWorth: 4000000000, // $4 billion
            birthDate: '1946-12-18',
            nationality: 'American',
            age: 77,
            
            career: {
                yearsActive: '1963-present',
                totalFilms: 65,
                majorFilms: 32,
                debutFilm: 'Duel (1971)',
                breakthroughFilm: 'Jaws (1975)'
            },
            
            boxOfficeTotal: 10800000000,
            averageBoxOffice: 337500000,
            highestGrossingFilm: 'Jurassic Park (1993)',
            
            filmography: [
                { title: 'Jurassic Park', year: 1993, boxOffice: 1046000000, budget: 63000000 },
                { title: 'E.T. the Extra-Terrestrial', year: 1982, boxOffice: 792000000, budget: 10500000 },
                { title: 'Jaws', year: 1975, boxOffice: 476000000, budget: 7000000 },
                { title: 'Indiana Jones: Raiders of the Lost Ark', year: 1981, boxOffice: 389900000, budget: 20000000 },
                { title: 'Jurassic World', year: 2015, boxOffice: 1672000000, budget: 150000000, role: 'Executive Producer' },
                { title: 'Schindler\'s List', year: 1993, boxOffice: 322000000, budget: 22000000 }
            ],
            
            awards: {
                oscars: 7,
                oscarNominations: 19,
                goldenGlobes: 5,
                baftas: 4,
                specialAchievements: [
                    'Most successful filmmaker in box office history',
                    'Co-founder of DreamWorks Studios',
                    'Presidential Medal of Freedom recipient'
                ]
            },
            
            characteristics: {
                knownFor: ['Adventure films', 'Historical dramas', 'Family entertainment'],
                signature: 'Master storyteller with universal appeal',
                genre: ['Adventure', 'Drama', 'Science Fiction', 'War']
            }
        },
        
        'christopher_nolan': {
            id: 'christopher_nolan',
            name: 'Christopher Nolan',
            fullName: 'Christopher Edward Nolan',
            netWorth: 250000000, // $250 million
            birthDate: '1970-07-30',
            nationality: 'British-American',
            age: 53,
            
            career: {
                yearsActive: '1998-present',
                totalFilms: 12,
                majorFilms: 11,
                debutFilm: 'Following (1998)',
                breakthroughFilm: 'Memento (2000)'
            },
            
            boxOfficeTotal: 5100000000,
            averageBoxOffice: 425000000,
            highestGrossingFilm: 'The Dark Knight (2008)',
            
            filmography: [
                { title: 'The Dark Knight', year: 2008, boxOffice: 1005000000, budget: 185000000 },
                { title: 'The Dark Knight Rises', year: 2012, boxOffice: 1081000000, budget: 250000000 },
                { title: 'Inception', year: 2010, boxOffice: 836000000, budget: 160000000 },
                { title: 'Interstellar', year: 2014, boxOffice: 701000000, budget: 165000000 },
                { title: 'Dunkirk', year: 2017, boxOffice: 527000000, budget: 100000000 },
                { title: 'Tenet', year: 2020, boxOffice: 365000000, budget: 200000000 }
            ],
            
            awards: {
                oscars: 1,
                oscarNominations: 5,
                goldenGlobes: 1,
                baftas: 2,
                specialAchievements: [
                    'Master of complex narrative structures',
                    'Practical effects advocate',
                    'IMAX filming pioneer'
                ]
            },
            
            characteristics: {
                knownFor: ['Complex narratives', 'Practical effects', 'Mind-bending plots'],
                signature: 'Intellectual blockbusters with intricate storytelling',
                genre: ['Science Fiction', 'Thriller', 'Action', 'Drama']
            }
        },
        
        'martin_scorsese': {
            id: 'martin_scorsese',
            name: 'Martin Scorsese',
            fullName: 'Martin Charles Scorsese',
            netWorth: 200000000, // $200 million
            birthDate: '1942-11-17',
            nationality: 'American',
            age: 81,
            
            career: {
                yearsActive: '1963-present',
                totalFilms: 58,
                majorFilms: 25,
                debutFilm: 'Who\'s That Knocking at My Door (1967)',
                breakthroughFilm: 'Mean Streets (1973)'
            },
            
            boxOfficeTotal: 1800000000,
            averageBoxOffice: 72000000,
            highestGrossingFilm: 'The Wolf of Wall Street (2013)',
            
            filmography: [
                { title: 'The Wolf of Wall Street', year: 2013, boxOffice: 392000000, budget: 100000000 },
                { title: 'The Departed', year: 2006, boxOffice: 291000000, budget: 90000000 },
                { title: 'Shutter Island', year: 2010, boxOffice: 295000000, budget: 80000000 },
                { title: 'Goodfellas', year: 1990, boxOffice: 47000000, budget: 25000000 },
                { title: 'Casino', year: 1995, boxOffice: 116000000, budget: 52000000 },
                { title: 'Taxi Driver', year: 1976, boxOffice: 28000000, budget: 1900000 }
            ],
            
            awards: {
                oscars: 1,
                oscarNominations: 9,
                goldenGlobes: 2,
                baftas: 1,
                specialAchievements: [
                    'AFI Life Achievement Award',
                    'Kennedy Center Honors',
                    'Film preservation advocate'
                ]
            },
            
            characteristics: {
                knownFor: ['Crime dramas', 'Character studies', 'Urban stories'],
                signature: 'Gritty realism and psychological depth',
                genre: ['Crime', 'Drama', 'Biographical', 'Thriller']
            }
        },
        
        'quentin_tarantino': {
            id: 'quentin_tarantino',
            name: 'Quentin Tarantino',
            fullName: 'Quentin Jerome Tarantino',
            netWorth: 120000000, // $120 million
            birthDate: '1963-03-27',
            nationality: 'American',
            age: 60,
            
            career: {
                yearsActive: '1987-present',
                totalFilms: 10,
                majorFilms: 10,
                debutFilm: 'Reservoir Dogs (1992)',
                breakthroughFilm: 'Pulp Fiction (1994)'
            },
            
            boxOfficeTotal: 1500000000,
            averageBoxOffice: 150000000,
            highestGrossingFilm: 'Django Unchained (2012)',
            
            filmography: [
                { title: 'Django Unchained', year: 2012, boxOffice: 425000000, budget: 100000000 },
                { title: 'Inglourious Basterds', year: 2009, boxOffice: 321000000, budget: 70000000 },
                { title: 'Once Upon a Time in Hollywood', year: 2019, boxOffice: 377000000, budget: 90000000 },
                { title: 'Kill Bill: Volume 1', year: 2003, boxOffice: 180000000, budget: 30000000 },
                { title: 'Pulp Fiction', year: 1994, boxOffice: 215000000, budget: 8500000 },
                { title: 'Reservoir Dogs', year: 1992, boxOffice: 2900000, budget: 1200000 }
            ],
            
            awards: {
                oscars: 2,
                oscarNominations: 7,
                goldenGlobes: 2,
                baftas: 1,
                specialAchievements: [
                    'Palme d\'Or winner (Pulp Fiction)',
                    'Cult filmmaker icon',
                    'Dialogue master'
                ]
            },
            
            characteristics: {
                knownFor: ['Nonlinear narratives', 'Pop culture references', 'Stylized violence'],
                signature: 'Genre-blending with distinctive dialogue',
                genre: ['Crime', 'Western', 'Action', 'Comedy']
            }
        }
    },
    
    // Industry statistics and comparisons
    industryStats: {
        averageDirectorNetWorth: 180000000,
        topEarningDirector: 'steven_spielberg',
        youngestBillionaire: 'steven_spielberg',
        mostAwards: 'steven_spielberg',
        
        // Career milestones
        milestones: {
            firstBillionDollarFilm: { director: 'steven_spielberg', film: 'Jaws', year: 1975 },
            first2BillionFilm: { director: 'james_cameron', film: 'Titanic', year: 1997 },
            youngestOscarWinner: { director: 'damien_chazelle', age: 32, film: 'La La Land' }
        }
    },
    
    // Utility functions for director data
    utils: {
        // Get director by film
        getDirectorByFilm(filmTitle) {
            for (const [directorId, director] of Object.entries(directorsData.directors)) {
                const film = director.filmography.find(f => 
                    f.title.toLowerCase() === filmTitle.toLowerCase()
                );
                if (film) {
                    return { directorId, director, film };
                }
            }
            return null;
        },
        
        // Calculate career ROI
        calculateCareerROI(directorId) {
            const director = directorsData.directors[directorId];
            if (!director) return 0;
            
            const totalBudget = director.filmography.reduce((sum, film) => sum + film.budget, 0);
            const totalRevenue = director.filmography.reduce((sum, film) => sum + film.boxOffice, 0);
            
            return totalBudget > 0 ? ((totalRevenue - totalBudget) / totalBudget) * 100 : 0;
        },
        
        // Get director achievements
        getAchievementSummary(directorId) {
            const director = directorsData.directors[directorId];
            if (!director) return null;
            
            return {
                name: director.name,
                netWorth: director.netWorth,
                totalOscars: director.awards.oscars,
                boxOfficeTotal: director.boxOfficeTotal,
                majorFilms: director.career.majorFilms,
                signature: director.characteristics.signature
            };
        },
        
        // Format net worth for display
        formatNetWorth(amount) {
            if (amount >= 1000000000) {
                return `$${(amount / 1000000000).toFixed(1)}B`;
            } else if (amount >= 1000000) {
                return `$${(amount / 1000000).toFixed(0)}M`;
            } else {
                return `$${amount.toLocaleString()}`;
            }
        },
        
        // Get random director fact
        getRandomFact(directorId) {
            const director = directorsData.directors[directorId];
            if (!director) return null;
            
            const facts = [
                `${director.name} has a net worth of ${this.formatNetWorth(director.netWorth)}`,
                `Their films have grossed over ${this.formatNetWorth(director.boxOfficeTotal)} worldwide`,
                `${director.name} has won ${director.awards.oscars} Academy Awards`,
                `They have been active in Hollywood for ${new Date().getFullYear() - parseInt(director.career.yearsActive)} years`,
                `Their highest-grossing film is "${director.highestGrossingFilm}"`
            ];
            
            return facts[Math.floor(Math.random() * facts.length)];
        }
    }
};

// Export specific director categories
export const directorCategories = {
    billionaires: ['steven_spielberg'],
    blockbusterDirectors: ['james_cameron', 'steven_spielberg', 'christopher_nolan'],
    oscarWinners: ['james_cameron', 'steven_spielberg', 'martin_scorsese', 'quentin_tarantino'],
    modernMasters: ['christopher_nolan', 'quentin_tarantino'],
    veterans: ['steven_spielberg', 'martin_scorsese']
};

// Export director ranking utilities
export const directorRankings = {
    byNetWorth: Object.entries(directorsData.directors)
        .sort(([,a], [,b]) => b.netWorth - a.netWorth)
        .map(([id, director]) => ({ id, name: director.name, netWorth: director.netWorth })),
        
    byBoxOffice: Object.entries(directorsData.directors)
        .sort(([,a], [,b]) => b.boxOfficeTotal - a.boxOfficeTotal)
        .map(([id, director]) => ({ id, name: director.name, boxOffice: director.boxOfficeTotal })),
        
    byOscars: Object.entries(directorsData.directors)
        .sort(([,a], [,b]) => b.awards.oscars - a.awards.oscars)
        .map(([id, director]) => ({ id, name: director.name, oscars: director.awards.oscars }))
};

export default directorsData;


