import * as THREE from './node_modules/three/build/three.module.js';

// Setting up scene, canvas, and renderer
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75,window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({canvas},true);

//making the cube
const geometry = new THREE.BoxGeometry();
const cubegeometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0xd87b94 });
const cube = new THREE.Mesh(cubegeometry, material);
cube.position.set(5,0,0);
const wirecube = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments( wirecube, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add(line);
scene.add(cube);
camera.position.z = 5;

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }







const animate = function () {
    requestAnimationFrame(animate);
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    };
    animate();

    // function resizeCanvasToDisplaySize() {
    //     const canvas = renderer.domElement;
    //     // look up the size the canvas is being displayed
    //     const width = canvas.clientWidth;
    //     const height = canvas.clientHeight;
      
    //     // you must pass false here or three.js sadly fights the browser
    //     renderer.setSize(width, height, false);
    //     camera.aspect = width / height;
    //     camera.updateProjectionMatrix();
      
    //     // update any render target sizes here
    //   }
      
    //   const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
    //   resizeObserver.observe(canvas, {box: 'content-box'});