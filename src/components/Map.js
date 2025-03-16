import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export const metadata = [
    {
        type: "car",
        direction: false,
        speed: 1,
        vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
    },
    {
        type: "forest",
        trees: [
            { tileIndex: -3, height: 50 },
            { tileIndex: 2, height: 30 },
            { tileIndex: 5, height: 50 },
        ],
    },
];

export const map = new THREE.Group();

export function initializeMap() {
    const grass = Grass(0);
    map.add(grass);
    addRows();
}

export function addRows() {
    metadata.forEach((rowData, index) => {
        const rowIndex = index + 1;

        if (rowData.type === "forest") {
            const row = Grass(rowIndex);

            rowData.trees.forEach(({ tileIndex, height }) => {
                const tree = Tree(tileIndex, height);
                row.add(tree);
            });

            map.add(row);
        }

        if (rowData.type === "car") {
            const row = Road(rowIndex);

            rowData.vehicles.forEach((vehicle) => {
                const car = Car(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                );
                row.add(car);
            });

            map.add(row);
        }
    });
}