import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/flyLine/vertex.glsl";
import fragment from "@/shader/flyLine/fragment.glsl";

export default class FlyLineShader {
  constructor(lineArray, color = 0x00ff00, lineWidth = 0.2) {
    // 曲线获取点
    this.lineCurve = new THREE.CatmullRomCurve3(lineArray);
    const points = this.lineCurve.getPoints(1000);
    // console.log(points);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    const aSizeArr = new Float32Array(points.length);
    for (let i = 0; i < aSizeArr.length; i++) {
      aSizeArr[i] = i;
    }
    // 设置每个点初始化的大小
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(aSizeArr, 1));
    // 设置着色器材质
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uLength: {
          value: points.length,
        },
        uColor: {
          value: new THREE.Color(color),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    // 创建由点构成的线
    this.mesh = new THREE.Points(this.geometry, this.material);

    // 设置动画
    gsap.to(this.material.uniforms.uTime, {
      value: 1000,
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
