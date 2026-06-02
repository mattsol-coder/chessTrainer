import React from 'react'
import { motion } from 'framer-motion'
import { GameState } from '@/types/chess'
import './GameInfo.css'

interface Props {
  gameState: GameState
  moveHistory: string[]
  premove: any
}

const GameInfo: React.FC<Props> = ({ gameState, moveHistory, premove }) => {
  const getGameStatus = () => {
    if (gameState.isCheckmate) {
      return gameState.turn === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate'
    }
    if (gameState.isStalemate) {
      return 'Stalemate - Draw'
    }
    if (gameState.isCheck) {
      return `${gameState.turn === 'w' ? 'White' : 'Black'} is in check`
    }
    return `${gameState.turn === 'w' ? 'White' : 'Black'} to move`
  }

  const getStatusClass = () => {
    if (gameState.isCheckmate) return 'checkmate'
    if (gameState.isStalemate) return 'stalemate'
    if (gameState.isCheck) return 'check'
    return ''
  }

  return (
    <motion.div
      className="game-info"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }}
    >
      <div className="info-section">
        <h3>📊 Game Status</h3>
        <motion.div
          className={`status-text ${getStatusClass()}`}
          animate={gameState.isCheck ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: gameState.isCheck ? Infinity : 0, duration: 0.6 }}
        >
          {getGameStatus()}
        </motion.div>
      </div>

      <div className="info-section">
        <h3>♞ Move History</h3>
        <motion.div
          className="move-history"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {moveHistory.length === 0 ? (
            <span className="no-moves">No moves yet</span>
          ) : (
            moveHistory.map((move, idx) => (
              <motion.span
                key={idx}
                className="move-item"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {idx % 2 === 0 && `${Math.floor(idx / 2) + 1}.`}
                {move}
              </motion.span>
            ))
          )}
        </motion.div>
      </div>

      {premove && (
        <motion.div
          className="info-section"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
        >
          <h3>⚡ Premove</h3>
          <div className="premove-indicator">
            {premove.from} → {premove.to}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GameInfo
