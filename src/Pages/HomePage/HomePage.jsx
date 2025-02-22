import AddTaskComponent from "@/Components/AddTaskComponent/AddTaskComponent.jsx";
import AllTasksComponent from "@/Components/AllTasksComponent/AllTasksComponent.jsx";

const HomePage = () => {
    return (
        <div>
            <AddTaskComponent></AddTaskComponent>
            <AllTasksComponent></AllTasksComponent>
        </div>
    );
};

export default HomePage;
