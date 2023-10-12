import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { generateQuadrantCollection, coordinateList } from '@/utils'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const useThree = () => {
  const dataDialogRef = ref()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.shadowMap.enabled = true // 开启阴影
  new OrbitControls(camera, renderer.domElement)
  renderer.setSize(window.innerWidth, window.innerHeight)

  onMounted(() => {
    box.appendChild(renderer.domElement)
    // 创建坐标轴对象 蓝色z轴 红色 x 绿色y
    const axes = new THREE.AxesHelper(5)
    //将坐标轴添加进场景
    scene.add(axes)

    // 创建几何体
    const boxGeometry = new THREE.BoxGeometry(250, 250, 250)
    const boxMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
    coordinateList.forEach((t, index) => {
      const cube = new THREE.Mesh(boxGeometry, boxMaterial)
      cube.userData.isHouse = true;
      // 为每个子网格设置 userData 属性
      cube.userData.$id = index;
      cube.userData.color = cube.material.color.clone()
      cube.material = cube.material.clone()

      cube.position.set(t.x, 125, t.y)
      scene.add(cube)
    })


    // 创建一个平面作为地面
    const texture = new THREE.TextureLoader().load('src/assets/group.jpg'); // 纹理加载器
    const geometry = new THREE.PlaneGeometry(1000, 1000);  //平面
    const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });

    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = - Math.PI / 2; // 使地面水平放置
    ground.material.map.repeat.set(1, 1); // uv两个方向纹理重复数量
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.colorSpace = THREE.SRGBColorSpace;
    ground.receiveShadow = true; // 开启地面的阴影接收
    scene.add(ground);



    // 创建一个平行光作为光源
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(500, 1000, 200)
    light.castShadow = true // 开启光源的阴影投射
    scene.add(light)

    // 照相机位置
    camera.position.set(250, 1000, 250)


    // 模型加载
    // const loader = new GLTFLoader()
    // loader.load(
    //   '/src/model/boston0220_keep07.glb',
    //   function (gltf) {
    //     const model = gltf.scene
    //     model.scale.set(0.05, 0.05, 0.05) // 设置为原始大小0.05
    //       ;[1, 2, 3].forEach((t) => {
    //         let k = model.clone()
    //         
    //         k.position.set(t * 2, 0, 0)
    //         scene.add(k)
    //       })
    //     loop()
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error)
    //   }
    // )



    // 射线
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
      const houseModels = scene.children.filter(m => m.userData?.isHouse)
      const intersects = raycaster.intersectObjects(houseModels, true);
      // 只会去第一个焦点即可
      let object = intersects[0]?.object
      if (!object) return
      // 清理其他选中效果
      houseModels.forEach(k => {
        k.traverse(function (o) {
          if (o.isMesh) {
            o.material.color = o.userData.color.clone()
          }
        });
      })
      if (!object.userData.isChecked) {
        object.userData.isChecked = true
        object.material.color.set(0xff0000);
        console.log(`你选中了厂房 ${object.userData.$id}`);
        dataDialogRef.value.show(object.userData.$id)
      } else {
        object.userData.isChecked = false
        console.log(`你取消了厂房 ${object.userData.$id}`);
      }
      event.stopPropagation();
    }
    window.addEventListener('mousedown', onPointerMove);
    function loop() {


      requestAnimationFrame(loop)
      renderer.render(scene, camera)
    }
    loop()
  })


  return { dataDialogRef }
}

