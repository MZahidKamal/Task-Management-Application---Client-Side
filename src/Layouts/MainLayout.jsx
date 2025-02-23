import {Outlet} from "react-router";
import NavbarComponent from "../Components/NavbarComponent/NavbarComponent.jsx";
import FooterComponent from "../Components/FooterComponent/FooterComponent.jsx";
import {ToastContainer} from 'react-toastify';


const MainLayout = () => {
    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <NavbarComponent />
            <div className="flex-grow">
                <Outlet />
            </div>
            <FooterComponent />

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>

        </div>
    );
};

export default MainLayout;
