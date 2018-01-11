function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setUpStats() {
  stats = new Stats();
  stats.setMode(1);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  stats.begin();
}

function setUpControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 1.0;
  controls.panSpeed = 2.0;
  controls.target.set(0,0,0);
}

function compileShader(shaderSource, shaderType) {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('"' + shaderSource + '" failed to compile!');
        return undefined;
    }

    return shader;
}

function linkShaders(vs, fs) {
  let prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    return undefined;
  }
  return prog;
}

function loadShaders(shaders) {
  let ss = [];
  shaders.forEach((s) => {
    ss.push(Promise.all([$.get(`shaders/${s}.vert.glsl`), $.get(`shaders/${s}.frag.glsl`)]).then((results) => {
      let vs = results[0];
      let fs = results[1];
      vs = compileShader(vs, gl.VERTEX_SHADER);
      fs = compileShader(fs, gl.FRAGMENT_SHADER);
      return Promise.resolve(linkShaders(vs, fs));
    }));
  });
  console.log(ss);
  return ss;
}
