#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos; // Pixel pos from vertex shader

uniform sampler2D dither; // blue noise texture
uniform vec2 dither_res; // blue noise texture res

// Uniforms set by filterShader
uniform sampler2D filter_background; // contains the image being filtered
uniform vec2 filter_res; // contains the image resolution in pixels

// rgb2hsv and hsv2rgb for converting between colour modes
// these functions are from:
// https://gist.github.com/983/e170a24ae8eba2cd174f
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {  
  // get colour from background for pixel
  vec3 col = texture2D(filter_background, pos).rgb;
  // calculate brightness by converting to hsv
  vec3 hsv = rgb2hsv(col);
  float brightness = hsv.z; // brightness stored in z
  hsv.z = 1.0; // set brightness to full since the dither will darken it for us
  col = hsv2rgb(hsv); // convert back to rgb
  
  // figure out the position in the dither texture
  // using mod() makes the texture repeat
  // the dither_scale can zoom in/out of the dither texture
  float dither_scale = 0.8;
  vec2 dither_pos = dither_scale * mod(pos * filter_res, dither_res)/dither_res;
  
  // check if the pixel brightness is greater than dither texture at this location
  float dither_brightness = texture2D(dither, dither_pos).r;
  float dither = step(dither_brightness, brightness);
  
  // if the image brightness is below the dither brightness, it will be black
  // otherwise we'll use the original colour
  col = col * dither;
  
  // output the colour to the screen
  gl_FragColor = vec4(col, 1.);
}

