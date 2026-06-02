import React from 'react'
import { motion } from 'framer-motion'
import './GameControls.css'

interface Props {
  onReset: () => void
  onUndo: () => void
  canUndo: boolean
}

const GameControls: React.FC<Props> = ({ onReset, onUndo, canUndo }) => {
  return (
    <motion.div
      className="game-controls"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }}
    >
      <button
        className="control-button reset-button"
        onClick={onReset}
        title="Start new game"
      >
        🔄 New Game
      </button>
      <button
        className="control-button undo-button"
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo last move (Ctrl+Z)"
      >
        ↶ Undo
      </button>
    </motion.div>
  )
}

export default GameControls
