import { createContext, useContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleIdentity = () => {
      const identity = window.netlifyIdentity
      if (!identity) return
      identity.on("init", u => setUser(u))
      identity.on("login", u => {
        setUser(u)
        identity.close()
      })
      identity.on("logout", () => setUser(null))
      identity.init()
      // Also check synchronously in case init event already fired
      const current = identity.currentUser()
      if (current) setUser(current)
    }

    if (window.netlifyIdentity) {
      handleIdentity()
    }
    // Always listen — the script may load after this effect runs
    document.addEventListener("netlifyIdentityReady", handleIdentity)
    return () =>
      document.removeEventListener("netlifyIdentityReady", handleIdentity)
  }, [])

  const login = useCallback(() => {
    window.netlifyIdentity?.open()
  }, [])

  const logout = useCallback(() => {
    window.netlifyIdentity?.logout()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
