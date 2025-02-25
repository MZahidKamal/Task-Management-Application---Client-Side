import AddTaskComponent from "@/Components/AddTaskComponent/AddTaskComponent.jsx";
import AllTasksComponent from "@/Components/AllTasksComponent/AllTasksComponent.jsx";
import {useContext} from "react";
import AuthContext from "@/Providers/AuthContext.jsx";


const HomePage = () => {

    const {user} = useContext(AuthContext);


    if (!user) return (
        <h1 className={'text-5xl font-bold flex justify-center items-center min-h-[calc(100vh-200px)]'}>Task Management Application</h1>
    );


    return (
        <div>
            <AddTaskComponent></AddTaskComponent>
            <AllTasksComponent></AllTasksComponent>
        </div>
    );
};

export default HomePage;
