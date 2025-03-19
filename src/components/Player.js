import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";

export const player = Player();

function Player() {
    const player = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(15,15,20),
        new THREE.MeshLambertMaterial({
            color: "yellow",
            flatShading: true,
        })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.z = 10;
    player.add(body);

    const cap = new THREE.Mesh(
        new THREE.BoxGeometry(2, 10, 1),
        new THREE.MeshLambertMaterial({
            color: 0xf0619a,
            flatShading: true,
        })
    );
    cap.position.z = 21;
    cap.castShadow = true;
    cap.receiveShadow = true;
    player.add(cap);

    const playerContainer = new THREE.Group();
    playerContainer.add(player);

    return playerContainer;
}

export const position = {
    currentRow: 0,
    currentTile: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
    const isValidMove = endsUpInValidPosition(
        {
            rowIndex: position.currentRow,
            tileIndex: position.currentTile,
        },
        [...movesQueue, direction]
    );

    if (!isValidMove) return;

    movesQueue.push(direction);
}

export function stepCompleted() {
    const direction = movesQueue.shift();

    if (direction === "forward") position.currentRow += 1;
    if (direction === "backward") position.currentRow -= 1;
    if (direction === "left") position.currentTile -= 1;
    if (direction === "right") position.currentTile += 1;

    // Add additional rows to the map when needed
    if (position.currentRow > rows.length - 10) addRows();

    // Update score
    const scoreDOM = document.getElementById("score");
    if (scoreDOM) scoreDOM.innerText = position.currentRow.toString();
}

export function initializePlayer() {
    // initialize position of player object
    player.position.x = 0;
    player.position.y = 0;
    player.children[0].position.z = 0;

    // Initialize the metadata
    position.currentRow = 0;
    position.currentTile = 0;

    // Clear move queue
    movesQueue.length = 0;
}