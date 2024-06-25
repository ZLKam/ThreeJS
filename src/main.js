import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { USDZLoader } from 'three/addons/loaders/USDZLoader.js';

let camera, scene, renderer;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.75, - 1.5);

    scene = new THREE.Scene();

    const rgbeLoader = new RGBELoader();

    const usdzLoader = new USDZLoader();

    const [texture, model] = await Promise.all([
        rgbeLoader.loadAsync('venice_sunset_1k.hdr'),
        usdzLoader.loadAsync('saeukkang.usdz'),
    ]);

    // texture.mapping = THREE.EquirectangularReflectionMapping;

	// 			scene.background = texture;
	// 			scene.backgroundBlurriness = 0.5;
	// 			scene.environment = texture;


    model.position.setY(-1);
    model.position.setZ(3);
    scene.add(model);

    // const light = new THREE.SpotLight('red');
    // light.position.set(0, 1, 5);
    // light.castShadow = true;
    // scene.add(light);

    const pointLight = new THREE.PointLight('white', 10, 10);
    pointLight.position.set(0, 2, 3);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    // scene.backgroundBlurriness = 0.5;
    // scene.environment = texture;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('white');
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 8;

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}

function log(vector3) {
    console.log(vector3.x + ', ' + vector3.y + ', ' + vector3.z);
}