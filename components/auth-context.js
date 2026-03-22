import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const identityRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    import("netlify-identity-widget")
      .then(mod => {
        const netlifyIdentity = mod.default || mod
        identityRef.current = netlifyIdentity
        netlifyIdentity.init()
        setUser(netlifyIdentity.currentUser())
        setReady(true)

        netlifyIdentity.on("login", u => {
          setUser(u)
          netlifyIdentity.close()
        })
        netlifyIdentity.on("logout", () => setUser(null))
      })
      .catch(() => {
        setReady(true)
      })

    return () => {
      if (identityRef.current) {
        identityRef.current.off("login")
        identityRef.current.off("logout")
      }
    }
  }, [])

  const login = useCallback(() => {
    if (identityRef.current) identityRef.current.open()
  }, [])

  const logout = useCallback(() => {
    if (identityRef.current) identityRef.current.logout()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, ready }}
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
