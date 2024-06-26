import { Chess, Square } from "chess.js";
import { createCanvas, loadImage } from "canvas";
import { Config, applyDefaultConfig } from "./config";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export class ChessImageGenerator {
  /**
   * Generate and save png image from FEN
   *
   * @param FEN target position
   * @param out path to save image at
   * @returns path where image is saved
   */
  public static async fromFEN(FEN: string, out: string): Promise<string> {
    const chess: Chess = new Chess(FEN);
    const bf: Buffer = await this.generateBuffer(chess);
    return await this.generatePNG(bf, out);
  }

  /**
   * generate png from
   *
   * @param buffer image buffer
   * @param path output
   * @returns output path
   */
  private static async generatePNG(buffer: Buffer, path: string): Promise<string> {
    await fs.writeFileSync(path, buffer);
    return path;
  }

  /**
   * Generate image buffer of desired chess position
   *
   * @param chess chess.js instance containing desired fen for generation
   * @param config Config
   * @returns Image buffer
   */
  private static async generateBuffer(chess: Chess, config: Partial<Config> = {}): Promise<Buffer> {
    const _config = applyDefaultConfig(config);

    const cv = createCanvas(_config.size, _config.size);
    const ctx = cv.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, _config.size, _config.size);
    ctx.fillStyle = _config.light;
    ctx.fill();

    const col = _config.view === "w" ? (r: number) => r + 1 : (r: number) => 7 - r + 1;
    const row = (c: number) => "abcdefgh"[_config.view === "w" ? c : 7 - c];
    const tile: (r: number, c: number) => Square = (r, c) => (row(r) + col(c)) as Square;

    //draw chessboard canvas
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 8; r++) {
        if ((c + r) % 2 === 0) {
          // Tile is dark tile
          ctx.beginPath();
          ctx.rect(
            (_config.size / 8) * (7 - r + 1) - _config.size / 8,
            (_config.size / 8) * c,
            _config.size / 8,
            _config.size / 8
          );
          ctx.fillStyle = _config.dark;
          ctx.fill();
        }

        const piece = chess.get(tile(r, c));

        if (piece) {
          //Tile contains piece
          const imagePath = `images/${_config.pieceStyle}/${piece.color}/${piece.type}.png`;
          const dir = path.dirname(fileURLToPath(import.meta.url));
          const image = await loadImage(path.join(dir, imagePath));

          await ctx.drawImage(
            image,
            (_config.size / 8) * (7 - r + 1) - _config.size / 8,
            (_config.size / 8) * c,
            _config.size / 8,
            _config.size / 8
          );
        }
      }
    }

    return cv.toBuffer("image/png");
  }
}
