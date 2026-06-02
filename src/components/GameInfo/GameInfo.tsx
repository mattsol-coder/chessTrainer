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
      return gameState.turn === 'w' ? 'White in check' : 'Black in check'
    }
    return gameState.turn === 'w' ? "White to move" : "Black to move"
  }

  return (
    <motion.div
      className="game-info"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="info-section">
        <h3>Game Status</h3>
        <div className={`status-text ${gameState.isCheck ? 'check' : ''}`}>
          {getGameStatus()}
        </div>
      </div>

      <div className="info-section">
        <h3>Move History</h3>
        <div className="move-history">
          {moveHistory.length === 0 ? (
            <span className="no-moves">No moves yet</span>
          ) : (
            moveHistory.map((move, idx) => (
              <span key={idx} className="move-item">
                {Math.floor(idx / 2) + 1}. {move}
              </span>
            ))
          )}
        </div>
      </div>

      {premove && (
        <div className="info-section">
          <h3>Premove</h3>
          <div className="premove-indicator">
            ⚡ {premove.from} → {premove.to}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default GameInfo
