import { useEffect, useRef, useState } from 'react'

type SnakeGameProps = {
    onClose: () => void
}

export const SnakeGame = ({ onClose }: SnakeGameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const gridSize = 20
        const tileCount = 20
        let snake = [{ x: 10, y: 10 }]
        let food = { x: 15, y: 15 }
        let dx = 0
        let dy = 0
        let currentScore = 0

        const drawGame = () => {
            if (gameOver) return

            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy }

            // Check wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                setGameOver(true)
                return
            }

            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true)
                return
            }

            snake.unshift(head)

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                currentScore += 10
                setScore(currentScore)
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                }
            } else {
                snake.pop()
            }

            // Clear canvas
            ctx.fillStyle = '#1a1a2e'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw snake
            ctx.fillStyle = '#00ff00'
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
            })

            // Draw food
            ctx.fillStyle = '#ff0000'
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (dy === 0) { dx = 0; dy = -1 }
                    break
                case 'ArrowDown':
                    if (dy === 0) { dx = 0; dy = 1 }
                    break
                case 'ArrowLeft':
                    if (dx === 0) { dx = -1; dy = 0 }
                    break
                case 'ArrowRight':
                    if (dx === 0) { dx = 1; dy = 0 }
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        const gameLoop = setInterval(drawGame, 150)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            clearInterval(gameLoop)
        }
    }, [gameOver])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#2d2d3a',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <h2 style={{ color: '#00ff00', margin: 0 }}>Snake Game</h2>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#ff0000',
                            color: 'white',
                            border: 'none',
                            padding: '5px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        ✕
                    </button>
                </div>
                <div style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>
                    Score: {score}
                </div>
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    style={{ border: '2px solid #00ff00', display: 'block' }}
                />
                {gameOver && (
                    <div style={{
                        color: '#ff0000',
                        textAlign: 'center',
                        marginTop: '10px',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>
                        Game Over! Press ESC to close
                    </div>
                )}
                <div style={{
                    color: '#888',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '12px'
                }}>
                    Use Arrow Keys to play
                </div>
            </div>
        </div>
    )
}
