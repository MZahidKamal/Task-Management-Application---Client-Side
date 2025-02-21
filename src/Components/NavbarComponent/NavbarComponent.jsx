import { Button } from "@/components/ui/button"
import {Link} from "react-router";


const NavbarComponent = () => {
    return (
        <div className={'border border-gray-300 rounded p-4'}>
            NavbarComponent
            <Link to={{pathname:'/'}}>
                <Button variant="outline" className={'ml-10 cursor-pointer'}>Home</Button>
            </Link>
            <Link to={{pathname:'/sign-up'}}>
                <Button variant="outline" className={'ml-10 cursor-pointer'}>Sign Up</Button>
            </Link>
            <Link to={{pathname:'/sign-in'}}>
                <Button variant="outline" className={'ml-10 cursor-pointer'}>Sign In</Button>
            </Link>
        </div>
    );
};

export default NavbarComponent;
