import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/lightWall/vertex.glsl";
import fragment from "@/shader/lightWall/fragment.glsl";

export default class LightWall {
  constructor(
    radius = 5,
    length = 2,
    position = { x: 0, z: 0 },
    color = 0x00ff00
  ) {
    this.geometry = new THREE.CylinderBufferGeometry(
      radius,
      radius,
      2,
      32,
      1,
      true
    );
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(position.x, 1, position.z);
    // 必须先调用计算函数
    this.mesh.geometry.computeBoundingBox();

    // 从上到下的高度获取
    let { min, max } = this.mesh.geometry.boundingBox;

    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    };

    this.material.uniforms.uColor = {
      value: new THREE.Color(color),
    };

    this.material.uniforms.uTime = {
      value: 0,
    };

    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 1,
      ease: "none",
      repeat: -1,
      yoyo: true,
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
