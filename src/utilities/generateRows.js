import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";

export function generateRows(amount) {
    const rows = [];
    for (let i = 0; i < amount; i++) {
        const rowData = generateRow();
        rows.push(rowData);
    }
    return rows;
}

function generateRow() {
    const type = randomElement(["car", "truck", "forest"]);
    if (type === "car") return generateCarLaneMetadata();
    if (type === "truck") return generateTruckLaneMetadata();
    return generateForestMetadata();
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateForestMetadata() {
    const occupiedTiles = new Set();
    const trees = Array.from({ length: 5 }, () => {
        let tileIndex;
        do {
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(tileIndex));
        occupiedTiles.add(tileIndex);

        const height = randomElement([15, 30, 45, 20]);

        return { tileIndex, height };
    });

    return { type: "forest", trees };
}

function generateCarLaneMetadata() {
    const direction = randomElement([true, false]);
    const speed = randomElement([120, 160, 185]);

    const occupiedTiles = new Set();

    const vehicles = Array.from({ length: 3 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);

        const color = randomElement([0xff0000, 0x00aa33, 0xaa00ff]);

        return { initialTileIndex, color };
    });

    return { type: "car", direction, speed, vehicles };
}

function generateTruckLaneMetadata() {
    const direction = randomElement([true, false]);
    const speed = randomElement([110, 160, 190]);

    const occupiedTiles = new Set();

    const vehicles = Array.from({ length: 3 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        for (let i =0; i < 3; i++) {
            occupiedTiles.add(initialTileIndex + i);
            occupiedTiles.add(initialTileIndex - i);
        }

        const color = randomElement([0xf00000, 0x00aaff, 0x333333]);

        return { initialTileIndex, color };
    });

    return { type: "truck", direction, speed, vehicles };
}