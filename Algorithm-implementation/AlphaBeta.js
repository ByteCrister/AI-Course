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


function alphaBeta(node, ALPHA, BETA, isMAX) {

    if (node.isLeaf()) {
        return node.value;
    }

    let best = isMAX ? -Infinity : Infinity;

    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const evalValue = alphaBeta(child, ALPHA, BETA, !isMAX);

        if (isMAX) {
            best = Math.max(best, evalValue);
            ALPHA = Math.max(ALPHA, best);
        } else {
            best = Math.min(best, evalValue);
            BETA = Math.min(BETA, best);
        }

        if (BETA <= ALPHA) {
            const prunedChildren = node.children.slice(i + 1);
            console.log(`\n<-> Pruning at depth`);
            console.log(`  ↳ Current node: ${nodeToString(node)}`);
            console.log(`  ↳ Child that caused pruning: ${nodeToString(child)}`);
            console.log(`  ↳ Pruned children: ${prunedChildren.map(nodeToString).join(", ")}`);
            break;
        }
    }
    return best;
}

function nodeToString(node) {
    return node.isLeaf() ? `Leaf(${node.label}:${node.value})` : `Node(${node.label})`;
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

            const result = alphaBeta(root, -Infinity, Infinity, true);
            console.log(`Alpha-Beta Result: ${result}`);
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
A D
B E
B F
C G
C H
D I
D J
E K
E L
F M
G N
G O
H P
I Q
J R
J S
K 5
K 6
L 7
L 4
L 5
M 3
N 6
O 6
O 9
P 7
Q 5
R 9
R 8
S 6
done
Enter root node label: A
*/


// // Leaves - MIN
// const K = new Node();
// K.addChild(new Node(5));
// K.addChild(new Node(6));

// const L = new Node();
// L.addChild(new Node(7));
// L.addChild(new Node(4));
// L.addChild(new Node(5));

// const M = new Node();
// M.addChild(new Node(3));

// const N = new Node();
// N.addChild(new Node(6));

// const O = new Node();
// O.addChild(new Node(6));
// O.addChild(new Node(9));

// const P = new Node();
// P.addChild(new Node(7));

// const Q = new Node();
// Q.addChild(new Node(5));

// const R = new Node();
// R.addChild(new Node(9));
// R.addChild(new Node(8));

// const S = new Node();
// S.addChild(new Node(6));

// // Level 2 - MAX
// const E = new Node();
// E.addChild(K);
// E.addChild(L);

// const F = new Node();
// F.addChild(M);

// const G = new Node();
// G.addChild(N);
// G.addChild(O);

// const H = new Node();
// H.addChild(P);

// const I = new Node();
// I.addChild(Q);

// const J = new Node();
// J.addChild(R);
// J.addChild(S);

// // Level 1 - MIN
// const B = new Node();
// B.addChild(E);
// B.addChild(F);

// const C = new Node();
// C.addChild(G);
// C.addChild(H);

// const D = new Node();
// D.addChild(I);
// D.addChild(J);

// // Root - MAX
// const A = new Node();
// A.addChild(B);
// A.addChild(C);
// A.addChild(D);

// // Run Alpha-Beta
// const result = alphaBeta(A, -Infinity, Infinity, true);
// console.log("Alpha-Beta Result:", result);
