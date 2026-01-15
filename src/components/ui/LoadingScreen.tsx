import { Html, useProgress } from '@react-three/drei'
import { useEffect, useState, useMemo } from 'react'
import './LoadingScreen.css'

const loadingTips = [
    "💡 Click on monitors to interact with apps",
    "🖱️ Use scroll to zoom in/out",
    "🎮 Try clicking on the TV for a surprise!",
    "💡 Left click + drag to rotate the view",
    "🎄 Click the Christmas tree for Santa!",
    "☕ Click the coffee cup for an effect",
]

const getStatusMessage = (progress: number): string => {
    if (progress < 20) return "Loading 3D models..."
    if (progress < 40) return "Preparing textures..."
    if (progress < 60) return "Setting up lighting..."
    if (progress < 80) return "Building the room..."
    if (progress < 95) return "Final touches..."
    return "Almost ready!"
}

const LoadingProgress = () => {
    const { progress, active, loaded, total } = useProgress()
    const [displayProgress, setDisplayProgress] = useState(0)
    const [tipIndex, setTipIndex] = useState(0)

    const statusMessage = useMemo(() => getStatusMessage(progress), [progress])

    useEffect(() => {
        setDisplayProgress(progress)
    }, [progress])

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % loadingTips.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    if (!active && displayProgress >= 100) return null

    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-icon">
                    <div className="cube">
                        <div className="face front"></div>
                        <div className="face back"></div>
                        <div className="face right"></div>
                        <div className="face left"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                    </div>
                </div>
                <h2 className="loading-title">DevSpawnPoint</h2>
                <p className="status-message">{statusMessage}</p>
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>
                <p className="loading-text">{displayProgress.toFixed(0)}% loaded</p>
                {total > 0 && (
                    <p className="loading-items">Loading asset {loaded} of {total}</p>
                )}
                <div className="loading-tip">
                    <p>{loadingTips[tipIndex]}</p>
                </div>
            </div>
        </div>
    )
}

export const LoadingScreen = () => {
    return (
        <Html fullscreen>
            <LoadingProgress />
        </Html>
    )
}

