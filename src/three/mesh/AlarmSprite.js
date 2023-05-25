import * as THREE from "three";
import gsap from "gsap";
import camera from "../camera";

export default class AlarmSprite {
  constructor(type = "火警", position = { x: -1.8, z: 3 }) {
    const textureLoader = new THREE.TextureLoader();
    const typeObj = {
      火警: "./textures/tag/fire.png",
      治安: "./textures/tag/jingcha.png",
      电力: "./textures/tag/e.png",
    };
    const map = textureLoader.load(typeObj[type]);
    this.material = new THREE.SpriteMaterial({
      map: map,
    });
    this.mesh = new THREE.Sprite(this.material);

    // 精灵材质
    // 设置位置
    this.mesh.position.set(position.x, 3.5, position.z);

    gsap.to(this.mesh.position, {
      y: 3.8,
      duration: 0.5,
      ease: "none",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(this.mesh.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.5,
      ease: "none",
      yoyo: true,
      repeat: -1,
    });

    this.mouse = new THREE.Vector2();

    this.raycaster = new THREE.Raycaster();

    // 设置1个数组，存储当前物体的点击函数
    this.fns = [];

    // 事件监听
    window.addEventListener("click", (event) => {
      //   console.log(event);
      //   对时间对象进行加工
      event.mesh = this;
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

      //通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.mouse, camera);

      //进行检测
      const intersects = this.raycaster.intersectObject(this.mesh);
      //   console.log(intersects);
      if (intersects.length > 0) {
        //   真正触发精灵的点击事件
        this.fns.forEach((fn) => {
          fn.call(this, event);
        });
      }
    });
  }
  onclick(fn) {
    this.fns.push(fn);
  }
  clearEvents() {
    this.fns = [];
  }
  removeClick(fn) {
    this.fns.forEach((item, i) => {
      if (item == fn) {
        this.fns.splice(i, 1);
      }
    });
  }
  remove(scene) {
    // 移除物体
    this.mesh.removeFromParent();
    // 移除材质
    this.material.dispose();
  }
}
