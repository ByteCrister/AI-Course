const readline = require('readline');

class Node {
    constructor(state, g, h) {
        this.state = state;
        this.g = g;
        this.h = h;
        this.f = g + h;
    }
}

class Edge {
    constructor(target, cost) {
        this.target = target; // Connected node
        this.cost = cost;
    }
}

function aStarSearch(graph, heuristics, start, goal) {
    const open = [new Node(start, 0, heuristics[start])];
    const cameFrom = {};  
    const costSoFar = { [start]: 0 }; 

    while (open.length) {
        open.sort((a, b) => a.f - b.f); 
        const current = open.shift();

        console.log(`Visiting: ${current.state} (f=${current.f})`);

        if (current.state === goal) {
            console.log(`Goal reached with cost: ${current.g}`);
            printPath(cameFrom, start, goal);
            return;
        }

        for (const edge of graph[current.state] || []) {
            const newCost = current.g + edge.cost;

            if (!(edge.target in costSoFar) || newCost < costSoFar[edge.target]) {
                costSoFar[edge.target] = newCost;
                cameFrom[edge.target] = current.state;
                open.push(new Node(edge.target, newCost, heuristics[edge.target]));
            }
        }
    }

    console.log("No path found.");
}

function printPath(cameFrom, start, goal) {
    const path = [];
    let current = goal;
    while (current !== start) {
        path.push(current);
        current = cameFrom[current];
    }
    path.push(start);
    console.log("Path:", path.reverse().join(" -> "));
}



// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};
const heuristics = {};

function askHeuristics() {
    rl.question("Enter node and heuristic (e.g., A 10), or type 'done': ", input => {
        if (input.trim().toLowerCase() === 'done') return askEdges();

        const [node, hStr] = input.trim().split(" ");
        const h = Number(hStr);
        if (!node || isNaN(h)) {
            console.log("Invalid format.");
            return askHeuristics();
        }

        heuristics[node] = h;
        graph[node] = []; 
        askHeuristics();
    });
}

function askEdges() {
    rl.question("Enter edge (from to cost), or type 'done': ", input => {
        if (input.trim().toLowerCase() === 'done') return askStartGoal();

        const [from, to, costStr] = input.trim().split(" ");
        const cost = Number(costStr);

        if (!from || !to || isNaN(cost)) {
            console.log("Invalid format.");
            return askEdges();
        }

        if (!graph[from]) graph[from] = [];
        graph[from].push(new Edge(to, cost));
        askEdges();
    });
}

function askStartGoal() {
    rl.question("Enter start node: ", start => {
        rl.question("Enter goal node: ", goal => {
            aStarSearch(graph, heuristics, start.trim(), goal.trim());
            rl.close();
        });
    });
}

askHeuristics();

// Enter node and heuristic (e.g., A 10), or type 'done': S 14
// Enter node and heuristic (e.g., A 10), or type 'done': B 12
// Enter node and heuristic (e.g., A 10), or type 'done': C 11
// Enter node and heuristic (e.g., A 10), or type 'done': D 6
// Enter node and heuristic (e.g., A 10), or type 'done': E 4
// Enter node and heuristic (e.g., A 10), or type 'done': F 11
// Enter node and heuristic (e.g., A 10), or type 'done': G 0
// Enter node and heuristic (e.g., A 10), or type 'done': done
// Enter edge (from to cost), or type 'done': S B 4
// Enter edge (from to cost), or type 'done': S C 3
// Enter edge (from to cost), or type 'done': B F 5
// Enter edge (from to cost), or type 'done': B E 12
// Enter edge (from to cost), or type 'done': C E 10
// Enter edge (from to cost), or type 'done': C D 7
// Enter edge (from to cost), or type 'done': D E 2
// Enter edge (from to cost), or type 'done': E G 5
// Enter edge (from to cost), or type 'done': F G 16
// Enter edge (from to cost), or type 'done': done
// Enter start node: S
// Enter goal node: G



// const graph = {
//     S: [new Edge("B", 4), new Edge("C", 3)],
//     B: [new Edge("F", 5), new Edge("E", 12)],
//     C: [new Edge("E", 10), new Edge("D", 7)],
//     D: [new Edge("E", 2)],
//     E: [new Edge("G", 5)],
//     F: [new Edge("G", 16)],
//     G: []
// };

// const heuristics = {
//     S: 14, B: 12, C: 11, D: 6, E: 4, F: 11, G: 0
// };

// aStarSearch(graph, heuristics, "S", "G");