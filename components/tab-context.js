import { createContext, useContext, useState, useCallback } from "react"

const tabs = [
  { id: "home", label: "Home" },
  { id: "blog", label: "Blog" },
  { id: "dashboard", label: "Dashboard", url: "https://dash.bosabosa.org" },
]

const TabContext = createContext(null)

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState("home")

  const switchTab = useCallback(id => setActiveTab(id), [])

  return (
    <TabContext.Provider value={{ activeTab, switchTab, tabs }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab() {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error("useTab must be used within TabProvider")
  return ctx
}
