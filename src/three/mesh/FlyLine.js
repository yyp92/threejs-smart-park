import * as THREE from "three";
import gsap from "gsap";

export default class FlyLine {
  constructor(lineArray, imgUrl, lineWidth = 0.2) {
    // 创建纹理加载器
    const textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load(imgUrl);
    // 调整纹理为单面的宽度
    this.texture.repeat = new THREE.Vector2(1, 2);

    // console.log(texture);

    this.texture.wrapS = THREE.RepeatWrapping;
    // 设置纹理为镜像重复
    // texture.wrapT = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;

    // 创建管道几何体
    // 1-创建曲线几何体
    this.lineCurve = new THREE.CatmullRomCurve3(lineArray);

    // 2-根据曲线获取曲线上的点
    // const linePoints = lineCurve.getPoints(100);

    // 3-根据点生成几何体
    this.geometry = new THREE.TubeBufferGeometry(
      this.lineCurve,
      100,
      lineWidth,
      2,
      false
    );

    // 飞线材质设置
    this.material = new THREE.MeshBasicMaterial({
      // color: 0xfff000,
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    gsap.to(this.texture.offset, {
      x: -1,
      duration: 1,
      repeat: -1,
      ease: "none",
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
