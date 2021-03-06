/** @jsxImportSource theme-ui */
const skipNavStyles = {
  border: 0,
  clip: `react(0 0 0 0)`,
  height: `1px`,
  width: `1px`,
  m: `-1px`,
  p: 0,
  overflow: `hidden`,
  position: `absolute`,
  "&:focus": {
    padding: 3,
    position: `fixed`,
    top: `15px`,
    left: `15px`,
    zIndex: 1,
    width: `auto`,
    height: `auto`,
    clip: `auto`,
    textDecoration: `none`,
  },
}

const SkipNavLink = ({ children, ...props }) => (
  <a
    {...props}
    sx={{ ...skipNavStyles }}
    href="#skip-nav"
    data-skip-link="true"
  >
    {children}
  </a>
)

export default SkipNavLink
