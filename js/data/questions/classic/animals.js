




// LingoQuest - Classic Mode Animals Database
// ES6 Module for animal-related questions and answers
// Part of the Classic "Name Place Animal Thing" game mode

export const animalsData = {
    // Configuration
    category: 'animals',
    totalQuestions: 50,
    difficulty: 'mixed',
    
    // Question database with multiple choice options
    questions: [
        {
            id: 'animal_001',
            letter: 'A',
            question: 'Large mammal with a trunk and tusks?',
            correctAnswer: 'Elephant',
            options: ['Elephant', 'Antelope', 'Alligator', 'Alpaca'],
            hint: 'Never forgets',
            difficulty: 'easy',
            category: 'mammal'
        },
        {
            id: 'animal_002',
            letter: 'B',
            question: 'Black and white striped African animal?',
            correctAnswer: 'Zebra',
            options: ['Bear', 'Buffalo', 'Zebra', 'Baboon'],
            hint: 'Like a horse with stripes',
            difficulty: 'easy',
            category: 'mammal'
        },
        {
            id: 'animal_003',
            letter: 'C',
            question: 'Domestic animal that purrs and meows?',
            correctAnswer: 'Cat',
            options: ['Cow', 'Camel', 'Cat', 'Cheetah'],
            hint: 'Popular house pet',
            difficulty: 'easy',
            category: 'pet'
        },
        {
            id: 'animal_004',
            letter: 'D',
            question: 'Loyal pet known as mans best friend?',
            correctAnswer: 'Dog',
            options: ['Duck', 'Deer', 'Dog', 'Dolphin'],
            hint: 'Barks and wags tail',
            difficulty: 'easy',
            category: 'pet'
        },
        {
            id: 'animal_005',
            letter: 'E',
            question: 'Bird of prey with excellent eyesight?',
            correctAnswer: 'Eagle',
            options: ['Elephant', 'Emu', 'Eagle', 'Elk'],
            hint: 'National bird of USA',
            difficulty: 'medium',
            category: 'bird'
        },
        {
            id: 'animal_006',
            letter: 'F',
            question: 'Cunning animal with a bushy tail?',
            correctAnswer: 'Fox',
            options: ['Fish', 'Frog', 'Fox', 'Falcon'],
            hint: 'Sly as a...',
            difficulty: 'easy',
            category: 'mammal'
        },
        {
            id: 'animal_007',
            letter: 'G',
            question: 'Tallest animal in the world?',
            correctAnswer: 'Giraffe',
            options: ['Goat', 'Gorilla', 'Giraffe', 'Gazelle'],
            hint: 'Long neck to reach leaves',
            difficulty: 'easy',
            category: 'mammal'
        },
        {
            id: 'animal_008',
            letter: 'H',
            question: 'Farm animal that gives us milk?',
            correctAnswer: 'Cow',
            options: ['Horse', 'Hippo', 'Hawk', 'Cow'],
            hint: 'Says moo',
            difficulty: 'easy',
            category: 'farm'
        },
        {
            id: 'animal_009',
            letter: 'I',
            question: 'Spiny mammal that rolls into a ball?',
            correctAnswer: 'Hedgehog',
            options: ['Iguana', 'Insect', 'Hedgehog', 'Ibex'],
            hint: 'Prickly defense mechanism',
            difficulty: 'hard',
            category: 'mammal'
        },
        {
            id: 'animal_010',
            letter: 'J',
            question: 'Spotted big cat known for speed?',
            correctAnswer: 'Jaguar',
            options: ['Jackal', 'Jaguar', 'Jellyfish', 'Jay'],
            hint: 'South American predator',
            difficulty: 'medium',
            category: 'mammal'
        }
    ],
    
    // Additional animals by letter for random generation
    animalsByLetter: {
        A: ['Ant', 'Ape', 'Antelope', 'Alligator', 'Alpaca', 'Armadillo'],
        B: ['Bear', 'Bee', 'Bird', 'Butterfly', 'Buffalo', 'Baboon'],
        C: ['Cat', 'Cow', 'Chicken', 'Cheetah', 'Camel', 'Crab'],
        D: ['Dog', 'Duck', 'Deer', 'Dolphin', 'Dragon', 'Donkey'],
        E: ['Elephant', 'Eagle', 'Emu', 'Elk', 'Eel', 'Ermine'],
        F: ['Fox', 'Fish', 'Frog', 'Falcon', 'Flamingo', 'Ferret'],
        G: ['Giraffe', 'Goat', 'Gorilla', 'Gazelle', 'Goose', 'Gecko'],
        H: ['Horse', 'Hippo', 'Hawk', 'Hamster', 'Hedgehog', 'Heron'],
        I: ['Iguana', 'Insect', 'Ibex', 'Impala', 'Ibis', 'Inchworm'],
        J: ['Jaguar', 'Jackal', 'Jellyfish', 'Jay', 'Jackrabbit', 'Jackal'],
        K: ['Kangaroo', 'Koala', 'Kiwi', 'Kingfisher', 'Kestrel', 'Kudu'],
        L: ['Lion', 'Leopard', 'Llama', 'Lizard', 'Lobster', 'Lemur'],
        M: ['Monkey', 'Mouse', 'Moose', 'Mole', 'Mongoose', 'Mantis'],
        N: ['Newt', 'Nightingale', 'Narwhal', 'Numbat', 'Nutria', 'Nuthatch'],
        O: ['Owl', 'Octopus', 'Otter', 'Ostrich', 'Ocelot', 'Orangutan'],
        P: ['Penguin', 'Panda', 'Parrot', 'Pig', 'Peacock', 'Platypus'],
        Q: ['Quail', 'Quetzal', 'Quokka', 'Queen', 'Quelea', 'Quoll'],
        R: ['Rabbit', 'Rhinoceros', 'Rooster', 'Robin', 'Raccoon', 'Rat'],
        S: ['Snake', 'Shark', 'Sheep', 'Squirrel', 'Swan', 'Seal'],
        T: ['Tiger', 'Turtle', 'Turkey', 'Toad', 'Toucan', 'Tapir'],
        U: ['Unicorn', 'Umbrella', 'Urchin', 'Urial', 'Upupa', 'Urubu'],
        V: ['Vulture', 'Viper', 'Vicuna', 'Vampire', 'Vole', 'Vervet'],
        W: ['Wolf', 'Whale', 'Worm', 'Woodpecker', 'Walrus', 'Wombat'],
        X: ['Xerus', 'Xenops', 'Xiphias', 'Xoloitzcuintli', 'Xeme', 'Xenopus'],
        Y: ['Yak', 'Yellowhammer', 'Yapok', 'Yellowfin', 'Yabby', 'Yacare'],
        Z: ['Zebra', 'Zebu', 'Zonkey', 'Zorilla', 'Zander', 'Zapus']
    },
    
    // Animal categories for educational purpose
    categories: {
        mammals: ['Cat', 'Dog', 'Elephant', 'Lion', 'Tiger', 'Bear'],
        birds: ['Eagle', 'Parrot', 'Owl', 'Penguin', 'Flamingo', 'Robin'],
        reptiles: ['Snake', 'Lizard', 'Turtle', 'Alligator', 'Gecko', 'Iguana'],
        fish: ['Shark', 'Salmon', 'Goldfish', 'Tuna', 'Bass', 'Cod'],
        insects: ['Ant', 'Bee', 'Butterfly', 'Beetle', 'Cricket', 'Dragonfly'],
        pets: ['Cat', 'Dog', 'Hamster', 'Rabbit', 'Guinea', 'Bird'],
        farm: ['Cow', 'Pig', 'Chicken', 'Horse', 'Goat', 'Sheep'],
        wild: ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Rhino']
    },
    
    // Scoring system
    scoring: {
        easy: 10,
        medium: 15,
        hard: 25,
        bonus: 5
    }
};

