const theme = {
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
  styles: {
    root: {
      margin: 0,
      padding: 0,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    body: {
      fontFamily: `serif`,
    },
    p: {
      fontSize: [1, 1, 2],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      wordBreak: `break-word`,
      fontFamily: `serif`,
    },
    h1: {
      variant: `text.heading`,
    },
    h2: {
      variant: `text.heading`,
    },
    h3: {
      variant: `text.heading`,
    },
    h4: {
      variant: `text.heading`,
    },
    h5: {
      variant: `text.heading`,
    },
    h6: {
      variant: `text.heading`,
    },
  },
}

export default theme
