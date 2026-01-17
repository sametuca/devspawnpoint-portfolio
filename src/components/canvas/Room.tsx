import * as THREE from 'three'
import { useTexture, Text, useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { DEFAULT_FONT } from '../../constants/fonts'

function Armchair() {
    const { scene } = useGLTF('/models/armchair/scene.gltf')
    return <primitive object={scene} position={[1.5, -1.0, 1.8]} scale={0.9} rotation={[0, Math.PI, 0]} />
}

function CeilingLamp({ lightsOn, onClick }: { lightsOn: boolean; onClick: (e: any) => void }) {
    const { scene } = useGLTF('/models/lamp/scene.gltf')
    const clonedScene = scene.clone()

    // Make all meshes clickable
    clonedScene.traverse((child: any) => {
        if (child.isMesh) {
            child.userData.clickable = true
        }
    })

    return (
        <group position={[0, 2.95, 0]}>
            {/* Invisible clickable sphere */}
            <mesh onClick={(e) => { e.stopPropagation(); onClick(e); }}>
                <sphereGeometry args={[0.5]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <primitive object={clonedScene} scale={0.3} rotation={[0, 0, 0]} />
            <pointLight position={[0, -0.5, 0]} color="#ffe4b5" intensity={lightsOn ? 15 : 0} distance={5} decay={2} />
        </group>
    )
}

function PlayStation5({ onClick }: { onClick: () => void }) {
    const { scene } = useGLTF('/models/playstation_5/scene.gltf')
    const clonedScene = scene.clone()

    // Make all meshes clickable
    clonedScene.traverse((child: any) => {
        if (child.isMesh) {
            child.userData.clickable = true
        }
    })

    return (
        <group position={[1.8, -0.85, 0.20]} rotation={[0, Math.PI / 2, 0]}>
            {/* Invisible clickable box for easy clicking - covers entire PlayStation */}
            <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
                <boxGeometry args={[0.6, 0.3, 0.4]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <primitive object={clonedScene} scale={0.15} />
        </group>
    )
}


function TVTable() {
    const { scene } = useGLTF('/models/tv_table/scene.gltf')
    return <primitive object={scene.clone()} position={[1.5, -1.5, -0.85]} scale={1.2} rotation={[0, Math.PI / 1, 0]} />
}

function Door3D() {
    const { scene } = useGLTF('/models/door/scene.gltf')
    return <primitive object={scene.clone()} position={[2.1, 1.5, -2.9]} scale={0.25} rotation={[0, 0, 0]} />
}

function Window3D() {
    const { scene } = useGLTF('/models/window/scene.gltf')
    return <primitive object={scene.clone()}
        position={[2, -1.5, 1.7]}
        scale={0.03}
        rotation={[0, Math.PI / -2, 0]} />
}

function Cheetos() {
    const { scene } = useGLTF('/models/cheetos/scene.gltf')
    return <primitive object={scene.clone()} position={[1.55, -1.02, 1.1]} scale={0.07} rotation={[0, Math.PI / 4, 0]} />
}

function VacuumRobot() {
    const { scene } = useGLTF('/models/vacuum-robot/scene.gltf')
    const [animationState, setAnimationState] = useState<'idle' | 'moving-right' | 'paused' | 'moving-left'>('idle')
    const [position, setPosition] = useState<[number, number, number]>([2, 0.05, -2.2])
    const [rotation, setRotation] = useState(Math.PI / 4)
    const clonedScene = scene.clone()

    // Make all meshes clickable
    clonedScene.traverse((child: any) => {
        if (child.isMesh) {
            child.userData.clickable = true
        }
    })

    const handleClick = (e: any) => {
        e.stopPropagation()
        if (animationState !== 'idle') return
        setAnimationState('moving-right')
        setRotation(0) // Face right wall
    }

    useFrame(() => {
        if (animationState === 'moving-right') {
            setPosition(prev => {
                const [x, y, z] = prev
                if (x < 2.85) {
                    return [x + 0.03, y, z]
                } else {
                    // Hit the wall, pause
                    setAnimationState('paused')
                    setTimeout(() => {
                        setAnimationState('moving-left')
                        setRotation(Math.PI) // Face left
                    }, 300)
                    return [2.85, y, z]
                }
            })
        } else if (animationState === 'moving-left') {
            setPosition(prev => {
                const [x, y, z] = prev
                if (x > 2.0) {
                    return [x - 0.03, y, z]
                } else {
                    // Back to original position
                    setAnimationState('idle')
                    setRotation(Math.PI / 4)
                    return [2, y, z]
                }
            })
        }
    })

    return (
        <group
            position={position}
            rotation={[0, rotation, 0]}
        >
            {/* Invisible clickable sphere for easy clicking */}
            <mesh onClick={handleClick}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <primitive object={clonedScene} scale={1.15} />
        </group>
    )
}

function XiaomiScooter() {
    const { scene } = useGLTF('/models/xiaomi_scooter/scene.gltf')
    return <primitive object={scene.clone()} position={[0.5, 0, -2.5]} scale={1.5} rotation={[0, Math.PI / 6, 0]} />
}

function Dumbbell() {
    const { scene } = useGLTF('/models/dambil/scene.gltf')
    return <primitive object={scene.clone()} position={[-2.5, 0.15, 0.5]} scale={0.05} rotation={[0, Math.PI / 3, 0]} />
}


export const Room = () => {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: "#e0e0e0", roughness: 0.8 })
    const [outdoorTexture, marioTexture, gtaPoster, posterGaming] = useTexture([
        '/textures/outdoor.jpg',
        '/textures/supermario.jpg',
        '/textures/logos/gta3poster.jpg',
        '/textures/rdr2.png'
    ])
    const [lightsOn, setLightsOn] = useState(true)
    const [videoPlaying, setVideoPlaying] = useState(false)

    const [snowflakes, setSnowflakes] = useState(() =>
        Array.from({ length: 100 }, () => ({
            x: (Math.random() - 0.5) * 1.8,
            y: Math.random() * 1.3,
            z: Math.random() * 0.1,
            speed: 0.001 + Math.random() * 0.002,
            size: 0.01 + Math.random() * 0.015
        }))
    )

    useFrame(() => {
        setSnowflakes(prev => prev.map(flake => ({
            ...flake,
            y: flake.y - flake.speed < -0.65 ? 0.65 : flake.y - flake.speed
        })))
    })

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[6, 6]} />
                <meshStandardMaterial color="#2d2d3a" roughness={0.5} />
            </mesh>

            {/* Carpet */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]}>
                <planeGeometry args={[4.5, 3.5]} />
                <meshStandardMaterial color="#8b7355" roughness={0.9} />
            </mesh>
            {/* Carpet Pattern - Border */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0.5]}>
                <ringGeometry args={[2.1, 2.25, 4, 1]} />
                <meshStandardMaterial color="#5d4a3a" />
            </mesh>
            {/* Carpet Pattern - Inner Border */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0.5]}>
                <ringGeometry args={[1.9, 2.0, 4, 1]} />
                <meshStandardMaterial color="#6b5344" />
            </mesh>
            {/* Carpet Pattern - Center Diamond */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0.5]}>
                <circleGeometry args={[0.8, 4]} />
                <meshStandardMaterial color="#5d4a3a" />
            </mesh>
            {/* Carpet Pattern - Small Dots */}
            {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
                <mesh key={`dot-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.022, 0.5]}>
                    <circleGeometry args={[0.05, 16]} />
                    <meshStandardMaterial color="#4a3829" />
                </mesh>
            ))}

            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.99, 0]}>
                <planeGeometry args={[6, 6]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
            </mesh>

            {/* Ceiling Lamp / Chandelier */}
            <CeilingLamp lightsOn={lightsOn} onClick={(e) => { e.stopPropagation(); setLightsOn(!lightsOn) }} />

            {/* Back Wall (Whiteboard Side) */}
            <group>
                <mesh position={[0, 1.5, -3]}>
                    <planeGeometry args={[6, 3]} />
                    <primitive object={wallMaterial} />
                </mesh>
                {/* Door */}
                <Door3D />

                {/* Vacuum Robot in front of door */}
                <VacuumRobot />

                {/* Xiaomi Scooter near back wall */}
                <XiaomiScooter />

                {/* Dumbbell near left wall */}
                <Dumbbell />

                {/* Navigation Instructions Panel */}
                <group position={[0.5, 1.95, -2.9]}>
                    {/* Panel Background */}
                    <mesh>
                        <planeGeometry args={[1.8, 0.7]} />
                        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.9} />
                    </mesh>
                    {/* Title Bar */}
                    <mesh position={[0, 0.25, 0.01]}>
                        <planeGeometry args={[1.7, 0.12]} />
                        <meshStandardMaterial color="#00ffff" transparent opacity={0.2} />
                    </mesh>
                    {/* Title Text */}
                    <Text
                        position={[0, 0.25, 0.02]}
                        fontSize={0.06}
                        color="#00ffff"
                        anchorX="center"
                        font={DEFAULT_FONT}
                    >
                        🖱️ Controls
                    </Text>
                    {/* Instructions */}
                    <Text
                        position={[0, 0.08, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                        font={DEFAULT_FONT}
                    >
                        Left Click + Drag → Rotate
                    </Text>
                    <Text
                        position={[0, -0.02, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                        font={DEFAULT_FONT}
                    >
                        Right Click + Drag → Pan
                    </Text>
                    <Text
                        position={[0, -0.12, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                        font={DEFAULT_FONT}
                    >
                        Scroll → Zoom In/Out
                    </Text>
                    <Text
                        position={[0, -0.24, 0.02]}
                        fontSize={0.035}
                        color="#888888"
                        anchorX="center"
                        font={DEFAULT_FONT}
                    >
                        Click on monitors to interact!
                    </Text>
                </group>

                {/* Poster 1 - Sci-Fi (Left side) */}
                <group position={[-1.8, 1.5, -2.9]}>
                    {/* Frame */}
                    <mesh>
                        <boxGeometry args={[-1, 0.96, 0.04]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Poster Image */}
                    <mesh position={[0, 0, 0.01]}>
                        <planeGeometry args={[1.2, 1.6]} />
                        <meshStandardMaterial map={gtaPoster} />
                    </mesh>
                </group>

                {/* Poster 2 - Gaming (Right side) */}
                <group position={[-0.8, 1.82, -2.9]}>
                    {/* Frame */}
                    <mesh>
                        <boxGeometry args={[0.72, 0.96, 0.04]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Poster Image */}
                    <mesh position={[0, 0, 0.025]}>
                        <planeGeometry args={[0.64, 0.88]} />
                        <meshBasicMaterial map={posterGaming} />
                    </mesh>
                </group>

            </group>

            {/* Front Wall (Behind Camera) */}
            <mesh position={[0, 1.5, 3]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[6, 3]} />
                <primitive object={wallMaterial} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[6, 3]} />
                <primitive object={wallMaterial} />
            </mesh>

            {/* Global Ambient Light Control */}
            <ambientLight intensity={lightsOn ? 0.5 : 0} color="#4a4a6a" />
            <pointLight position={[0, 2, 0]} intensity={lightsOn ? 1.0 : 0} color="#faa" distance={5} />

            {/* Left Wall (Window + TV + Gaming Area) */}
            <group position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Full Wall Background */}
                <mesh position={[0, 0, -0.05]}>
                    <planeGeometry args={[6, 3]} />
                    <primitive object={wallMaterial} />
                </mesh>

                {/* Window (Positioned toward back Z) */}
                <group position={[0.6, 0, 0]}>
                    <group position={[-1.5, 0.1, 0]}>
                        {/* Outdoor View - sized to fit window */}
                        <mesh position={[0, 0, -0.03]}>
                            <planeGeometry args={[1, 1.7]} />
                            <meshBasicMaterial map={outdoorTexture} />
                        </mesh>
                        {/* Snowflakes - contained within window area */}
                        {snowflakes.map((flake, i) => (
                            <mesh key={i} position={[flake.x * 0.6, flake.y * 0.7, -0.12 + flake.z]}>
                                <circleGeometry args={[flake.size * 0.7, 6]} />
                                <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
                            </mesh>
                        ))}
                        {/* 3D Window Model */}
                        <Window3D />
                    </group>
                </group>

                {/* TV (Positioned toward front Z) - YouTube Video Player */}
                <group position={[1.5, 0.2, 0.05]}>
                    {/* TV Frame */}
                    <mesh>
                        <boxGeometry args={[1.6, 1, 0.08]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>

                    {videoPlaying ? (
                        /* YouTube Video Player */
                        <>
                            <Html position={[0, 0, 0.06]} transform distanceFactor={0.85}>
                                <div style={{ width: '560px', height: '315px', background: '#000', overflow: 'hidden', pointerEvents: 'auto' }}>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/rwN3kZYJZiU?autoplay=1"
                                        title="Super Mario Bros"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </Html>
                            {/* Close Button */}
                            <mesh position={[0.7, 0.4, 0.07]} onClick={(e) => { e.stopPropagation(); setVideoPlaying(false); }}>
                                <planeGeometry args={[0.12, 0.12]} />
                                <meshBasicMaterial color="#ff0000" />
                            </mesh>
                            <Text position={[0.7, 0.4, 0.071]} fontSize={0.08} color="white" anchorX="center" font={DEFAULT_FONT}>
                                ✕
                            </Text>
                        </>
                    ) : (
                        /* TV Screen with Mario Texture */
                        <mesh position={[0, 0, 0.05]}>
                            <planeGeometry args={[1.5, 0.9]} />
                            <meshBasicMaterial map={marioTexture} />
                        </mesh>
                    )}
                </group>

                {/* TV Table / Entertainment Unit */}
                <TVTable />

                {/* Game Console (PlayStation 5) on TV Table */}
                <PlayStation5 onClick={() => setVideoPlaying(true)} />

                {/* ===== GAMING AREA ===== */}

                {/* Armchair (In front of TV) - Facing TV */}
                <Armchair />

                {/* Coffee Table */}
                <group position={[1.5, -1.1, 0.9]}>
                    {/* Table Top */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.8, 0.05, 0.5]} />
                        <meshStandardMaterial color="#5d4037" />
                    </mesh>
                    {/* Table Legs */}
                    <mesh position={[-0.35, -0.15, 0.2]}>
                        <boxGeometry args={[0.05, 0.25, 0.05]} />
                        <meshStandardMaterial color="#3e2723" />
                    </mesh>
                    <mesh position={[0.35, -0.15, 0.2]}>
                        <boxGeometry args={[0.05, 0.25, 0.05]} />
                        <meshStandardMaterial color="#3e2723" />
                    </mesh>
                    <mesh position={[-0.35, -0.15, -0.2]}>
                        <boxGeometry args={[0.05, 0.25, 0.05]} />
                        <meshStandardMaterial color="#3e2723" />
                    </mesh>
                    <mesh position={[0.35, -0.15, -0.2]}>
                        <boxGeometry args={[0.05, 0.25, 0.05]} />
                        <meshStandardMaterial color="#3e2723" />
                    </mesh>
                </group>

                {/* Soda Can */}
                <mesh position={[1.5, -1.03, 1.05]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.1, 12]} />
                    <meshStandardMaterial color="#e74c3c" />
                </mesh>

                {/* Cheetos */}
                <Cheetos />
            </group>
        </group>
    )
}
