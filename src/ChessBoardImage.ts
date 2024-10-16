import { Chess, Square } from "chess.js";
import { applyDefaultConfig, Config, ProvidedConfig } from "./config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "canvas";

export class ChessBoardImage {
  private config: Config;

  public constructor(config: ProvidedConfig = {}) {
    this.config = applyDefaultConfig(config);
  }

  /**
   * Generate and save png image from FEN
   *
   * @param FEN target position
   * @param saveAsFilename given filename for generated image
   * @returns path where image is saved
   */
  public async fromFEN(FEN: string, saveAsFilename?: string): Promise<string> {
    const chess: Chess = new Chess(FEN);
    const img = await this.generateImageBuffer(chess);
    return await this.saveBufferAsPNG(img, saveAsFilename);
  }

  private async saveBufferAsPNG(bf: Buffer, filename?: string): Promise<string> {
    if (!filename?.endsWith(".png")) filename = (filename ?? Date.now().toString()) + ".png";

    const outpath = path.join(this.config.outDir, filename);
    await fs.writeFileSync(outpath, bf);
    return outpath;
  }

  private async generateImageBuffer(chess: Chess): Promise<Buffer> {
    const cv = createCanvas(this.config.board.size, this.config.board.size);
    const ctx = cv.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, this.config.board.size, this.config.board.size);
    ctx.fillStyle = this.config.board.lightSquareColor;
    ctx.fill();

    const col =
      this.config.board.orientation === "w" ? (r: number) => r + 1 : (r: number) => 7 - r + 1;
    const row = (c: number) => "abcdefgh"[this.config.board.orientation === "w" ? c : 7 - c];
    const tile: (r: number, c: number) => Square = (r, c) => (row(r) + col(c)) as Square;

    //draw chessboard canvas
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 8; r++) {
        if ((c + r) % 2 === 0) {
          // Tile is dark tile
          ctx.beginPath();
          ctx.rect(
            (this.config.board.size / 8) * (7 - r + 1) - this.config.board.size / 8,
            (this.config.board.size / 8) * c,
            this.config.board.size / 8,
            this.config.board.size / 8
          );
          ctx.fillStyle = this.config.board.darkSquareColor;
          ctx.fill();
        }

        const piece = chess.get(tile(r, c));

        if (piece) {
          //Tile contains piece
          // const imagePath = `images/${this.config.board.pieceStyle}/${piece.color}/${piece.type}.png`;
          const imagePath = `images/cburnett/${piece.color}/${piece.type}.png`;
          const dir = path.dirname(fileURLToPath(import.meta.url));
          const image = await loadImage(path.join(dir, imagePath));

          await ctx.drawImage(
            image,
            (this.config.board.size / 8) * (7 - r + 1) - this.config.board.size / 8,
            (this.config.board.size / 8) * c,
            this.config.board.size / 8,
            this.config.board.size / 8
          );
        }
      }
    }

    return cv.toBuffer("image/png");
  }
}
