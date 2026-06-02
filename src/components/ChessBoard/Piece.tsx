import React from 'react'
import { motion } from 'framer-motion'
import './Piece.css'

interface Props {
  piece: string
  square: string
  isDragging: boolean
  onDragStart: () => void
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
      initial={{ scale: 1 }}
      animate={isDragging ? { scale: 1.1, zIndex: 100 } : { scale: 1, zIndex: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {pieceUnicode[piece]}
    </motion.div>
  )
}

export default Piece
