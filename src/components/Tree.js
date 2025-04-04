import * as THREE from "three";
import { tileSize } from "../constants";

export function Tree(tileIndex, height) {
    const tree = new THREE.Group();
    tree.position.x = tileIndex * tileSize;

    const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(15,15,20),
        new THREE.MeshLambertMaterial({
            color: 0x4d2925,
            flatShading: true,
        })
    );

    trunk.position.z = 10;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    const bush = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, height),
        new THREE.MeshLambertMaterial({
            color: 0x7aa31d,
            flatShading: true,
        })
    );
    bush.position.z = height / 2 + 15;
    bush.castShadow = true;
    bush.receiveShadow = true;
    tree.add(bush);


    return tree;
}