import PropTypes from 'prop-types';
import SingleTaskCard from "@/Components/SingleTaskCard/SingleTaskCard.jsx";
import {useContext} from "react";
import DataContext from "@/Providers/DataContext.jsx";
import {useDroppable} from "@dnd-kit/core";


const SingleCategoryCard = ({category, allTasks}) => {

    const { allMyTasksLoading } = useContext(DataContext);

    const {setNodeRef} = useDroppable({id: category?._id})

    return (
        <div key={category?._id} className={'bg-red-50 col-span-1 p-5 rounded-md flex justify-start items-start'}>

            <h1 className={'writing-mode-vertical text-3xl font-bold mx-4'}>{category?.name}</h1>

            <div ref={setNodeRef} className={'mt-2 px-3 py-2 rounded-sm space-y-3 grow'}>
                {allMyTasksLoading ? 'Loading...'
                    : allTasks?.filter((task) => (task?.category === category?.name))?.map((task, index) => (
                        <SingleTaskCard key={index} task={task}></SingleTaskCard>
                    ))}
            </div>

        </div>
    );
};


SingleCategoryCard.propTypes = {
    category: PropTypes.object,
    allTasks: PropTypes.array,
}


export default SingleCategoryCard;
