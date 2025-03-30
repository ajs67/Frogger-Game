import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { metadata as rows } from "../components/Map";

export function endsUpInValidPosition(currentPosition, moves) {
    // TODO: if game over, then block movement
    
    // calculate where player would end after move
    const finalPosition = calculateFinalPosition(currentPosition, moves);
    
    // Detect if player hits edge of board
    if (
        finalPosition.rowIndex === -1 ||
        finalPosition.tileIndex === minTileIndex - 1 ||
        finalPosition.tileIndex === maxTileIndex + 1
    ) {
        // Move is invalid, ignore command
        return false;
    }

    // Detect if tree is obstacle
    const finalRow = rows[finalPosition.rowIndex -1];
    if (
        finalRow &&
        finalRow.type === "forest" &&
        finalRow.trees.some(
            (tree)  => tree.tileIndex === finalPosition.tileIndex
        )
    ) {
        // Move is invalid, ignore command.
        return false
    }

    return true;
}