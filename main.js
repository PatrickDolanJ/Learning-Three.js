import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75,window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({canvas});
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);
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