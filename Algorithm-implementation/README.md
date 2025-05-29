# AI Search Algorithms Repository

This repository includes various AI search algorithms categorized into:

- **Chapter 3: Uninformed and Informed Search**
- **Chapter 4: Local Search Techniques**
- **Chapter 5: Adversarial Search (Game Trees)**

---

## 📘 Chapter 3: Search Algorithms

### 🔹 Uninformed Search

<details>
<summary><strong>1. Breadth-First Search (BFS)</strong></summary>

- **How it works**: Explores all neighbors at the current depth before going deeper. Uses a queue (FIFO).
- **Applications**: Shortest path in unweighted graphs, Web crawling, Puzzle solving.
- **Complexity**:
  - Time: O(b^d)
  - Space: O(b^d)
- **Example**:

```txt
Enter an edge (u v), or type "done": 1 2
Enter an edge (u v), or type "done": 1 3
Enter an edge (u v), or type "done": 2 4
Enter an edge (u v), or type "done": 3 5
Enter an edge (u v), or type "done": done
Enter the starting node for BFS: 1
BFS Traversal:
1 2 3 4 5
```

</details>

<details>
<summary><strong>2. Depth-First Search (DFS)</strong></summary>

- **How it works**: Explores as far as possible along each branch before backtracking. Uses a stack (LIFO).
- **Applications**: Maze solving, Topological sorting.
- **Complexity**:
- Time: O(b^m)
- Space: O(m)
- **Example**:

```txt
Enter an edge (u v), or type "done": 1 2
Enter an edge (u v), or type "done": 1 3
Enter an edge (u v), or type "done": 2 4
Enter an edge (u v), or type "done": 3 5
Enter an edge (u v), or type "done": done
Enter the starting node for DFS: 1
DFS Traversal:
1 2 4 3 5
```
</details>

<details>
<summary><strong>3. Depth-Limited Search</strong></summary>

- **How it works**: DFS with a depth limit to avoid infinite recursion.
- **Applications**: Infinite depth trees/graphs.
- **Complexity**:
- Time: O(b^l)
- Space: O(l)
- **Example**:

```txt
Enter edges in the format: from to or 'done': A B
Enter edges in the format: from to or 'done': A C
Enter edges in the format: from to or 'done': B D
Enter edges in the format: from to or 'done': B E
Enter edges in the format: from to or 'done': C F
Enter edges in the format: from to or 'done': D G
Enter edges in the format: from to or 'done': D H
Enter edges in the format: from to or 'done': E I
Enter edges in the format: from to or 'done': F J
Enter edges in the format: from to or 'done': done
Enter start node: A
Enter goal node: J
Enter depth limit: 3

Output:
Goal J found! Path: A -> C -> F -> J
```
</details>

<details>
<summary><strong>4. Iterative Deepening Search</strong></summary>

- **How it works**: Combines the space-efficiency of DFS and optimality of BFS by running DFS with increasing depth limits.
- **Applications**: Memory-constrained systems, games.
- **Complexity**:
- Time: O(b^d)
- Space: O(d)
- **Example**:

```txt
Input:

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

Output:
Visiting Node: A
Visiting Node: C
Visiting Node: F
Visiting Node: K
Found the target node: K
Path to target: A -> C -> F -> K
```
</details>

<details>
<summary><strong>5. Bidirectional Search</strong></summary>

- **How it works**: Simultaneously searches forward from start and backward from goal.
- **Applications**: Shortest path in large state spaces.
- **Complexity**:
- Time: O(b^(d/2))
- Space: O(b^(d/2))
- **Example**:

```text
Input:

Enter edge (from to), or type 'done': 1 2
Enter edge (from to), or type 'done': 1 3
Enter edge (from to), or type 'done': 2 1
Enter edge (from to), or type 'done': 2 4
Enter edge (from to), or type 'done': 3 1
Enter edge (from to), or type 'done': 3 4
Enter edge (from to), or type 'done': 4 2
Enter edge (from to), or type 'done': 4 3
Enter edge (from to), or type 'done': 4 5
Enter edge (from to), or type 'done': 5 4
Enter edge (from to), or type 'done': 5 6
Enter edge (from to), or type 'done': 6 5
Enter edge (from to), or type 'done': 6 7
Enter edge (from to), or type 'done': 7 8
Enter edge (from to), or type 'done': 7 6
Enter edge (from to), or type 'done': 7 9
Enter edge (from to), or type 'done': 8 6
Enter edge (from to), or type 'done': 8 9
Enter edge (from to), or type 'done': 9 7
Enter edge (from to), or type 'done': 9 8
Enter edge (from to), or type 'done': done
Enter start node: 1
Enter goal node: 9

Output:
Path from 1 to 9: 1 -> 3 -> 4 -> 5 -> 6 -> 7 -> 9
Meeting Point: 4
```

</details>

---

### 🔹 Informed Search

<details>
<summary><strong>6. Best-First Search</strong></summary>

- **How it works**: Uses a heuristic to expand the most promising node.
- **Applications**: Robot navigation, web search.
- **Complexity**:
- Time: O(b^m)
- Space: O(b^m)
- **Example**:

```text
Input:

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

Output:
Optimal Path: A -> C -> F -> G
Total Cost: 44
```

</details>

<details>
<summary><strong>7. A\* Search</strong></summary>

- **How it works**: Uses both actual cost (g(n)) and heuristic (h(n)), f(n) = g(n) + h(n).
- **Applications**: Pathfinding in maps, AI in games.
- **Complexity**:
- Time: Exponential
- Space: Exponential
- **Example**:

```text
Input:

Enter node and heuristic (e.g., A 10), or type 'done': S 14
Enter node and heuristic (e.g., A 10), or type 'done': B 12
Enter node and heuristic (e.g., A 10), or type 'done': C 11
Enter node and heuristic (e.g., A 10), or type 'done': D 6
Enter node and heuristic (e.g., A 10), or type 'done': E 4
Enter node and heuristic (e.g., A 10), or type 'done': F 11
Enter node and heuristic (e.g., A 10), or type 'done': G 0
Enter node and heuristic (e.g., A 10), or type 'done': done
Enter edge (from to cost), or type 'done': S B 4
Enter edge (from to cost), or type 'done': S C 3
Enter edge (from to cost), or type 'done': B F 5
Enter edge (from to cost), or type 'done': B E 12
Enter edge (from to cost), or type 'done': C E 10
Enter edge (from to cost), or type 'done': C D 7
Enter edge (from to cost), or type 'done': D E 2
Enter edge (from to cost), or type 'done': E G 5
Enter edge (from to cost), or type 'done': F G 16
Enter edge (from to cost), or type 'done': done
Enter start node: S
Enter goal node: G

Output:
Visiting: S (f=14)
Visiting: C (f=14)
Visiting: B (f=16)
Visiting: D (f=16)
Visiting: E (f=16)
Visiting: G (f=17)
Goal reached with cost: 17
Path: S -> C -> D -> E -> G
```

</details>

<details>
<summary><strong>8. AO\* Algorithm</strong></summary>

- **How it works**: Used for AND-OR graphs. Makes decisions considering both OR and AND branches.
- **Applications**: Expert systems, problem solvers with decomposition.
- **Complexity**:
- Time: Depends on graph size
- Space: Depends on implementation
- **Example**:

```text
Input:

Enter a node (format: name heuristic), or type 'done': A 999
Enter a node (format: name heuristic), or type 'done': B 4
Enter a node (format: name heuristic), or type 'done': C 2
Enter a node (format: name heuristic), or type 'done': D 3
Enter a node (format: name heuristic), or type 'done': E 6
Enter a node (format: name heuristic), or type 'done': F 8
Enter a node (format: name heuristic), or type 'done': G 2
Enter a node (format: name heuristic), or type 'done': H 0
Enter a node (format: name heuristic), or type 'done': L 0
Enter a node (format: name heuristic), or type 'done': J 0
Enter a node (format: name heuristic), or type 'done': done
Enter edge group (format: parent groupType child1 child2...), or 'done': A OR B
Enter edge group (format: parent groupType child1 child2...), or 'done': A AND C D
Enter edge group (format: parent groupType child1 child2...), or 'done': B OR E F
Enter edge group (format: parent groupType child1 child2...), or 'done': C OR G
Enter edge group (format: parent groupType child1 child2...), or 'done': C AND H L
Enter edge group (format: parent groupType child1 child2...), or 'done': D OR J
Enter edge group (format: parent groupType child1 child2...), or 'done': done
Enter the root node to run AO*: A

Output:
Expanding: A
Expanding: B
Expanding: E
Solved: E with cost: 6
Expanding: F
Solved: F with cost: 8
Solved: B with cost: 7
Expanding: C
Expanding: G
Solved: G with cost: 2
Expanding: H
Solved: H with cost: 0
Expanding: L
Solved: L with cost: 0
Solved: C with cost: 3
Expanding: D
Expanding: J
Solved: J with cost: 0
Solved: D with cost: 1
Solved: A with cost: 5

Final heuristic value of root node 'A': 5
```

</details>

<details>
<summary><strong>9. Heuristic Search</strong></summary>

- **How it works**: General strategy using heuristic function to guide the search.
- **Applications**: Any problem where estimation improves search speed.
- **Complexity**:
- Time: Varies
- Space: Varies
- **Example**:

```text
Input:

Edge: S A 3
Edge: S B 2
Edge: A C 4
Edge: A D 1
Edge: B E 3
Edge: B F 1
Edge: E H 5
Edge: F I 1
Edge: F G 3
Edge: done
Enter START node: S
Enter GOAL node: G

Output:
Visited: S
Visited: B
Visited: F
Visited: I
Visited: A
Visited: D
Visited: E
Visited: G
Goal reached!
```

</details>

---

## 📙 Chapter 4: Local Search

<details>
<summary><strong>10. Hill Climbing</strong></summary>

- **How it works**: Iteratively moves to the neighbor with highest value (greedy).
- **Applications**: Optimization problems.
- **Complexity**:
- Time: O(n)
- Space: O(1)
- **Example**:

```text
Enter initial value for hill climbing: 5
Result: State{ value=10, heuristic=100 }
```

</details>

<details>
<summary><strong>11. Beam Search</strong></summary>

- **How it works**: Keeps top-k best states at each level (like BFS with limited width).
- **Applications**: Speech recognition, machine translation.
- **Complexity**:
- Time: O(k _ b _ d)
- Space: O(k \* d)
- **Example**:

```text
Input:

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

Output:
Goal Found: A -> C -> F -> G
Total Cost: 44
```

</details>

---

## 📗 Chapter 5: Adversarial Search


<details>
<summary><strong>12. Minimax Algorithm</strong></summary>

- **How it works**: Chooses optimal moves assuming opponent plays optimally.
- **Applications**: Chess, Tic-Tac-Toe, game AI.
- **Complexity**:
- Time: O(b^m)
- Space: O(m)
- **Example**:

```text
Input:

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

Output:
The optimal value is: 4
```

</details>

<details>
<summary><strong>13. Alpha-Beta Pruning</strong></summary>

- **How it works**: Optimized minimax, prunes branches that won't affect result.
- **Applications**: Efficient decision-making in games.
- **Complexity**:
- Time: O(b^(m/2)) (best case)
- Space: O(m)
- **Example**:

```text
Input:

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

Output:
Alpha-Beta Result: 6
```
</details>