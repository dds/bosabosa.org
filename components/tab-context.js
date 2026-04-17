import { createContext, useContext, useState, useEffect, useCallback } from "react"

const tabs = [
  { id: "blog", label: "Blog" },
  { id: "dashboard", label: "Dashboard", url: "https://dash.typo.army/d/home-overview/home-overview?kiosk" },
]

const tabIds = new Set(tabs.map(t => t.id))

function getTabFromHash() {
  if (typeof window === "undefined") return "blog"
  const hash = window.location.hash.slice(1)
  return tabIds.has(hash) ? hash : "blog"
}

const TabContext = createContext(null)

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState(getTabFromHash)

  useEffect(() => {
    const onHashChange = () => setActiveTab(getTabFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const switchTab = useCallback(id => {
    window.location.hash = id === "blog" ? "" : id
    setActiveTab(id)
  }, [])

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
