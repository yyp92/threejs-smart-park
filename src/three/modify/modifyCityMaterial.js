import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/gradColor/vertex.glsl";
import fragment from "@/shader/gradColor/fragment.glsl";

export default function modifyCityMaterial(mesh) {
  mesh.material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
          #include <dithering_fragment>
          // #end#
          `
    );

    addGradColor(shader, mesh);
    // addSpread(shader);
    addLightLine(shader);
    addToTopLine(shader);
  };
}

export function addGradColor(shader, mesh) {
  // console.log(mesh);
  // 传递unfiorm变量
  mesh.geometry.computeBoundingBox();
  let { min, max } = mesh.geometry.boundingBox;
  console.log(min, max);
  let uHeight = max.y - min.y;
  //   console.log(shader.vertexShader);
  //   console.log(shader.fragmentShader);
  // shader.fragmentShader = fragment;
  // shader.vertexShader = vertex;
  shader.uniforms.uTopColor = {
    value: new THREE.Color("#ffeeff"),
  };
  shader.uniforms.uHeight = {
    value: uHeight,
  };
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `#include <common>

      varying vec3 vPosition;`
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
      #include <begin_vertex>
      vPosition = position;
      `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>

      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;
      `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
        // 目标的基础原色
        vec3 distColor = outgoingLight;
        // uTopColor渐变的色
      // 混合百分
      float indexMix = (vPosition.y+uHeight/2.0)/uHeight;
      // 混合颜色
      distColor = mix(distColor,uTopColor,indexMix);
        gl_FragColor = vec4(distColor,1);
        // #end#
      `
  );
}

export function addSpread(shader, center = new THREE.Vector2(200, 300)) {
  shader.uniforms.uSpreadCenter = {
    value: center,
  };
  shader.uniforms.uSpreadWidth = {
    value: 200,
  };
  shader.uniforms.uSpreadTime = {
    value: 0,
  };
  // 将uniform添加至片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform vec2 uSpreadCenter;
    uniform float uSpreadWidth;
    uniform float uSpreadTime;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    float spreadRadius = distance(vPosition.xz,uSpreadCenter);

    float spreadIndex = -((spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime))+uSpreadWidth;

    if(spreadIndex>0.0){
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }

    // #end#
    `
  );

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 2000,
    duration: 3,
    ease: "none",
    repeat: -1,
  });
}

export function addLightLine(shader) {
  shader.uniforms.uLightLineWidth = {
    value: 200,
  };
  shader.uniforms.uLightLineTime = {
    value: -2000,
  };
  // 将uniform添加至片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLightLineWidth;
    uniform float uLightLineTime;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    

    float LightLineIndex = -((vPosition.x+3.0*vPosition.z-uLightLineTime)*(vPosition.x+3.0*vPosition.z-uLightLineTime))+uLightLineWidth;

    if(LightLineIndex>0.0){
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),LightLineIndex/uLightLineWidth);
    }
    
    // #end#
    `
  );

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 2000,
    duration: 3,
    ease: "none",
    repeat: -1,
  });
}

export function addToTopLine(shader) {
  shader.uniforms.uToTopLineWidth = {
    value: 40,
  };
  shader.uniforms.uToTopLineTime = {
    value: -100,
  };
  // 将uniform添加至片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uToTopLineWidth;
    uniform float uToTopLineTime;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    

    float ToTopLineIndex = -((vPosition.y-uToTopLineTime)*(vPosition.y-uToTopLineTime))+uToTopLineWidth;

    if(ToTopLineIndex>0.0){
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),ToTopLineIndex/uToTopLineWidth);
    }
    
    // #end#
    `
  );

  gsap.to(shader.uniforms.uToTopLineTime, {
    value: 200,
    duration: 3,
    ease: "none",
    repeat: -1,
  });
}
