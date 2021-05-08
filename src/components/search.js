/** @jsx jsx */
import { Container, jsx } from "theme-ui"
import { useState } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import { useSiteSearchIndex } from "../hooks/use-site-searchindex"

const Search = () => {
  const index = Index.load(useSiteSearchIndex())
  const [query, setQuery] = useState(``)
  const [results, setResults] = useState([])

  const search = q => {
    const r = index.search(q, { expand: true }).map(({ ref }) => {
      return index.documentStore.getDoc(ref)
    })
    setResults(r)
  }

  return (
    <Container>
      <input
        sx={{ m: 0, p: 2 }}
        type="text"
        value={query}
        placeholder="Search"
        onChange={e => {
          const q = e.target.value
          setQuery(q)
          search(q)
        }}
      />
      <ul sx={{ m: 0, p: 0 }}>
        {results.map(page => (
          <li key={page.id}>
            <Link to={page.slug}>{page.title}</Link>
            {": " + page.tags.join(`,`)}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Search
