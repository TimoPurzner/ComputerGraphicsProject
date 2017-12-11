$(document).ready(function() {
  var stats = new Stats();
  console.log(stats);
  stats.setMode(1);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 1.0;
  controls.panSpeed = 2.0;
  controls.target.set(0,0,0);

  camera.position.set(0, 1000, 0);

  var loader = new THREE.OBJLoader2();

  function animate() {
    requestAnimationFrame( animate );

    //camera.position.z -= 1;

    renderer.render( scene, camera );
  }


  loader.load('/models/sponza.obj', (event) => {
    var object = event.detail.loaderRootNode;

    object.children.forEach((child) => {
      if(child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color: 0xa5ecc4, wireframe: true});
      }
    });

    console.log(object);

    object.position.x = 0;
    object.position.y = 0;
    object.position.z = -1000;


    object.scale = {x: 0.0000000001, y: 0.0000000001, z: 0.0000000001};

    scene.add(object);

    animate();
  }, null, null, null, false);
});
