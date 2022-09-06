
import * as THREE from './node_modules/three/build/three.module.js';
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';
// Setting up scene, canvas, and renderer
const scene = new THREE.Scene(); 
const canvas = document.querySelector('#c');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer({canvas},true);
//renderer.setPixelRatio( canvas.devicePixelRatio );

const glLoader = new GLTFLoader();
glLoader.load('./resources/maple_tree/scene.gltf',(gltf)=>{
  const tree = gltf.scene;
  tree.position.set(0,0,0);
  tree.scale.set(.05,.05,.05);
  scene.add(tree);
});


//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement );
controls.update();

//Making Scene grid Helper
const axes = new THREE.GridHelper(10,10);
scene.add(axes);
//Making SkySphere
const skySphere = new THREE.SphereGeometry(100,10,7); 
const skyMaterial = new THREE.MeshBasicMaterial({color: 0x76c9db, side:THREE.BackSide});
const skyBoxMesh = new THREE.Mesh(skySphere,skyMaterial);
scene.add(skyBoxMesh);
//making the cube
const geometry = new THREE.BoxGeometry();
const cubegeometry = new THREE.BoxGeometry();
const pointsGeometry = new THREE.SphereGeometry(1,10,8);
const material = new THREE.MeshPhongMaterial({ color: 0xd87b94 });
const cube = new THREE.Mesh(cubegeometry, material);
cube.position.set(-3,0,0);
const wirecube = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments( wirecube, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
const points_material = new THREE.PointsMaterial({
  color: 'pink',
  size: 0.1
});

const points_sphere = new THREE.Points(pointsGeometry, points_material);
points_sphere.position.set(3,0,0);
scene.add(points_sphere);
scene.add(cube);
camera.position.z = 5;

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

function render(time){
  if(resizeRendererToDisplaySize(renderer)){
    time *= 0.001;
  const canvasDom = renderer.domElement;
  camera.aspect = canvasDom.clientWidth /canvasDom.clientHeight;
  camera.updateProjectionMatrix();
  }
}

function resizeRendererToDisplaySize(renderer) {
  const canvasDom = renderer.domElement;
  const width = canvasDom.clientWidth;
  const height = canvasDom.clientHeight;
  const needResize = canvasDom.width !== width || canvasDom.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

const animate = function () {
    requestAnimationFrame(animate);
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    points_sphere.rotation.x += 0.01;
    points_sphere.rotation.y += 0.01;

    //camera.translateY(0.01);
    render();
    renderer.render(scene, camera);
    };
    animate();
    