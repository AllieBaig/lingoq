

// LingoQuest - Classic Mode Places Database
// ES6 Module for place-related questions and answers
// Part of the Classic "Name Place Animal Thing" game mode

export const placesData = {
    // Configuration
    category: 'places',
    totalQuestions: 50,
    difficulty: 'mixed',
    
    // Question database with multiple choice options
    questions: [
        {
            id: 'place_001',
            letter: 'A',
            question: 'A country known for kangaroos and the Great Barrier Reef?',
            correctAnswer: 'Australia',
            options: ['Australia', 'Austria', 'Argentina', 'Algeria'],
            hint: 'Down Under continent',
            difficulty: 'easy',
            category: 'country'
        },
        {
            id: 'place_002',
            letter: 'B',
            question: 'Capital city of France, known for the Eiffel Tower?',
            correctAnswer: 'Paris',
            options: ['Berlin', 'Barcelona', 'Paris', 'Brussels'],
            hint: 'City of Light',
            difficulty: 'easy',
            category: 'city'
        },
        {
            id: 'place_003',
            letter: 'C',
            question: 'Country famous for the Great Wall?',
            correctAnswer: 'China',
            options: ['China', 'Canada', 'Chile', 'Colombia'],
            hint: 'Most populous country',
            difficulty: 'easy',
            category: 'country'
        },
        {
            id: 'place_004',
            letter: 'D',
            question: 'City known as the Motor City in USA?',
            correctAnswer: 'Detroit',
            options: ['Dallas', 'Denver', 'Detroit', 'Delaware'],
            hint: 'Auto industry hub',
            difficulty: 'medium',
            category: 'city'
        },
        {
            id: 'place_005',
            letter: 'E',
            question: 'Country famous for pyramids and the Nile River?',
            correctAnswer: 'Egypt',
            options: ['Egypt', 'Ethiopia', 'Ecuador', 'Estonia'],
            hint: 'Ancient civilization',
            difficulty: 'easy',
            category: 'country'
        },
        {
            id: 'place_006',
            letter: 'F',
            question: 'State known as the Sunshine State in USA?',
            correctAnswer: 'Florida',
            options: ['Florida', 'France', 'Finland', 'Fiji'],
            hint: 'Disney World location',
            difficulty: 'medium',
            category: 'state'
        },
        {
            id: 'place_007',
            letter: 'G',
            question: 'Country known for the Parthenon and mythology?',
            correctAnswer: 'Greece',
            options: ['Germany', 'Ghana', 'Greece', 'Guatemala'],
            hint: 'Birthplace of democracy',
            difficulty: 'medium',
            category: 'country'
        },
        {
            id: 'place_008',
            letter: 'H',
            question: 'Island state of USA in the Pacific Ocean?',
            correctAnswer: 'Hawaii',
            options: ['Houston', 'Hungary', 'Hawaii', 'Honduras'],
            hint: 'Tropical paradise',
            difficulty: 'easy',
            category: 'state'
        },
        {
            id: 'place_009',
            letter: 'I',
            question: 'Country known for the Taj Mahal?',
            correctAnswer: 'India',
            options: ['Italy', 'Ireland', 'India', 'Indonesia'],
            hint: 'Second most populous',
            difficulty: 'easy',
            category: 'country'
        },
        {
            id: 'place_010',
            letter: 'J',
            question: 'Country known for Mount Fuji and sushi?',
            correctAnswer: 'Japan',
            options: ['Jordan', 'Jamaica', 'Japan', 'Java'],
            hint: 'Land of rising sun',
            difficulty: 'easy',
            category: 'country'
        }
    ],
    
    // Additional places by letter for random generation
    placesByLetter: {
        A: ['Amsterdam', 'Africa', 'Asia', 'America', 'Alaska', 'Alabama'],
        B: ['Brazil', 'Belgium', 'Boston', 'Bangkok', 'Bali', 'Bangalore'],
        C: ['Canada', 'California', 'Cairo', 'Chicago', 'Cuba', 'Cyprus'],
        D: ['Denmark', 'Dubai', 'Dublin', 'Delhi', 'Damascus', 'Darwin'],
        E: ['England', 'Europe', 'Edinburgh', 'Estonia', 'Ecuador', 'Ethiopia'],
        F: ['France', 'Finland', 'Florida', 'Frankfurt', 'Fiji', 'Florence'],
        G: ['Germany', 'Greece', 'Geneva', 'Glasgow', 'Ghana', 'Greenland'],
        H: ['Holland', 'Hungary', 'Houston', 'Havana', 'Haiti', 'Honolulu'],
        I: ['Italy', 'Ireland', 'Iceland', 'Israel', 'Iran', 'Iraq'],
        J: ['Japan', 'Jordan', 'Jamaica', 'Jakarta', 'Johannesburg', 'Jerusalem'],
        K: ['Korea', 'Kenya', 'Kuwait', 'Kashmir', 'Kolkata', 'Karachi'],
        L: ['London', 'Lebanon', 'Libya', 'Luxembourg', 'Lithuania', 'Latvia'],
        M: ['Mexico', 'Malaysia', 'Morocco', 'Monaco', 'Mumbai', 'Melbourne'],
        N: ['Norway', 'Nepal', 'Netherlands', 'Nigeria', 'NewYork', 'NewZealand'],
        O: ['Oxford', 'Orlando', 'Ottawa', 'Oman', 'Ohio', 'Oregon'],
        P: ['Paris', 'Portugal', 'Poland', 'Peru', 'Pakistan', 'Philippines'],
        Q: ['Qatar', 'Quebec', 'Queensland', 'Quito', 'Qingdao', 'Queenstown'],
        R: ['Russia', 'Romania', 'Rwanda', 'Rome', 'Riyadh', 'Rio'],
        S: ['Spain', 'Sweden', 'Switzerland', 'Singapore', 'Sydney', 'Seoul'],
        T: ['Turkey', 'Thailand', 'Tokyo', 'Toronto', 'Tunisia', 'Tanzania'],
        U: ['USA', 'Ukraine', 'Uganda', 'Uruguay', 'UAE', 'Uzbekistan'],
        V: ['Venezuela', 'Vietnam', 'Vienna', 'Vancouver', 'Venice', 'Vatican'],
        W: ['Wales', 'Washington', 'Wisconsin', 'Wyoming', 'Warsaw', 'Winnipeg'],
        X: ['Xian', 'Xinjiang', 'Xiamen', 'Xalapa', 'Xenia', 'Xuzhou'],
        Y: ['Yemen', 'Yugoslavia', 'Yellowstone', 'Yokohama', 'Yerevan', 'Yukon'],
        Z: ['Zimbabwe', 'Zambia', 'Zurich', 'Zagreb', 'Zanzibar', 'Zaire']
    },
    
    // Scoring system
    scoring: {
        easy: 10,
        medium: 15,
        hard: 25,
        bonus: 5
    }
};

