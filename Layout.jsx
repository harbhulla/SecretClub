import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
            <Link to="signup"></Link>
            <Link to="membership"></Link>

      <Outlet />
    </>
  )
};

export default Layout;