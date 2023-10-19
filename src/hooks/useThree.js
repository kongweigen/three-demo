import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { coordinateList } from '@/utils'


export const useThree = () => {
  const dataDialogRef = ref()
  let scene, camera, renderer

  const init = () => {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    )
    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.shadowMap.enabled = true // 开启阴影
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 轨道控制器
    new OrbitControls(camera, renderer.domElement)
    box.appendChild(renderer.domElement)
    // 雾气
    scene.fog = new THREE.FogExp2('#879cba', 0.001);
  }
  const initHelper = () => {
    // 创建坐标轴对象 蓝色z轴 红色 x 绿色y
    const axes = new THREE.AxesHelper(100)
    //将坐标轴添加进场景
    scene.add(axes)
  }
  const initGroup = (path) => {
    // 创建一个平面作为地面
    const texture = new THREE.TextureLoader().load(path, () => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(15, 15);
    }); // 纹理加载器
    const geometry = new THREE.PlaneGeometry(3000, 3000);  //平面
    const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(geometry, material);

    // rotation 旋转欧拉角 Math.PI 就是 180 度
    ground.rotation.x = - Math.PI / 2; // 使地面水平放置
    ground.material.map.repeat.set(1, 1); // uv两个方向纹理重复数量
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.colorSpace = THREE.SRGBColorSpace;
    ground.receiveShadow = true; // 开启地面的阴影接收
    scene.add(ground);
  }
  const initEnv = (path) => {
    // 创建环境
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
      scene.environment = texture
    })
  }
  const initLight = () => {
    // 创建一个平行光作为光源
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-50, 1000, 200)
    light.castShadow = true // 开启光源的阴影投射
    scene.add(light)
  }
  const initCamera = () => {
    // 照相机位置
    camera.position.set(-220, 400, 380)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }
  const loaderHouse = (path) => {
    // 模型加载
    const loader = new GLTFLoader()
    loader.load(
      path,
      function (gltf) {
        const model = gltf.scene
        model.scale.set(0.02, 0.02, 0.02) // 设置为原始大小0.05
        coordinateList.forEach((t, index) => {
          let k = model.clone()
          k.traverse(c => {
            if (c.userData?.name == "building_texture_1_0") {
              c.userData.isHouse = true;
              // 为每个子网格设置 userData 属性
              c.userData.$id = index;
            }
          })
          k.position.set(t.x, 0, t.y)
          scene.add(k)
        })
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
  }
  const initRaycaster = () => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    function onPointerMove(event) {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera(pointer, camera);
      // 设置只返回第一个交叉点
      // raycaster.firstHitOnly = true;

      // 计算物体和射线的焦点
      const houseModels = []
      scene.children.forEach(k => {
        k.traverse(function (o) {
          if (o.userData?.isHouse) houseModels.push(o)
        });
      })
      // const houseModels = scene.children.filter(m => m.userData?.isHouse)
      const intersects = raycaster.intersectObjects(houseModels, true);
      // 只会去第一个焦点即可
      let object = intersects[0]?.object
      if (!object) return
      // 清理其他选中效果
      houseModels.forEach(o => {
        o.material.color = o.userData.color?.clone()
      })
      if (!object.userData.isChecked) {
        object.userData.isChecked = true
        object.material.opacity = 0.5

        object.material.color?.set(0xff0000);
        console.log(`你选中了厂房 ${object.userData.$id}`);
        dataDialogRef.value.show(object.userData.$id)
      } else {
        object.userData.isChecked = false
        console.log(`你取消了厂房 ${object.userData.$id}`);
      }
      event.stopPropagation();
    }
    window.addEventListener('mousedown', onPointerMove);
  }
  function loop() {
    requestAnimationFrame(loop)
    renderer.render(scene, camera)
  }
  onMounted(() => {
    init()
    initHelper()
    initGroup('/three-demo/group.jpg')
    initEnv('/three-demo/HdrSky.hdr')
    initLight()
    initCamera()
    loaderHouse('/three-demo/residential_building_with_parking_lot.glb')
    // 射线
    initRaycaster()

    loop()
  })


  return { dataDialogRef }
}

