const readline = require("readline");


function bidirectionalSearch(graph, start, goal) {
    if (start === goal) return { path: [start], meetingPoint: start };

    const visitedFromStart = new Set([start]);
    const visitedFromGoal = new Set([goal]);
    const parentFromStart = new Map();
    const parentFromGoal = new Map();

    let queueFromStart = [start];
    let queueFromGoal = [goal];

    while (queueFromStart.length && queueFromGoal.length) {
        queueFromStart = expand(graph, queueFromStart, visitedFromStart, parentFromStart);
        let meeting = findMeeting(visitedFromStart, visitedFromGoal);
        if (meeting) return { path: buildPath(meeting, parentFromStart, parentFromGoal), meetingPoint: meeting };

        queueFromGoal = expand(graph, queueFromGoal, visitedFromGoal, parentFromGoal);
        meeting = findMeeting(visitedFromStart, visitedFromGoal);
        if (meeting) return { path: buildPath(meeting, parentFromStart, parentFromGoal), meetingPoint: meeting };
    }

    return { path: [], meetingPoint: null };
}

function expand(graph, queue, visited, parent) {
    const nextQueue = [];
    for (const node of queue) {
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent.set(neighbor, node);
                nextQueue.push(neighbor);
            }
        }
    }
    return nextQueue;
}

function findMeeting(set1, set2) {
    for (const node of set1) {
        if (set2.has(node)) return node;
    }
    return null;
}

function buildPath(meeting, parentFromStart, parentFromGoal) {
    const path = [];

    let node = meeting;
    while (node) {
        path.push(node);
        node = parentFromStart.get(node);
    }
    path.reverse();

    node = parentFromGoal.get(meeting);
    while (node) {
        path.push(node);
        node = parentFromGoal.get(node);
    }

    return path;
}


// ============ INPUT SECTION ============
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graph = {};

function askEdges() {
    rl.question("Enter edge (from to), or type 'done': ", input => {
        if (input.trim().toLowerCase() === "done") return askStartGoal();

        const [from, to] = input.trim().split(" ");

        if (!from || !to) {
            console.log("Invalid input. Format: from to");
            return askEdges();
        }

        if (!graph[from]) graph[from] = [];
        if (!graph[to]) graph[to] = [];

        graph[from].push(to);
        graph[to].push(from);

        askEdges();
    });
}

function askStartGoal() {
    rl.question("Enter start node: ", start => {
        rl.question("Enter goal node: ", goal => {
            const { path, meetingPoint } = bidirectionalSearch(graph, start, goal);
            if (path.length) {
                console.log(`Path from ${start} to ${goal}: ${path.join(" -> ")}`);
                console.log(`Meeting Point: ${meetingPoint}`);
            } else {
                console.log(`No path found between ${start} and ${goal}`);
            }
            rl.close();
        });
    });
}

askEdges();

// Enter edge (from to), or type 'done': 1 2
// Enter edge (from to), or type 'done': 1 3
// Enter edge (from to), or type 'done': 2 1
// Enter edge (from to), or type 'done': 2 4
// Enter edge (from to), or type 'done': 3 1
// Enter edge (from to), or type 'done': 3 4
// Enter edge (from to), or type 'done': 4 2
// Enter edge (from to), or type 'done': 4 3
// Enter edge (from to), or type 'done': 4 5
// Enter edge (from to), or type 'done': 5 4
// Enter edge (from to), or type 'done': 5 6
// Enter edge (from to), or type 'done': 6 5
// Enter edge (from to), or type 'done': 6 7
// Enter edge (from to), or type 'done': 7 8
// Enter edge (from to), or type 'done': 7 6
// Enter edge (from to), or type 'done': 7 9
// Enter edge (from to), or type 'done': 8 6
// Enter edge (from to), or type 'done': 8 9
// Enter edge (from to), or type 'done': 9 7
// Enter edge (from to), or type 'done': 9 8
// Enter edge (from to), or type 'done': done
// Enter start node: 1
// Enter goal node: 9



// const graph = {
//     1: ["2", "3"],
//     2: ["1", "4"],
//     3: ["1", "4"],
//     4: ["2", "3", "5"],
//     5: ["4", "6"],
//     6: ["5", "7", "8"],
//     7: ["6", "9"],
//     8: ["6", "9"],
//     9: ["7", "8"]
// };

// const initial = "1";
// const goal = "4";

// const { path, meetingPoint } = bidirectionalSearch(graph, initial, goal);

// if (path.length) {
//     console.log(`Path from ${initial} to ${goal}: ${path.join(" -> ")}`);
//     console.log(`Meeting Point: ${meetingPoint}`);
// } else {
//     console.log(`No path found between ${initial} and ${goal}`);
// }