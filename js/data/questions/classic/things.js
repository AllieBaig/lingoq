

// LingoQuest - Classic Mode Things Database
// ES6 Module for thing/object-related questions and answers
// Part of the Classic "Name Place Animal Thing" game mode

export const thingsData = {
    // Configuration
    category: 'things',
    totalQuestions: 50,
    difficulty: 'mixed',
    
    // Question database with multiple choice options
    questions: [
        {
            id: 'thing_001',
            letter: 'A',
            question: 'Red fruit that keeps the doctor away?',
            correctAnswer: 'Apple',
            options: ['Apple', 'Anchor', 'Arrow', 'Axe'],
            hint: 'Falls from trees',
            difficulty: 'easy',
            category: 'food'
        },
        {
            id: 'thing_002',
            letter: 'B',
            question: 'Object used to hit a baseball?',
            correctAnswer: 'Bat',
            options: ['Ball', 'Bat', 'Book', 'Box'],
            hint: 'Swing for home run',
            difficulty: 'easy',
            category: 'sports'
        },
        {
            id: 'thing_003',
            letter: 'C',
            question: 'Vehicle with four wheels for transportation?',
            correctAnswer: 'Car',
            options: ['Chair', 'Cup', 'Car', 'Clock'],
            hint: 'Drive on roads',
            difficulty: 'easy',
            category: 'vehicle'
        },
        {
            id: 'thing_004',
            letter: 'D',
            question: 'Entrance to a room or building?',
            correctAnswer: 'Door',
            options: ['Desk', 'Dog', 'Door', 'Doll'],
            hint: 'Open and close to enter',
            difficulty: 'easy',
            category: 'household'
        },
        {
            id: 'thing_005',
            letter: 'E',
            question: 'Fragile oval object from birds?',
            correctAnswer: 'Egg',
            options: ['Engine', 'Ear', 'Egg', 'Eye'],
            hint: 'Used for breakfast',
            difficulty: 'easy',
            category: 'food'
        },
        {
            id: 'thing_006',
            letter: 'F',
            question: 'Eating utensil with prongs?',
            correctAnswer: 'Fork',
            options: ['Fan', 'Fire', 'Fork', 'Fish'],
            hint: 'Used with knife and spoon',
            difficulty: 'easy',
            category: 'utensil'
        },
        {
            id: 'thing_007',
            letter: 'G',
            question: 'Transparent material for windows?',
            correctAnswer: 'Glass',
            options: ['Gate', 'Glove', 'Glass', 'Gold'],
            hint: 'Fragile and see-through',
            difficulty: 'medium',
            category: 'material'
        },
        {
            id: 'thing_008',
            letter: 'H',
            question: 'Protective gear worn on the head?',
            correctAnswer: 'Hat',
            options: ['House', 'Hand', 'Hat', 'Horse'],
            hint: 'Fashion accessory for head',
            difficulty: 'easy',
            category: 'clothing'
        },
        {
            id: 'thing_009',
            letter: 'I',
            question: 'Frozen water in solid form?',
            correctAnswer: 'Ice',
            options: ['Iron', 'Ink', 'Ice', 'Island'],
            hint: 'Cold and slippery',
            difficulty: 'easy',
            category: 'nature'
        },
        {
            id: 'thing_010',
            letter: 'J',
            question: 'Container for storing liquids?',
            correctAnswer: 'Jar',
            options: ['Jacket', 'Jewel', 'Jar', 'Jump'],
            hint: 'Glass container with lid',
            difficulty: 'medium',
            category: 'container'
        }
    ],
    
    // Additional things by letter for random generation
    thingsByLetter: {
        A: ['Apple', 'Anchor', 'Arrow', 'Axe', 'Album', 'Alarm'],
        B: ['Ball', 'Book', 'Bottle', 'Box', 'Brush', 'Bucket'],
        C: ['Chair', 'Cup', 'Clock', 'Coin', 'Camera', 'Candle'],
        D: ['Desk', 'Drum', 'Diamond', 'Dish', 'Drawer', 'Drill'],
        E: ['Envelope', 'Engine', 'Eraser', 'Earring', 'Elevator', 'Eagle'],
        F: ['Fork', 'Fan', 'Flag', 'Flower', 'Frame', 'Flute'],
        G: ['Guitar', 'Globe', 'Glove', 'Gold', 'Gear', 'Gift'],
        H: ['Hat', 'Hammer', 'House', 'Heart', 'Horn', 'Hook'],
        I: ['Ice', 'Iron', 'Ink', 'Island', 'Ivory', 'Igloo'],
        J: ['Jar', 'Jacket', 'Jewel', 'Juice', 'Jug', 'Jet'],
        K: ['Key', 'Knife', 'Kite', 'Kettle', 'Keyboard', 'Kiss'],
        L: ['Lamp', 'Lock', 'Ladder', 'Leaf', 'Letter', 'Light'],
        M: ['Mirror', 'Mouse', 'Map', 'Mask', 'Medal', 'Moon'],
        N: ['Nail', 'Net', 'Needle', 'Note', 'Nest', 'Necklace'],
        O: ['Orange', 'Ocean', 'Oil', 'Oven', 'Onion', 'Owl'],
        P: ['Pen', 'Paper', 'Phone', 'Piano', 'Pillow', 'Plate'],
        Q: ['Queen', 'Quilt', 'Question', 'Quarter', 'Quill', 'Quest'],
        R: ['Ring', 'Rock', 'Rose', 'Rope', 'Radio', 'Ruler'],
        S: ['Spoon', 'Star', 'Stone', 'Shoe', 'Shirt', 'Sun'],
        T: ['Table', 'Tree', 'Toy', 'Towel', 'Tent', 'Tire'],
        U: ['Umbrella', 'Universe', 'Uniform', 'Urn', 'Utensil', 'Unit'],
        V: ['Vase', 'Vehicle', 'Violin', 'Voice', 'Valley', 'Vest'],
        W: ['Watch', 'Water', 'Window', 'Wheel', 'Wall', 'Wind'],
        X: ['Xylophone', 'Xbox', 'Xerox', 'Xray', 'Xenon', 'Xylem'],
        Y: ['Yarn', 'Yacht', 'Year', 'Yellow', 'Yard', 'Yolk'],
        Z: ['Zebra', 'Zero', 'Zone', 'Zip', 'Zoo', 'Zoom']
    },
    
    // Thing categories for educational purpose
    categories: {
        food: ['Apple', 'Banana', 'Bread', 'Cake', 'Egg', 'Fish'],
        household: ['Chair', 'Table', 'Lamp', 'Mirror', 'Clock', 'Door'],
        clothing: ['Hat', 'Shirt', 'Shoe', 'Jacket', 'Glove', 'Sock'],
        tools: ['Hammer', 'Screwdriver', 'Wrench', 'Drill', 'Saw', 'Pliers'],
        electronics: ['Phone', 'Computer', 'Television', 'Radio', 'Camera', 'Watch'],
        vehicles: ['Car', 'Bus', 'Truck', 'Bicycle', 'Motorcycle', 'Train'],
        sports: ['Ball', 'Bat', 'Racket', 'Goal', 'Net', 'Helmet'],
        nature: ['Tree', 'Flower', 'Rock', 'Water', 'Sun', 'Moon'],
        school: ['Book', 'Pen', 'Paper', 'Ruler', 'Eraser', 'Bag'],
        music: ['Guitar', 'Piano', 'Drum', 'Flute', 'Violin', 'Horn']
    },
    
    // Educational facts about common objects
    facts: {
        Apple: 'Apples float because they are 25% air',
        Car: 'The first car was invented in 1886',
        Book: 'The first printed book was the Bible in 1455',
        Phone: 'The first mobile phone weighed 2.5 pounds',
        Clock: 'The first mechanical clock was made in 1300s'
    },
    
    // Scoring system
    scoring: {
        easy: 10,
        medium: 15,
        hard: 25,
        bonus: 5
    }
};
