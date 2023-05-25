attribute float aSize; 
varying float vSize;

uniform float uTime;
uniform float uLength;

void main(){
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1);
    gl_Position = projectionMatrix *  viewPosition;

    // vSize =5.0 - (aSize*0.01+uTime-5.0)*3.0;
    // vSize = aSize-100.0-uTime;
    // if(vSize<0.0){
    //     vSize=uLength+vSize;
    // }
    
    // vSize = (vSize-500.0)*0.1;


    vSize = aSize;
    vSize = vSize - uTime;
    if(vSize<=0.0){
        vSize = vSize + uLength; 
    }
    vSize =  (vSize-700.0)*0.3;
    gl_PointSize = - vSize/viewPosition.z;
    
    // gl_PointSize = 0.0;

    
    // gl_PointSize = -vSize*10.0/viewPosition.z;
}