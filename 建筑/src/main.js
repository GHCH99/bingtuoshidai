import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 场景设置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置相机位置
camera.position.set(20, 20, 20);
camera.lookAt(0, 0, 0);

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 添加地面
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 建筑物参数
const buildingConfig = {
  maxFloors: 15,
  minFloors: 5,
  floorHeight: 1,
  maxWidth: 8,
  minWidth: 4,
  buildingDelay: 300,
  spacing: 12
};

// 存储建筑物的各个部分
const buildingParts = [];

// 创建八角形塔楼
function createOctagonTower(x, z, floors) {
  const group = new THREE.Group();
  const radius = buildingConfig.minWidth;
  const height = buildingConfig.floorHeight;
  
  for (let i = 0; i < floors; i++) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0
    });
    const floor = new THREE.Mesh(geometry, material);
    floor.position.y = i * height;
    group.add(floor);
  }
  
  group.position.set(x, 0, z);
  scene.add(group);
  return group;
}

// 创建三角形平台
function createTriangularPlatform(x, z, size) {
  const geometry = new THREE.CylinderGeometry(size, size, buildingConfig.floorHeight, 3);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0
  });
  const platform = new THREE.Mesh(geometry, material);
  platform.position.set(x, 0, z);
  scene.add(platform);
  return platform;
}

// 创建尖塔
function createSpire(x, z, height) {
  const geometry = new THREE.ConeGeometry(buildingConfig.minWidth / 2, height, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0
  });
  const spire = new THREE.Mesh(geometry, material);
  spire.position.set(x, height / 2, z);
  scene.add(spire);
  return spire;
}

// 创建GLTF加载器
const loader = new GLTFLoader();

// 加载自定义建筑模型
function loadCustomBuilding(x, z, scale = 1) {
  return new Promise((resolve) => {
    loader.load(
      'models/custom_building.gltf', // 模型路径
      (gltf) => {
        const model = gltf.scene;
        model.position.set(x, 0, z);
        model.scale.set(scale, scale, scale);
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });
        scene.add(model);
        resolve(model);
      }
    );
  });
}

// 修改生成建筑群函数为异步函数
async function generateCityscape() {
  const positions = [
    { x: -buildingConfig.spacing, z: -buildingConfig.spacing },
    { x: 0, z: -buildingConfig.spacing },
    { x: buildingConfig.spacing, z: -buildingConfig.spacing },
    { x: -buildingConfig.spacing, z: 0 },
    { x: 0, z: 0 },
    { x: buildingConfig.spacing, z: 0 },
    { x: -buildingConfig.spacing, z: buildingConfig.spacing },
    { x: 0, z: buildingConfig.spacing },
    { x: buildingConfig.spacing, z: buildingConfig.spacing }
  ];

  // 创建所有建筑物
  for (const pos of positions) {
    const buildingType = Math.floor(Math.random() * 4); // 增加一种类型
    const floors = Math.floor(Math.random() * (buildingConfig.maxFloors - buildingConfig.minFloors)) + buildingConfig.minFloors;
    
    let building;
    switch (buildingType) {
      case 0:
        building = createOctagonTower(pos.x, pos.z, floors);
        break;
      case 1:
        building = createTriangularPlatform(pos.x, pos.z, buildingConfig.maxWidth / 2);
        break;
      case 2:
        building = createSpire(pos.x, pos.z, floors * buildingConfig.floorHeight);
        break;
      case 3:
        building = await loadCustomBuilding(pos.x, pos.z, 0.5);
        break;
    }
    
    buildingParts.push(building);
  }

  // 统一执行所有建筑物的动画
  const startTime = Date.now();
  function animateAllBuildings() {
    const progress = (Date.now() - startTime) / buildingConfig.buildingDelay;
    if (progress < 1) {
      buildingParts.forEach(building => {
        // 设置生长动画
        if (building.children?.length > 0) {
          building.children.forEach((child, index) => {
            child.material.opacity = progress;
            child.scale.y = progress;
            const originalY = index * buildingConfig.floorHeight;
            child.position.y = originalY * progress; // 正确计算每层的位置
          });
        } else {
          building.material.opacity = progress;
          building.scale.y = progress;
          if (building.geometry.type === 'ConeGeometry') {
            building.position.y = (building.position.y / progress) * progress; // 调整尖塔位置
          }
        }
      });
      requestAnimationFrame(animateAllBuildings);
    } else {
      buildingParts.forEach(building => {
        if (building.children?.length > 0) {
          building.children.forEach(child => {
            child.material.opacity = 1;
            child.scale.y = 1;
          });
        } else {
          building.material.opacity = 1;
          building.scale.y = 1;
        }
      });
    }
  }
  animateAllBuildings();
}

// 窗口大小调整处理
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  
  // 整个场景旋转
  scene.rotation.y += 0.0005; // 慢速旋转整个场景
  
  renderer.render(scene, camera);
}

// 启动动画
animate();
generateCityscape();