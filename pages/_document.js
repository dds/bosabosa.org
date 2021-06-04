/** @jsxImportSource theme-ui */
import Document, { Html, Head, Main, NextScript } from "next/document"
import { InitializeColorMode } from "theme-ui"

export default class extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
