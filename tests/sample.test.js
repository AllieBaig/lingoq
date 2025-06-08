
// File: tests/sample.test.js

function assertEquals(actual, expected, description) {
    if (actual === expected) {
        console.log(`✅ ${description}`);
    } else {
        console.error(`❌ ${description}`);
        console.error(`   Expected: ${expected}, Got: ${actual}`);
    }
}

// Example function
function add(a, b) {
    return a + b;
}

// Tests
assertEquals(add(2, 3), 5, 'adds 2 + 3');
assertEquals(add(1, -1), 0, 'adds 1 + -1');

