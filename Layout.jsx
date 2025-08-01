import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
            <Link to="/"></Link>
            <Link to="signup"></Link>
            <Link to="signup/membership"></Link>
            <Link to="home"></Link>
            <Link to="display"></Link>

      <Outlet />
    </>
  )
};

export default Layout;