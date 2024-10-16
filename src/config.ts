import { Color } from "chess.js";

export type Config = {
  board: BoardConfig;
  outDir: string;
};

export type BoardConfig = {
  size: number; // Size of chessboard (width & height)
  lightSquareColor: string; // Colour of light squared tiles
  darkSquareColor: string; // Colour of dark squared tiles
  orientation: Color; // Which way the board is facing
  pieceStyle: "cburnett"; // The style of piece to use
  quality: number; // Quality of generated image (0-1)
};

// Config to be passed by the user
export type ProvidedConfig = Partial<{
  board: Partial<Config["board"]>;
  outDir?: Config["outDir"];
}>;

const DEFAULT_BOARD_CONFIG: BoardConfig = {
  size: 250,
  lightSquareColor: "rgb(240, 217, 181)",
  darkSquareColor: "rgb(181, 136, 99)",
  orientation: "w",
  pieceStyle: "cburnett",
  quality: 1,
};

export function applyDefaultConfig(config: ProvidedConfig): Config {
  return {
    board: {
      ...DEFAULT_BOARD_CONFIG,
      ...config.board,
    },
    outDir: config.outDir ?? "./",
  };
}
