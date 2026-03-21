const theme = {
  useCustomProperties: true,
  config: {
    useColorSchemeMediaQuery: true,
  },
  initialColorModeName: `light`,
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    secondary: "#119",
    muted: "#f6f6f6",
    highlight: "#efeffe",
    gray: "#595959",
    accent: "#609",
    border: "#e0e0e0",
    modes: {
      dark: {
        text: "#fff",
        background: "#060606",
        primary: "#3cf",
        secondary: "#e0f",
        muted: "#191919",
        highlight: "#29112c",
        gray: "#999",
        accent: "#c0f",
        border: "#333",
      },
    },
  },
  fonts: {
    sans: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Ubuntu", "Roboto", "Noto Sans", "Droid Sans", sans-serif`,
    serif: `Georgia, Cambria, "Times New Roman", Times, serif`,
    mono: `ui-monospace, "Cascadia Mono", "Ubuntu Mono", "Roboto Mono", Menlo, monospace`,
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  space: [0, 4, 8, 16, 32, 64, 128],
  text: {
    default: {
      fontFamily: `sans`,
      fontWeight: `body`,
      lineHeight: `body`,
    },
    heading: {
      fontFamily: `sans`,
      fontWeight: `heading`,
      lineHeight: `heading`,
    },
  },
  links: {
    color: `primary`,
    textDecoration: `none`,
    ":hover": {
      textDecoration: `underline`,
    },
    nav: {
      color: `text`,
      textDecoration: `none`,
      "&:hover": {
        bg: `highlight`,
        textDecoration: `underline`,
      },
      "&:active": {
        color: `primary`,
      },
    },
  },
  styles: {
    root: {
      fontFamily: "sans",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      fontFamily: "sans",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 6,
    },
    h2: {
      fontFamily: "sans",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 5,
      mt: 4,
      mb: 3,
    },
    h3: {
      fontFamily: "sans",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 4,
      mt: 4,
      mb: 2,
    },
    p: { lineHeight: "body", mb: 3 },
    a: {
      color: `primary`,
      ":visited": {
        color: `secondary`,
      },
      ":hover": {
        textDecoration: `underline`,
      },
    },
    blockquote: {
      borderLeft: "4px solid",
      borderColor: "muted",
      pl: 3,
      ml: 0,
      mr: 0,
      fontStyle: "italic",
      color: "gray",
    },
    pre: {
      fontFamily: "mono",
      fontSize: 1,
      p: 3,
      bg: "muted",
      borderRadius: 4,
      overflowX: "auto",
      mb: 3,
    },
    code: {
      fontFamily: "mono",
      fontSize: "inherit",
    },
    inlineCode: {
      fontFamily: "mono",
      fontSize: "85%",
      bg: "muted",
      px: 1,
      py: "2px",
      borderRadius: 3,
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "border",
      my: 4,
    },
    ol: { pl: 4, mb: 3 },
    ul: { pl: 4, mb: 3 },
    li: { mb: 2 },
    table: { width: "100%", borderCollapse: "collapse", mb: 3 },
    th: {
      textAlign: "left",
      borderBottom: "2px solid",
      borderColor: "border",
      p: 2,
    },
    td: {
      textAlign: "left",
      borderBottom: "1px solid",
      borderColor: "border",
      p: 2,
    },
    img: { maxWidth: "100%" },
  },
}

export default theme
