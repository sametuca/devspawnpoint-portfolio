import { createContext, useContext, useState, type ReactNode } from 'react'

type OverlayType = 'none' | 'projects' | 'cv' | 'contact' | 'terminal' | 'certificates'

interface OverlayContextType {
    overlay: OverlayType
    setOverlay: (type: OverlayType) => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
    const [overlay, setOverlay] = useState<OverlayType>('none')

    return (
        <OverlayContext.Provider value={{ overlay, setOverlay }}>
            {children}
        </OverlayContext.Provider>
    )
}

export const useOverlay = () => {
    const context = useContext(OverlayContext)
    if (!context) {
        throw new Error('useOverlay must be used within an OverlayProvider')
    }
    return context
}
