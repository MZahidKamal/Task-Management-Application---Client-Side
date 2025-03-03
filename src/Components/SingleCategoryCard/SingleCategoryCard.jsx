import PropTypes from 'prop-types';
import SingleTaskCard from "@/Components/SingleTaskCard/SingleTaskCard.jsx";
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import useTasks from "@/CustomHooks/useTasks.jsx";
import {useEffect, useState} from "react";


const SingleCategoryCard = ({category}) => {


    const {allMyTaskIds, allMyTaskIdsIsLoading} = useTasks({});
    const [arrayOfIdsOfThisCategory, setArrayOfIdsOfThisCategory] = useState([]);

    const {setNodeRef} = useDroppable({
        id: category?._id,
        data: {category: category?.name}
    })


    useEffect(() => {
        if (category?.name === 'To Do') setArrayOfIdsOfThisCategory (allMyTaskIds?.myToDoTasks);
        else if (category?.name === 'In Progress') setArrayOfIdsOfThisCategory (allMyTaskIds?.myInProgressTasks);
        else if (category?.name === 'Done') setArrayOfIdsOfThisCategory (allMyTaskIds?.myDoneTasks);
    }, [category, allMyTaskIds]);



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
                    items={arrayOfIdsOfThisCategory || []}
                    strategy={verticalListSortingStrategy}
                >

                    {allMyTaskIdsIsLoading ? <h2 className={'text-xl font-semibold italic text-center'}>Loading...</h2>
                        : arrayOfIdsOfThisCategory?.map((taskId, index) => (
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
