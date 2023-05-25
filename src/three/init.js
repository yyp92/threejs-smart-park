import cameraModule from "./camera";
import renderer from "./renderer";

// 更新摄像头
cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
cameraModule.activeCamera.updateProjectionMatrix();

// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", () => {
  //   console.log("resize");
  // 更新摄像头
  cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  cameraModule.activeCamera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});
