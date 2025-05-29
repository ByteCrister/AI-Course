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
}

function bestFirstSearch(graph, start, goal) {
    const open = new PriorityQueue();
    const closed = new Set();
    const parentList = {};
    const costOfNode = {};

    open.enqueue(start, heuristic(start));
    costOfNode[start] = 0;

    while (!open.isEmpty()) {
        const { item: parentNode } = open.dequeue();

        if (parentNode === goal) {
            const path = reconstructPath(parentList, start, goal);
            const totalCost = costOfNode[goal];
            return { path, totalCost };
        }

        if (closed.has(parentNode)) continue;
        closed.add(parentNode);

        for (const childNode of graph[parentNode] || []) {
            const child = childNode.node;
            const edgeCost = childNode.cost;
            const newCost = costOfNode[parentNode] + edgeCost;

            if (!costOfNode.hasOwnProperty(child)) {
                costOfNode[child] = newCost;
                const priority = heuristic(child);
                open.enqueue(child, priority);
                parentList[child] = parentNode;
            }
        }
    }

    return { path: [], totalCost: 0 };
}


function reconstructPath(parentList, start, goal) {
    const path = [];
    let current = goal;
    while (current !== start) {
        path.push(current);
        current = parentList[current];
    }
    path.push(start);
    return path.reverse();
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};
const heuristicMap = {};
let startNode = "";
let goalNode = "";

console.log("Enter edges in format: FROM TO COST (e.g., A B 5). Type 'done' when finished.");

function askEdges() {
    rl.question("Edge: ", input => {
        if (input.toLowerCase() === "done") return askHeuristics();
        const [from, to, costStr] = input.trim().split(" ");
        const cost = parseInt(costStr);
        if (!from || !to || isNaN(cost)) {
            console.log("Invalid format. Use: FROM TO COST");
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
    console.log("Enter heuristics in format: NODE VALUE (e.g., A 10). Type 'done' when finished.");

    function nextHeuristic() {
        rl.question("Heuristic: ", input => {
            if (input.toLowerCase() === "done") return askStartGoal();
            const [node, valueStr] = input.trim().split(" ");
            const value = parseInt(valueStr);
            if (!node || isNaN(value)) {
                console.log("Invalid format. Use: NODE VALUE");
                return nextHeuristic();
            }

            heuristicMap[node] = value;
            nextHeuristic();
        });
    }

    nextHeuristic();
}

function askStartGoal() {
    rl.question("Start node: ", start => {
        rl.question("Goal node: ", goal => {
            startNode = start.trim();
            goalNode = goal.trim();

            const heuristicFunc = (node) => heuristicMap[node] ?? Infinity;

            const result = bestFirstSearch(graph, startNode, goalNode, heuristicFunc);

            if (result.path.length > 0) {
                console.log("Optimal Path:", result.path.join(" -> "));
                console.log("Total Cost:", result.totalCost);
            } else {
                console.log("Goal not reachable.");
            }

            rl.close();
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
Heuristic: A 40
Heuristic: B 32
Heuristic: C 25
Heuristic: D 35
Heuristic: E 19
Heuristic: F 17
Heuristic: H 10
Heuristic: G 0
Heuristic: done
Start node: A
Goal node: G
*/

// const heuristic = (node) => {
//     const values = { A: 40, B: 32, C: 25, D: 35, E: 19, F: 17, H: 10, G: 0 };
//     return values[node];
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

// const result = bestFirstSearch(graph, 'A', 'G');
// console.log("Optimal Path:", result.path.join('-> '));
// console.log("Total Cost:", result.totalCost);
