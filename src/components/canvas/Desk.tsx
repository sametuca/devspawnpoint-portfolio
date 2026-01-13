import { Monitor } from './Monitor'
import { useGLTF, Text, Image } from '@react-three/drei'
import { Chair } from './Chair'
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'
import { useMemo, useState, useRef } from 'react'
import { useMusic } from '../../context/MusicContext'
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
    const { scene: steamController } = useGLTF('/models/steamController/scene.gltf')
    const { scene: gamingChair } = useGLTF('/models/gamingChair/scene.gltf')
    const { scene: iphoneModel } = useGLTF('/models/iphone/scene.gltf')
    const { scene: mouseModel } = useGLTF('/models/cp-mouse/scene.gltf')
    const { scene: keyboardModel } = useGLTF('/models/cp-keyboard/scene.gltf')
    const { setMusicActive } = useMusic()



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
            <Monitor position={[0, 1.25, 0]} scale={0.8} type="code" />
            {/* MacBook with Gemini App */}
            <MacBook
                position={[-1.6, 0.79, 0.2]}
                rotation={[0, 0.3, 0]}
                scale={2.5} />
            <Monitor
                position={[1.5, 1.25, 0.2]}
                rotation={[0, -0.3, 0]}
                scale={0.8}
                type="web"
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

            {/* iPhone Model */}
            <primitive object={iphoneModel.clone()} position={[-0.5, 0.77, 0.55]} scale={0.01} rotation={[-Math.PI / 2, 0, 0.2]} />

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



            {/* Improved Headphones (Gaming Style) - Standing on Desk */}
            <group position={[-1.0, 0.76, 0.3]} onClick={(e) => { e.stopPropagation(); setMusicActive(true) }}>
                {/* Headphone Stand Base */}
                <mesh position={[0, 0.02, 0]}>
                    <cylinderGeometry args={[0.08, 0.1, 0.04, 16]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
                </mesh>
                {/* Stand Pole */}
                <mesh position={[0, 0.15, 0]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.3, 12]} />
                    <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Stand Hook */}
                <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
                </mesh>
                {/* Headphones hanging on stand */}
                <group position={[0, 0.28, 0]} rotation={[0.1, 0, 0]}>
                    {/* Headband */}
                    <mesh>
                        <torusGeometry args={[0.09, 0.012, 12, 24, Math.PI]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
                    </mesh>
                    {/* Headband Padding */}
                    <mesh position={[0, 0.008, 0]}>
                        <torusGeometry args={[0.09, 0.008, 8, 16, Math.PI]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    {/* Left Ear Cup */}
                    <group position={[-0.09, -0.05, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.05, 0.05, 0.03, 24]} />
                            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.4} />
                        </mesh>
                        {/* Ear Cushion */}
                        <mesh position={[0, 0.018, 0]}>
                            <torusGeometry args={[0.035, 0.01, 8, 16]} />
                            <meshStandardMaterial color="#2a2a2a" />
                        </mesh>
                        {/* RGB Accent */}
                        <mesh position={[0, -0.018, 0]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.003, 24]} />
                            <meshStandardMaterial color="#ff0066" emissive="#ff0066" emissiveIntensity={0.5} />
                        </mesh>
                    </group>
                    {/* Right Ear Cup */}
                    <group position={[0.09, -0.05, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.05, 0.05, 0.03, 24]} />
                            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.4} />
                        </mesh>
                        {/* Ear Cushion */}
                        <mesh position={[0, 0.018, 0]}>
                            <torusGeometry args={[0.035, 0.01, 8, 16]} />
                            <meshStandardMaterial color="#2a2a2a" />
                        </mesh>
                        {/* RGB Accent */}
                        <mesh position={[0, -0.018, 0]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.003, 24]} />
                            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                        </mesh>
                    </group>
                    {/* Microphone Boom */}
                    <mesh position={[-0.09, -0.05, 0.04]} rotation={[0, 0, -Math.PI / 6]}>
                        <cylinderGeometry args={[0.004, 0.004, 0.1, 8]} />
                        <meshStandardMaterial color="#222" metalness={0.8} />
                    </mesh>
                    <mesh position={[-0.14, -0.08, 0.04]}>
                        <sphereGeometry args={[0.008, 8, 8]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </group>
            </group>

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
            <group position={[-2.5, 0, -2.5]} onClick={(e) => { e.stopPropagation(); setSantaFlying(true); setSantaPosition(-4) }}>
                {/* Tree Pot */}
                <mesh position={[0, 0.15, 0]}>
                    <cylinderGeometry args={[0.15, 0.12, 0.3, 8]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                {/* Tree Trunk */}
                <mesh position={[0, 0.4, 0]}>
                    <cylinderGeometry args={[0.05, 0.06, 0.3, 8]} />
                    <meshStandardMaterial color="#5d4037" />
                </mesh>
                {/* Tree Layers (Cones) */}
                <mesh position={[0, 0.7, 0]}>
                    <coneGeometry args={[0.4, 0.5, 8]} />
                    <meshStandardMaterial color="#228B22" />
                </mesh>
                <mesh position={[0, 1.0, 0]}>
                    <coneGeometry args={[0.32, 0.45, 8]} />
                    <meshStandardMaterial color="#2E8B57" />
                </mesh>
                <mesh position={[0, 1.3, 0]}>
                    <coneGeometry args={[0.24, 0.4, 8]} />
                    <meshStandardMaterial color="#32CD32" />
                </mesh>
                {/* Star on Top */}
                <mesh position={[0, 1.55, 0]}>
                    <octahedronGeometry args={[0.08]} />
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
                </mesh>
                {/* Ornaments (colored spheres) */}
                <mesh position={[0.2, 0.65, 0.15]}>
                    <sphereGeometry args={[0.04]} />
                    <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[-0.15, 0.75, 0.2]}>
                    <sphereGeometry args={[0.035]} />
                    <meshStandardMaterial color="#0000ff" emissive="#0000ff" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[0.1, 0.95, -0.15]}>
                    <sphereGeometry args={[0.04]} />
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[-0.12, 1.1, 0.1]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[0.08, 1.25, 0.08]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
                </mesh>
            </group>

            {/* Santa Flying */}
            {santaFlying && (
                <primitive object={santaModel.clone()} scale={0.015} position={[santaPosition, 1.5, 1.5]} rotation={[0, Math.PI / 2, 0]} />
            )}

            {/* Steam Controller */}
            <primitive object={steamController} position={[1.5, 0.82, 2.2]} scale={0.3} rotation={[-Math.PI / 2, 0, 0.5]} />
        </group>
    )
}
