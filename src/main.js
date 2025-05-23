import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap} from "./components/Map";
import { DirectionalLight } from "./components/DirectionalLight";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { isCollision } from "./utilities/isCollision";
import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

const scoreDOM = document.getElementById("score");
const highScoreDOM = document.getElementById("highScore");
const resultDOM = document.getElementById("result-container");

initializeGame();

document
    .querySelector("#retry")
    ?.addEventListener("click", initializeGame);

function initializeGame() {
    initializePlayer();
    initializeMap();

    if (scoreDOM) scoreDOM.innerText = "0";
    if (resultDOM) resultDOM.style.visibility = "hidden";
    if (highScoreDOM) highScoreDOM.innerText = "0";
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
    animateVehicles();
    animatePlayer();
    isCollision();

    renderer.render(scene, camera);
}