import { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Move, GameState } from '@/types/chess'

export const useChess = (initialFen?: string) => {
  const [chess] = useState(() => new Chess(initialFen))
  const [gameState, setGameState] = useState<GameState>(() => ({
    fen: chess.fen(),
    legalMoves: chess.moves({ verbose: true }).map(m => m.san),
    isCheckmate: chess.isCheckmate(),
    isStalemate: chess.isStalemate(),
    isCheck: chess.inCheck(),
    turn: chess.turn() as 'w' | 'b',
  }))
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [premove, setPremove] = useState<Move | null>(null)

  const makeMove = useCallback((move: Move) => {
    const legalMoves = chess.moves({ verbose: true })
    const isLegal = legalMoves.some(
      m => m.from === move.from && m.to === move.to && (!move.promotion || m.promotion === move.promotion)
    )

    if (isLegal) {
      const result = chess.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      })

      if (result) {
        setMoveHistory(prev => [...prev, result.san])
        setGameState({
          fen: chess.fen(),
          legalMoves: chess.moves({ verbose: true }).map(m => m.san),
          isCheckmate: chess.isCheckmate(),
          isStalemate: chess.isStalemate(),
          isCheck: chess.inCheck(),
          turn: chess.turn() as 'w' | 'b',
        })
        return true
      }
    }
    return false
  }, [chess])

  const setPremoveMove = useCallback((move: Move | null) => {
    setPremove(move)
  }, [])

  const applyPremoveIfExists = useCallback(() => {
    if (premove) {
      const success = makeMove(premove)
      if (success) {
        setPremove(null)
      }
      return success
    }
    return false
  }, [premove, makeMove])

  const resetGame = useCallback((fen?: string) => {
    chess.load(fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    setMoveHistory([])
    setPremove(null)
    setGameState({
      fen: chess.fen(),
      legalMoves: chess.moves({ verbose: true }).map(m => m.san),
      isCheckmate: chess.isCheckmate(),
      isStalemate: chess.isStalemate(),
      isCheck: chess.inCheck(),
      turn: chess.turn() as 'w' | 'b',
    })
  }, [chess])

  const undoMove = useCallback(() => {
    const lastMove = chess.undo()
    if (lastMove) {
      setMoveHistory(prev => prev.slice(0, -1))
      setPremove(null)
      setGameState({
        fen: chess.fen(),
        legalMoves: chess.moves({ verbose: true }).map(m => m.san),
        isCheckmate: chess.isCheckmate(),
        isStalemate: chess.isStalemate(),
        isCheck: chess.inCheck(),
        turn: chess.turn() as 'w' | 'b',
      })
      return true
    }
    return false
  }, [chess])

  return {
    gameState,
    makeMove,
    setPremoveMove,
    applyPremoveIfExists,
    resetGame,
    undoMove,
    moveHistory,
    premove,
    fen: chess.fen(),
  }
}
