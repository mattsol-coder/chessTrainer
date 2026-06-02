import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import ChessBoard from './components/ChessBoard/ChessBoard'
import GameControls from './components/GameControls/GameControls'
import GameInfo from './components/GameInfo/GameInfo'
import { useChess } from './hooks/useChess'
import './App.css'

const App: React.FC = () => {
  const chess = useChess(
    'k7/8/K7/8/8/8/8/8 w - - 0 1' // Example endgame: King and Pawn vs King
  )

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        chess.undoMove()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [chess])

  return (
    <div className="app">
      <motion.div
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="app-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1>♟ Chess Endgame Trainer</h1>
          <p>Master the fundamentals with interactive endgame puzzles</p>
        </motion.header>

        <div className="app-content">
          <div className="main-column">
            <ChessBoard
              fen={chess.fen}
              onMove={chess.makeMove}
              onPremove={chess.setPremoveMove}
              premove={chess.premove}
              legalMoves={chess.gameState.legalMoves}
              orientation="white"
            />
            <GameControls
              onReset={() => chess.resetGame()}
              onUndo={chess.undoMove}
              canUndo={chess.moveHistory.length > 0}
            />
          </div>

          <div className="side-column">
            <GameInfo
              gameState={chess.gameState}
              moveHistory={chess.moveHistory}
              premove={chess.premove}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default App
