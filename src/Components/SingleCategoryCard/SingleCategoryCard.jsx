import PropTypes from 'prop-types';
import SingleTaskCard from "@/Components/SingleTaskCard/SingleTaskCard.jsx";
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import useTasks from "@/CustomHooks/useTasks.jsx";


const SingleCategoryCard = ({category}) => {


    const {allMyTaskIds, allMyTaskIdsIsLoading} = useTasks({});
    const {setNodeRef} = useDroppable({
        id: category?._id,
        data: {category: category?.name}
    })


    let ArrayOfIdsOfThisCategory = [];
    if (category?.name === 'To Do') ArrayOfIdsOfThisCategory = allMyTaskIds?.myToDoTasks;
    else if (category?.name === 'In Progress') ArrayOfIdsOfThisCategory = allMyTaskIds?.myInProgressTasks;
    else if (category?.name === 'Done') ArrayOfIdsOfThisCategory = allMyTaskIds?.myDoneTasks;


    const category_bg = category?.name === 'To Do'
        ? 'bg-red-50'
        : category?.name === 'In Progress'
            ? 'bg-blue-50'
            : category?.name === 'Done'
                ? 'bg-green-50'
                : 'bg-gray-50';


    return (
        <div key={category?._id}
             className={`col-span-1 pl-4 py-4 rounded-md flex justify-start items-start ${category_bg}`}>

            <h1 className={'writing-mode-vertical text-3xl font-bold mx-4'}>{category?.name}</h1>

            <div ref={setNodeRef} className={'mt-2 px-3 py-2 rounded-sm space-y-3 grow'}>

                <SortableContext
                    items={ArrayOfIdsOfThisCategory || []}
                    strategy={verticalListSortingStrategy}
                >

                    {allMyTaskIdsIsLoading ? <h2 className={'text-xl font-semibold italic text-center'}>Loading...</h2>
                        : ArrayOfIdsOfThisCategory?.map((taskId, index) => (
                            <SingleTaskCard key={index} category={category} taskIndex={index} taskId={taskId}></SingleTaskCard>
                        ))}

                </SortableContext>

            </div>

        </div>
    );
};


SingleCategoryCard.propTypes = {
    category: PropTypes.object,
}


export default SingleCategoryCard;
