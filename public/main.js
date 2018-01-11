// Stats UI instance
let stats;
// WebGLRenderer
let renderer;
// OpenGL context reference of `renderer`
let gl;
// Main camera
let camera;
// Scene that should contain sponza
let scene;
// Globe-Controls
let controls;

let l_shaders;


let sun = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
let plight = new THREE.PointLight( 0xff0000, 10, 100 );

function throwOnGLError(err, funcName, args) {
  throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  gl = renderer.context;
  gl = WebGLDebugUtils.makeDebugContext(gl, undefined, throwOnGLError);

  setUpControls();
  setUpStats();
}

$(document).ready(function() {
  init();

  let shaders = [
    'totex',
  ];

  //l_shaders = loadShaders(shaders);

  camera.position.set(0, 1000, 0);

  scene.add(sun);
  scene.add(plight);



  Promise.all([$.get(`shaders/${shaders[0]}.vert.glsl`), $.get(`shaders/${shaders[0]}.frag.glsl`)]).then((results) => {
    var material = new THREE.ShaderMaterial({
    	uniforms: {
    		time: { value: 1.0 },
    		resolution: { value: new THREE.Vector2() }
    	},
    	vertexShader: results[0],
    	fragmentShader: results[1]
    });

    console.log(material);

    materials._d['defaultMaterial'] = material; //new THREE.MeshBasicMaterial({color: new THREE.Color(getRandomColor()), wireframe: true});

    models.attach(apply_textures);
    textures.load();
    models.load()
  });
});
