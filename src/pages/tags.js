/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}) => (
  <Layout title="Tags">
    <ul>
      {group.map(tag => (
        <Text>
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        </Text>
      ))}
    </ul>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
