import { useEffect, useRef } from "react"

const useClickOutside = <T extends HTMLElement>(callback: () => void, ignore: string[] = []) => {
    const ref = useRef<T>(null)
    useEffect(() => {
        const handleClick = (event: globalThis.MouseEvent) => {
            const target = event.target as HTMLElement
            
            if (ignore.includes(target.id))
                return
            if (!ref.current!.contains(target))
                callback()
        }
        window.addEventListener('mousedown', handleClick)
        return () => window.removeEventListener('mousedown', handleClick)
    }, [])

    return ref
}

export default useClickOutside;