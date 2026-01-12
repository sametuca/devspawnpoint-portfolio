import { Monitor } from './Monitor'
import { useGLTF, Text } from '@react-three/drei'
import { Chair } from './Chair'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'
import { useMemo } from 'react'

export const Desk = () => {

    // Load 3D cup model
    const cupObj = useLoader(OBJLoader, '/models/cup.obj')

    // Load Donald Duck model
    const { scene: donaldDuck } = useGLTF('/models/donalduck/donaldduck.gltf')



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

    return (
        <group position={[0, 0, 0]}>
            {/* Main Desk Top */}
            <mesh position={[0, 0.7, 0]} receiveShadow castShadow>
                <boxGeometry args={[4, 0.1, 1.5]} />
                <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>

            {/* Gamer Chair */}
            <Chair position={[0, 0, 1.5]} rotation={[0, -Math.PI / 1.1, 0]} />

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
            <Monitor
                position={[-1.5, 1.19, 0.2]}
                rotation={[0, 0.3, 0]}
                scale={0.7}
                type="terminal"
                orientation="portrait"
            />
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

            {/* Mechanical Keyboard (Detailed) */}
            <group position={[0, 0.76, 0.5]}>
                {/* Keyboard Base */}
                <mesh>
                    <boxGeometry args={[0.5, 0.02, 0.18]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* Keyboard Top Plate */}
                <mesh position={[0, 0.015, 0]}>
                    <boxGeometry args={[0.48, 0.01, 0.16]} />
                    <meshStandardMaterial color="#2d2d2d" />
                </mesh>
                {/* Key Rows - 4 rows of keys */}
                {/* Row 1 (Top - Function keys) */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh key={`f${i}`} position={[-0.21 + i * 0.038, 0.03, -0.055]}>
                        <boxGeometry args={[0.032, 0.015, 0.025]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                ))}
                {/* Row 2 (Number keys) */}
                {Array.from({ length: 13 }).map((_, i) => (
                    <mesh key={`n${i}`} position={[-0.22 + i * 0.036, 0.03, -0.02]}>
                        <boxGeometry args={[0.03, 0.015, 0.028]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                ))}
                {/* Row 3 (QWERTY) */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh key={`q${i}`} position={[-0.2 + i * 0.037, 0.03, 0.015]}>
                        <boxGeometry args={[0.032, 0.015, 0.028]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                ))}
                {/* Row 4 (Bottom - Space bar etc) */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={`b${i}`} position={[-0.17 + i * 0.038, 0.03, 0.05]}>
                        <boxGeometry args={[0.032, 0.015, 0.028]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                ))}
                {/* Space Bar */}
                <mesh position={[0, 0.03, 0.05]}>
                    <boxGeometry args={[0.15, 0.015, 0.028]} />
                    <meshStandardMaterial color="#555" />
                </mesh>
            </group>

            {/* Gaming Mouse (Ergonomic shape) */}
            <group position={[0.45, 0.76, 0.5]}>
                {/* Mouse Pad */}
                <mesh position={[0, -0.005, 0]}>
                    <boxGeometry args={[0.25, 0.005, 0.22]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                {/* Mouse Body - Main */}
                <mesh position={[0, 0.015, 0]}>
                    <boxGeometry args={[0.06, 0.025, 0.1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Mouse - Front (narrower) */}
                <mesh position={[0, 0.012, -0.04]}>
                    <boxGeometry args={[0.045, 0.02, 0.03]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Left Click */}
                <mesh position={[-0.015, 0.03, -0.02]}>
                    <boxGeometry args={[0.025, 0.008, 0.06]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* Right Click */}
                <mesh position={[0.015, 0.03, -0.02]}>
                    <boxGeometry args={[0.025, 0.008, 0.06]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* Scroll Wheel */}
                <mesh position={[0, 0.035, -0.015]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.015, 12]} />
                    <meshStandardMaterial color="#444" />
                </mesh>
                {/* RGB Strip */}
                <mesh position={[0, 0.005, 0]}>
                    <boxGeometry args={[0.065, 0.003, 0.08]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* 3D Coffee Cup Model */}
            <primitive
                object={cupModel}
                position={[-0.8, 0.75, 0.4]}
                scale={0.08}
                rotation={[0, 0.5, 0]}
            />

            {/* Donald Duck Figure */}
            <primitive
                object={donaldDuck.clone()}
                position={[1.8, 0.75, 2.2]}
                scale={0.15}
                rotation={[0, -0.8, 0]}
            />



            {/* Improved Headphones (Gaming Style) - Standing on Desk */}
            <group position={[-1.2, 0.76, 0.3]}>
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
                        <torusGeometry args={[0.09, 0.015, 12, 24, Math.PI]} />
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
                            <cylinderGeometry args={[0.055, 0.055, 0.03, 24]} />
                            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.4} />
                        </mesh>
                        {/* Ear Cushion */}
                        <mesh position={[0, 0.018, 0]}>
                            <torusGeometry args={[0.04, 0.012, 8, 16]} />
                            <meshStandardMaterial color="#2a2a2a" />
                        </mesh>
                        {/* RGB Accent */}
                        <mesh position={[0, -0.018, 0]}>
                            <cylinderGeometry args={[0.045, 0.045, 0.003, 24]} />
                            <meshStandardMaterial color="#ff0066" emissive="#ff0066" emissiveIntensity={0.5} />
                        </mesh>
                    </group>
                    {/* Right Ear Cup */}
                    <group position={[0.09, -0.05, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.055, 0.055, 0.03, 24]} />
                            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.4} />
                        </mesh>
                        {/* Ear Cushion */}
                        <mesh position={[0, 0.018, 0]}>
                            <torusGeometry args={[0.04, 0.012, 8, 16]} />
                            <meshStandardMaterial color="#2a2a2a" />
                        </mesh>
                        {/* RGB Accent */}
                        <mesh position={[0, -0.018, 0]}>
                            <cylinderGeometry args={[0.045, 0.045, 0.003, 24]} />
                            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                        </mesh>
                    </group>
                    {/* Microphone Boom */}
                    <mesh position={[-0.09, -0.05, 0.04]} rotation={[0, 0, -Math.PI / 6]}>
                        <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
                        <meshStandardMaterial color="#222" metalness={0.8} />
                    </mesh>
                    <mesh position={[-0.15, -0.08, 0.04]}>
                        <sphereGeometry args={[0.01, 8, 8]} />
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
                <mesh key={`line${i}`} position={[-0.52, 0.772, 0.65 - i * 0.02]} rotation={[-Math.PI/2, 0, 0.2]}>
                    <boxGeometry args={[0.1, 0.001, 0.001]} />
                    <meshBasicMaterial color="#0066cc" />
                </mesh>
            ))}
            {/* "detail" text */}
            <Text
                position={[-0.52, 0.773, 0.63]}
                rotation={[-Math.PI/2, 0, 0.2]}
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
            <group position={[-2.5, 0, -2.5]}>
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
        </group>
    )
}
