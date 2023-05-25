import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/lightRadar/vertex.glsl";
import fragment from "@/shader/lightRadar/fragment.glsl";

export default class LightRadar {
  constructor(radius = 2, position = { x: 8, z: 8 }, color = "#ffff00") {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: {
          value: 0,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(position.x, 1, position.z);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.scale.set(radius, radius);

    // gsap.to(this.material.uniforms.uTime, {
    //   value: -1,
    //   duration: 1,
    //   ease: "none",
    //   repeat: -1,
    // });

    gsap.to(this.mesh.rotation, {
      z: -Math.PI * 2,
      ease: "none",
      repeat: -1,
      duration: 1,
    });
  }

  remove(scene) {
    // 移除物体
    this.mesh.removeFromParent();
    // 移除材质
    this.material.dispose();
    // 移除几何体
    this.geometry.dispose();
  }
}
