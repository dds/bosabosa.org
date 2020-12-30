/** @jsx jsx */
import { jsx } from "theme-ui"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => (
  <div sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 } }}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

export default Layout
