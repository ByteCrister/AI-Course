const readline = require("readline");

class Node {
    constructor(label, value = null) {
        this.label = label;
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    isLeaf() {
        return this.children.length === 0;
    }
}

function minimax(node, isMAX) {
    if (node.isLeaf()) {
        return node.value;
    }

    let best = isMAX ? -Infinity : Infinity;

    for (const child of node.children) {
        const val = minimax(child, !isMAX);
        best = isMAX ? Math.max(best, val) : Math.min(best, val);
    }

    return best;
}

function nodeToString(node) {
    return node.isLeaf()
        ? `Leaf(${node.label}:${node.value})`
        : `Node(${node.label})`;
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const nodeMap = new Map();
let root = null;

console.log('Enter edges like: parent child (e.g., A B or K 5). Type "done" to finish');

rl.on("line", (line) => {
    const trimmed = line.trim();
    if (trimmed.toLowerCase() === "done") {
        rl.question("Enter root node label: ", (rootLabel) => {
            root = nodeMap.get(rootLabel);
            if (!root) {
                console.log("Root node not found.");
                rl.close();
                return;
            }

            const result = minimax(root, true);
            console.log(`\nThe optimal value is: ${result}`);
            rl.close();
        });
        return;
    }

    const [parentLabel, childRaw] = trimmed.split(/\s+/);
    if (!parentLabel || !childRaw) {
        console.log("Invalid input. Please enter: parent child");
        return;
    }

    if (!nodeMap.has(parentLabel)) {
        nodeMap.set(parentLabel, new Node(parentLabel));
    }
    const parent = nodeMap.get(parentLabel);

    const value = parseInt(childRaw);
    let child;
    if (!isNaN(value)) {
        child = new Node(childRaw, value);
    } else {
        if (!nodeMap.has(childRaw)) {
            nodeMap.set(childRaw, new Node(childRaw));
        }
        child = nodeMap.get(childRaw);
    }

    parent.addChild(child);
});


/*
A B
A C
B D
B E
C F
C G
D -1
D 4
E 2
E 6
F -3
F -5
G 0
G 7
done
Enter root node label: A
*/

// const A = new Node();
// const B = new Node();
// const C = new Node();
// const D = new Node();
// const E = new Node();
// const F = new Node();
// const G = new Node();

// const D1 = new Node(-1);
// const D2 = new Node(4);
// const E1 = new Node(2);
// const E2 = new Node(6);
// const F1 = new Node(-3);
// const F2 = new Node(-5);
// const G1 = new Node(0);
// const G2 = new Node(7);

// A.addChild(B);
// A.addChild(C);
// B.addChild(D);
// B.addChild(E);
// C.addChild(F);
// C.addChild(G);
// D.addChild(D1);
// D.addChild(D2);
// E.addChild(E1);
// E.addChild(E2);
// F.addChild(F1);
// F.addChild(F2);
// G.addChild(G1);
// G.addChild(G2);

// const result = minimax(A, true);
// console.log("The optimal value is:", result);
