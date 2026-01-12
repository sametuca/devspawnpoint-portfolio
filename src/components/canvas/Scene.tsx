import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

export const Scene = () => {
    return (
        <>
            {/* Base Lighting - Dim and Mood Setting */}
            <ambientLight intensity={0.5} color="#4a4a6adb" />
            <pointLight position={[0, 2, 0]} intensity={1.0} color="#faa" distance={5} />

            {/* Subtle Environment reflections */}
            <Environment preset="city" environmentIntensity={0.2} />

            {/* Post Processing for Cyberpunk Feel */}
            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    )
}
