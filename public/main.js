// Stats UI instance
let stats;
// WebGLRenderer
let renderer;
let render_target;

// OpenGL context reference of `renderer`
let gl;
// Main camera
let camera;
// Scene that should contain sponza
let scene;
// Globe-Controls
let controls;

let ui;

let l_shaders;

var UIParameters = function() {
  this.light_count = 3;
};


let sun = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
let plight = new THREE.PointLight(0xff0000, 1, 0, 2);

let plights = [];

function throwOnGLError(err, funcName, args) {
	throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
};

function redraw_lights(count) {
  if (plights.length != 0) {
    plights.forEach((o) => {
      scene.remove(o);
    });
    plights = [];
  }

  for(let i = 0; i < count; i++) {
    plights.push(new THREE.PointLight(getRandomColor(), 0.8, 0, 2));
  }

  plights.forEach((o) => {
      o.position.x = Math.random() * 2000 - 1000;
      o.position.y = Math.random() * 500;
      o.position.z = Math.random() * 1000 - 500;
      o.castShadow = true;
      scene.add(o);
  });

	scene.add(sun);
}

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

  render_target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    depthBuffer: false,
    stencilBuffer: false
  });

	document.body.appendChild(renderer.domElement);
	gl = renderer.context;
	gl = WebGLDebugUtils.makeDebugContext(gl, undefined, throwOnGLError);

	ui = setupUI();
	setUpControls();
	setUpStats();
}

$(document).ready(function() {
	init();

	materials._d['defaultMaterial'] = new THREE.MeshBasicMaterial({
		color: new THREE.Color(getRandomColor()),
		wireframe: true
	});

	camera.position.set(0, 1000, 0);
  sun.castShadow = true;
  plight.castShadow = true;

  redraw_lights(3);

	scene.add(sun);

	models.attach(apply_textures);
	textures.load();
	models.load();
});
