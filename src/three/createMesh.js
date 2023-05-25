import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "./scene";
import gsap from "gsap";
import City from "./mesh/City";
let city;
export default function createMesh() {
  // 创建城市
  city = new City(scene);
}

export function updateMesh(time) {
  city.update(time);
}
