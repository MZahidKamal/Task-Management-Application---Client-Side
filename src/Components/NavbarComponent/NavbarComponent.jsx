import { Button } from "@/components/ui/button"
import {Link} from "react-router";


const NavbarComponent = () => {
    return (
        <div className={'border border-gray-300 rounded p-4'}>
            NavbarComponent
            <Link to={{pathname:'/'}}>
                <Button variant="outline" className={'ml-10 cursor-pointer'}>Home</Button>
            </Link>
        </div>
    );
};

export default NavbarComponent;
