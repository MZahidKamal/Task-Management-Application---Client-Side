import {RegistrationForm} from "@/Components/registration-form.jsx";


const SignUpComponent = () => {


    const handleSubmit = (formData) => {
        formData.preventDefault();
        // console.log("Form submitted with data:", formData);
        const full_name = formData?.target[0].value;
        const email = formData?.target[1].value;
        const password = formData?.target[2].value;
        const confirm_password = formData?.target[3].value;
        console.log(full_name, email, password, confirm_password);
        // Here you can handle the form data
        formData.reset;
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
