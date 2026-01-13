import { useOverlay } from '../../context/OverlayContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GeminiTerminal } from './GeminiTerminal'

export const Overlay = () => {
    const { overlay, setOverlay } = useOverlay()

    const content = {
        projects: (
            <div className="p-8">
                <h2 className="text-4xl font-bold mb-6 text-cyan-400">PROJECTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/50 p-4 border border-cyan-500/30 rounded hover:border-cyan-400 transition cursor-pointer group">
                        <div className="h-32 bg-cyan-900/20 mb-4 rounded flex items-center justify-center">
                            <span className="text-cyan-500 font-mono text-4xl group-hover:scale-110 transition">01</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Project Alpha</h3>
                        <p className="text-gray-300 mt-2 text-sm">A revolutionary 3D web experience built with Three.js.</p>
                        <div className="flex gap-2 mt-4">
                            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">React</span>
                            <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">WebGL</span>
                        </div>
                    </div>
                    <div className="bg-black/50 p-4 border border-purple-500/30 rounded hover:border-purple-400 transition cursor-pointer group">
                        <div className="h-32 bg-purple-900/20 mb-4 rounded flex items-center justify-center">
                            <span className="text-purple-500 font-mono text-4xl group-hover:scale-110 transition">02</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Project Beta</h3>
                        <p className="text-gray-300 mt-2 text-sm">Next-gen e-commerce platform with AI recommendations.</p>
                        <div className="flex gap-2 mt-4">
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">Next.js</span>
                            <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">Gemini</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        cv: (
            <div className="p-8">
                <h2 className="text-4xl font-bold mb-6 text-green-400">RESUME</h2>
                <div className="space-y-8 text-gray-200">
                    <div className="border-l-2 border-green-500 pl-4">
                        <h3 className="text-2xl font-bold text-white">Senior Creative Developer</h3>
                        <p className="text-green-400">Tech Corp | 2020 - Present</p>
                        <ul className="list-disc list-inside mt-2 text-sm opacity-80 space-y-1">
                            <li>Led the development of 3D product configurators.</li>
                            <li>Optimized WebGL performance by 40%.</li>
                            <li>Mentored junior developers in standard React practices.</li>
                        </ul>
                    </div>
                    <div className="border-l-2 border-green-500/50 pl-4">
                        <h3 className="text-2xl font-bold text-white">Frontend Developer</h3>
                        <p className="text-green-400">Digital Agency | 2018 - 2020</p>
                        <p className="mt-2 text-sm opacity-80">Built award-winning microsites for global brands.</p>
                    </div>
                </div>
            </div>
        ),
        contact: (
            <div className="p-8">
                <h2 className="text-4xl font-bold mb-6 text-purple-400">INFO</h2>
                <div className="space-y-6">
                    <div className="bg-black/50 border border-purple-500/30 p-6 rounded">
                        <h3 className="text-3xl font-bold text-white mb-2">Samet Uca</h3>
                        <p className="text-xl text-purple-400 mb-4">Full Stack Developer</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded">JavaScript</span>
                            <span className="text-xs bg-blue-900/50 text-blue-300 px-3 py-1 rounded">TypeScript</span>
                            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-3 py-1 rounded">React</span>
                            <span className="text-xs bg-green-900/50 text-green-300 px-3 py-1 rounded">Node.js</span>
                            <span className="text-xs bg-orange-900/50 text-orange-300 px-3 py-1 rounded">CSS</span>
                            <span className="text-xs bg-pink-900/50 text-pink-300 px-3 py-1 rounded">OOP</span>
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded">Three.js</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/50 border border-purple-500/30 p-4 rounded hover:border-purple-400 transition">
                            <h3 className="text-sm text-gray-400 mb-2">Email</h3>
                            <a href="mailto:sametuca@hotmail.com" className="text-white hover:text-purple-400 transition break-all">sametuca@hotmail.com</a>
                        </div>
                        <div className="bg-black/50 border border-purple-500/30 p-4 rounded hover:border-purple-400 transition">
                            <h3 className="text-sm text-gray-400 mb-2">LinkedIn</h3>
                            <a href="https://linkedin.com/in/sametuca" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition">sametuca</a>
                        </div>
                        <div className="bg-black/50 border border-purple-500/30 p-4 rounded hover:border-purple-400 transition">
                            <h3 className="text-sm text-gray-400 mb-2">Instagram</h3>
                            <a href="https://instagram.com/sametuca" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition">@sametuca</a>
                        </div>
                        <div className="bg-black/50 border border-purple-500/30 p-4 rounded hover:border-purple-400 transition">
                            <h3 className="text-sm text-gray-400 mb-2">Twitter</h3>
                            <a href="https://twitter.com/sametuca_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition">@sametuca_</a>
                        </div>
                    </div>
                </div>
            </div>
        ),
        terminal: <GeminiTerminal />,
        none: null
    }

    return (
        <AnimatePresence>
            {overlay !== 'none' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a12] border border-white/10 rounded-xl shadow-2xl shadow-cyan-500/10"
                    >
                        <button
                            onClick={() => setOverlay('none')}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-10"
                        >
                            <X size={24} />
                        </button>
                        {content[overlay]}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
