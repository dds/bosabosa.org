import { useEffect } from "react"
import { useRouter } from "next/router"

export default function useKeyboardNav({ left, right, escape }) {
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return

      switch (e.key) {
        case "ArrowLeft":
        case "h":
          if (left) router.push(left)
          break
        case "ArrowRight":
        case "l":
          if (right) router.push(right)
          break
        case "Escape":
          if (escape) router.push(escape)
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [router, left, right, escape])
}
