import * as THREE from "three";
import cameraModule from "./camera";
import renderer from "./renderer";
import controlsModule from "./controls";
import scene from "./scene";
import { updateMesh } from "@/three/createMesh";

const clock = new THREE.Clock();
function animate(t) {
  const time = clock.getDelta();
  controlsModule.controls.update(time);
  updateMesh(time);
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, cameraModule.activeCamera);
}

export default animate;
