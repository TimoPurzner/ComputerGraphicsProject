precision highp float;
precision highp int;

#define NUM_GBUFFERS 5

/* https://stackoverflow.com/a/17557438
Variable Qualifiers

Qualifiers give a special meaning to the variable. The following qualifiers are available:

const – The declaration is of a compile time constant.
attribute – Global variables that may change per vertex, that are passed from the OpenGL application to vertex shaders. This qualifier can only be used in vertex shaders. For the shader this is a read-only variable. See Attribute section.
uniform – Global variables that may change per primitive [...], that are passed from the OpenGL application to the shaders. This qualifier can be used in both vertex and fragment shaders. For the shaders this is a read-only variable. See Uniform section.
varying – used for interpolated data between a vertex shader and a fragment shader. Available for writing in the vertex shader, and read-only in a fragment shader. See Varying section.
*/
varying vec4 v_gbufs[NUM_GBUFFERS];

varying vec2 v_uv;

void main() {
  // calculate
  // write to floatBitsToInt(genType v)

}
