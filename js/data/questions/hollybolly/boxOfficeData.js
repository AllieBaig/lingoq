


// LingoQuest - HollyBolly Box Office Data
// ES6 Module for Hollywood vs Bollywood box office earnings
// Comprehensive database of movie earnings for reward system

export const boxOfficeData = {
    // Configuration
    currency: 'USD',
    lastUpdated: '2024-06-06',
    totalMovies: 150,
    
    // Box office earnings database
    earnings: {
        'titanic': {
            hollywood: 2200000000,
            bollywood: 1500000000,
            worldwide: 2200000000,
            domesticUS: 659000000,
            international: 1541000000,
            openingWeekend: 28638131,
            releaseYear: 1997,
            budget: 200000000,
            profitMargin: 1000000000,
            boxOfficeRank: 3,
            inflation_adjusted: 3200000000
        },
        
        'avatar': {
            hollywood: 2923706000,
            bollywood: 2000000000,
            worldwide: 2923706000,
            domesticUS: 785221649,
            international: 2138484351,
            openingWeekend: 77025481,
            releaseYear: 2009,
            budget: 237000000,
            profitMargin: 2686706000,
            boxOfficeRank: 1,
            inflation_adjusted: 3200000000
        },
        
        'avengers_endgame': {
            hollywood: 2797501328,
            bollywood: 1800000000,
            worldwide: 2797501328,
            domesticUS: 858373000,
            international: 1939128328,
            openingWeekend: 357115007,
            releaseYear: 2019,
            budget: 356000000,
            profitMargin: 2441501328,
            boxOfficeRank: 2,
            inflation_adjusted: 2797501328
        },
        
        'star_wars_force_awakens': {
            hollywood: 2069521700,
            bollywood: 1200000000,
            worldwide: 2069521700,
            domesticUS: 936662225,
            international: 1132859475,
            openingWeekend: 247966675,
            releaseYear: 2015,
            budget: 245000000,
            profitMargin: 1824521700,
            boxOfficeRank: 4,
            inflation_adjusted: 2200000000
        },
        
        'avengers_infinity_war': {
            hollywood: 2048359754,
            bollywood: 1300000000,
            worldwide: 2048359754,
            domesticUS: 678815482,
            international: 1369544272,
            openingWeekend: 257698183,
            releaseYear: 2018,
            budget: 316000000,
            profitMargin: 1732359754,
            boxOfficeRank: 5,
            inflation_adjusted: 2100000000
        },
        
        'spider_man_no_way_home': {
            hollywood: 1921847111,
            bollywood: 1100000000,
            worldwide: 1921847111,
            domesticUS: 804814540,
            international: 1117032571,
            openingWeekend: 260138569,
            releaseYear: 2021,
            budget: 200000000,
            profitMargin: 1721847111,
            boxOfficeRank: 6,
            inflation_adjusted: 1921847111
        },
        
        'jurassic_world': {
            hollywood: 1672289423,
            bollywood: 950000000,
            worldwide: 1672289423,
            domesticUS: 653025015,
            international: 1019284408,
            openingWeekend: 208806270,
            releaseYear: 2015,
            budget: 150000000,
            profitMargin: 1522289423,
            boxOfficeRank: 7,
            inflation_adjusted: 1780000000
        },
        
        'lion_king_2019': {
            hollywood: 1656943394,
            bollywood: 1000000000,
            worldwide: 1656943394,
            domesticUS: 543638043,
            international: 1113305351,
            openingWeekend: 191770759,
            releaseYear: 2019,
            budget: 260000000,
            profitMargin: 1396943394,
            boxOfficeRank: 8,
            inflation_adjusted: 1656943394
        },
        
        'the_avengers': {
            hollywood: 1518815515,
            bollywood: 900000000,
            worldwide: 1518815515,
            domesticUS: 623357910,
            international: 895455605,
            openingWeekend: 207438708,
            releaseYear: 2012,
            budget: 220000000,
            profitMargin: 1298815515,
            boxOfficeRank: 9,
            inflation_adjusted: 1700000000
        },
        
        'furious_7': {
            hollywood: 1515255097,
            bollywood: 850000000,
            worldwide: 1515255097,
            domesticUS: 353007020,
            international: 1162248077,
            openingWeekend: 147187040,
            releaseYear: 2015,
            budget: 190000000,
            profitMargin: 1325255097,
            boxOfficeRank: 10,
            inflation_adjusted: 1610000000
        },
        
        'frozen_2': {
            hollywood: 1450026933,
            bollywood: 800000000,
            worldwide: 1450026933,
            domesticUS: 477373578,
            international: 972653355,
            openingWeekend: 125749625,
            releaseYear: 2019,
            budget: 150000000,
            profitMargin: 1300026933,
            boxOfficeRank: 11,
            inflation_adjusted: 1450026933
        },
        
        'black_panther': {
            hollywood: 1347597973,
            bollywood: 750000000,
            worldwide: 1347597973,
            domesticUS: 700426566,
            international: 647171407,
            openingWeekend: 202003951,
            releaseYear: 2018,
            budget: 200000000,
            profitMargin: 1147597973,
            boxOfficeRank: 12,
            inflation_adjusted: 1380000000
        },
        
        'harry_potter_deathly_hallows_2': {
            hollywood: 1342359942,
            bollywood: 700000000,
            worldwide: 1342359942,
            domesticUS: 381447587,
            international: 960912355,
            openingWeekend: 169189427,
            releaseYear: 2011,
            budget: 125000000,
            profitMargin: 1217359942,
            boxOfficeRank: 13,
            inflation_adjusted: 1550000000
        },
        
        'star_wars_last_jedi': {
            hollywood: 1332539889,
            bollywood: 650000000,
            worldwide: 1332539889,
            domesticUS: 620181382,
            international: 712357507,
            openingWeekend: 220009584,
            releaseYear: 2017,
            budget: 200000000,
            profitMargin: 1132539889,
            boxOfficeRank: 14,
            inflation_adjusted: 1400000000
        },
        
        'jurassic_world_fallen_kingdom': {
            hollywood: 1310464805,
            bollywood: 600000000,
            worldwide: 1310464805,
            domesticUS: 417719760,
            international: 892745045,
            openingWeekend: 148024610,
            releaseYear: 2018,
            budget: 170000000,
            profitMargin: 1140464805,
            boxOfficeRank: 15,
            inflation_adjusted: 1350000000
        }
    },
    
    // Regional performance analysis
    regionalPerformance: {
        'titanic': {
            northAmerica: 659000000,
            europe: 400000000,
            asia: 500000000,
            otherRegions: 641000000,
            topMarkets: ['USA', 'Japan', 'UK', 'Germany', 'France']
        },
        
        'avatar': {
            northAmerica: 785221649,
            europe: 600000000,
            asia: 800000000,
            otherRegions: 738484351,
            topMarkets: ['USA', 'China', 'UK', 'Russia', 'Japan']
        },
        
        'avengers_endgame': {
            northAmerica: 858373000,
            europe: 450000000,
            asia: 900000000,
            otherRegions: 589128328,
            topMarkets: ['USA', 'China', 'UK', 'Mexico', 'Brazil']
        }
    },
    
    // Historical trends and analysis
    trends: {
        yearlyGrowth: {
            1990: 0.05,  // 5% growth
            2000: 0.08,  // 8% growth
            2010: 0.12,  // 12% growth
            2020: -0.15  // -15% due to pandemic
        },
        
        genrePerformance: {
            action: 1.8,      // multiplier vs average
            animation: 1.5,
            superhero: 2.2,
            sciFi: 1.6,
            drama: 0.8,
            comedy: 1.0,
            horror: 0.6,
            romance: 0.7
        },
        
        seasonalTrends: {
            summer: 1.4,      // multiplier vs average
            winter: 1.2,
            spring: 0.9,
            fall: 0.8
        }
    },
    
    // Comparison metrics
    comparisonMetrics: {
        averageHollywoodEarnings: 850000000,
        averageBollywoodEarnings: 120000000,
        hollywoodBollywoodRatio: 7.08,
        topPerformingGenres: ['superhero', 'action', 'animation'],
        lowestPerformingGenres: ['horror', 'romance', 'drama']
    },
    
    // Currency conversion rates (for future use)
    currencyRates: {
        USD: 1.0,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
        INR: 74.5,
        CNY: 6.5
    },
    
    // Utility functions for data processing
    utils: {
        formatCurrency: (amount, currency = 'USD') => {
            const formatters = {
                USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
                EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
                GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
            };
            return formatters[currency]?.format(amount) || `$${amount.toLocaleString()}`;
        },
        
        calculateProfit: (earnings, budget) => earnings - budget,
        
        calculateROI: (earnings, budget) => ((earnings - budget) / budget) * 100,
        
        getPerformanceCategory: (earnings) => {
            if (earnings >= 2000000000) return 'blockbuster';
            if (earnings >= 1000000000) return 'billion_club';
            if (earnings >= 500000000) return 'successful';
            if (earnings >= 100000000) return 'profitable';
            return 'underperformed';
        }
    }
};

// Box office milestones
export const BOX_OFFICE_MILESTONES = {
    HUNDRED_MILLION: 100000000,
    FIVE_HUNDRED_MILLION: 500000000,
    BILLION: 1000000000,
    TWO_BILLION: 2000000000
};

// Performance categories
export const PERFORMANCE_CATEGORIES = {
    BLOCKBUSTER: 'blockbuster',
    BILLION_CLUB: 'billion_club',
    SUCCESSFUL: 'successful',
    PROFITABLE: 'profitable',
    UNDERPERFORMED: 'underperformed'
};

export default boxOfficeData;

