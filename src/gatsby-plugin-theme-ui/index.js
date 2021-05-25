const theme = {
  useCustomProperties: true,
  config: {
    useColorSchemeMediaQuery: true,
    printColorModeName: `light`,
  },
  initialColorModeName: `light`,
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    secondary: "#119",
    muted: "#f6f6f6",
    highlight: "#efeffe",
    gray: "#777",
    accent: "#609",
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
    a: {
      color: `primary`,
      ":visited": {
        color: `secondary`,
      },
      ":hover": {
        textDecoration: `underline`,
      },
    },
    // navlink: {
    //   display: "inline-block",
    //   fontWeight: "bold",
    //   color: "inherit",
    //   textDecoration: "none",
    //   ":hover,:focus": {
    //     color: "primary",
    //   },
    // },
  },
}

export default theme
