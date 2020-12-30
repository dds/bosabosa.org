import "fontsource-montserrat"
import "fontsource-merriweather"
import { merge } from "theme-ui"
import { tailwind } from "@theme-ui/presets"

const theme = merge(tailwind, {
  colors: {
    primary: tailwind.colors.purple[7],
    secondary: `#5f6c80`,
    toggleIcon: tailwind.colors.gray[8],
    heading: tailwind.colors.black,
    divide: tailwind.colors.gray[4],
    modes: {
      dark: {
        text: tailwind.colors.gray[4],
        primary: tailwind.colors.purple[5],
        secondary: `#7f8ea3`,
        toggleIcon: tailwind.colors.gray[4],
        background: `#1A202C`,
        heading: tailwind.colors.white,
        divide: tailwind.colors.gray[8],
        muted: tailwind.colors.gray[8],
      },
    },
  },
  fonts: {
    body: `"Montserrat", sans-serif`,
    heading: `"Merriweather", sans`,
    monospace: `monospace`,
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
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    p: {
      fontSize: [1, 1, 2],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      wordBreak: `break-word`,
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
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
})

export default theme
