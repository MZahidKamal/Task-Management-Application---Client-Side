import PropTypes from "prop-types";
import moment from "moment";
import {useState} from "react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useDraggable} from "@dnd-kit/core";
// import {useSortable} from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
import useTasks from "@/CustomHooks/useTasks.jsx";


const SingleTaskCard = ({category, taskIndex, taskId}) => {


    const {taskDetails, taskDetailsIsLoading, refetchTaskDetails, saveUpdatedTaskToDatabase, deleteATaskFromDatabase} = useTasks({taskId});
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);


    const handleEditClick = () => {
        setCurrentTask(taskDetails);
        setIsEditing(true);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask((prev) => ({ ...prev, [name]: value }));
    };


    const handleSave = async () => {
        setIsEditing(false);
        await saveUpdatedTaskToDatabase (currentTask);
        await refetchTaskDetails();
        // console.log("Updated Task:", currentTask);
    };


    const handleDeleteClick = async () => {
        await deleteATaskFromDatabase (taskDetails?._id);
        // console.log("Delete this task: ", task);
    };


    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: taskDetails?._id,
        data: { category: category?._id, taskIndex: taskIndex },
    });
    // const dnd_style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}


    /*const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: taskDetails?._id,
        data: { category: category?._id, taskIndex: taskIndex },
    });*/


    /*const dnd_style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };*/


    if(taskDetailsIsLoading) return <h2 className={'text-xl font-semibold italic text-center'}>Loading...</h2>;


    return (
        isEditing ? (
            <div className={'space-y-1'}>
                <input
                    name="title"
                    value={currentTask?.title}
                    onChange={handleChange}
                    className="bg-white border px-2 py-1 w-full rounded-md"
                />
                <textarea
                    name="description"
                    value={currentTask?.description}
                    onChange={handleChange}
                    className="bg-white border px-2 py-1 w-full rounded-md"
                />
                <input
                    type="datetime-local"
                    name="deadline"
                    value={currentTask?.deadline}
                    onChange={handleChange}
                    className="bg-white border -mt-2 p-2 w-full rounded-md"
                />
                <button onClick={handleSave} className="bg-blue-500 text-white mt-1 mr-2 px-2 rounded">Save</button>
                <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white mt-1 px-2 rounded">Cancel</button>
            </div>
        ) : (
            <div className={'flex justify-between items-center space-x-2'}>
                <div
                    {...attributes}
                    {...listeners}
                    ref={setNodeRef}
                    /*style={dnd_style}*/
                    style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
                    className={'bg-white px-3 py-2 rounded-sm cursor-grab grow shadow-sm hover:shadow-lg'}>
                    <div className="flex items-center mb-2">
                        <h3 className="font-semibold">{taskIndex+1}. {taskDetails?.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{taskDetails?.description}</p>
                    <p className="text-xs text-gray-500">Deadline: {moment(taskDetails?.deadline).format("DD-MMMM-YYYY [at] hh:mm A")}</p>

                </div>
                <div className="flex flex-col justify-end space-y-4">
                    <button
                        onClick={handleEditClick}
                        title="Edit"
                        className="text-blue-500 text-sm cursor-pointer flex justify-center items-center gap-2">
                        <FaEdit />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        title="Delete"
                        className="text-red-500 text-sm cursor-pointer flex justify-center items-center gap-2">
                        <FaTrash />
                    </button>
                </div>
            </div>
        )
    );
};


SingleTaskCard.propTypes = {
    category: PropTypes.object,
    taskIndex: PropTypes.number,
    taskId: PropTypes.string,
}

export default SingleTaskCard;
