function initWebGL(){
	console.info('Startet init WebGL2....')
	var canvas = document.getElementById("canvas");
	try {
		gl = canvas.getContext("webgl2");
		console.log('WebGL gestartet');
	} catch (e) {}
	if (!gl) {
		alert("Could not initialize WebGL");
		return;
	}

	//laden der shaders
	var vs=document.getElementById('standard-vs').innerHTML;
	var fs=document.getElementById('standard-fs').innerHTML;

	var program = initShader(gl, vs, fs);

	// Error handling
	if(program===undefined){
		console.error('Fehler in initWebGL: program ist undefined');
		return;
	}

	gl.useProgram(program);

	gl.drawArrays(gl.POINT,0,1);
}

function initShader(gl, source_vs, source_frag){

	//Speicher  holen
	var shader_vs = gl.createShader(gl.VERTEX_SHADER);
	var shader_frag = gl.createShader(gl.FRAGMENT_SHADER);

	//In den Speicher tun!
	gl.shaderSource(shader_vs, source_vs);
	gl.shaderSource(shader_frag, source_frag);

	gl.compileShader(shader_vs);
	gl.compileShader(shader_frag);


	//Error handling
	if(!gl.getShaderParameter(shader_vs, gl.COMPILE_STATUS)){
		console.error('Fehler im Vertex Shader: '+ gl.getShaderInfoLog(shader_vs))
	}
	if(!gl.getShaderParameter(shader_frag, gl.COMPILE_STATUS)){
		console.error('Fehler im Fragment Shader: '+ gl.getShaderInfoLog(shader_frag))
	}

	//Create shader program
	var program = gl.createProgram();
	gl.attachShader(program, shader_vs);
	gl.attachShader(program, shader_frag);

	//Link to program erstellen
	gl.linkProgram(program);
	//Error handling
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }else{
    	console.error(gl.getProgramInfoLog(program));
    	gl.deleteProgram(program);
    	return undefined;
    }
}
