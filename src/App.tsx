import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Scene } from './components/canvas/Scene'
import { Room } from './components/canvas/Room'
import { Desk } from './components/canvas/Desk'
import { InteractiveElements } from './components/canvas/InteractiveElements'
import { OverlayProvider } from './context/OverlayContext'
import { MusicProvider } from './context/MusicContext'
import { Overlay } from './components/ui/Overlay'
import { LoadingScreen } from './components/ui/LoadingScreen'

function App() {
  return (
    <OverlayProvider>
      <MusicProvider>
        <Overlay />
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 4], fov: 50 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050510']} />
          <Suspense fallback={<LoadingScreen />}>
            <Scene />
            <Room />
            <Desk />
            <InteractiveElements />
            <OrbitControls
              target={[0, 1, 0]}
              maxPolarAngle={Math.PI / 1.5}
              minDistance={1}
              maxDistance={5}
            />
          </Suspense>
        </Canvas>
      </MusicProvider>
    </OverlayProvider>
  )
}

export default App
