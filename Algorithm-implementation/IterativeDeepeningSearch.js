const readline = require("readline");

function iterativeDeepeningSearch(graph, start, target) {
    let depth = 0;

    while (true) {
        const result = depthLimitedSearch(graph, start, target, depth);
        if (result !== null) {
            return result;
        }

        console.log(`Increasing depth to ${depth + 1}`);
        depth++;
    }
}

function depthLimitedSearch(graph, start, target, maxDepth) {
    const stack = [];
    stack.push({ node: start, depth: 0 });

    while (stack.length > 0) {
        const { node, depth } = stack.pop();

        console.log(`Visiting Node: ${node}`);

        if (node === target) {
            console.log(`Found the target node: ${node}`);
            return node;
        }

        if (depth < maxDepth) {
            const children = graph[node] || [];
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push({ node: children[i], depth: depth + 1 });
            }
        }
    }

    return null;
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};

console.log('Enter edges in the format: FROM TO');
console.log('Type "done" when finished.');

function askEdges() {
    rl.question("Edge: ", input => {
        if (input.trim().toLowerCase() === "done") {
            askStartAndTarget();
            return;
        }

        const [from, to] = input.trim().split(" ");
        if (!from || !to) {
            console.log("Invalid format. Use: FROM TO (e.g., A B)");
            return askEdges();
        }

        if (!graph[from]) graph[from] = [];
        graph[from].push(to);

        if (!graph[to]) graph[to] = [];

        askEdges();
    });
}

function askStartAndTarget() {
    rl.question("Enter START node: ", start => {
        rl.question("Enter TARGET node: ", target => {
            const result = iterativeDeepeningSearch(graph, start.trim(), target.trim());

            if (result !== null) {
                console.log("Target node found: " + result);
            } else {
                console.log("Target node not found.");
            }
            rl.close();
        });
    });
}

askEdges();

/*
Edge: A B
Edge: A C
Edge: B D
Edge: B E
Edge: C F
Edge: D G
Edge: F K
Edge: done
Enter START node: A
Enter TARGET node: K
*/



// const graph = {
//     A: ["B", "C"],
//     B: ["D", "E"],
//     C: ["F"],
//     D: ["G"],
//     F: ["K"]
// };

// const result = iterativeDeepeningSearch(graph, "A", "K");

// if (result !== null) {
//     console.log("Target node found: " + result);
// } else {
//     console.log("Target node not found.");
// }