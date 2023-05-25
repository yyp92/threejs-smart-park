import * as THREE from "three";
import vertex from "@/shader/gradColor/vertex.glsl";
import fragment from "@/shader/gradColor/fragment.glsl";

export function gradColor(mesh) {
  // console.log(mesh);
  // 传递unfiorm变量

  mesh.material.onBeforeCompile = (shader) => {
    // console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    shader.fragmentShader = fragment;
    shader.vertexShader = vertex;
    shader.uniforms.uTopColor = {
      value: new THREE.Color("#ffeeff"),
    };
    shader.uniforms.uHeight = {
      value: 2,
    };
  };
}

export function addGradColor(mesh) {
  // console.log(mesh);
  // 传递unfiorm变量

  mesh.material.onBeforeCompile = (shader) => {
    console.log(shader.vertexShader);
    console.log(shader.fragmentShader);
    // shader.fragmentShader = fragment;
    // shader.vertexShader = vertex;
    shader.uniforms.uTopColor = {
      value: new THREE.Color("#ffeeff"),
    };
    shader.uniforms.uHeight = {
      value: 2,
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
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>
        // 目标的基础原色
        vec3 distColor = outgoingLight;
        // uTopColor渐变的色
      // 混合百分
      float indexMix = (vPosition.y+uHeight/2.0)/uHeight;
      // 混合颜色
      distColor = mix(distColor,uTopColor,indexMix);
        gl_FragColor = vec4(distColor,1);
      `
    );
  };
}
