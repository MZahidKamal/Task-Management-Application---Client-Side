import AddTaskComponent from "@/Components/AddTaskComponent/AddTaskComponent.jsx";
import AllTasksComponent from "@/Components/AllTasksComponent/AllTasksComponent.jsx";

const HomePage = () => {
    return (
        <div>
            <h1 className={'text-5xl font-bold my-5'}>HomePage</h1>
            <AddTaskComponent></AddTaskComponent>
            <AllTasksComponent></AllTasksComponent>
        </div>
    );
};

export default HomePage;
