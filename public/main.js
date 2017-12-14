function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function animate() {
  requestAnimationFrame( animate );
  //camera.position.z -= 1;
  renderer.render( scene, camera );
}

var scene;
var stats;
var light = new THREE.AmbientLight( 0x404040 , 3); // soft white light
var camera;
var renderer;
var controls;

// Dynamic object
var materials = {
  _loaded: false,
  _callbacks: [],
  _d: [],
  attach: function(cb) {
    if(cb !== undefined) this._callbacks.push(cb);
  },
  setLoaded: function() {
    this._loaded = true;
    this._callbacks.forEach((cb) => cb());
  },
  addMaterial: function(mat) {
    if(this._loaded) return false;
    this._d[mat.name] = mat;
  }
};

// Dynamic object
var models = {
  // Internal state if the models are loaded
  _loaded: false,
  // List of attached callbacks
  _callbacks: [],
  // Model data/objects
  _d: [],
  // Load function that loads all models if not already loaded
  load: function() {
    if(this._loaded) return;

    var loader = new THREE.OBJLoader2();
    var interval = 100; // ms
    var _this = this;
    if(!textures._loaded || !materials._loaded) {
      window.setTimeout(models.load, interval);
    } else {
      loader.setMaterials(materials._d);
      console.log(loader);
      loader.load('/models/sponza.obj', (event) => {
        models._d.push(event.detail.loaderRootNode);
        models.setLoaded()
      });
    }
  },
  // Attach an eventListener to the onLoaded event
  attach: function(cb) {
    if (cb !== undefined) {this._callbacks.push(cb)}
  },
  // Function to call if all is loaded; inform all attached listeners
  setLoaded: function() {
    this._loaded = true;
    this._callbacks.forEach((cb) => cb());
  }
};

var textures = {
  _texture_names: [
    {mat_name: 'vase_round', tex_name: 'vase_round_'},
    {mat_name: 'vase_hanging', tex_name: 'vase_round_'},
    {mat_name: 'vase', tex_name: 'vase_'},
    {mat_name: 'chain', tex_name: 'chain_texture_'},
    {mat_name: 'leaf', tex_name: 'sponza_thorn_'},
    {mat_name: 'details', tex_name: 'sponza_details_'},

    // Background of lion / Banner / Wappen
    {mat_name: 'Material__298', tex_name: 'background_'},
    // Lion
    {mat_name: 'Material__25', tex_name: 'lion_'},

    // ???
    {mat_name: 'Material__47', tex_name: 'sponza_details_'},
    {mat_name: '16___Default', tex_name: 'vase_plant_'},
    {mat_name: 'Material__57', tex_name: 'vase_plant_'},

    // Building
    {mat_name: 'arch', tex_name: 'sponza_arch_'},
    {mat_name: 'column_a', tex_name: 'sponza_column_a_'},
    {mat_name: 'column_b', tex_name: 'sponza_column_b_'},
    {mat_name: 'column_c', tex_name: 'sponza_column_c_'},
    {mat_name: 'bricks', tex_name: 'spnza_bricks_a_'},
    {mat_name: 'floor', tex_name: 'sponza_floor_a_'},
    {mat_name: 'ceiling', tex_name: 'sponza_ceiling_a_'},
    {mat_name: 'roof', tex_name: 'sponza_roof_'},
    // Curtains
    {mat_name: 'fabric_c', tex_name: 'sponza_curtain_green_'},
    {mat_name: 'fabric_d', tex_name: 'sponza_curtain_blue'},
    {mat_name: 'fabric_f', tex_name: 'sponza_curtain_blue_'},
    {mat_name: 'fabric_g', tex_name: 'sponza_curtain_'},
    // Fabric
    {mat_name: 'fabric_a', tex_name: 'sponza_fabric_'},
//    {mat_name: 'fabric_b', tex_name: 'sponza_fabric_blue_'},
    {mat_name: 'fabric_e', tex_name: 'sponza_fabric_green_'},
    {mat_name: 'flagpole', tex_name: 'sponza_flagpole_'},

  ],
  _loaded: false,
  _callbacks: [],
  _d: [],
  load: function() {
    if(this._loaded) return;

    this._texture_names.forEach((tex) => {
      var mat = this._load_texture(tex.tex_name)
      mat.name = tex.mat_name;
      materials.addMaterial(mat);
      console.log(mat);
    });
    console.log('DONE');

    this.setLoaded();
    materials.setLoaded();
  },
  _load_texture: function(base_name) {
    var loader = new THREE.TGALoader();
    var material = new THREE.MeshPhongMaterial();

    material.map =loader.load(`/textures/${base_name}diff.tga`, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      material.map = texture;
    }, null, null);

    material.sepcularMap = loader.load(`/textures/${base_name}spec.tga`, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      material.specularMap = texture;
    }, null, null);

    material.normalMap = loader.load(`/textures/${base_name}ddn.tga`, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      material.normalMap = texture;
    }, null, null);

    material.side = THREE.DoubleSide;

    return material;
  },
  attach: function() {
    if(cb !== undefined) this._callbacks.push(cb);
  },
  setLoaded: function() {
    this._loaded = true;
    this._callbacks.forEach((cb) => cb());
  }
};

function apply_textures() {
  var interval = 100; // ms
  if(!models._loaded || !textures._loaded || !materials._loaded) {
    window.setTimeout(apply_textures, interval);
  } else {
    console.log('Applying textures to model');
    models._d.forEach((object) => {
      console.log(object);

      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;

      object.scale = {x: 0.0000000001, y: 0.0000000001, z: 0.0000000001};

      scene.add(object);

      animate();
    });
  }
}


$(document).ready(function() {
  stats = new Stats();
  stats.setMode(1);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  stats.begin();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 1.0;
  controls.panSpeed = 2.0;
  controls.target.set(0,0,0);

  camera.position.set(0, 1000, 0);

  scene.add(light);
  materials._d['defaultMaterial'] = new THREE.MeshBasicMaterial({color: new THREE.Color(getRandomColor()), wireframe: true});
  models.attach(apply_textures);
  textures.load();
  models.load()
});
