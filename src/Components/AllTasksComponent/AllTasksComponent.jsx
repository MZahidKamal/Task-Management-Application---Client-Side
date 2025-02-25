import {useContext} from "react";
import DataContext from "@/Providers/DataContext.jsx";
import SingleTaskCard from "@/Components/SingleTaskCard/SingleTaskCard.jsx";


const AllTasksComponent = () => {

    const {allMyTasks} = useContext(DataContext);


    const toDoTasks = allMyTasks?.filter((task) => task?.category === 'To-Do');
    const inProgressTasks = allMyTasks?.filter((task) => task?.category === 'In Progress');
    const doneTasks = allMyTasks?.filter((task) => task?.category === 'Done');


    return (
        <div className={'grid grid-cols-3 gap-4'}>
            <div className={'bg-red-50 col-span-1 p-5 rounded-md flex justify-start items-start'}>
                <h1 className={'writing-mode-vertical text-3xl font-bold mx-4'}>To Do</h1>
                <div className={'mt-2 px-3 py-2 rounded-sm space-y-2 grow'}>
                    {toDoTasks?.map((task, index) => (
                        <SingleTaskCard key={index} task={task}></SingleTaskCard>
                    ))}
                </div>
            </div>
            <div className={'bg-blue-50 col-span-1 p-5 rounded-md flex justify-start items-start'}>
                <h1 className={'writing-mode-vertical text-3xl font-bold mx-4'}>In Progress</h1>
                <div className={'mt-2 px-3 py-2 rounded-sm space-y-2 grow'}>
                    {inProgressTasks?.map((task, index) => (
                        <SingleTaskCard key={index} task={task}></SingleTaskCard>
                    ))}
                </div>
            </div>
            <div className={'bg-green-50 col-span-1 p-5 rounded-md flex justify-start items-start'}>
                <h1 className={'writing-mode-vertical text-3xl font-bold mx-4'}>Done</h1>
                <div className={'mt-2 px-3 py-2 rounded-sm space-y-2 grow'}>
                    {doneTasks?.map((task, index) => (
                        <SingleTaskCard key={index} task={task}></SingleTaskCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllTasksComponent;
