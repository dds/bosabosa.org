/** @jsxImportSource theme-ui */
import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import { ThemeUIProvider } from "theme-ui"
import { useThemedStylesWithMdx } from "@theme-ui/mdx"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"

import "katex/dist/katex.min.css"
import "../styles/syntax.css"
import theme from "../theme"
import Layout from "../components/layout"
import CodeBlock from "../components/code-block"
import { AuthProvider } from "../components/auth-context"
import * as gtag from "../gtag"

function MdxThemeProvider({ children }) {
  const components = useThemedStylesWithMdx(useMDXComponents())
  return (
    <MDXProvider components={{ ...components, pre: CodeBlock }}>
      {children}
    </MDXProvider>
  )
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const onRouteChange = url => {
      gtag.pageview(url)
    }
    let onPixelRouteChange
    router.events.on("routeChangeComplete", onRouteChange)
    if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
      import("react-facebook-pixel")
        .then(x => x.default)
        .then(ReactPixel => {
          ReactPixel.init(process.env.NEXT_PUBLIC_FB_PIXEL_ID)
          ReactPixel.pageView()
          onPixelRouteChange = () => ReactPixel.pageView()
          router.events.on("routeChangeComplete", onPixelRouteChange)
        })
    }
    return () => {
      router.events.off("routeChangeComplete", onRouteChange)
      if (onPixelRouteChange) {
        router.events.off("routeChangeComplete", onPixelRouteChange)
      }
    }
  }, [router.events])

  return (
    <ThemeUIProvider theme={theme}>
      <AuthProvider>
        <MdxThemeProvider>
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
        </MdxThemeProvider>
      </AuthProvider>
    </ThemeUIProvider>
  )
}

export default App
