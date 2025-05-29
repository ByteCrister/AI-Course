const readline = require('readline');

class Edge {
    constructor(child) {
        this.child = child;
    }
}

class Group {
    constructor(type, edges) {
        this.type = type;
        this.edges = edges;
    }
}

class Node {
    constructor(state, heuristic) {
        this.state = state;
        this.heuristic = heuristic;
        this.solved = false;
        this.children = [];
    }
}

function aoStar(node) {
    if (node.solved) return;

    console.log(`Expanding: ${node.state}`);

    if (!node.children.length) {
        node.solved = true;
        return;
    }

    let bestCost = Infinity;

    for (const group of node.children) {
        let cost = group.type === "AND" ? 0 : Infinity;

        for (const edge of group.edges) {
            aoStar(edge.child);

            const edgeCost = 1 + edge.child.heuristic;

            if (group.type === "AND") {
                cost += edgeCost;
            } else {
                cost = Math.min(cost, edgeCost);
            }
        }

        if (cost < bestCost) {
            bestCost = cost;
        }
    }

    node.heuristic = bestCost;
    node.solved = true;

    console.log(`Solved: ${node.state} with cost: ${node.heuristic}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const nodes = new Map();

function askNodeInput() {
    rl.question("Enter a node (format: name heuristic), or type 'done': ", input => {
        if (input.trim().toLowerCase() === 'done') {
            askEdgesInput();
            return;
        }

        const [state, hStr] = input.trim().split(" ");
        const heuristic = Number(hStr);
        if (!state || isNaN(heuristic)) {
            console.log("Invalid input. Format should be: A 3");
            return askNodeInput();
        }

        nodes.set(state, new Node(state, heuristic));
        askNodeInput();
    });
}

function askEdgesInput() {
    rl.question("Enter edge group (format: parent groupType child1 child2...), or 'done': ", input => {
        if (input.trim().toLowerCase() === 'done') {
            askRootNode();
            return;
        }

        const [parentName, groupType, ...childNames] = input.trim().split(" ");
        const parent = nodes.get(parentName);
        if (!parent || (groupType !== "AND" && groupType !== "OR") || !childNames.length) {
            console.log("Invalid input. Format: A OR B C");
            return askEdgesInput();
        }

        const edges = childNames.map(name => {
            const child = nodes.get(name);
            if (!child) {
                console.log(`Node ${name} not found.`);
                process.exit(1);
            }
            return new Edge(child);
        });

        parent.children.push(new Group(groupType, edges));
        askEdgesInput();
    });
}

function askRootNode() {
    rl.question("Enter the root node to run AO*: ", rootName => {
        const root = nodes.get(rootName.trim());
        if (!root) {
            console.log("Invalid root node.");
            return askRootNode();
        }

        aoStar(root);
        console.log(`\nFinal heuristic value of root node '${root.state}': ${root.heuristic}`);
        rl.close();
    });
}

askNodeInput();


// Enter a node (format: name heuristic), or type 'done': A 999
// Enter a node (format: name heuristic), or type 'done': B 4
// Enter a node (format: name heuristic), or type 'done': C 2
// Enter a node (format: name heuristic), or type 'done': D 3
// Enter a node (format: name heuristic), or type 'done': E 6
// Enter a node (format: name heuristic), or type 'done': F 8
// Enter a node (format: name heuristic), or type 'done': G 2
// Enter a node (format: name heuristic), or type 'done': H 0
// Enter a node (format: name heuristic), or type 'done': L 0
// Enter a node (format: name heuristic), or type 'done': J 0
// Enter a node (format: name heuristic), or type 'done': done
// Enter edge group (format: parent groupType child1 child2...), or 'done': A OR B
// Enter edge group (format: parent groupType child1 child2...), or 'done': A AND C D
// Enter edge group (format: parent groupType child1 child2...), or 'done': B OR E F
// Enter edge group (format: parent groupType child1 child2...), or 'done': C OR G
// Enter edge group (format: parent groupType child1 child2...), or 'done': C AND H L
// Enter edge group (format: parent groupType child1 child2...), or 'done': D OR J
// Enter edge group (format: parent groupType child1 child2...), or 'done': done
// Enter the root node to run AO*: A



// const [A, B, C, D, E, F, G, H, L, J] = [
//     new Node("A", 999), new Node("B", 4), new Node("C", 2),
//     new Node("D", 3), new Node("E", 6), new Node("F", 8),
//     new Node("G", 2), new Node("H", 0), new Node("L", 0), new Node("J", 0)
// ];

// A.children.push(new Group("OR", [new Edge(B)]));
// A.children.push(new Group("AND", [new Edge(C), new Edge(D)]));
// B.children.push(new Group("OR", [new Edge(E), new Edge(F)]));
// C.children.push(new Group("OR", [new Edge(G)]));
// C.children.push(new Group("AND", [new Edge(H), new Edge(L)]));
// D.children.push(new Group("OR", [new Edge(J)]));

// aoStar(A);

// console.log(`\nFinal heuristic value of root node '${A.state}': ${A.heuristic}`);