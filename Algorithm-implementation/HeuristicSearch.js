const readline = require("readline");

class Node {
    constructor(state, heuristic) {
        this.state = state;
        this.heuristic = heuristic;
    }
}

function heuristicSearch(graph, start, goal) {
    const open = [new Node(start, 0)];
    const visited = new Set();

    while (open.length > 0) {
        open.sort((a, b) => a.heuristic - b.heuristic);
        const current = open.shift();

        if (visited.has(current.state)) continue;
        visited.add(current.state);

        console.log("Visited:", current.state);

        if (current.state === goal) {
            console.log("Goal reached!");
            return;
        }

        const children = graph[current.state] || [];
        for (const childNode of children) {
            open.push(childNode);
        }
    }
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};

console.log('Enter edges in the format: FROM TO HEURISTIC');
console.log('Type "done" when finished entering edges.');

function askEdge() {
    rl.question("Edge: ", input => {
        if (input.trim().toLowerCase() === "done") {
            askStartAndGoal();
            return;
        }

        const [from, to, heuristicStr] = input.trim().split(" ");
        const heuristic = parseInt(heuristicStr);

        if (!from || !to || isNaN(heuristic)) {
            console.log("Invalid input. Format: FROM TO HEURISTIC (e.g., A B 2)");
            return askEdge();
        }

        if (!graph[from]) graph[from] = [];
        graph[from].push(new Node(to, heuristic));

        if (!graph[to]) graph[to] = []; 

        askEdge();
    });
}

function askStartAndGoal() {
    rl.question("Enter START node: ", start => {
        rl.question("Enter GOAL node: ", goal => {
            heuristicSearch(graph, start.trim(), goal.trim());
            rl.close();
        });
    });
}

askEdge();


/*
Edge: S A 3
Edge: S B 2
Edge: A C 4
Edge: A D 1
Edge: B E 3
Edge: B F 1
Edge: E H 5
Edge: F I 1
Edge: F G 3
Edge: done
Enter START node: S
Enter GOAL node: G
*/


// const graph = {
//     S: [new Node("A", 3), new Node("B", 2)],
//     A: [new Node("C", 4), new Node("D", 1)],
//     C: [],
//     D: [],
//     B: [new Node("E", 3), new Node("F", 1)],
//     E: [new Node("H", 5)],
//     F: [new Node("I", 1), new Node("G", 3)],
//     I: [],
//     G: []
// };

// heuristicSearch(graph, "S", "G");