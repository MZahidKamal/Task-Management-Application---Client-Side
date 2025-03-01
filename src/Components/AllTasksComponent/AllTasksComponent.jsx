import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import SingleCategoryCard from "@/Components/SingleCategoryCard/SingleCategoryCard.jsx";
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import useTasks from "@/CustomHooks/useTasks.jsx";


const AllTasksComponent = () => {


    const {allCategories, categoriesIsLoading, updateTaskCategoryIntoDatabase} = useTasks({});


    const handleDragAndDropEnd = async (event) => {
        const {active, over} = event;

        if (!active || !over) return;

        console.log('Active: ', active);
        console.log('Over: ', over);

        const taskId = active?.id;
        const categoryId = over?.id;
        // console.log(taskId, categoryId);

        await updateTaskCategoryIntoDatabase({taskId, categoryId});
    }


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    )


    return (
        <div className={'grid grid-cols-1 xl:grid-cols-3 gap-4 w-11/12 mx-auto'}>

            <DndContext
                onDragEnd={handleDragAndDropEnd}
                collisionDetection={closestCenter}
                sensors={sensors}>

                {categoriesIsLoading ? <h2 className={'text-xl font-semibold italic text-center'}>Loading...</h2>
                    : allCategories?.map((category) => (
                        <SingleCategoryCard key={category?._id} category={category}></SingleCategoryCard>
                    ))}

            </DndContext>

        </div>
    )
}

export default AllTasksComponent;
