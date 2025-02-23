import {Button} from "@/components/ui/button"
import {Link} from "react-router"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Logo} from "@/Components/ui/Logo.jsx";
import {useContext} from "react";
import AuthContext from "@/Providers/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const NavbarComponent = () => {

    const {user, userLoading, signOutCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSignOutClick = async () => {
      await signOutCurrentUser();
      navigate('/sign-in');
    }


    return (
        <div className={'border border-gray-300 rounded p-2'}>
            <div className="flex items-center justify-between">
                <div className="min-w-60">
                    <Logo className="text-5xl"/>
                </div>
                <div className="w-full flex flex-row justify-end items-center">
                    <Link to={{pathname: '/'}}>
                        <Button variant="outline" className={'ml-10 cursor-pointer'}>Home</Button>
                    </Link>

                    {!user &&
                        <Link to={{pathname: '/sign-up'}}>
                            <Button variant="outline" className={'ml-10 cursor-pointer'}>Sign Up</Button>
                        </Link>
                    }

                    {!user &&
                        <Link to={{pathname: '/sign-in'}}>
                            <Button variant="outline" className={'ml-10 cursor-pointer'}>Sign In</Button>
                        </Link>
                    }

                    {user &&
                        <Button variant="outline" onClick={handleSignOutClick} className={'ml-10 cursor-pointer'}>Sign Out</Button>
                    }

                    <Card className="border-0 mx-10 ml-20 shadow-none">
                        {userLoading && 'Loading...'}
                        {user &&
                            <CardContent className="flex items-center space-x-4 p-2">
                                <Avatar>
                                    <AvatarImage src={user?.photoURL}/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="text-lg font-semibold">{user?.displayName}</h4>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </div>
                            </CardContent>
                        }
                    </Card>


                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
