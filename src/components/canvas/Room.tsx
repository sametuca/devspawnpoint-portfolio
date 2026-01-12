import * as THREE from 'three'
import { useTexture, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'

export const Room = () => {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: "#e0e0e0", roughness: 0.8 })
    const [outdoorTexture, marioTexture] = useTexture(['/textures/outdoor.jpg', '/textures/supermario.jpg'])
    const [lightsOn, setLightsOn] = useState(true)

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[6, 6]} />
                <meshStandardMaterial color="#2d2d3a" roughness={0.5} />
            </mesh>

            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.99, 0]}>
                <planeGeometry args={[6, 6]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
            </mesh>

            {/* Ceiling Lamp / Chandelier */}
            <group position={[0, 2.8, 0]} onClick={(e) => { e.stopPropagation(); setLightsOn(!lightsOn) }} style={{ cursor: 'pointer' }}>
                <mesh position={[0, 0.1, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
                    <meshStandardMaterial color="#222" metalness={0.9} />
                </mesh>
                <mesh position={[0, -0.15, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0, -0.45, 0]}>
                    <cylinderGeometry args={[0.15, 0.25, 0.3, 16]} />
                    <meshStandardMaterial color="#f5f0e6" emissive={lightsOn ? "#ffe4b5" : "#000"} emissiveIntensity={lightsOn ? 0.3 : 0} />
                </mesh>
                <pointLight position={[0, -0.5, 0]} color="#ffe4b5" intensity={lightsOn ? 15 : 0} distance={5} decay={2} />
            </group>

            {/* Back Wall (Whiteboard Side) */}
            <group>
                <mesh position={[0, 1.5, -3]}>
                    <planeGeometry args={[6, 3]} />
                    <primitive object={wallMaterial} />
                </mesh>
                {/* Door */}
                <mesh position={[2, 1, -2.95]}>
                    <boxGeometry args={[0.9, 2, 0.1]} />
                    <meshStandardMaterial color="#4d3b3b" />
                </mesh>
                <mesh position={[2.35, 1, -2.9]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="gold" />
                </mesh>

                {/* Navigation Instructions Panel */}
                <group position={[0.5, 2.55, -2.9]}>
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
                    >
                        🖱️ Controls
                    </Text>
                    {/* Instructions */}
                    <Text
                        position={[0, 0.08, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                    >
                        Left Click + Drag → Rotate
                    </Text>
                    <Text
                        position={[0, -0.02, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                    >
                        Right Click + Drag → Pan
                    </Text>
                    <Text
                        position={[0, -0.12, 0.02]}
                        fontSize={0.045}
                        color="#ffffff"
                        anchorX="center"
                    >
                        Scroll → Zoom In/Out
                    </Text>
                    <Text
                        position={[0, -0.24, 0.02]}
                        fontSize={0.035}
                        color="#888888"
                        anchorX="center"
                    >
                        Click on monitors to interact!
                    </Text>
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
            <ambientLight intensity={lightsOn ? 0.5 : 0.05} color="#4a4a6adb" />
            <pointLight position={[0, 2, 0]} intensity={lightsOn ? 1.0 : 0} color="#faa" distance={5} />

            {/* Left Wall (Window + TV + Gaming Area) */}
            <group position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Full Wall Background */}
                <mesh position={[0, 0, -0.05]}>
                    <planeGeometry args={[6, 3]} />
                    <primitive object={wallMaterial} />
                </mesh>

                {/* Window (Positioned toward back Z) */}
                <group position={[-1.5, 0, 0]}>
                    {/* Outdoor View - FIXED: Now in front of wall */}
                    <mesh position={[0, 0, 0.01]}>
                        <planeGeometry args={[1.8, 1.3]} />
                        <meshBasicMaterial map={outdoorTexture} />
                    </mesh>
                    {/* Window Frame */}
                    <group position={[0, 0, 0.02]}>
                        {/* Top */}
                        <mesh position={[0, 0.7, 0]}>
                            <boxGeometry args={[2, 0.08, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                        {/* Bottom */}
                        <mesh position={[0, -0.7, 0]}>
                            <boxGeometry args={[2, 0.08, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                        {/* Left */}
                        <mesh position={[-0.95, 0, 0]}>
                            <boxGeometry args={[0.08, 1.4, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                        {/* Right */}
                        <mesh position={[0.95, 0, 0]}>
                            <boxGeometry args={[0.08, 1.4, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                        {/* Center Cross */}
                        <mesh>
                            <boxGeometry args={[0.04, 1.4, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                        <mesh>
                            <boxGeometry args={[1.9, 0.04, 0.06]} />
                            <meshStandardMaterial color="#f5f5f0" />
                        </mesh>
                    </group>
                </group>

                {/* TV (Positioned toward front Z) - CLICKABLE */}
                <group
                    position={[1.5, 0.2, 0.05]}
                    onClick={() => window.open('https://supermarioplay.com/fullscreen', '_blank')}
                >
                    {/* TV Frame */}
                    <mesh>
                        <boxGeometry args={[1.6, 1, 0.08]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* TV Screen */}
                    <mesh position={[0, 0, 0.05]}>
                        <planeGeometry args={[1.5, 0.9]} />
                        <meshBasicMaterial map={marioTexture} />
                    </mesh>
                    {/* TV Stand */}
                    <mesh position={[0, -0.6, 0.1]}>
                        <boxGeometry args={[0.3, 0.15, 0.2]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                </group>

                {/* TV Cabinet / Entertainment Unit */}
                <mesh position={[1.5, -0.5, 0.1]}>
                    <boxGeometry args={[1.8, 0.4, 0.5]} />
                    <meshStandardMaterial color="#3d2314" />
                </mesh>

                {/* Game Console (On cabinet) */}
                <group position={[1.5, -0.25, 0.25]}>
                    <mesh>
                        <boxGeometry args={[0.4, 0.08, 0.25]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    <mesh position={[0.15, 0.05, 0.13]}>
                        <sphereGeometry args={[0.015]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                </group>

                {/* ===== GAMING AREA ===== */}

                {/* Couch (In front of TV) - Facing TV */}
                <group position={[1.5, -1.25, 1.8]} scale={1.3}>
                    {/* Couch Legs */}
                    <mesh position={[-0.5, -0.18, 0.15]}>
                        <boxGeometry args={[0.06, 0.08, 0.06]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[0.5, -0.18, 0.15]}>
                        <boxGeometry args={[0.06, 0.08, 0.06]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[-0.5, -0.18, -0.15]}>
                        <boxGeometry args={[0.06, 0.08, 0.06]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[0.5, -0.18, -0.15]}>
                        <boxGeometry args={[0.06, 0.08, 0.06]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    {/* Seat Base */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.2, 0.2, 0.5]} />
                        <meshStandardMaterial color="#2c3e50" />
                    </mesh>
                    {/* Backrest */}
                    <mesh position={[0, 0.25, 0.22]}>
                        <boxGeometry args={[1.2, 0.35, 0.12]} />
                        <meshStandardMaterial color="#2c3e50" />
                    </mesh>
                    {/* Left Armrest */}
                    <mesh position={[-0.55, 0.1, 0]}>
                        <boxGeometry args={[0.1, 0.3, 0.5]} />
                        <meshStandardMaterial color="#34495e" />
                    </mesh>
                    {/* Right Armrest */}
                    <mesh position={[0.55, 0.1, 0]}>
                        <boxGeometry args={[0.1, 0.3, 0.5]} />
                        <meshStandardMaterial color="#34495e" />
                    </mesh>
                    {/* Cushions */}
                    <mesh position={[-0.25, 0.12, -0.03]}>
                        <boxGeometry args={[0.45, 0.06, 0.35]} />
                        <meshStandardMaterial color="#3d566e" />
                    </mesh>
                    <mesh position={[0.25, 0.12, -0.03]}>
                        <boxGeometry args={[0.45, 0.06, 0.35]} />
                        <meshStandardMaterial color="#3d566e" />
                    </mesh>
                </group>

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

                {/* Snack Bowl 1 (Chips) */}
                <group position={[1.3, -1.05, 0.9]}>
                    <mesh>
                        <cylinderGeometry args={[0.1, 0.08, 0.06, 16]} />
                        <meshStandardMaterial color="#e67e22" />
                    </mesh>
                    {/* Chips inside */}
                    <mesh position={[0, 0.04, 0]}>
                        <sphereGeometry args={[0.07, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#f39c12" />
                    </mesh>
                </group>

                {/* Snack Bowl 2 (Popcorn) */}
                <group position={[1.7, -1.05, 0.85]}>
                    <mesh>
                        <cylinderGeometry args={[0.08, 0.06, 0.08, 16]} />
                        <meshStandardMaterial color="#c0392b" />
                    </mesh>
                    {/* Popcorn inside */}
                    <mesh position={[0, 0.05, 0]}>
                        <sphereGeometry args={[0.06, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#ecf0f1" />
                    </mesh>
                </group>

                {/* Soda Can */}
                <mesh position={[1.5, -1.03, 1.05]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.1, 12]} />
                    <meshStandardMaterial color="#e74c3c" />
                </mesh>
            </group>

        </group>
    )
}
