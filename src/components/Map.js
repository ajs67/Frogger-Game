import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";
import { Road } from "./Road";
import { Car } from "./Car";
import { Truck } from "./Truck";

export const metadata = [
    {
        type: "truck",
        direction: true,
        speed: 0,
        vehicles: [{ initialTileIndex: -4, color: 0x00ff00}],
    },
    {
        type: "car",
        direction: false,
        speed: 1,
        vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
    },
    {
        type: "forest",
        trees: [
            { tileIndex: -3, height: 45 },
            { tileIndex: 2, height: 25 },
            { tileIndex: 5, height: 30 },
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

        if (rowData.type === "truck") {
            const row = Road(rowIndex);

            rowData.vehicles.forEach((vehicle) => {
                const truck = Truck(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                );
                row.add(truck);
            });

            map.add(row);
        }
    });
}