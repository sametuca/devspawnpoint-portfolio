import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

export const MatrixScreen = () => {
    // Very tight bounds to prevent overflow
    const columns = 12
    const rows = 6

    const chars = "01"

    const streams = useMemo(() => {
        return Array.from({ length: columns }).map((_, i) => ({
            // X constrained to 1.4 (screen is 1.7, bezels at ~0.85)
            x: (i / columns) * 1.3 - 0.65,
            speed: Math.random() * 0.2 + 0.1,
            offset: Math.random() * 10
        }))
    }, [])

    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        const t = state.clock.getElapsedTime()

        groupRef.current.children.forEach((child, i) => {
            const stream = streams[i]
            // Y constrained to stay within 0.35 (screen is 0.9, half is 0.45)
            child.position.y = 0.3 - ((t * stream.speed + stream.offset) % 0.6) * 0.55
        })
    })

    return (
        <group ref={groupRef}>
            {streams.map((stream, i) => (
                <Text
                    key={i}
                    position={[stream.x, 0, 0]}
                    fontSize={0.035}
                    color="#00ff00"
                    anchorY="top"
                    anchorX="center"
                >
                    {Array.from({ length: rows }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('\n')}
                </Text>
            ))}
        </group>
    )
}
