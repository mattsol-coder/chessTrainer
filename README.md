# ♟ Chess Endgame Trainer

Interactive chess endgame training platform with drag-and-drop interface, premove functionality, and real-time game analysis.

## Features

✨ **Interactive Chess Board**
- Drag-and-drop piece movement
- Smooth animations with Framer Motion
- Real-time legal move validation
- Visual feedback for selected squares

⚡ **Premove System**
- Queue moves before opponent responds
- Useful for rapid training sessions
- Real-time premove indicator

📊 **Game Analysis**
- Automatic checkmate detection
- Stalemate recognition
- Check indicator
- Move history tracking

🎨 **Beautiful UI**
- Chess.com-inspired design
- Dark theme with gradient accents
- Fully responsive layout
- Smooth animations and transitions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Chess.js** - Game logic

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mattsol-coder/chessTrainer.git
cd chessTrainer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
npm run preview
```

## Usage

1. **Move Pieces**: Drag and drop pieces to move them
2. **Premove**: Drag a piece while opponent is thinking to queue a move
3. **Undo**: Click the Undo button or press `Ctrl+Z` to take back moves
4. **Reset**: Start a new game with the Reset button

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo move |

## Project Structure

```
src/
├── components/
│   ├── ChessBoard/        # Main chess board component
│   ├── GameControls/      # Control buttons
│   └── GameInfo/          # Game status & history
├── hooks/
│   └── useChess.ts        # Chess game logic hook
├── types/
│   └── chess.ts           # TypeScript type definitions
├── App.tsx                # Main application
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## Features in Development

- [ ] Multiple endgame puzzles
- [ ] Puzzle selection menu
- [ ] Solution hints system
- [ ] Progress tracking
- [ ] Difficulty levels
- [ ] Move analysis with engine
- [ ] Custom position editor
- [ ] Move timer for training

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for your own purposes.

## Author

**mattsol-coder** - [GitHub Profile](https://github.com/mattsol-coder)
