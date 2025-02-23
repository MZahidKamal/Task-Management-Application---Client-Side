import {LoginForm} from "@/Components/ui/login-form.jsx";
import {useContext} from "react";
import AuthContext from "@/Providers/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const SignInComponent = () => {

    const {signInExistingUsers} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Form submitted with data:", event);

        const email = event?.target[0].value;
        const password = event?.target[1].value;
        // console.log(email, password);

        await signInExistingUsers(email, password);
        event.reset;
        navigate('/');
    };


    return (
        <div className="flex grow w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <LoginForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SignInComponent;
