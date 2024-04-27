# Chessboard image generator

Generate PNG images of chessboard positions, based on specified chess notation.

Chess notation currently supported:
- FEN

Configure outputted image with a selection of configuration options:
- Size of image
- Colour of board
- Styles of pieces
- Orientation of board

## Usage
### Load FEN
```typescript
import { ChessImageGenerator } from "./ChessImageGenerator";

async function main() {
  await ChessImageGenerator.fromFEN(
    "rnbqkbnr/1ppppQpp/8/8/2B5/p3P3/PPPP1PPP/RNB1K1NR b KQkq - 0 4",
    "./output.png"
  );
}

main()
``` 


## Inspiration
This repo is based off of @andyruwruw's package [chess-image-generator](https://github.com/andyruwruw/chess-image-generator) . I have rewritten aspects of it, as the package no longer seems to be maintained and I had issues installing the package in a typescript ecosystem.

## Example output
![example](https://github.com/FlynnHillier/Chessboard-Image-gen/assets/48843724/b96c8814-23a2-4be0-855a-d26c30aedbb0)

