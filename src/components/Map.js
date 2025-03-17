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
        speed: 40,
        vehicles: [
            { initialTileIndex: -6, color: 0xf00000},
            { initialTileIndex: 0, color: 0x00aaff},
            { initialTileIndex: 7, color: 0x333333},
        ],
    },
    {
        type: "forest",
        trees: [
            { tileIndex: -3, height: 45 },
            { tileIndex: 2, height: 25 },
            { tileIndex: 5, height: 30 },
        ],
    },
    {
        type: "car",
        direction: false,
        speed: 60,
        vehicles: [
            { initialTileIndex: -8, color: 0xff0000 },
            { initialTileIndex: -2, color: 0x00aa33 },
            { initialTileIndex: 4, color: 0x0000aa },
            { initialTileIndex: 9, color: 0xaa00ff },
        ],
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
    for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
        const grass = Grass(rowIndex);
        map.add(grass);
    }
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
                vehicle.ref = car;
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
                vehicle.ref = truck;
                row.add(truck);
            });

            map.add(row);
        }
    });
}