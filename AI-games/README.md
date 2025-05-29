# AI-Games – Course Module

This folder is part of the **AI-Games Course Description**, focusing on artificial intelligence techniques applied to classic board games.

> 🔗 The main repository for the full AI-Games project is available here:  
> [AI-Games Main Repository](https://github.com/ByteCrister/AI-Games-CSE-412)  

> 🕹️ You can play the games online here:  
> [Playable Games Page](https://ai-games-cse-412.vercel.app/)  

---

## 🧠 Games Implemented with AI

This folder contains individual projects demonstrating AI strategies in the following games:

- **Tic-Tac-Toe** – Implemented with Minimax algorithm and optimal strategy logic.
- **Chess** – Simplified AI opponent using rule-based evaluation or search pruning techniques.
- **Reversi (Othello)** – Includes logic for board evaluation and strategic move selection.

Each game demonstrates fundamental concepts of:
- Search algorithms (e.g., Minimax, DFS, BFS)
- Game trees and evaluation heuristics
- Decision-making under constraints

---

## 📁 Folder Structure ( src & public)

```text
   +---public
    |   \---images
    |           chess.png
    |           reversi.png
    |           tic-tac-toe.png
    |
    \---src
        +---app
        |   |   globals.css
        |   |   layout.tsx
        |   |   loading.tsx
        |   |   page.tsx
        |   |
        |   +---chess
        |   |   |   loading.tsx
        |   |   |   page.tsx
        |   |   |
        |   |   \---[difficulty]
        |   |           loading.tsx
        |   |           page.tsx
        |   |
        |   +---reversi
        |   |   |   loading.tsx
        |   |   |   page.tsx
        |   |   |
        |   |   \---[difficulty]
        |   |           loading.tsx
        |   |           page.tsx
        |   |
        |   \---tic-tac-toe
        |       |   loading.tsx
        |       |   page.tsx
        |       |
        |       \---[difficulty]
        |               loading.tsx
        |               page.tsx
        |
        +---components
        |   +---chess
        |   |       AI.ts
        |   |       ChessBoard.tsx
        |   |       ChessDifficulty.tsx
        |   |       ChessGame.tsx
        |   |       GameControls.tsx
        |   |       GameLogic.ts
        |   |       GameOverModal.tsx
        |   |       Square.tsx
        |   |       types.ts
        |   |       useChessGame.ts
        |   |
        |   +---home
        |   |       GameCard.tsx
        |   |       GameSelector.tsx
        |   |       types.ts
        |   |
        |   +---loaders
        |   |       loader-one.module.css
        |   |       LoaderOne.tsx
        |   |
        |   +---reversi
        |   |       AILogic.ts
        |   |       Board.tsx
        |   |       Cell.tsx
        |   |       DifficultySelector.tsx
        |   |       GameControls.tsx
        |   |       GameLogic.ts
        |   |       Reversi.tsx
        |   |       ReversiDifficulty.tsx
        |   |       ScoreBoard.tsx
        |   |       types.ts
        |   |       useReversiGame.ts
        |   |
        |   +---tic-tac-toe
        |   |       DifficultySelector.tsx
        |   |       GameBoard.tsx
        |   |       GameLogic.ts
        |   |       GamePage.tsx
        |   |       GameSquare.tsx
        |   |       ScorePanel.tsx
        |   |       TicTacToe.tsx
        |   |       types.ts
        |   |       useTicTacToe.ts
        |   |
        |   \---ui
        |           alert.tsx
        |           button.tsx
        |           card.tsx
        |           dialog.tsx
        |           label.tsx
        |           radio-group.tsx
        |           select.tsx
        |
        \---lib
                utils.ts
```

