varying vec3 vPosition;
uniform vec3 uColor;
uniform float uHeight;


void main(){

   float strength = (vPosition.y+uHeight/2.0)/uHeight;

    gl_FragColor = vec4(uColor,1.0 - strength);
}