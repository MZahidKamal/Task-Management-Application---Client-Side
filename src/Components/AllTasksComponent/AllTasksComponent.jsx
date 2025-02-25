import {useContext, useEffect, useState} from "react";
import DataContext from "@/Providers/DataContext.jsx";
import {closestCenter, DndContext} from "@dnd-kit/core";
import SingleCategoryCard from "@/Components/SingleCategoryCard/SingleCategoryCard.jsx";


const AllTasksComponent = () => {

    const {allCategories, allMyTasks, updateTaskCategoryIntoDatabase} = useContext(DataContext);

    const [allTasks, setAllTasks] = useState([]);
    useEffect(() => {
        setAllTasks(allMyTasks);
    }, [allMyTasks]);


    const handleDragAndDropEnd = async (event) => {
        const {active, over} = event;

        if (!active || !over) return;

        const taskId = active?.id;
        const categoryId = over?.id;
        // console.log(taskId, categoryId);

        await updateTaskCategoryIntoDatabase ({taskId, categoryId});
    }


    return (
        <div className={'grid grid-cols-3 gap-4'}>

            <DndContext onDragEnd={handleDragAndDropEnd} collisionDetection={closestCenter}>

                {allCategories?.map((category) => (
                    <SingleCategoryCard key={category?._id} category={category} allTasks={allTasks}></SingleCategoryCard>
                ))}

            </DndContext>

        </div>
    )
}

export default AllTasksComponent;
