import "fontsource-montserrat"
import "fontsource-merriweather"

const theme = {
  useCustomProperties: true,
  colors: {
    background: `white`,
    primary: `#663399`,
    text: `#393939`,
    secondary: `tomato`,
  },
  fonts: {
    body: `Merriweather, sans-serif`,
    heading: `Montserrat, serif`,
    monospace: `Menlo, monospace`,
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
      fontFamily: `body`,
      fontWeight: `body`,
      lineHeight: `body`,
      color: `body`,
    },
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
  },
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    body: {
      fontFamily: `text.body`,
    },
    p: {
      fontSize: [1, 1, 2],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      wordBreak: `break-word`,
      fontFamily: `body`,
    },
    h1: {
      variant: `text.heading`,
      fontFamily: `heading`,
    },
    h2: {
      variant: `text.heading`,
      fontFamily: `heading`,
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
