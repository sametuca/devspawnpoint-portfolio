import { useGLTF } from '@react-three/drei'

// Preload all GLTF models for faster loading
// This runs in parallel before components mount

const modelPaths = [
    // High priority - visible immediately
    '/models/xiaomi_4k_27_monitor/scene.gltf',
    '/models/gamingChair/scene.gltf',
    '/models/macbook/scene.gltf',

    // Medium priority - room elements
    '/models/window/scene.gltf',
    '/models/lamp/scene.gltf',
    '/models/armchair/scene.gltf',

    // Lower priority - accessories
    '/models/cp-keyboard/scene.gltf',
    '/models/cp-mouse/scene.gltf',
    '/models/glasses/scene.gltf',
    '/models/playstation_5/scene.gltf',
    '/models/steamController/scene.gltf',
    '/models/cheetos/scene.gltf',

    // Decorative elements
    '/models/xmas-tree/scene.gltf',
    '/models/christimas/scene.gltf',
    '/models/donalduck/scene.gltf',
    '/models/google/scene.gltf',
    '/models/speaker/scene.gltf',
    '/models/server/scene.gltf',
    '/models/vacuum-robot/scene.gltf',
    '/models/xiaomi_scooter/scene.gltf',
    '/models/dambil/scene.gltf',
]

// Preload all models
modelPaths.forEach((path) => {
    useGLTF.preload(path)
})

export { modelPaths }
