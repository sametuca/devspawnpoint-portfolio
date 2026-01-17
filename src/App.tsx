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
import { ErrorBoundary } from './components/ErrorBoundary'

// Preload models for faster loading
import './utils/preloadModels'

function App() {
  return (
    <ErrorBoundary>
      <OverlayProvider>
        <MusicProvider>
          <Overlay />
          <Canvas
            shadows={false} // Shadows disabled for better performance
            camera={{ position: [0, 2.5, 3.5], fov: 50 }}
            dpr={[1, 1.5]} // Adaptive DPR for better quality
            performance={{ min: 0.5 }} // Performance scaling
            frameloop="always" // Always render for smooth model loading
            gl={{
              antialias: true, // Enable for better visual quality
              powerPreference: "high-performance",
              alpha: false,
              stencil: false,
              depth: true
            }}
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
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </MusicProvider>
      </OverlayProvider>
    </ErrorBoundary>
  )
}

export default App
