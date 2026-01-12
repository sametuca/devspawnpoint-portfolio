import { useMemo } from 'react'

type MonitorProps = {
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
    type?: 'code' | 'terminal' | 'web'
}

export const Monitor = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, type = 'code' }: MonitorProps) => {

    const screenColor = useMemo(() => {
        switch (type) {
            case 'code': return '#1e1e1e' // VS Code Dark
            case 'terminal': return '#0c0c0c' // Terminal Black
            case 'web': return '#ffffff' // White browser
            default: return '#000'
        }
    }, [type])

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Stand Base */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Stand Neck */}
            <mesh position={[0, -0.3, -0.1]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
                <meshStandardMaterial color="#222" metalness={0.8} />
            </mesh>

            {/* Monitor Frame */}
            <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[1.8, 1, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0.6, 0.06]}>
                <planeGeometry args={[1.7, 0.9]} />
                <meshStandardMaterial
                    color={screenColor}
                    emissive={screenColor}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    )
}
