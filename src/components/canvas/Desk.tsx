import { useGLTF, Text, Image } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'
import { useMemo, useState } from 'react'
import { useOverlay } from '../../context/OverlayContext'

// MacBook component with Gemini app
function MacBook({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
    const { scene } = useGLTF('/models/macbook/scene.gltf')
    const { setOverlay } = useOverlay()
    const [hovered, setHovered] = useState(false)

    return (
        <group position={position} rotation={rotation}>
            <primitive object={scene.clone()} scale={scale} />
            {/* Gemini App Icon on Screen - positioned on MacBook screen */}
            <group
                position={[0, 0.26, -0.37]}
                rotation={[-0.3, 0, 0]}
                onClick={(e) => { e.stopPropagation(); setOverlay('terminal'); }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Invisible clickable area */}
                <mesh>
                    <planeGeometry args={[0.15, 0.15]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
                {/* Gemini Logo Image */}
                <Image
                    url="/textures/logos/geminilogo.png"
                    scale={hovered ? 0.12 : 0.1}
                    position={[0, 0.03, 0.001]}
                    transparent
                />
                {/* Label */}
                <Text
                    position={[0, -0.04, 0.001]}
                    fontSize={0.02}
                    color="#ffffff"
                    anchorX="center"
                >
                    Gemini
                </Text>
            </group>
        </group>
    )
}

// Desktop Icon Component for Xiaomi Monitor
const XiaomiDesktopIcon = ({
    position,
    iconUrl,
    label,
    onClick
}: {
    position: [number, number, number],
    iconUrl: string,
    label: string,
    onClick: () => void
}) => {
    const [hovered, setHover] = useState(false)

    return (
        <group
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick() }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {hovered && (
                <mesh position={[0, 0, -0.001]}>
                    <planeGeometry args={[0.2, 0.25]} />
                    <meshBasicMaterial color="#4488ff" transparent opacity={0.3} />
                </mesh>
            )}
            <Image url={iconUrl} scale={0.12} position={[0, 0.04, 0]} transparent />
            <Text
                fontSize={0.03}
                color="white"
                position={[0, -0.06, 0]}
                anchorX="center"
                outlineWidth={0.002}
                outlineColor="#000"
            >
                {label}
            </Text>
        </group>
    )
}

// Xiaomi 4K Monitor component
function XiaomiMonitor({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
    const { scene } = useGLTF('/models/xiaomi_4k_27_monitor/scene.gltf')
    const { setOverlay } = useOverlay()

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={scene.clone()} scale={3.015} position={[0, 0.3, 0]} />
            {/* Screen Content - Desktop Icons */}
            <group position={[0, 0.3, 0.08]}>
                <XiaomiDesktopIcon
                    position={[-0.5, 0.15, 0]}
                    iconUrl="/textures/logos/githublogo.png"
                    label="GitHub"
                    onClick={() => window.open('https://github.com/sametuca', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[-0.15, 0.15, 0]}
                    iconUrl="/textures/logos/mediumlogo.png"
                    label="Medium"
                    onClick={() => window.open('https://medium.com/@sametuca', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[0.2, 0.15, 0]}
                    iconUrl="/textures/logos/certificatelogo.png"
                    label="Certificate"
                    onClick={() => setOverlay('certificates')}
                />
                <XiaomiDesktopIcon
                    position={[0.55, 0.15, 0]}
                    iconUrl="/textures/logos/contactlogo.png"
                    label="About"
                    onClick={() => setOverlay('contact')}
                />
            </group>
        </group>
    )
}

// Xiaomi Code Monitor component - for tech stack icons
function XiaomiCodeMonitor({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
    const { scene } = useGLTF('/models/xiaomi_4k_27_monitor/scene.gltf')

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={scene.clone()} scale={3.015} position={[0, 0.3, 0]} />
            {/* Screen Content - Tech Stack Icons */}
            <group position={[0, 0.3, 0.08]}>
                <XiaomiDesktopIcon
                    position={[-0.6, 0.2, 0]}
                    iconUrl="/textures/logos/reactlogo.webp"
                    label="React"
                    onClick={() => window.open('https://react.dev', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[-0.25, 0.2, 0]}
                    iconUrl="/textures/logos/typescriptlogo.png"
                    label="TypeScript"
                    onClick={() => window.open('https://typescriptlang.org', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[0.1, 0.2, 0]}
                    iconUrl="/textures/logos/nodejslogo.png"
                    label="Node.js"
                    onClick={() => window.open('https://nodejs.org', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[0.45, 0.2, 0]}
                    iconUrl="/textures/logos/threejslogo.png"
                    label="Three.js"
                    onClick={() => window.open('https://threejs.org', '_blank')}
                />
                <XiaomiDesktopIcon
                    position={[-0.6, -0.1, 0]}
                    iconUrl="/textures/logos/nextjslogo.webp"
                    label="Next.js"
                    onClick={() => window.open('https://nextjs.org', '_blank')}
                />
            </group>
        </group>
    )
}

export const Desk = () => {

    // Load 3D cup model
    const cupObj = useLoader(OBJLoader, '/models/cup.obj')

    // Load Donald Duck model
    const { scene: donaldDuck } = useGLTF('/models/donalduck/donaldduck.gltf')

    const [waterSpilling, setWaterSpilling] = useState(false)
    const [waterDrops, setWaterDrops] = useState<Array<{ id: number, y: number, x: number, z: number, speed: number }>>([])
    const [santaFlying, setSantaFlying] = useState(false)
    const [santaPosition, setSantaPosition] = useState(-4)

    const { scene: santaModel } = useGLTF('/models/christimas/scene.gltf')
    const { scene: xmasTreeModel } = useGLTF('/models/xmas-tree/scene.gltf')
    const { scene: steamController } = useGLTF('/models/steamController/scene.gltf')
    const { scene: gamingChair } = useGLTF('/models/gamingChair/scene.gltf')
    const { scene: mouseModel } = useGLTF('/models/cp-mouse/scene.gltf')
    const { scene: keyboardModel } = useGLTF('/models/cp-keyboard/scene.gltf')
    const { scene: glassesModel } = useGLTF('/models/glasses/scene.gltf')



    // Clone and apply material for cup
    const cupModel = useMemo(() => {
        const cloned = cupObj.clone()
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: '#e74c3c',
                    roughness: 0.3,
                    metalness: 0.1
                })
            }
        })
        return cloned
    }, [cupObj])

    const handleCupClick = () => {
        if (waterSpilling) return
        setWaterSpilling(true)
        const drops = Array.from({ length: 150 }, (_, i) => ({
            id: Date.now() + i,
            y: 0.85,
            x: -0.8 + (Math.random() - 0.5) * 0.15,
            z: 0.4 + (Math.random() - 0.5) * 0.15,
            speed: 0.015 + Math.random() * 0.025
        }))
        setWaterDrops(drops)
        setTimeout(() => {
            setWaterSpilling(false)
            setWaterDrops([])
        }, 4000)
    }

    useFrame(() => {
        if (waterDrops.length > 0) {
            setWaterDrops(prev => prev.map(drop => ({
                ...drop,
                y: drop.y - drop.speed
            })).filter(drop => drop.y > 0.7))
        }
        if (santaFlying) {
            setSantaPosition(prev => {
                if (prev > 4) {
                    setSantaFlying(false)
                    return -4
                }
                return prev + 0.05
            })
        }
    })

    return (
        <group position={[0, 0, 0]}>
            {/* Main Desk Top */}
            <mesh position={[0, 0.7, 0]} receiveShadow castShadow>
                <boxGeometry args={[4, 0.1, 1.5]} />
                <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>

            {/* Gaming Chair */}
            <primitive object={gamingChair} position={[0, 0, 1.5]} scale={0.6} rotation={[0, -Math.PI / 1.1, 0]} />

            {/* Side Desk (L-part) */}
            <mesh position={[1.5, 0.7, 1.25]} receiveShadow castShadow>
                <boxGeometry args={[1, 0.1, 2.5]} />
                <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>

            {/* Legs */}
            <mesh position={[-1.8, 0.35, 0.6]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color="#111" metalness={0.8} />
            </mesh>
            <mesh position={[1.8, 0.35, 0.6]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color="#111" metalness={0.8} />
            </mesh>
            <mesh position={[1.8, 0.35, 2.3]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color="#111" metalness={0.8} />
            </mesh>
            <mesh position={[-1.8, 0.35, -0.6]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color="#111" metalness={0.8} />
            </mesh>

            {/* Monitors */}
            <XiaomiCodeMonitor position={[0, 1.25, 0]} rotation={[0, 0, 0]} scale={0.8} />
            {/* MacBook with Gemini App */}
            <MacBook
                position={[-1.6, 0.79, 0.2]}
                rotation={[0, 0.3, 0]}
                scale={2.5} />
            <XiaomiMonitor
                position={[1.5, 1.25, 0.2]}
                rotation={[0, -0.3, 0]}
                scale={0.8}
            />

            {/* PC Tower */}
            <mesh position={[1.5, 0.3, 0.6]} castShadow>
                <boxGeometry args={[0.3, 0.6, 0.6]} />
                <meshStandardMaterial color="#000" metalness={0.6} roughness={0.2} />
            </mesh>
            <pointLight position={[1.5, 0.4, 0.6]} color="#00ffff" intensity={2} distance={1} />

            {/* ===== DESK ACCESSORIES ===== */}

            {/* Large Desk Mat / Mousepad (Light Gray) */}
            <mesh position={[0.15, 0.755, 0.5]}>
                <boxGeometry args={[0.9, 0.006, 0.35]} />
                <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
            </mesh>

            {/* 3D Keyboard Model */}
            <primitive
                object={keyboardModel.clone()}
                position={[-0.2, 0.68, 0.45]}
                scale={0.0008}
                rotation={[0, 0, 0]}
            />

            {/* 3D Mouse Model */}
            <primitive object={mouseModel.clone()} position={[0.55, 0.76, 0.5]}
                scale={0.025} rotation={[0, -0, 0]} />


            {/* Glasses Model */}
            <primitive object={glassesModel.clone()} position={[1.75, 0.76, 0.5]}
                scale={2.0} rotation={[0, 0.3, 0]} />

            {/* 3D Coffee Cup Model */}
            <group onClick={(e) => { e.stopPropagation(); handleCupClick() }}>
                <primitive
                    object={cupModel}
                    position={[-0.8, 0.75, 0.4]}
                    scale={0.08}
                    rotation={[0, 0.5, 0]}
                />
                {/* Water Drops */}
                {waterDrops.map(drop => (
                    <mesh key={drop.id} position={[drop.x, drop.y, drop.z]}>
                        <sphereGeometry args={[0.025, 8, 8]} />
                        <meshStandardMaterial color="#4fc3f7" transparent opacity={0.9} emissive="#4fc3f7" emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </group>

            {/* Donald Duck Figure */}
            <primitive
                object={donaldDuck.clone()}
                position={[1.8, 0.75, 2.2]}
                scale={0.15}
                rotation={[0, -0.8, 0]}
            />

            {/* Notebook + Pen */}
            <mesh position={[-0.5, 0.76, 0.6]} rotation={[0, 0.2, 0]}>
                <boxGeometry args={[0.15, 0.02, 0.2]} />
                <meshStandardMaterial color="#f5f5dc" />
            </mesh>
            {/* Notebook Lines */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={`line${i}`} position={[-0.52, 0.772, 0.65 - i * 0.02]} rotation={[-Math.PI / 2, 0, 0.2]}>
                    <boxGeometry args={[0.1, 0.001, 0.001]} />
                    <meshBasicMaterial color="#0066cc" />
                </mesh>
            ))}
            {/* "detail" text */}
            <Text
                position={[-0.52, 0.773, 0.63]}
                rotation={[-Math.PI / 2, 0, 0.2]}
                fontSize={0.03}
                color="#333"
                anchorX="left"
                anchorY="middle"
            >
                detail
            </Text>
            <mesh position={[-0.45, 0.78, 0.55]} rotation={[0, 0.5, Math.PI / 2]}>
                <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
                <meshStandardMaterial color="#1a237e" />
            </mesh>



            {/* ===== CHRISTMAS TREE ===== */}
            {/* 3D Christmas Tree Model */}
            <group position={[-2.8, 0, -2.8]} onClick={(e) => { e.stopPropagation(); setSantaFlying(true); setSantaPosition(-4) }}>
                <primitive
                    object={xmasTreeModel.clone()}
                    scale={0.5}
                    rotation={[0, 0, 0]}
                />
            </group>

            {/* Santa Flying */}
            {santaFlying && (
                <primitive object={santaModel.clone()} scale={0.015} position={[santaPosition, 1, 1.5]} rotation={[0, Math.PI / 2, 0]} />
            )}

            {/* Steam Controller */}
            <primitive object={steamController} position={[1.5, 0.82, 2.2]} scale={0.3} rotation={[-Math.PI / 2, 0, 0.5]} />
        </group>
    )
}
