# Chessboard image generator

Generate PNG images of chessboard positions, based on specified chess notation.

Chess notation currently supported:

- FEN

Configure outputted image with a selection of configuration options:

- Size of image
- Colour of board
- Orientation of board

## Installation

Using your preffered package manager:

**pnpm:**<br>
`pnpm install @flynnhillier/chessboard-image-gen`

**npm:**<br>
`npm i @flynnhillier/chessboard-image-gen`

## Usage

### Load FEN

```typescript
import { ChessBoardImage } from "@flynnhillier/chessboard-image-gen";

//Wrap in an asyncrinous function so we can call within our top level.
async function main() {
  const ci = new ChessBoardImage();
  await ci.fromFEN(
    "rnbqkbnr/2pppQpp/8/1p6/2B1PP2/p7/PPPP2PP/RNB1K1NR b KQkq - 0 6",
    "myChessBoardImage"
  );
}

main();
```

## Inspiration

This repo is based off of @andyruwruw's package [chess-image-generator](https://github.com/andyruwruw/chess-image-generator) . I have rewritten aspects of it, as the package no longer seems to be maintained and I had issues installing the package in a typescript ecosystem.

## Example output

![example](https://github.com/FlynnHillier/Chessboard-Image-gen/assets/48843724/b96c8814-23a2-4be0-855a-d26c30aedbb0)
