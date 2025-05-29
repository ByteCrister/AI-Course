const readline = require('readline');

class GraphDFS {
    constructor() {
        this.adjList = new Map();
        this.visited = new Set();
    }

    addEdge(u, v) {
        this.adjList.set(u, [...(this.adjList.get(u) || []), v]);
        this.adjList.set(v, [...(this.adjList.get(v) || []), u]);
    }

    dfs(node) {
        if (!node || this.visited.has(node)) return;

        this.visited.add(node);
        process.stdout.write(node + ' ');

        for (const neighbor of this.adjList.get(node) || []) {
            this.dfs(neighbor);
        }
    }

    resetVisited() {
        this.visited.clear();
    }
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = new GraphDFS();

function askEdges() {
    rl.question('Enter an edge (u v), or type "done": ', (input) => {
        if (input.toLowerCase() === 'done') {
            askStartNode();
        } else {
            const [u, v] = input.trim().split(' ').map(Number);
            if (!isNaN(u) && !isNaN(v)) {
                graph.addEdge(u, v);
                askEdges();
            } else {
                console.log('Invalid input. Please enter two numbers.');
                askEdges();
            }
        }
    });
}

function askStartNode() {
    rl.question('Enter the starting node for DFS: ', (start) => {
        const startNode = Number(start);
        if (!isNaN(startNode)) {
            console.log('DFS Traversal:');
            graph.resetVisited();
            graph.dfs(startNode);
            console.log();
        } else {
            console.log('Invalid input. Please enter a number.');
        }
        rl.close();
    });
}

askEdges();





// const graph = new GraphDFS();
// graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 4);
// graph.addEdge(3, 5);

// process.stdout.write("DFS: ");
// graph.dfs(1);