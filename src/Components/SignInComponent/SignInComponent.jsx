import {LoginForm} from "@/Components/login-form.jsx";


const SignInComponent = () => {


    const handleSubmit = (formData) => {
        formData.preventDefault();
        // console.log("Form submitted with data:", formData?.target[0].value);
        const email = formData?.target[0].value;
        const password = formData?.target[1].value;
        console.log(email, password);
        // Here you can handle the form data
        formData.reset;
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
