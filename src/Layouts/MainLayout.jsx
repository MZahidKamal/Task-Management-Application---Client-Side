import {Outlet} from "react-router";
import NavbarComponent from "../Components/NavbarComponent/NavbarComponent.jsx";
import FooterComponent from "../Components/FooterComponent/FooterComponent.jsx";

const MainLayout = () => {
    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Outlet></Outlet>
            <FooterComponent></FooterComponent>
        </div>
    );
};

export default MainLayout;
