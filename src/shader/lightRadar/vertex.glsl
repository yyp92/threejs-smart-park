
varying vec2 vUv;
void main(){
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1);
    gl_Position = projectionMatrix *  viewPosition;
    vUv = uv;
    
}