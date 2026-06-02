import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Move } from '@/types/chess'
import Square from './Square'
import Piece from './Piece'
import './ChessBoard.css'

interface Props {
  fen: string
  onMove: (move: Move) => boolean
  onPremove: (move: Move | null) => void
  premove: Move | null
  legalMoves: string[]
  orientation?: 'white' | 'black'
}

const ChessBoard: React.FC<Props> = ({
  fen,
  onMove,
  onPremove,
  premove,
  legalMoves,
  orientation = 'white',
}) => {
  const [draggingFrom, setDraggingFrom] = useState<string | null>(null)
  const [dragOverSquare, setDragOverSquare] = useState<string | null>(null)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const board = parseFen(fen)

  const handleDragStart = useCallback(
    (square: string, e: React.DragEvent) => {
      setDraggingFrom(square)
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setDragImage(new Image(), 0, 0)
      }
    },
    []
  )

  const handleDragMove = useCallback((e: React.DragEvent) => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect()
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  const handleDragOver = useCallback(
    (square: string) => {
      if (draggingFrom) {
        setDragOverSquare(square)
      }
    },
    [draggingFrom]
  )

  const handleDrop = useCallback(
    (toSquare: string) => {
      if (!draggingFrom) return

      const move: Move = {
        from: draggingFrom,
        to: toSquare,
      }

      const success = onMove(move)
      if (success) {
        setLastMove({ from: draggingFrom, to: toSquare })
        onPremove(null)
      } else {
        onPremove(move)
      }

      setDraggingFrom(null)
      setDragOverSquare(null)
      setDragPosition(null)
    },
    [draggingFrom, onMove, onPremove]
  )

  const handleDragEnd = useCallback(() => {
    setDraggingFrom(null)
    setDragOverSquare(null)
    setDragPosition(null)
  }, [])

  const files = orientation === 'white' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
  const ranks = orientation === 'white' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="chessboard-wrapper">
      <div 
        className="chessboard-container" 
        ref={boardRef}
        onDragOver={(e) => {
          e.preventDefault()
          handleDragMove(e)
        }}
      >
        <div className="chessboard">
          <AnimatePresence>
            {ranks.map((rank) =>
              files.map((file) => {
                const square = `${file}${rank}`
                const piece = board[square]
                const isLight = (file.charCodeAt(0) - 97 + rank) % 2 === 0
                const isDragging = draggingFrom === square
                const isDragOver = dragOverSquare === square
                const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square)
                const isLegalMove = draggingFrom && legalMoves.some(m => m.startsWith(draggingFrom + square))
                const isPremoveSquare = premove && (premove.from === square || premove.to === square)

                return (
                  <Square
                    key={square}
                    square={square}
                    isLight={isLight}
                    isLastMove={isLastMove}
                    isDragOver={isDragOver && isLegalMove}
                    isPremoveSquare={isPremoveSquare}
                    onDragOver={() => handleDragOver(square)}
                    onDrop={() => handleDrop(square)}
                    onDragLeave={() => setDragOverSquare(null)}
                  >
                    <AnimatePresence mode="wait">
                      {piece && (
                        <Piece
                          key={`${piece}-${square}`}
                          piece={piece}
                          square={square}
                          isDragging={isDragging}
                          onDragStart={(e) => handleDragStart(square, e)}
                          onDragEnd={handleDragEnd}
                        />
                      )}
                    </AnimatePresence>
                  </Square>
                )
              })
            )}
          </AnimatePresence>
        </div>

        <div className="board-coordinates">
          {files.map((file) => (
            <div key={file} className="file-label">
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function parseFen(fen: string): Record<string, string> {
  const board: Record<string, string> = {}
  const rows = fen.split(' ')[0].split('/')

  rows.forEach((row, rankIndex) => {
    const rank = 8 - rankIndex
    let fileIndex = 0

    for (const char of row) {
      if (/\d/.test(char)) {
        fileIndex += parseInt(char)
      } else {
        const file = String.fromCharCode(97 + fileIndex)
        board[`${file}${rank}`] = char
        fileIndex++
      }
    }
  })

  return board
}

export default ChessBoard
