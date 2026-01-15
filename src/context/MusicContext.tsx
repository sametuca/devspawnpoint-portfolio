import { createContext, useContext, useState, type ReactNode } from 'react'

type MusicContextType = {
    musicActive: boolean
    setMusicActive: (active: boolean) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [musicActive, setMusicActive] = useState(false)

    return (
        <MusicContext.Provider value={{ musicActive, setMusicActive }}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => {
    const context = useContext(MusicContext)
    if (!context) throw new Error('useMusic must be used within MusicProvider')
    return context
}
