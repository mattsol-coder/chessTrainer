import React from 'react'
import { motion } from 'framer-motion'
import './Square.css'

interface Props {
  square: string
  isLight: boolean
  isLastMove: boolean
  isDragOver: boolean
  onDragOver: () => void
  onDrop: () => void
  onDragLeave: () => void
  children: React.ReactNode
}

const Square: React.FC<Props> = ({
  square,
  isLight,
  isLastMove,
  isDragOver,
  onDragOver,
  onDrop,
  onDragLeave,
  children,
}) => {
  return (
    <motion.div
      className={`square ${isLight ? 'light' : 'dark'} ${isLastMove ? 'last-move' : ''} ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver()
      }}
      onDrop={(e) => {
        e.preventDefault()
        onDrop()
      }}
      onDragLeave={onDragLeave}
      whileHover={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {children}
    </motion.div>
  )
}

export default Square
