/** @jsxImportSource theme-ui */
import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import { ThemeProvider } from "theme-ui"

import theme from "../theme"
import Layout from "../components/layout"
import * as gtag from "../gtag"

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const onRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", onRouteChange)
    import("react-facebook-pixel")
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init("374965067696759")
        ReactPixel.pageView()

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView()
        })
      })
    return () => {
      router.events.off("routeChangeComplete", onRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
