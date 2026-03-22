import { createContext, useContext, useState, useEffect, useCallback } from "react"

const FontModeContext = createContext(null)

const STORAGE_KEY = "theme-ui-font-mode"

export function FontModeProvider({ children }) {
  const [fontMode, setFontMode] = useState("sans")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "serif" || stored === "sans") setFontMode(stored)
  }, [])

  const toggleFontMode = useCallback(() => {
    setFontMode(prev => {
      const next = prev === "sans" ? "serif" : "sans"
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return (
    <FontModeContext.Provider value={{ fontMode, toggleFontMode }}>
      {children}
    </FontModeContext.Provider>
  )
}

export function useFontMode() {
  const ctx = useContext(FontModeContext)
  if (!ctx) throw new Error("useFontMode must be used within FontModeProvider")
  return ctx
}
