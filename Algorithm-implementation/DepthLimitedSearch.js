const readline = require("readline");

function depthLimitedSearch(graph, startNode, goalNode, limit, path = []) {
    path.push(startNode);

    if (startNode === goalNode) {
        console.log(`Goal ${goalNode} found! Path: ${path.join(" -> ")}`);
        return true;
    }

    if (limit <= 0) {
        path.pop();
        return false;
    }

    for (const child of graph[startNode] || []) {
        if (depthLimitedSearch(graph, child, goalNode, limit - 1, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

// ============ INPUT SECTION ============
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};

function askForEdge() {
    rl.question("Enter edges in the format: from to or 'done': ", input => {
        if (input.trim().toLowerCase() === "done") {
            askForStartGoal();
            return;
        }

        const [from, to] = input.trim().split(" ");
        if (!from || !to) {
            console.log("Invalid format. Use: from to");
            return askForEdge();
        }

        if (!graph[from]) graph[from] = [];
        graph[from].push(to);

        if (!graph[to]) graph[to] = []; // ensure all nodes are included

        askForEdge();
    });
}

function askForStartGoal() {
    rl.question("Enter start node: ", start => {
        rl.question("Enter goal node: ", goal => {
            rl.question("Enter depth limit: ", limitStr => {
                const limit = parseInt(limitStr);

                if (!graph[start]) {
                    console.log(`Start node ${start} not found in graph.`);
                    rl.close();
                    return;
                }

                if (!graph[goal]) {
                    console.log(`Goal node ${goal} not found in graph.`);
                    rl.close();
                    return;
                }

                if (isNaN(limit) || limit < 0) {
                    console.log("Invalid depth limit.");
                    rl.close();
                    return;
                }

                const result = depthLimitedSearch(graph, start, goal, limit);
                if (!result) {
                    console.log("Goal not found within the depth limit.");
                }

                rl.close();
            });
        });
    });
}

askForEdge();

// Enter edges in the format: from to or 'done': A B
// Enter edges in the format: from to or 'done': A C
// Enter edges in the format: from to or 'done': B D
// Enter edges in the format: from to or 'done': B E
// Enter edges in the format: from to or 'done': C F
// Enter edges in the format: from to or 'done': D G
// Enter edges in the format: from to or 'done': D H
// Enter edges in the format: from to or 'done': E I
// Enter edges in the format: from to or 'done': F J
// Enter edges in the format: from to or 'done': done
// Enter start node: A
// Enter goal node: J
// Enter depth limit: 3





// const graph = {
//     A: ["B", "C"],
//     B: ["D", "E"],
//     C: ["F"],
//     D: ["G", "H"],
//     E: ["I"],
//     F: ["J"],
//     G: [],
//     H: [],
//     I: [],
//     J: []
// };

// const result = depthLimitedSearch(graph, "A", "J", 2);

// if (!result) {
//     console.log("Goal not found within the depth limit.");
// }