import { useTexture, useGLTF } from '@react-three/drei'
import { useState } from 'react'

export const InteractiveElements = () => {
    const posterTexture = useTexture('/textures/antigravity-poster.png')

    return (
        <group>


            {/* ===== FRONT WALL (Behind Chair) - Developer Room Objects ===== */}
            <group position={[0, 0, 2.9]} rotation={[0, Math.PI, 0]}>

                {/* Mini Server Rack */}
                <group position={[-1.5, 0.6, 0]}>
                    {/* Rack Frame */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.5, 1.2, 0.4]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Server Units (LED lights) */}
                    {[0.4, 0.2, 0, -0.2, -0.4].map((y, i) => (
                        <group key={i} position={[0, y, 0.21]}>
                            <mesh>
                                <boxGeometry args={[0.45, 0.15, 0.01]} />
                                <meshStandardMaterial color="#222" />
                            </mesh>
                            {/* Blinking LEDs */}
                            <mesh position={[0.15, 0, 0.01]}>
                                <sphereGeometry args={[0.015]} />
                                <meshStandardMaterial color={i % 2 === 0 ? "#00ff00" : "#ff0000"} emissive={i % 2 === 0 ? "#00ff00" : "#ff0000"} emissiveIntensity={2} />
                            </mesh>
                        </group>
                    ))}
                </group>

                {/* Potted Plant */}
                <group position={[1.5, 0.125, 0]}>
                    {/* Pot */}
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.12, 0.1, 0.25, 12]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                    {/* Soil */}
                    <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.05, 12]} />
                        <meshStandardMaterial color="#3d2314" />
                    </mesh>
                    {/* Plant Leaves (simple spheres) */}
                    <mesh position={[0, 0.35, 0]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#228B22" />
                    </mesh>
                    <mesh position={[0.08, 0.45, 0.05]}>
                        <sphereGeometry args={[0.1, 8, 8]} />
                        <meshStandardMaterial color="#2E8B57" />
                    </mesh>
                    <mesh position={[-0.08, 0.4, -0.05]}>
                        <sphereGeometry args={[0.12, 8, 8]} />
                        <meshStandardMaterial color="#32CD32" />
                    </mesh>
                </group>

                {/* Wall Clock */}
                <group position={[0, 2, 0]}>
                    {/* Clock Face - Flat */}
                    <mesh>
                        <circleGeometry args={[0.35, 64]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                    </mesh>
                    {/* Outer Ring */}
                    <mesh position={[0, 0, 0.001]}>
                        <ringGeometry args={[0.33, 0.35, 64]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Hour Markers */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * Math.PI) / 6
                        const radius = 0.28
                        const isMain = i % 3 === 0
                        return (
                            <mesh
                                key={i}
                                position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.002]}
                            >
                                <circleGeometry args={[isMain ? 0.02 : 0.012, 16]} />
                                <meshStandardMaterial color="#1a1a1a" />
                            </mesh>
                        )
                    })}
                    {/* Hour Hand */}
                    <mesh position={[0, 0.08, 0.003]} rotation={[0, 0, Math.PI / 6]}>
                        <boxGeometry args={[0.03, 0.16, 0.01]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Minute Hand */}
                    <mesh position={[0, 0.12, 0.004]} rotation={[0, 0, -Math.PI / 3]}>
                        <boxGeometry args={[0.025, 0.24, 0.008]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Second Hand */}
                    <mesh position={[0, 0.1, 0.005]} rotation={[0, 0, Math.PI / 4]}>
                        <boxGeometry args={[0.015, 0.22, 0.006]} />
                        <meshStandardMaterial color="#e53935" />
                    </mesh>
                    {/* Center Cap */}
                    <mesh position={[0, 0, 0.006]}>
                        <circleGeometry args={[0.025, 32]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                </group>

                {/* Small Bookshelf on floor */}
                <group position={[0.5, 0.4, 0]}>
                    {/* Shelf Frame */}
                    <mesh>
                        <boxGeometry args={[0.8, 0.8, 0.3]} />
                        <meshStandardMaterial color="#5d4037" />
                    </mesh>
                    {/* Middle Shelf Board */}
                    <mesh position={[0, 0, 0.05]}>
                        <boxGeometry args={[0.75, 0.03, 0.25]} />
                        <meshStandardMaterial color="#6d5047" />
                    </mesh>
                    {/* CD/DVD Cases - Top Row */}
                    {[-0.28, -0.18, -0.08, 0.02, 0.12, 0.22].map((x, i) => (
                        <mesh key={`cd-top-${i}`} position={[x, 0.2, 0.08]}>
                            <boxGeometry args={[0.08, 0.35, 0.02]} />
                            <meshStandardMaterial color={['#1e88e5', '#43a047', '#e53935', '#8e24aa', '#fb8c00', '#00acc1'][i]} />
                        </mesh>
                    ))}
                    {/* CD/DVD Cases - Bottom Row */}
                    {[-0.28, -0.18, -0.08, 0.02, 0.12, 0.22].map((x, i) => (
                        <mesh key={`cd-bot-${i}`} position={[x, -0.2, 0.08]}>
                            <boxGeometry args={[0.08, 0.35, 0.02]} />
                            <meshStandardMaterial color={['#5e35b1', '#d81b60', '#039be5', '#7cb342', '#f4511e', '#3949ab'][i]} />
                        </mesh>
                    ))}
                </group>

            </group>




            {/* Right Wall - Antigravity Poster */}
            <mesh position={[2.95, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[1.5, 2]} />
                <meshStandardMaterial map={posterTexture} />
            </mesh>
        </group>
    )
}
