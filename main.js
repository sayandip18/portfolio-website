import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Camera and scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

// Adding geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
