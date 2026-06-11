#version 300 es
#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif

in vec2 pos;
in vec2 texCoords;

out vec2 TexCoords;

void main() {
    gl_Position = vec4(pos, 0.0, 1.0);
    TexCoords = texCoords;
}