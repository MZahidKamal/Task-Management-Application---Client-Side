import PropTypes from "prop-types";
import moment from "moment";
import {useContext, useState} from "react";
import DataContext from "@/Providers/DataContext.jsx";
import {FaEdit, FaTrash} from "react-icons/fa";

const SingleTaskCard = ({task}) => {


    const {saveUpdatedTaskToDatabase, deleteATaskFromDatabase} = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);


    const handleEditClick = (task) => {
        setCurrentTask({ ...task });
        setIsEditing(true);
    };


    const handleSave = async () => {
        setIsEditing(false);
        await saveUpdatedTaskToDatabase (currentTask);
        // console.log("Updated Task:", currentTask);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask((prev) => ({ ...prev, [name]: value }));
    };


    const handleDeleteClick = async (task) => {
        await deleteATaskFromDatabase (task?._id);
        // console.log("Delete this task: ", task);
    };


    return (
        isEditing ? (
            <div className={'space-y-1'}>
                <input
                    name="title"
                    value={currentTask.title}
                    onChange={handleChange}
                    className="bg-white border px-2 py-1 w-full rounded-md"
                />
                <textarea
                    name="description"
                    value={currentTask.description}
                    onChange={handleChange}
                    className="bg-white border px-2 py-1 w-full rounded-md"
                />
                <input
                    type="datetime-local"
                    name="deadline"
                    value={currentTask.deadline}
                    onChange={handleChange}
                    className="bg-white border -mt-2 p-2 w-full rounded-md"
                />
                <button onClick={handleSave} className="bg-blue-500 text-white mt-1 mr-2 px-2 rounded">Save</button>
                <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white mt-1 px-2 rounded">Cancel</button>
            </div>
        ) : (
            <div className={'bg-white px-3 py-2 rounded-sm'}>
                <h3 className="font-semibold mb-2">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500">
                    Deadline: {moment(task.deadline).format("DD-MMMM-YYYY [at] hh:mm A")}
                </p>
                <div className="flex justify-end space-x-2">
                    <button onClick={() => handleEditClick(task)} className="text-blue-500 text-sm cursor-pointer flex justify-center items-center gap-2" title="Edit"><FaEdit /></button>
                    <button onClick={() => handleDeleteClick(task)} className="text-red-500 text-sm cursor-pointer flex justify-center items-center gap-2" title="Delete"><FaTrash /></button>
                </div>
            </div>
        )
    );
};


SingleTaskCard.propTypes = {
    task: PropTypes.object,
}

export default SingleTaskCard;
