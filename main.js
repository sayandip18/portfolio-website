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

// Light sources
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(20, 20, 20)
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper);

// Adding orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Adding 3d stars and positioning them randomly
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background Texture
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// My photo on a 3d cube
const myself = new THREE.TextureLoader().load('self.png')

const me = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: myself})
);

scene.add(me);

// Adding moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

me.position.z = -5;
me.position.x = 2;

// Scroll animation

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    me.rotation.y += 0.01;
    me.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
};

document.body.onscroll = moveCamera;
moveCamera();

// Game loop for torus
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

// Finally, calling the animate() function
animate();