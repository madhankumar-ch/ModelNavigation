import * as THREE from 'three';
import { Pathfinding } from 'pathfinding'; // Ensure you have this library
import { OrbitControls } from 'controls';
import { GLTFLoader } from 'loader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load warehouse model and navmesh
const loader = new GLTFLoader();
loader.load('../glbs/warehouse_2410_1125.glb', (gltf) => {
    scene.add(gltf.scene);
});

// Set up pathfinding
const pathfinding = new Pathfinding();
// const navMesh = ...; // Load or create your navmesh
pathfinding.setZoneData('zone1', navMesh); // Define zone data

// Handle mouse clicks
window.addEventListener('click', (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([gltf.scene], true);
    if (intersects.length > 0) {
        const targetPosition = intersects[0].point; // Get clicked point
        
        // Find path using pathfinding
        const startPosition = camera.position.clone();
        const path = pathfinding.findPath(startPosition, targetPosition, 'zone1');

        // Move camera along the calculated path
        moveCameraAlongPath(path);
    }
});

// Function to move camera along the calculated path
function moveCameraAlongPath(path) {
    let index = 0;

    function animate() {
        if (index < path.length) {
            camera.position.lerp(path[index], 0.1); // Smoothly move towards next point
            camera.lookAt(path[index]); // Look at current target
            
            index++;
            requestAnimationFrame(animate);
        }
    }
    
    animate(); // Start moving along the path
}

// Animation loop for rendering
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();