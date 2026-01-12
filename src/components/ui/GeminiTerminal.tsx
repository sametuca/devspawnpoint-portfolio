import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { motion } from 'framer-motion'
import { Send, Terminal as TerminalIcon } from 'lucide-react'

// WARNING: In a production app, you should never expose your API key on the client.
// Especially for a contest, using a proxy or asking the user to input their key is safer.
// For this demo, we'll ask the user to input it or use a placeholder.

export const GeminiTerminal = () => {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: "Initializing Portfolio AI Protocol... [OK]\nHello! I am the AI assistant for this developer. Ask me anything about their projects, skills, or experience." }
    ])
    const [loading, setLoading] = useState(false)
    const [apiKey, setApiKey] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [history])

    const handleSend = async () => {
        if (!input.trim()) return
        if (!apiKey) {
            setHistory(prev => [...prev, { role: 'user', text: input }, { role: 'model', text: "Error: Please enter a valid Google Gemini API Key to enable my neural link." }])
            setInput('')
            return
        }

        const userMsg = input
        setInput('')
        setHistory(prev => [...prev, { role: 'user', text: userMsg }])
        setLoading(true)

        try {
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

            const systemPrompt = `
                You are an advanced AI assistant representing a Creative Frontend Developer named 'The Developer'. 
                Style: Cyberpunk, technical but friendly, slightly witty.
                Context:
                - Skills: React, Three.js, TypeScript, Next.js, Node.js, Tailwind CSS.
                - Project Alpha: A 3D web experience.
                - Project Beta: Next-gen e-commerce.
                - Experience: Senior Dev @ Tech Corp (5 years).
                
                Keep responses concise and formatted for a terminal interface.
            `

            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: systemPrompt }] },
                    { role: "model", parts: [{ text: "System Online. Ready to process queries." }] }
                ]
            })

            const result = await chat.sendMessage(userMsg)
            const response = await result.response
            const text = response.text()

            setHistory(prev => [...prev, { role: 'model', text: text }])
        } catch (error) {
            setHistory(prev => [...prev, { role: 'model', text: "Connection Fault: Unable to reach Gemini servers. Please check your API Key." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full flex flex-col font-mono text-sm md:text-base">
            <div className="flex items-center space-x-2 p-4 border-b border-green-900/50 bg-black/80">
                <TerminalIcon className="text-green-500" size={20} />
                <span className="text-green-500 font-bold tracking-wider">GEMINI_LINK_V2.0</span>
                {!apiKey && (
                    <input
                        type="password"
                        placeholder="Enter Gemini API Key"
                        className="ml-auto bg-black border border-green-800 text-green-500 px-2 py-1 text-xs focus:outline-none focus:border-green-500 rounded"
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/90 text-green-400 custom-scrollbar">
                {history.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded ${msg.role === 'user' ? 'bg-green-900/20 text-green-300' : 'bg-transparent text-green-400'}`}>
                            <span className="font-bold mr-2">{msg.role === 'user' ? '> USER:' : '> AI:'}</span>
                            <span className="whitespace-pre-wrap">{msg.text}</span>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="text-green-500 animate-pulse">&gt; Processing...</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-black/80 border-t border-green-900/50 flex space-x-2">
                <span className="text-green-500 py-2">{'>'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={apiKey ? "Enter command..." : "Input API Key via top bar to enable Neural Link..."}
                    className="flex-1 bg-transparent text-green-400 focus:outline-none placeholder-green-800"
                    autoFocus
                />
                <button onClick={handleSend} className="text-green-500 hover:text-green-400 transition">
                    <Send size={20} />
                </button>
            </div>
        </div>
    )
}
