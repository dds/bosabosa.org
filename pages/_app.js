/** @jsxImportSource theme-ui */
import * as React from "react"
import { ThemeProvider } from "theme-ui"

import theme from "../theme"
import Layout from "../components/layout"

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
