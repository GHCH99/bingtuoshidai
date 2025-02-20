import * as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 设置相机位置
camera.position.z = 50;

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// 鼠标位置
const mouse = new THREE.Vector2();
let mouseX = 0;
let mouseY = 0;

// 粒子系统类
class FireworkParticle {
  constructor(position) {
    this.particles = [];
    this.particleCount = 500; // 增加到500个粒子
    this.colors = [
      0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
      0xffa500, 0x800080, 0xffd700, 0x32cd32, 0x4169e1, 0xff1493,
      0x00ff7f, 0x9400d3, 0xff4500, 0x7fffd4 // 增加更多颜色
    ];
    this.createParticles(position);
  }

  createParticles(position) {
    const geometry = new THREE.SphereGeometry(0.15); // 增大粒子尺寸
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.8, // 增强发光强度
      shininess: 100 // 增加光泽度
    });

    for (let i = 0; i < this.particleCount; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.copy(position);
      
      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 1.5, // 降低速度范围
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5
      );
      particle.velocity.multiplyScalar(0.8); // 降低速度系数
      
      particle.life = 4.0; // 进一步延长生命周期
      particle.originalScale = particle.scale.x;
      
      this.particles.push(particle);
      scene.add(particle);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // 更新位置
      particle.position.add(particle.velocity);
      particle.velocity.y -= 0.02; // 降低重力影响
      
      // 更新生命周期
      particle.life -= 0.005; // 进一步降低生命衰减速度
      particle.scale.setScalar(particle.originalScale * particle.life);
      
      // 移除死亡粒子
      if (particle.life <= 0) {
        scene.remove(particle);
        this.particles.splice(i, 1);
      }
    }
  }
}

// 存储所有烟花
const fireworks = [];

// 自动生成烟花的函数
function createRandomFirework() {
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 100,  // x范围：-50到50
    (Math.random() - 0.5) * 100,  // y范围：-50到50
    (Math.random() - 0.5) * 100   // z范围：-50到50
  );
  fireworks.push(new FireworkParticle(position));
}

// 移除鼠标事件相关代码

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 文字烟花类
class TextFirework {
  constructor() {
    this.particles = [];
    this.particleCount = 500; // 增加粒子数量
    this.color = 0xffd700; // 金色
    this.createTextParticles();
  }

  createTextParticles() {
    const characters = ['上', '岸'];
    const geometry = new THREE.SphereGeometry(0.3); // 增大粒子尺寸
    const material = new THREE.MeshPhongMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 1.5, // 增强发光强度
      shininess: 100
    });

    characters.forEach((char, charIndex) => {
      const startX = charIndex * 20 - 10; // 增大字符间距
      const points = this.getCharacterPoints(char);
      
      for (let i = 0; i < this.particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material);
        const point = points[Math.floor(Math.random() * points.length)];
        
        particle.position.set(
          startX + point.x * 15, // 增大字体大小
          point.y * 15 + 10, // 向上移动文字位置
          0
        );
        
        particle.initialPosition = particle.position.clone();
        particle.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        );
        
        particle.life = 4.0;
        particle.originalScale = particle.scale.x;
        
        this.particles.push(particle);
        scene.add(particle);
      }
    });
  }

  getCharacterPoints(char) {
    // 简化的汉字点阵
    const points = [];
    if (char === '上') {
      // 横
      for (let x = -0.5; x <= 0.5; x += 0.1) {
        points.push({x: x, y: 0});
      }
      // 竖
      for (let y = -0.5; y <= 0.5; y += 0.1) {
        points.push({x: 0, y: y});
      }
    } else if (char === '岸') {
      // 左边
      for (let y = -0.5; y <= 0.5; y += 0.1) {
        points.push({x: -0.3, y: y});
      }
      // 右边
      for (let y = -0.5; y <= 0.5; y += 0.1) {
        points.push({x: 0.3, y: y});
      }
      // 中间横
      for (let x = -0.3; x <= 0.3; x += 0.1) {
        points.push({x: x, y: 0});
      }
    }
    return points;
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      particle.position.add(particle.velocity);
      particle.velocity.multiplyScalar(0.98); // 缓慢减速
      
      // 向初始位置回归
      const toInitial = particle.initialPosition.clone().sub(particle.position);
      toInitial.multiplyScalar(0.02);
      particle.position.add(toInitial);
      
      particle.life -= 0.001;
      particle.scale.setScalar(particle.originalScale * (0.5 + Math.sin(Date.now() * 0.002) * 0.5));
    }
  }
}

// 创建文字烟花
const textFirework = new TextFirework();

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  
  if (Math.random() > 0.85) {
    createRandomFirework();
  }
  
  // 更新文字烟花
  textFirework.update();
  
  // 更新所有烟花
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    if (fireworks[i].particles.length === 0) {
      fireworks.splice(i, 1);
    }
  }
  
  scene.rotation.y += 0.001;
  scene.rotation.x += 0.0005;
  
  renderer.render(scene, camera);
}

animate();