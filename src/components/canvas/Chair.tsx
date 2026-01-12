import type { ThreeElements } from '@react-three/fiber'

export const Chair = (props: ThreeElements['group']) => {
    return (
        <group {...props}>
            {/* Base (Star) */}
            <group position={[0, 0.1, 0]}>
                {[0, 72, 144, 216, 288].map((angle, i) => (
                    <mesh key={i} rotation={[0, (angle * Math.PI) / 180, 0]} position={[0, 0, 0]}>
                        <boxGeometry args={[0.05, 0.05, 0.35]} />
                        <meshStandardMaterial color="#222" metalness={0.8} />
                        <mesh position={[0, -0.05, 0.15]}>
                            <cylinderGeometry args={[0.03, 0.03, 0.05]} />
                            <meshStandardMaterial color="#111" />
                        </mesh>
                    </mesh>
                ))}
            </group>

            {/* Central Column */}
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Seat */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.5]} />
                <meshStandardMaterial color="#111" roughness={0.5} />
            </mesh>
            {/* Seat Cushion Accent */}
            <mesh position={[0, 0.51, 0]} scale={[0.9, 1, 0.9]}>
                <boxGeometry args={[0.5, 0.1, 0.5]} />
                <meshStandardMaterial color="#a00" roughness={0.5} />
            </mesh>

            {/* Backrest */}
            <group position={[0, 1.0, -0.2]} rotation={[-0.1, 0, 0]}>
                {/* Main Back */}
                <mesh>
                    <boxGeometry args={[0.5, 0.9, 0.1]} />
                    <meshStandardMaterial color="#111" roughness={0.5} />
                </mesh>
                {/* Wings */}
                <mesh position={[-0.25, 0, 0.05]} rotation={[0, 0.4, 0]}>
                    <boxGeometry args={[0.15, 0.8, 0.05]} />
                    <meshStandardMaterial color="#a00" />
                </mesh>
                <mesh position={[0.25, 0, 0.05]} rotation={[0, -0.4, 0]}>
                    <boxGeometry args={[0.15, 0.8, 0.05]} />
                    <meshStandardMaterial color="#a00" />
                </mesh>
                {/* Headrest */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[0.3, 0.2, 0.1]} />
                    <meshStandardMaterial color="#a00" />
                </mesh>
            </group>

            {/* Armrests */}
            <mesh position={[-0.3, 0.7, 0]}>
                <boxGeometry args={[0.05, 0.4, 0.05]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[-0.3, 0.9, 0]}>
                <boxGeometry args={[0.08, 0.05, 0.4]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            <mesh position={[0.3, 0.7, 0]}>
                <boxGeometry args={[0.05, 0.4, 0.05]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.3, 0.9, 0]}>
                <boxGeometry args={[0.08, 0.05, 0.4]} />
                <meshStandardMaterial color="#333" />
            </mesh>

        </group>
    )
}
