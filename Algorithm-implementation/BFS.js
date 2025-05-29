const readline = require('readline');

class GraphBFS {
    constructor() {
        this.adjList = new Map();
    }

    addEdge(u, v) {
        this.adjList.set(u, [...(this.adjList.get(u) || []), v]);
        this.adjList.set(v, [...(this.adjList.get(v) || []), u]);
    }

    bfs(startNode) {
        if (!this.adjList.has(startNode)) return;

        const queue = [startNode];
        const visited = new Set([startNode]);

        while (queue.length) {
            const node = queue.shift();
            process.stdout.write(node + ' ');

            for (const neighbor of this.adjList.get(node) || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
}

// ===== User Input Section =====
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = new GraphBFS();

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
    rl.question('Enter the starting node for BFS: ', (start) => {
        const startNode = Number(start);
        if (!isNaN(startNode)) {
            console.log('BFS Traversal:');
            graph.bfs(startNode);
        } else {
            console.log('Invalid input. Please enter a number.');
        }
        rl.close();
    });
}

askEdges(); 







// const graph = new GraphBFS();
// graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 4);
// graph.addEdge(3, 5);

// console.log('BFS Traversal:');
// graph.bfs(1);