import * as THREE from "three";

export default class MeshEdges {
  constructor(geometry) {
    this.geometry = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    this.mesh = new THREE.LineSegments(this.geometry, this.material);
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
