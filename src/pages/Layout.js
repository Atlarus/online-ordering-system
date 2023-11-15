import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <div>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/Auth'}>Auth</Link>
                <Link to={'/Cart'}>Cart</Link>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout;