/** @jsxImportSource theme-ui */
import { useState, useCallback, useRef, useEffect, Children } from "react"

function getLanguage(children) {
  const child = Children.toArray(children)[0]
  return child?.props?.["data-language"] || null
}

const CODEPEN_JS = new Set([
  "js",
  "jsx",
  "javascript",
  "ts",
  "tsx",
  "typescript",
])
const CODEPEN_CSS = new Set(["css"])
const CODEPEN_HTML = new Set(["html"])
const GO_LANGS = new Set(["go", "golang"])
const GODBOLT_MAP = { c: "c", cpp: "c++", rust: "rust" }
const MARKDOWN_LANGS = new Set(["md", "markdown"])

function openCodePen(code, lang) {
  const data = {}
  if (CODEPEN_CSS.has(lang)) {
    data.css = code
  } else if (CODEPEN_HTML.has(lang)) {
    data.html = code
  } else {
    data.js = code
    if (["ts", "tsx", "typescript"].includes(lang)) {
      data.js_pre_processor = "typescript"
    }
  }
  const form = document.createElement("form")
  form.method = "POST"
  form.action = "https://codepen.io/pen/define/"
  form.target = "_blank"
  const input = document.createElement("input")
  input.type = "hidden"
  input.name = "data"
  input.value = JSON.stringify(data)
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

function openGoPlayground(code) {
  navigator.clipboard.writeText(code)
  window.open("https://go.dev/play/", "_blank")
  return "copied"
}

async function openGodbolt(code, lang) {
  const godboltLang = GODBOLT_MAP[lang]
  if (!godboltLang) return
  try {
    const res = await fetch("https://godbolt.org/api/shortener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sessions: [
          { id: 1, language: godboltLang, source: code, compilers: [] },
        ],
      }),
    })
    const { url } = await res.json()
    window.open(url, "_blank")
  } catch {
    navigator.clipboard.writeText(code)
    window.open("https://godbolt.org/", "_blank")
    return "copied"
  }
}

function getPlayground(lang) {
  if (!lang) return null
  const l = lang.toLowerCase()
  if (CODEPEN_JS.has(l) || CODEPEN_CSS.has(l) || CODEPEN_HTML.has(l)) {
    return { label: "CodePen", open: code => openCodePen(code, l) }
  }
  if (GO_LANGS.has(l)) {
    return { label: "Go Play", open: openGoPlayground }
  }
  if (GODBOLT_MAP[l]) {
    return { label: "Godbolt", open: code => openGodbolt(code, l) }
  }
  return null
}

const btnSx = {
  bg: "muted",
  color: "text",
  border: "1px solid",
  borderColor: "border",
  fontFamily: "mono",
  fontSize: 0,
  px: 2,
  py: 1,
  borderRadius: 4,
  cursor: "pointer",
  opacity: 0.7,
  transition: "opacity 0.15s",
  ":hover": { opacity: 1 },
  lineHeight: 1,
}

function MarkdownPreview({ getCode }) {
  const [html, setHtml] = useState("")
  useEffect(() => {
    import("marked").then(({ marked }) => setHtml(marked.parse(getCode())))
  }, [getCode])
  return (
    <div
      sx={{
        variant: "styles.root",
        p: 3,
        bg: "background",
        border: "1px solid",
        borderColor: "border",
        borderRadius: 6,
        mb: 3,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function CodeBlock({ children, style: _shikiStyle, ...rest }) {
  const [copied, setCopied] = useState(false)
  const [pgCopied, setPgCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const preRef = useRef(null)

  const lang = getLanguage(children)
  const playground = getPlayground(lang)
  const isMarkdown = MARKDOWN_LANGS.has(lang)

  const getCode = useCallback(() => preRef.current?.textContent || "", [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(getCode()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [getCode])

  const handlePlayground = useCallback(async () => {
    const result = await playground?.open(getCode())
    if (result === "copied") {
      setPgCopied(true)
      setTimeout(() => setPgCopied(false), 2000)
    }
  }, [getCode, playground])

  return (
    <div sx={{ position: "relative" }}>
      <div
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
          display: "flex",
          gap: 1,
          zIndex: 1,
        }}
      >
        <button type="button" sx={btnSx} onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
        {isMarkdown && (
          <button
            type="button"
            sx={btnSx}
            onClick={() => setShowPreview(p => !p)}
          >
            {showPreview ? "Source" : "Preview"}
          </button>
        )}
        {playground && (
          <button type="button" sx={btnSx} onClick={handlePlayground}>
            {pgCopied ? "Copied!" : playground.label}
          </button>
        )}
      </div>
      <pre
        {...rest}
        ref={preRef}
        sx={{
          variant: "styles.pre",
          display: showPreview ? "none" : undefined,
        }}
      >
        {children}
      </pre>
      {showPreview && (
        <MarkdownPreview getCode={getCode} />
      )}
    </div>
  )
}
