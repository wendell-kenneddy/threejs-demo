import './styles/style.scss';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const container = document.querySelector('main canvas') as HTMLCanvasElement;
const loader = new GLTFLoader();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#1E7E7E');

// Camera
const target = new THREE.Vector3(-0.5, 1.2, 0);
const cameraInitialPosition = new THREE.Vector3(
  5 * Math.sin(0.2 * Math.PI),
  5,
  10 * Math.cos(0.2 * Math.PI)
);
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.01,
  5000
);
camera.position.copy(cameraInitialPosition);
camera.lookAt(target);

// Lights
const ambientLight = new THREE.AmbientLight('#fff', 1);
scene.add(ambientLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: container
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

// Animation
const animate = () => {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
});

loader.load('/scene.gltf', (gltf) => {
  const pc = gltf.scene;
  pc.name = 'PC';
  pc.position.x = 0;
  pc.position.y = 0;
  scene.add(gltf.scene);
  animate();
});
