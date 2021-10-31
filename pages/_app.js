/** @jsxImportSource theme-ui */
import { useEffect } from "react"
import { useRouter } from "next/router"
import { ThemeProvider } from "theme-ui"

import theme from "../theme"
import Layout from "../components/layout"

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    import("react-facebook-pixel")
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init("374965067696759")
        ReactPixel.pageView()

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
