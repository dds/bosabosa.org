module.exports = {
  useCustomProperties: true,
  config: {
    useColorSchemeMediaQuery: true,
    useLocalStorage: false,
    printColorModeName: `light`,
  },
  initialColorModeName: `light`,
  colors: {
    modes: {
      dark: {
        text: "#000",
        background: "#fff",
      },
      light: {
        text: "#fff",
        background: "#000",
      },
    },
  },
  fonts: {
    sans: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Ubuntu", "Roboto", "Noto Sans", "Droid Sans", sans-serif`,
    serif: `Georgia, Cambria, "Times New Roman", Times, serif`,
    mono: `ui-monospace, "Cascadia Mono", "Ubuntu Mono", "Roboto Mono", Menlo, monospace`,
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
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
    nav: {
      textDecoration: `none`,
      ":hover": {
        textDecoration: `underline`,
      },
    },
    secondary: {
      textDecoration: `none`,
      ":hover": {
        textDecoration: `underline`,
      },
    },
  },
}
