/** @jsxImportSource theme-ui */
import { Flex, Link } from "theme-ui"
import { useState } from "react"
import { Index } from "elasticlunr"

const Search = () => {
  // const index = Index.load(useSiteSearchIndex())
  // const [query, setQuery] = useState(``)
  // const [results, setResults] = useState([])
  // const search = q => {
  //   const r = index.search(q, { expand: true }).map(({ ref }) => {
  //     return index.documentStore.getDoc(ref)
  //   })
  //   setResults(r)
  // }
  // return (
  //   <Flex sx={{ flexWrap: `wrap` }}>
  //     <input
  //       sx={{ m: 0, p: 2, pl: `20px`, boxSizing: `border-box` }}
  //       type="search"
  //       value={query}
  //       placeholder="Search"
  //       onChange={e => {
  //         const q = e.target.value
  //         setQuery(q)
  //         search(q)
  //       }}
  //     />
  //     <ul sx={{ m: 0, p: 2, pl: `20px` }}>
  //       {results.map(page => (
  //         <li key={page.id}>
  //           <Link href={page.slug}>{page.title}</Link>
  //           {": " + page.tags.join(`,`)}
  //         </li>
  //       ))}
  //     </ul>
  //   </Flex>
  // )
}

export default Search
