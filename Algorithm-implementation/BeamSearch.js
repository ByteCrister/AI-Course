const readline = require("readline");

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(item, priority) {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    size() {
        return this.elements.length;
    }
}

function beamSearch(graph, heuristic, start, goal, beamWidth) {
    let currentBeam = new PriorityQueue();
    currentBeam.enqueue({ node: start, path: [start], cost: 0 }, heuristic(start));
    const visited = new Set([start]);

    while (!currentBeam.isEmpty()) {
        const nextBeam = new PriorityQueue();

        while (!currentBeam.isEmpty()) {
            const { item } = currentBeam.dequeue();
            const { node, path, cost } = item;

            if (node === goal) {
                return { path, totalCost: cost };
            }

            const neighbors = graph[node] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    const newCost = cost + neighbor.cost;
                    const newPath = [...path, neighbor.node];
                    const priority = newCost + heuristic(neighbor.node); // f(n) = g(n) + h(n)
                    nextBeam.enqueue({ node: neighbor.node, path: newPath, cost: newCost }, priority);
                }
            }
        }

        // Trimming nextBeam to beamWidth (sorted by f(n) = g(n) + h(n))
        const trimmedBeam = new PriorityQueue();
        while (!nextBeam.isEmpty() && trimmedBeam.size() < beamWidth) {
            trimmedBeam.enqueue(nextBeam.dequeue().item, 0);
        }

        currentBeam = trimmedBeam;
    }

    return null;
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};
const heuristic = {};
let startNode = "", goalNode = "", beamWidth = 2;

console.log("Enter edges in format: FROM TO COST (e.g., A B 5). Type 'done' when finished.");

function askEdges() {
    rl.question("Edge: ", input => {
        if (input.toLowerCase() === "done") return askHeuristics();
        const [from, to, costStr] = input.trim().split(" ");
        const cost = parseInt(costStr);
        if (!from || !to || isNaN(cost)) {
            console.log("Invalid input. Use format: FROM TO COST");
            return askEdges();
        }

        if (!graph[from]) graph[from] = [];
        if (!graph[to]) graph[to] = [];

        graph[from].push({ node: to, cost });
        graph[to].push({ node: from, cost });

        askEdges();
    });
}

function askHeuristics() {
    console.log("Enter heuristic values in format: NODE VALUE (e.g., A 10). Type 'done' when finished.");

    function nextHeuristic() {
        rl.question("Heuristic: ", input => {
            if (input.toLowerCase() === "done") return askStartGoal();
            const [node, valueStr] = input.trim().split(" ");
            const value = parseInt(valueStr);
            if (!node || isNaN(value)) {
                console.log("Invalid input. Use format: NODE VALUE");
                return nextHeuristic();
            }

            heuristic[node] = value;
            nextHeuristic();
        });
    }

    nextHeuristic();
}

function askStartGoal() {
    rl.question("Start node: ", start => {
        rl.question("Goal node: ", goal => {
            rl.question("Beam width: ", bwStr => {
                startNode = start.trim();
                goalNode = goal.trim();
                beamWidth = parseInt(bwStr);
                const result = beamSearch(
                    graph,
                    (node) => heuristic[node] ?? Infinity,
                    startNode,
                    goalNode,
                    beamWidth
                );

                if (result) {
                    console.log("Goal Found:", result.path.join(" -> "));
                    console.log("Total Cost:", result.totalCost);
                } else {
                    console.log("Goal not reachable.");
                }

                rl.close();
            });
        });
    });
}

askEdges();

/*
Edge: A B 11
Edge: A D 7
Edge: A C 14
Edge: B E 15
Edge: C E 8
Edge: C F 10
Edge: D F 25
Edge: E H 9
Edge: F G 20
Edge: G H 10
Edge: done
Enter heuristic values in format: NODE VALUE (e.g., A 10). Type 'done' when finished.
Heuristic: A 40
Heuristic: B 32
Heuristic: C 25
Heuristic: D 35
Heuristic: E 19
Heuristic: F 17
Heuristic: G 0
Heuristic: G 10
Heuristic: done
Start node: A
Goal node: G
Beam width: 3
*/

// const heuristic = (node) => {
//     const values = { A: 40, B: 32, C: 25, D: 35, E: 19, F: 17, H: 10, G: 0 };
//     return values[node] ?? Infinity;
// };

// const graph = {
//     A: [{ node: 'B', cost: 11 }, { node: 'D', cost: 7 }, { node: 'C', cost: 14 }],
//     B: [{ node: 'A', cost: 11 }, { node: 'E', cost: 15 }],
//     C: [{ node: 'A', cost: 14 }, { node: 'E', cost: 8 }, { node: 'F', cost: 10 }],
//     D: [{ node: 'A', cost: 7 }, { node: 'F', cost: 25 }],
//     E: [{ node: 'B', cost: 15 }, { node: 'C', cost: 8 }, { node: 'H', cost: 9 }],
//     F: [{ node: 'C', cost: 10 }, { node: 'D', cost: 25 }, { node: 'G', cost: 20 }],
//     G: [{ node: 'F', cost: 20 }, { node: 'H', cost: 10 }],
//     H: [{ node: 'E', cost: 9 }, { node: 'G', cost: 10 }]
// };

// const result = beamSearch(graph, heuristic, 'A', 'G', 3);

// if (result) {
//     console.log("Goal Found:", result.path.join(" -> "));
//     console.log("Total Cost:", result.totalCost);
// } else {
//     console.log("Goal not reachable.");
// }
