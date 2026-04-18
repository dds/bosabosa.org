import { useEffect } from "react"
import { useRouter } from "next/router"

export default function WebMCP() {
  const router = useRouter()

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return

    const controller = new AbortController()

    navigator.modelContext.registerTool({
      name: "get_page_content",
      description:
        "Get the main text content of the current page as markdown-friendly text",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const article = document.querySelector("article")
        if (article) return article.innerText
        const main = document.querySelector("main")
        if (main) return main.innerText
        return document.body.innerText
      },
      signal: controller.signal,
    })

    navigator.modelContext.registerTool({
      name: "list_blog_posts",
      description: "List all blog posts with titles, dates, and links",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const res = await fetch("/api/markdown/news", {
          headers: { Accept: "text/markdown" },
        })
        return res.text()
      },
      signal: controller.signal,
    })

    navigator.modelContext.registerTool({
      name: "navigate_to",
      description: "Navigate to a page on this site by path (e.g. /news/my-post)",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "The path to navigate to, e.g. /news or /news/my-post",
          },
        },
        required: ["path"],
      },
      execute: async input => {
        router.push(input.path)
        return `Navigated to ${input.path}`
      },
      signal: controller.signal,
    })

    return () => controller.abort()
  }, [router])

  return null
}
