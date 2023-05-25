varying float vSize;

uniform vec3 uColor;
void main(){
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = 1.0 - (distanceToCenter*2.0);
    
    gl_FragColor = vec4(1,0,0,strength);
    if(vSize<=0.0){
        gl_FragColor = vec4(1,0,0,0);
    }else{
        gl_FragColor = vec4(uColor,strength);
    }
}