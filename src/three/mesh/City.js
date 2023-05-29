import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import gsap from "gsap";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import eventHub from "@/utils/eventHub";
import cameraModule from "../camera";

export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    this.loader.setDRACOLoader(dracoLoader);
    this.loader.load("./model/city4.glb", (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);

      // 场景子元素遍历
      this.gltf = gltf;
      gltf.scene.traverse((child) => {
        if (child.name === "热气球") {
          // console.log(child);
          this.mixer = new THREE.AnimationMixer(child);
          this.clip = gltf.animations[1];
          this.action = this.mixer.clipAction(this.clip);
          this.action.play();
        }

        if (child.name === "汽车园区轨迹") {
          // console.log(child);
          const line = child;
          line.visible = false;
          // 根据点创建曲线
          const points = [];
          for (
            let i = line.geometry.attributes.position.count - 1;
            i >= 0;
            i--
          ) {
            points.push(
              new THREE.Vector3(
                line.geometry.attributes.position.getX(i),
                line.geometry.attributes.position.getY(i),
                line.geometry.attributes.position.getZ(i)
              )
            );
          }

          this.curve = new THREE.CatmullRomCurve3(points);
          this.curveProgress = 0;
          this.carAnimation();
        }

        if (child.name === "redcar") {
          console.log(child);
          this.redcar = child;
        }
      });

      gltf.cameras.forEach((camera) => {
        // scene.add(camera);
        cameraModule.add(camera.name, camera);
      });
    });

    eventHub.on("actionClick", (i) => {
      console.log(i);
      this.action.reset();
      this.clip = this.gltf.animations[i];
      this.action = this.mixer.clipAction(this.clip);
      this.action.play();
    });

    // 如何切换控制器聚焦位置和拉近视角
    // eventHub.on('focusDance', () => {
    //   this.womenPosition = this.women.position.clone()

    //   gsap.to(ControlsModule.controls.target, {
    //     x: this.womenPosition.x,
    //     y: this.womenPosition.y,
    //     z: this.womenPosition.z,
    //     duration: 1,
    //     onComplete: () => {
    //       gsap.to(cameraModule.activeCamera.position, {
    //         x: this.womenPosition.x + 3,
    //         y: this.womenPosition.y + 2,
    //         z: this.womenPosition.z + 1,
    //         duration: 2,
    //       })
    //     }
    //   })
    // })
  }

  update(time) {
    if (this.mixer) {
      this.mixer.update(time);
    }
  }

  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.999,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress);
        this.redcar.position.set(point.x, point.y, point.z);

        // 调整小汽车的方向，始终沿着曲线的切线方向
        if (this.curveProgress + 0.001 < 1) {
          const point = this.curve.getPoint(this.curveProgress + 0.001);
          this.redcar.lookAt(point);
        }
      },
    });
  }
}
