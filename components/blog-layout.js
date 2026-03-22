/** @jsxImportSource theme-ui */

const BlogLayout = ({ children, tools }) => (
  <div
    sx={{
      display: ["block", "block", "grid", "grid"],
      gridTemplateColumns: "2fr 1fr",
      gap: 4,
    }}
  >
    <div>{children}</div>
    <div
      sx={{
        display: ["none", "none", "block", "block"],
        borderLeft: "1px solid",
        borderColor: "border",
        pl: 3,
      }}
    >
      {tools}
    </div>
  </div>
)

export default BlogLayout
