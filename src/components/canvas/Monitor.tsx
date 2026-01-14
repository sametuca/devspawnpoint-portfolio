import { useMemo, useState, useEffect, useRef } from 'react'
import { Text, Image, Html } from '@react-three/drei'
import { useOverlay } from '../../context/OverlayContext'
import { useMusic } from '../../context/MusicContext'
import { MatrixScreen } from './MatrixScreen'
// import * as THREE from 'three' // Removed unused import

type MonitorProps = {
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
    type?: 'code' | 'terminal' | 'web'
    orientation?: 'landscape' | 'portrait'
}

// Desktop Icon Component
const DesktopIcon = ({
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
                    <planeGeometry args={[0.25, 0.3]} />
                    <meshBasicMaterial color="#4488ff" transparent opacity={0.3} />
                </mesh>
            )}
            <Image url={iconUrl} scale={0.15} position={[0, 0.05, 0]} transparent />
            <Text
                fontSize={0.04}
                color="white"
                position={[0, -0.08, 0]}
                anchorX="center"
                outlineWidth={0.002}
                outlineColor="#000"
            >
                {label}
            </Text>
        </group>
    )
}

export const Monitor = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, type = 'code', orientation = 'landscape' }: MonitorProps) => {
    const { setOverlay } = useOverlay()
    const { musicActive, setMusicActive } = useMusic()
    const [hovered, setHover] = useState(false)
    const [gameActive, setGameActive] = useState(false)
    const [snake, setSnake] = useState([{ x: 10, y: 10 }])
    const [food, setFood] = useState({ x: 15, y: 15 })
    // const [direction, setDirection] = useState({ x: 0, y: 0 }) // Removed unused state
    const [score, setScore] = useState(0)
    const directionRef = useRef({ x: 0, y: 0 })

    const screenData = useMemo(() => {
        switch (type) {
            case 'code': return { color: '#1a1a2e', wallpaper: true }
            case 'terminal': return { color: '#000010', wallpaper: false }
            case 'web': return { color: '#0f3460', wallpaper: true }
            default: return { color: '#000', wallpaper: false }
        }
    }, [type])

    const isPortrait = orientation === 'portrait'
    const headY = isPortrait ? 0.3 : 0.3
    const headRotation = isPortrait ? [0, 0, -Math.PI / 2] : [0, 0, 0]

    useEffect(() => {
        if (!gameActive) return

        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y === 0) directionRef.current = { x: 0, y: -1 }
                    break
                case 'ArrowDown':
                    if (directionRef.current.y === 0) directionRef.current = { x: 0, y: 1 }
                    break
                case 'ArrowLeft':
                    if (directionRef.current.x === 0) directionRef.current = { x: -1, y: 0 }
                    break
                case 'ArrowRight':
                    if (directionRef.current.x === 0) directionRef.current = { x: 1, y: 0 }
                    break
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [gameActive])

    useEffect(() => {
        if (!gameActive) return

        const interval = setInterval(() => {
            if (directionRef.current.x === 0 && directionRef.current.y === 0) return

            setSnake(prev => {
                const head = { x: prev[0].x + directionRef.current.x, y: prev[0].y + directionRef.current.y }

                if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(s => s.x === head.x && s.y === head.y)) {
                    setGameActive(false)
                    setSnake([{ x: 10, y: 10 }])
                    // setDirection({ x: 0, y: 0 })
                    directionRef.current = { x: 0, y: 0 }
                    setScore(0)
                    return [{ x: 10, y: 10 }]
                }

                const newSnake = [head, ...prev]

                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10)
                    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) })
                } else {
                    newSnake.pop()
                }

                return newSnake
            })
        }, 150)

        return () => clearInterval(interval)
    }, [gameActive, food])

    return (
        <group
            position={position}
            rotation={rotation as any}
            scale={scale}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
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

            {/* Monitor Head */}
            <group position={[0, headY, 0] as any} rotation={headRotation as any}>
                {/* Back Plate */}
                <mesh>
                    <boxGeometry args={[1.8, 1, 0.1]} />
                    <meshStandardMaterial color={hovered ? "#333" : "#111"} />
                </mesh>

                {/* Screen Plane */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[1.7, 0.9]} />
                    <meshStandardMaterial
                        color={screenData.color}
                        emissive={screenData.color}
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* Music Player */}
                {musicActive && type === 'code' && (
                    <group>
                        <Html position={[0, 0, 0.07]} transform occlude distanceFactor={0.55}>
                            <div style={{ width: '560px', height: '314px', background: '#000', overflow: 'hidden', pointerEvents: 'auto' }}>
                                <iframe
                                    width="560"
                                    height="314"
                                    src="https://www.youtube.com/embed/YVowLNuV4Zk?autoplay=1&start=214"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </Html>
                        <mesh position={[0.75, 0.4, 0.07]} onClick={(e) => { e.stopPropagation(); setMusicActive(false) }}>
                            <planeGeometry args={[0.08, 0.08]} />
                            <meshBasicMaterial color="#ff0000" />
                        </mesh>
                        <Text position={[0.75, 0.4, 0.071]} fontSize={0.05} color="white" anchorX="center">
                            ✕
                        </Text>
                    </group>
                )}

                {/* Desktop Icons - Code Monitor (Tech Logos) */}
                {type === 'code' && !gameActive && !musicActive && (
                    <group position={[0, 0, 0.07]}>
                        <DesktopIcon
                            position={[-0.6, 0.25, 0]}
                            iconUrl="/textures/logos/reactlogo.webp"
                            label="React"
                            onClick={() => window.open('https://react.dev', '_blank')}
                        />
                        <DesktopIcon
                            position={[-0.3, 0.25, 0]}
                            iconUrl="/textures/logos/typescriptlogo.png"
                            label="TypeScript"
                            onClick={() => window.open('https://typescriptlang.org', '_blank')}
                        />
                        <DesktopIcon
                            position={[0, 0.25, 0]}
                            iconUrl="/textures/logos/nodejslogo.png"
                            label="Node.js"
                            onClick={() => window.open('https://nodejs.org', '_blank')}
                        />
                        <DesktopIcon
                            position={[0.3, 0.25, 0]}
                            iconUrl="/textures/logos/threejslogo.png"
                            label="Three.js"
                            onClick={() => window.open('https://threejs.org', '_blank')}
                        />
                        <DesktopIcon
                            position={[-0.6, -0.05, 0]}
                            iconUrl="/textures/logos/nextjslogo.webp"
                            label="Next.js"
                            onClick={() => window.open('https://nextjs.org', '_blank')}
                        />
                    </group>
                )}

                {/* Desktop Icons - Web Monitor (GitHub & Medium) */}
                {type === 'web' && !gameActive && (
                    <group position={[0, 0, 0.07]}>
                        <DesktopIcon
                            position={[-0.6, 0.2, 0]}
                            iconUrl="/textures/logos/githublogo.png"
                            label="GitHub"
                            onClick={() => window.open('https://github.com/sametuca', '_blank')}
                        />
                        <DesktopIcon
                            position={[-0.2, 0.2, 0]}
                            iconUrl="/textures/logos/mediumlogo.png"
                            label="Medium"
                            onClick={() => window.open('https://medium.com/@sametuca', '_blank')}
                        />
                        <DesktopIcon
                            position={[0.2, 0.2, 0]}
                            iconUrl="/textures/logos/certificatelogo.png"
                            label="Certificate"
                            onClick={() => setOverlay('certificates')}
                        />
                        <DesktopIcon
                            position={[0.6, 0.2, 0]}
                            iconUrl="/textures/logos/contactlogo.png"
                            label="About"
                            onClick={() => setOverlay('contact')}
                        />
                    </group>
                )}

                {/* Snake Game on Screen */}
                {gameActive && screenData.wallpaper && (
                    <group position={[0, 0.05, 0.07]}>
                        {/* Instructions */}
                        {directionRef.current.x === 0 && directionRef.current.y === 0 && (
                            <Text position={[0, 0, 0]} fontSize={0.06} color="#00ff00" anchorX="center">
                                Press Arrow Keys to Start
                            </Text>
                        )}
                        {/* Game Grid */}
                        {snake.map((segment, i) => (
                            <mesh key={`snake-${i}`} position={[(segment.x - 10) * 0.08, (10 - segment.y) * 0.04, 0]}>
                                <planeGeometry args={[0.075, 0.037]} />
                                <meshBasicMaterial color="#00ff00" />
                            </mesh>
                        ))}
                        <mesh position={[(food.x - 10) * 0.08, (10 - food.y) * 0.04, 0]}>
                            <planeGeometry args={[0.075, 0.037]} />
                            <meshBasicMaterial color="#ff0000" />
                        </mesh>
                        <Text position={[0, 0.4, 0]} fontSize={0.05} color="#00ff00" anchorX="center">
                            Score: {score}
                        </Text>
                    </group>
                )}

                {/* Matrix Effect for Terminal - Clickable for Gemini Chat */}
                {type === 'terminal' && (
                    <group position={[0, 0, 0.07]}>
                        {/* Full screen clickable area */}
                        <mesh
                            position={[0, 0, -0.01]}
                            onClick={(e) => { e.stopPropagation(); setOverlay('terminal') }}
                        >
                            <planeGeometry args={[1.7, 0.9]} />
                            <meshBasicMaterial transparent opacity={0} />
                        </mesh>
                        <MatrixScreen />
                        {/* Gemini Label */}
                        <Text
                            position={[0, 0.35, 0.01]}
                            fontSize={0.08}
                            color="#00ffff"
                            anchorX="center"
                            outlineWidth={0.003}
                            outlineColor="#000"
                        >
                            Gemini AI
                        </Text>
                    </group>
                )}

                {/* Taskbar (bottom of screen) */}
                {screenData.wallpaper && (
                    <>
                        <mesh position={[0, -0.42, 0.065]}>
                            <planeGeometry args={[1.7, 0.06]} />
                            <meshBasicMaterial color="#1f1f1f" opacity={0.95} transparent />
                        </mesh>
                        {/* Start Button */}
                        <mesh position={[-0.78, -0.42, 0.066]} onClick={(e) => { e.stopPropagation(); setGameActive(true) }}>
                            <planeGeometry args={[0.12, 0.05]} />
                            <meshBasicMaterial color="#0078d4" />
                        </mesh>
                        <Text position={[-0.78, -0.42, 0.067]} fontSize={0.03} color="white" anchorX="center">
                            ⊞
                        </Text>
                        {/* Taskbar Icons */}
                        {[-0.6, -0.5, -0.4].map((x, i) => (
                            <mesh key={i} position={[x, -0.42, 0.066]}>
                                <planeGeometry args={[0.04, 0.04]} />
                                <meshBasicMaterial color={['#e74c3c', '#3498db', '#2ecc71'][i]} />
                            </mesh>
                        ))}
                        {/* System Tray */}
                        <Text position={[0.75, -0.42, 0.066]} fontSize={0.025} color="#ccc" anchorX="right">
                            12:34
                        </Text>
                    </>
                )}

                {/* Physical Bezel */}
                <group position={[0, 0, 0.08]}>
                    <mesh position={[0, 0.475, 0]}>
                        <boxGeometry args={[1.8, 0.05, 0.02]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[0, -0.475, 0]}>
                        <boxGeometry args={[1.8, 0.05, 0.02]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[-0.875, 0, 0]}>
                        <boxGeometry args={[0.05, 0.9, 0.02]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[0.875, 0, 0]}>
                        <boxGeometry args={[0.05, 0.9, 0.02]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>
            </group>
        </group>
    )
}
