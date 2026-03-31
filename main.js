
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// GOLDEN WIREFRAME CUBE
const geometry = new THREE.BoxGeometry(3,3,3);

const material = new THREE.MeshBasicMaterial({
color:0xffd700,
wireframe:true
});

const cube = new THREE.Mesh(geometry,material);
scene.add(cube);


// TEXT CANVAS
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 512;

context.fillStyle = "black";
context.fillRect(0,0,512,512);

context.fillStyle = "gold";
context.font = "60px Arial";
context.textAlign = "center";

context.fillText("Eid Mubarak",256,230);
context.fillText("To All",256,310);

const texture = new THREE.CanvasTexture(canvas);

const textMaterial = new THREE.MeshBasicMaterial({
map:texture,
transparent:true,
side:THREE.DoubleSide
});

const textPlane = new THREE.PlaneGeometry(2.5,2.5);
const textMesh = new THREE.Mesh(textPlane,textMaterial);

scene.add(textMesh);


// STARS PARTICLES
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 800;

const positions = [];

for(let i=0;i<starsCount;i++){

positions.push(
(Math.random()-0.5)*50,
(Math.random()-0.5)*50,
(Math.random()-0.5)*50
);

}

starsGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(positions,3)
);

const starsMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:0.1
});

const stars = new THREE.Points(starsGeometry,starsMaterial);

scene.add(stars);


camera.position.z = 6;


// ANIMATION
function animate(){

requestAnimationFrame(animate);

cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

textMesh.rotation.y += 0.01;

stars.rotation.y += 0.0005;

renderer.render(scene,camera);

}

animate();


// RESPONSIVE
window.addEventListener('resize',()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

