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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <button
        className="control-button reset-button"
        onClick={onReset}
      >
        🔄 Reset
      </button>
      <button
        className="control-button undo-button"
        onClick={onUndo}
        disabled={!canUndo}
      >
        ↶ Undo
      </button>
    </motion.div>
  )
}

export default GameControls
