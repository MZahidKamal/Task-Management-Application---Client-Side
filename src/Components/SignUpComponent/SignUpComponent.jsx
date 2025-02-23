import {RegistrationForm} from "@/Components/ui/registration-form.jsx";
import {useContext} from "react";
import AuthContext from "@/Providers/AuthContext.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const SignUpComponent = () => {

    const {signUpNewUser} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Form submitted with data:", event);

        const full_name = event?.target[0].value;
        const email = event?.target[1].value;
        const password = event?.target[2].value;
        const confirm_password = event?.target[3].value;
        //console.log(full_name, email, password, confirm_password);

        if (password !== confirm_password) {
            toast.warning("Password doesn't match. Try again.");
            return;
        }

        /* SIGNING UP THROUGH FIREBASE */
        await signUpNewUser(full_name, email, password);
        event.reset;
        navigate('/sign-in');
    };


    return (
        <div className="flex grow w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <RegistrationForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SignUpComponent;
