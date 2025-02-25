import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from "moment"
import {useContext, useState} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataContext from "@/Providers/DataContext.jsx";


const categoryColors = {
    "To-Do": "bg-red-50",
    "In Progress": "bg-blue-50",
    "Done": "bg-green-50"
}


const AllTasksComponent = () => {

    const {allMyTasks, saveUpdatedTaskToDatabase, deleteATaskFromDatabase} = useContext(DataContext);
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


    // Group tasks by category
    const groupedTasks = allMyTasks?.reduce((acc, task) => {
        if (!acc[task.category]) {
            acc[task.category] = [];
        }
        acc[task.category].push(task);
        return acc;
    }, {});


    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {groupedTasks && Object.entries(groupedTasks).map(([category, categoryTasks]) => (
                <Card key={category} className={`${categoryColors[category]} p-4`}>
                    <div className="flex gap-4">
                        <div className="writing-mode-vertical text-xl font-bold p-2 flex justify-center items-center">
                            {category}
                        </div>
                        <ScrollArea className="w-full">
                            <div className="flex flex-col gap-2">
                                {categoryTasks.map((task) => (
                                    <Card key={task._id}>
                                        <CardContent className="p-4">
                                            {isEditing && currentTask._id === task._id ? (
                                                <div className={'space-y-1'}>
                                                    <input
                                                        name="title"
                                                        value={currentTask.title}
                                                        onChange={handleChange}
                                                        className="border px-2 py-1 w-full rounded-md"
                                                    />
                                                    <textarea
                                                        name="description"
                                                        value={currentTask.description}
                                                        onChange={handleChange}
                                                        className="border px-2 py-1 w-full rounded-md"
                                                    />
                                                    <input
                                                        type="datetime-local"
                                                        name="deadline"
                                                        value={currentTask.deadline}
                                                        onChange={handleChange}
                                                        className="border -mt-2 p-2 w-full rounded-md"
                                                    />
                                                    <button onClick={handleSave} className="bg-blue-500 text-white mt-1 mr-2 px-2 rounded">Save</button>
                                                    <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white mt-1 px-2 rounded">Cancel</button>
                                                </div>
                                            ) : (
                                                <div>
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
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default AllTasksComponent;
