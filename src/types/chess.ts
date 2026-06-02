export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type Color = 'w' | 'b';
export type Piece = `${Color}${PieceType}` | null;

export interface Square {
  file: number; // 0-7
  rank: number; // 0-7
}

export interface Move {
  from: string;
  to: string;
  promotion?: PieceType;
}

export interface GameState {
  fen: string;
  legalMoves: string[];
  isCheckmate: boolean;
  isStalemate: boolean;
  isCheck: boolean;
  turn: 'w' | 'b';
}

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}