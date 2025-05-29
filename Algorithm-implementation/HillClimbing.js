const readline = require('readline');

class State {
    constructor(value) {
        this.value = value;
    }

    getHeuristic() {
        // Peak at 10, max value 100
        return -1 * (this.value - 10) * (this.value - 10) + 100;
    }

    getNeighbors() {
        return [new State(this.value + 1), new State(this.value - 1)];
    }

    toString() {
        return `State{ value=${this.value}, heuristic=${this.getHeuristic()} }`;
    }
}

function hillClimb(initialState) {
    let current = initialState;

    while (true) {
        const neighbors = current.getNeighbors();
        let next = current;

        for (const neighbor of neighbors) {
            if (neighbor.getHeuristic() > next.getHeuristic()) {
                next = neighbor;
            }
        }

        if (next.value === current.value) {
            return current; // Local maximum reached
        }

        current = next;
    }
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter initial value for hill climbing: ', (input) => {
    const initialValue = parseInt(input);
    if (isNaN(initialValue)) {
        console.log("Invalid input. Please enter a number.");
    } else {
        const initial = new State(initialValue);
        const result = hillClimb(initial);
        console.log("Result:", result.toString());
    }
    rl.close();
});
