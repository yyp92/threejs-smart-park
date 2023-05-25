varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
void main(){

    vec2 newUv = rotate2d(uTime*6.28)*(vUv-0.5);
    newUv = newUv + 0.5;


    // 画圆
    float distanceToCenter = distance(newUv,vec2(0.5));
    float strength = step(0.5,distanceToCenter);
    strength = 1.0 - strength;
    // 按照角度画渐变
    float angle = atan(newUv.x-0.5,newUv.y-0.5);
    // -PI 到 PI => 0 - 2*PI

    angle = angle + 3.14;
    angle = angle / 6.28;

    gl_FragColor = vec4(uColor,angle*strength);
}