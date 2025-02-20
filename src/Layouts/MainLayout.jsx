import {Outlet} from "react-router";
import NavbarComponent from "../Components/NavbarComponent/NavbarComponent.jsx";
import FooterComponent from "../Components/FooterComponent/FooterComponent.jsx";

const MainLayout = () => {
    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <NavbarComponent />
            <div className="flex-grow">
                <Outlet />
            </div>
            <FooterComponent />
        </div>
    );
};

export default MainLayout;
