import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <div className="max-w-2xl mx-auto my-0">
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;