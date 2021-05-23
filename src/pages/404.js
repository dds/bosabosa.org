/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout title="404: Not Found" location={location}>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
