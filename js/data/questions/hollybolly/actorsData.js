




/**
 * Purpose: Actors database for HollyBolly mode with comprehensive performer information
 * Key features: Actor profiles, net worth data, career achievements, filmography highlights
 * Dependencies: Movie database correlation, box office data integration, career statistics
 * Related helpers: Net worth calculations, award tracking, film correlation, actor matching
 * Function names: getActorInfo, calculateCareerValue, getFilmography, getAwardHistory, matchActor
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 19:45 | File: js/data/questions/hollybolly/actorsData.js
 */

export const actorsData = {
    // Configuration and metadata
    lastUpdated: '2024-06-06',
    totalActors: 75,
    currency: 'USD',
    source: 'Multiple entertainment industry sources',
    
    // Comprehensive actors database
    actors: {
        'leonardo_dicaprio': {
            id: 'leonardo_dicaprio',
            name: 'Leonardo DiCaprio',
            fullName: 'Leonardo Wilhelm DiCaprio',
            netWorth: 260000000, // $260 million
            birthDate: '1974-11-11',
            nationality: 'American',
            age: 49,
            
            // Career information
            career: {
                yearsActive: '1989-present',
                totalFilms: 35,
                majorFilms: 20,
                debutFilm: 'Critters 3 (1991)',
                breakthroughFilm: 'Titanic (1997)'
            },
            
            // Financial success
            boxOfficeTotal: 7200000000, // Total worldwide gross
            averageBoxOffice: 360000000,
            highestGrossingFilm: 'Titanic (1997)',
            salaryPerFilm: 25000000, // Average recent salary
            
            // Notable films with box office
            filmography: [
                { title: 'Titanic', year: 1997, boxOffice: 2200000000, salary: 2500000, role: 'Jack Dawson' },
                { title: 'Inception', year: 2010, boxOffice: 836800000, salary: 20000000, role: 'Dom Cobb' },
                { title: 'The Wolf of Wall Street', year: 2013, boxOffice: 392000000, salary: 25000000, role: 'Jordan Belfort' },
                { title: 'Django Unchained', year: 2012, boxOffice: 425000000, salary: 20000000, role: 'Calvin Candie' },
                { title: 'The Revenant', year: 2015, boxOffice: 533000000, salary: 20000000, role: 'Hugh Glass' },
                { title: 'Once Upon a Time in Hollywood', year: 2019, boxOffice: 377000000, salary: 30000000, role: 'Rick Dalton' }
            ],
            
            // Awards and recognition
            awards: {
                oscars: 1, // Best Actor for The Revenant
                oscarNominations: 7,
                goldenGlobes: 3,
                baftas: 1,
                sagAwards: 1,
                specialAchievements: [
                    'Environmental activist and UN Messenger of Peace',
                    'Founded Leonardo DiCaprio Foundation',
                    'Producer of multiple documentaries'
                ]
            },
            
            // Actor characteristics
            characteristics: {
                knownFor: ['Method acting', 'Environmental activism', 'Complex characters'],
                signature: 'Intense dramatic performances and character transformation',
                genre: ['Drama', 'Thriller', 'Biography', 'Crime']
            }
        },
        
        'tom_cruise': {
            id: 'tom_cruise',
            name: 'Tom Cruise',
            fullName: 'Thomas Cruise Mapother IV',
            netWorth: 600000000, // $600 million
            birthDate: '1962-07-03',
            nationality: 'American',
            age: 61,
            
            career: {
                yearsActive: '1981-present',
                totalFilms: 45,
                majorFilms: 30,
                debutFilm: 'Endless Love (1981)',
                breakthroughFilm: 'Top Gun (1986)'
            },
            
            boxOfficeTotal: 12000000000,
            averageBoxOffice: 266000000,
            highestGrossingFilm: 'Top Gun: Maverick (2022)',
            salaryPerFilm: 20000000,
            
            filmography: [
                { title: 'Top Gun: Maverick', year: 2022, boxOffice: 1489000000, salary: 13000000, role: 'Pete "Maverick" Mitchell' },
                { title: 'Mission: Impossible - Fallout', year: 2018, boxOffice: 791000000, salary: 28000000, role: 'Ethan Hunt' },
                { title: 'Top Gun', year: 1986, boxOffice: 357000000, salary: 2000000, role: 'Pete "Maverick" Mitchell' },
                { title: 'Jerry Maguire', year: 1996, boxOffice: 274000000, salary: 20000000, role: 'Jerry Maguire' },
                { title: 'A Few Good Men', year: 1992, boxOffice: 236400000, salary: 12500000, role: 'Daniel Kaffee' },
                { title: 'Rain Man', year: 1988, boxOffice: 354800000, salary: 3000000, role: 'Charlie Babbitt' }
            ],
            
            awards: {
                oscars: 0,
                oscarNominations: 3,
                goldenGlobes: 3,
                baftas: 0,
                sagAwards: 0,
                specialAchievements: [
                    'Known for performing own stunts',
                    'Producer and star of Mission: Impossible franchise',
                    'Honorary Palme d\'Or recipient'
                ]
            },
            
            characteristics: {
                knownFor: ['Action sequences', 'Own stunts', 'Charismatic leading man'],
                signature: 'High-octane action hero with infectious energy',
                genre: ['Action', 'Thriller', 'Drama', 'Science Fiction']
            }
        },
        
        'robert_downey_jr': {
            id: 'robert_downey_jr',
            name: 'Robert Downey Jr.',
            fullName: 'Robert John Downey Jr.',
            netWorth: 300000000, // $300 million
            birthDate: '1965-04-04',
            nationality: 'American',
            age: 58,
            
            career: {
                yearsActive: '1970-present',
                totalFilms: 60,
                majorFilms: 25,
                debutFilm: 'Pound (1970)',
                breakthroughFilm: 'Iron Man (2008)'
            },
            
            boxOfficeTotal: 14400000000,
            averageBoxOffice: 480000000,
            highestGrossingFilm: 'Avengers: Endgame (2019)',
            salaryPerFilm: 50000000, // Peak MCU salary
            
            filmography: [
                { title: 'Avengers: Endgame', year: 2019, boxOffice: 2797000000, salary: 75000000, role: 'Tony Stark/Iron Man' },
                { title: 'Avengers: Infinity War', year: 2018, boxOffice: 2048000000, salary: 50000000, role: 'Tony Stark/Iron Man' },
                { title: 'Iron Man 3', year: 2013, boxOffice: 1215000000, salary: 50000000, role: 'Tony Stark/Iron Man' },
                { title: 'The Avengers', year: 2012, boxOffice: 1519000000, salary: 50000000, role: 'Tony Stark/Iron Man' },
                { title: 'Iron Man', year: 2008, boxOffice: 585000000, salary: 500000, role: 'Tony Stark/Iron Man' },
                { title: 'Sherlock Holmes', year: 2009, boxOffice: 524000000, salary: 9000000, role: 'Sherlock Holmes' }
            ],
            
            awards: {
                oscars: 0,
                oscarNominations: 3,
                goldenGlobes: 1,
                baftas: 1,
                sagAwards: 1,
                specialAchievements: [
                    'Launched Marvel Cinematic Universe',
                    'Comeback story from personal struggles',
                    'Highest-paid actor in Hollywood (2010s)'
                ]
            },
            
            characteristics: {
                knownFor: ['Charismatic wit', 'Superhero roles', 'Character transformation'],
                signature: 'Quick wit and magnetic screen presence',
                genre: ['Action', 'Comedy', 'Drama', 'Science Fiction']
            }
        },
        
        'will_smith': {
            id: 'will_smith',
            name: 'Will Smith',
            fullName: 'Willard Carroll Smith Jr.',
            netWorth: 350000000, // $350 million
            birthDate: '1968-09-25',
            nationality: 'American',
            age: 55,
            
            career: {
                yearsActive: '1985-present',
                totalFilms: 35,
                majorFilms: 25,
                debutFilm: 'Where the Day Takes You (1992)',
                breakthroughFilm: 'Bad Boys (1995)'
            },
            
            boxOfficeTotal: 9300000000,
            averageBoxOffice: 265000000,
            highestGrossingFilm: 'Aladdin (2019)',
            salaryPerFilm: 25000000,
            
            filmography: [
                { title: 'Aladdin', year: 2019, boxOffice: 1054000000, salary: 12500000, role: 'Genie' },
                { title: 'Independence Day', year: 1996, boxOffice: 817400000, salary: 5000000, role: 'Captain Steven Hiller' },
                { title: 'Men in Black', year: 1997, boxOffice: 589000000, salary: 5000000, role: 'Agent J' },
                { title: 'I Am Legend', year: 2007, boxOffice: 585000000, salary: 25000000, role: 'Robert Neville' },
                { title: 'Hancock', year: 2008, boxOffice: 629000000, salary: 25000000, role: 'John Hancock' },
                { title: 'Men in Black 3', year: 2012, boxOffice: 624000000, salary: 25000000, role: 'Agent J' }
            ],
            
            awards: {
                oscars: 0,
                oscarNominations: 2,
                goldenGlobes: 0,
                baftas: 0,
                sagAwards: 0,
                specialAchievements: [
                    'Multi-platinum recording artist',
                    'Producer and media mogul',
                    'Social media pioneer among celebrities'
                ]
            },
            
            characteristics: {
                knownFor: ['Blockbuster appeal', 'Charismatic personality', 'Cross-genre versatility'],
                signature: 'Everyman appeal with blockbuster star power',
                genre: ['Action', 'Comedy', 'Science Fiction', 'Drama']
            }
        },
        
        'dwayne_johnson': {
            id: 'dwayne_johnson',
            name: 'Dwayne Johnson',
            fullName: 'Dwayne Douglas Johnson',
            netWorth: 800000000, // $800 million
            birthDate: '1972-05-02',
            nationality: 'American',
            age: 51,
            
            career: {
                yearsActive: '1999-present',
                totalFilms: 30,
                majorFilms: 20,
                debutFilm: 'The Mummy Returns (2001)',
                breakthroughFilm: 'Fast Five (2011)'
            },
            
            boxOfficeTotal: 10500000000,
            averageBoxOffice: 350000000,
            highestGrossingFilm: 'Furious 7 (2015)',
            salaryPerFilm: 22500000,
            
            filmography: [
                { title: 'Furious 7', year: 2015, boxOffice: 1516000000, salary: 15000000, role: 'Luke Hobbs' },
                { title: 'Jumanji: Welcome to the Jungle', year: 2017, boxOffice: 962000000, salary: 20000000, role: 'Dr. Smolder Bravestone' },
                { title: 'Fast & Furious Presents: Hobbs & Shaw', year: 2019, boxOffice: 760000000, salary: 20000000, role: 'Luke Hobbs' },
                { title: 'Moana', year: 2016, boxOffice: 645000000, salary: 15000000, role: 'Maui (voice)' },
                { title: 'San Andreas', year: 2015, boxOffice: 474000000, salary: 15000000, role: 'Ray Gaines' },
                { title: 'Rampage', year: 2018, boxOffice: 428000000, salary: 22000000, role: 'Davis Okoye' }
            ],
            
            awards: {
                oscars: 0,
                oscarNominations: 0,
                goldenGlobes: 0,
                baftas: 0,
                sagAwards: 0,
                specialAchievements: [
                    'Former professional wrestler (The Rock)',
                    'Highest-paid actor in Hollywood (2019-2021)',
                    'Successful producer and businessman'
                ]
            },
            
            characteristics: {
                knownFor: ['Action hero roles', 'Charismatic personality', 'Cross-platform success'],
                signature: 'Larger-than-life action star with genuine likability',
                genre: ['Action', 'Adventure', 'Comedy', 'Family']
            }
        },
        
        'scarlett_johansson': {
            id: 'scarlett_johansson',
            name: 'Scarlett Johansson',
            fullName: 'Scarlett Ingrid Johansson',
            netWorth: 165000000, // $165 million
            birthDate: '1984-11-22',
            nationality: 'American',
            age: 39,
            
            career: {
                yearsActive: '1994-present',
                totalFilms: 40,
                majorFilms: 22,
                debutFilm: 'North (1994)',
                breakthroughFilm: 'Lost in Translation (2003)'
            },
            
            boxOfficeTotal: 14300000000,
            averageBoxOffice: 357500000,
            highestGrossingFilm: 'Avengers: Endgame (2019)',
            salaryPerFilm: 20000000,
            
            filmography: [
                { title: 'Avengers: Endgame', year: 2019, boxOffice: 2797000000, salary: 15000000, role: 'Natasha Romanoff/Black Widow' },
                { title: 'Avengers: Infinity War', year: 2018, boxOffice: 2048000000, salary: 15000000, role: 'Natasha Romanoff/Black Widow' },
                { title: 'The Avengers', year: 2012, boxOffice: 1519000000, salary: 6000000, role: 'Natasha Romanoff/Black Widow' },
                { title: 'Captain America: The Winter Soldier', year: 2014, boxOffice: 714000000, salary: 6000000, role: 'Natasha Romanoff/Black Widow' },
                { title: 'Lucy', year: 2014, boxOffice: 469000000, salary: 10000000, role: 'Lucy Miller' },
                { title: 'Her', year: 2013, boxOffice: 48000000, salary: 1000000, role: 'Samantha (voice)' }
            ],
            
            awards: {
                oscars: 0,
                oscarNominations: 2,
                goldenGlobes: 0,
                baftas: 1,
                sagAwards: 0,
                specialAchievements: [
                    'Highest-grossing actress of all time',
                    'Versatile dramatic and action performer',
                    'Successful voice acting career'
                ]
            },
            
            characteristics: {
                knownFor: ['Action heroine roles', 'Dramatic versatility', 'Voice acting'],
                signature: 'Strong female characters across multiple genres',
                genre: ['Action', 'Drama', 'Science Fiction', 'Thriller']
            }
        }
    },
    
    // Industry statistics and actor rankings
    industryStats: {
        averageActorNetWorth: 378000000,
        highestPaidActor: 'dwayne_johnson',
        highestGrossingActor: 'scarlett_johansson',
        mostOscars: 'katharine_hepburn', // Historical reference
        
        // Career milestones
        milestones: {
            youngestOscarWinner: { actor: 'marlee_matlin', age: 21, film: 'Children of a Lesser God' },
            highestSingleFilmSalary: { actor: 'robert_downey_jr', amount: 75000000, film: 'Avengers: Endgame' },
            firstBillionDollarActor: { actor: 'harrison_ford', year: 1993 }
        },
        
        // Box office achievements
        boxOfficeRecords: {
            highestGrossingFilm: 'Avengers: Endgame',
            fastestToOneBillion: 'Avengers: Endgame',
            longestRunningFranchise: 'James Bond'
        }
    },
    
    // Utility functions for actor data
    utils: {
        // Get actor by film
        getActorByFilm(filmTitle) {
            for (const [actorId, actor] of Object.entries(actorsData.actors)) {
                const film = actor.filmography.find(f => 
                    f.title.toLowerCase() === filmTitle.toLowerCase()
                );
                if (film) {
                    return { actorId, actor, film };
                }
            }
            return null;
        },
        
        // Calculate total career earnings
        calculateCareerEarnings(actorId) {
            const actor = actorsData.actors[actorId];
            if (!actor) return 0;
            
            return actor.filmography.reduce((total, film) => total + (film.salary || 0), 0);
        },
        
        // Get actor achievement summary
        getAchievementSummary(actorId) {
            const actor = actorsData.actors[actorId];
            if (!actor) return null;
            
            return {
                name: actor.name,
                netWorth: actor.netWorth,
                totalOscars: actor.awards.oscars,
                oscarNominations: actor.awards.oscarNominations,
                boxOfficeTotal: actor.boxOfficeTotal,
                majorFilms: actor.career.majorFilms,
                signature: actor.characteristics.signature
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
        
        // Get random actor fact
        getRandomFact(actorId) {
            const actor = actorsData.actors[actorId];
            if (!actor) return null;
            
            const facts = [
                `${actor.name} has a net worth of ${this.formatNetWorth(actor.netWorth)}`,
                `Their films have grossed over ${this.formatNetWorth(actor.boxOfficeTotal)} worldwide`,
                `${actor.name} has ${actor.awards.oscars} Academy Award${actor.awards.oscars !== 1 ? 's' : ''}`,
                `They have been acting professionally for ${new Date().getFullYear() - parseInt(actor.career.yearsActive)} years`,
                `Their highest-grossing film is "${actor.highestGrossingFilm}"`
            ];
            
            return facts[Math.floor(Math.random() * facts.length)];
        },
        
        // Compare two actors
        compareActors(actorId1, actorId2) {
            const actor1 = actorsData.actors[actorId1];
            const actor2 = actorsData.actors[actorId2];
            
            if (!actor1 || !actor2) return null;
            
            return {
                netWorth: {
                    winner: actor1.netWorth > actor2.netWorth ? actor1.name : actor2.name,
                    difference: Math.abs(actor1.netWorth - actor2.netWorth)
                },
                boxOffice: {
                    winner: actor1.boxOfficeTotal > actor2.boxOfficeTotal ? actor1.name : actor2.name,
                    difference: Math.abs(actor1.boxOfficeTotal - actor2.boxOfficeTotal)
                },
                awards: {
                    winner: actor1.awards.oscars > actor2.awards.oscars ? actor1.name : actor2.name,
                    difference: Math.abs(actor1.awards.oscars - actor2.awards.oscars)
                }
            };
        }
    }
};

// Export actor categories
export const actorCategories = {
    actionStars: ['tom_cruise', 'dwayne_johnson', 'will_smith'],
    oscarWinners: ['leonardo_dicaprio'],
    marvelActors: ['robert_downey_jr', 'scarlett_johansson'],
    blockbusterLeads: ['leonardo_dicaprio', 'tom_cruise', 'will_smith', 'dwayne_johnson'],
    femaleLeads: ['scarlett_johansson'],
    comedyStars: ['will_smith', 'dwayne_johnson'],
    dramaActors: ['leonardo_dicaprio', 'scarlett_johansson']
};

// Export actor rankings
export const actorRankings = {
    byNetWorth: Object.entries(actorsData.actors)
        .sort(([,a], [,b]) => b.netWorth - a.netWorth)
        .map(([id, actor]) => ({ id, name: actor.name, netWorth: actor.netWorth })),
        
    byBoxOffice: Object.entries(actorsData.actors)
        .sort(([,a], [,b]) => b.boxOfficeTotal - a.boxOfficeTotal)
        .map(([id, actor]) => ({ id, name: actor.name, boxOffice: actor.boxOfficeTotal })),
        
    byOscars: Object.entries(actorsData.actors)
        .sort(([,a], [,b]) => b.awards.oscars - a.awards.oscars)
        .map(([id, actor]) => ({ id, name: actor.name, oscars: actor.awards.oscars }))
};

export default actorsData;


