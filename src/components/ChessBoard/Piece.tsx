import React from 'react'
import { motion } from 'framer-motion'
import './Piece.css'

interface Props {
  piece: string
  square: string
  isDragging: boolean
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
}

const pieceUnicode: Record<string, string> = {
  'p': '♟',
  'n': '♞',
  'b': '♝',
  'r': '♜',
  'q': '♛',
  'k': '♚',
  'P': '♙',
  'N': '♘',
  'B': '♗',
  'R': '♖',
  'Q': '♕',
  'K': '♔',
}

const Piece: React.FC<Props> = ({
  piece,
  square,
  isDragging,
  onDragStart,
  onDragEnd,
}) => {
  const isWhite = piece === piece.toUpperCase()

  return (
    <motion.div
      draggable
      className={`piece ${isWhite ? 'white' : 'black'} ${isDragging ? 'dragging' : ''}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      initial={{ scale: 1, opacity: 1 }}
      animate={isDragging ? { scale: 1.15, opacity: 0.95 } : { scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      whileHover={!isDragging ? { scale: 1.08 } : {}}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 35,
        mass: 0.5,
      }}
    >
      {pieceUnicode[piece]}
    </motion.div>
  )
}

export default Piece
