import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from "moment"
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const tasks = {
    "To-Do": [
        {
            id: 1,
            title: "Design User Interface",
            description: "Create wireframes and mockups for the new dashboard",
            deadline: "2024-03-25 14:00",
        },
        {
            id: 2,
            title: "Setup Database Schema",
            description: "Design and implement database structure for user management",
            deadline: "2024-03-26 16:30",
        },
        {
            id: 3,
            title: "Write API Documentation",
            description: "Document all API endpoints and their usage",
            deadline: "2024-03-27 12:00",
        },
        {
            id: 4,
            title: "Unit Testing",
            description: "Write unit tests for core functionality",
            deadline: "2024-03-28 15:00",
        }
    ],
    "In Progress": [
        {
            id: 5,
            title: "Implement Authentication",
            description: "Add user login and registration functionality",
            deadline: "2024-03-24 11:00",
        },
        {
            id: 6,
            title: "Mobile Responsiveness",
            description: "Make application responsive for all devices",
            deadline: "2024-03-25 13:30",
        },
        {
            id: 7,
            title: "Performance Optimization",
            description: "Optimize application loading speed and performance",
            deadline: "2024-03-26 10:00",
        },
        {
            id: 8,
            title: "Bug Fixes",
            description: "Fix reported bugs in the payment module",
            deadline: "2024-03-27 16:00",
        }
    ],
    "Done": [
        {
            id: 9,
            title: "Project Setup",
            description: "Initialize project and setup development environment",
            deadline: "2024-03-20 09:00",
        },
        {
            id: 10,
            title: "Requirements Analysis",
            description: "Analyze and document project requirements",
            deadline: "2024-03-21 14:00",
        },
        {
            id: 11,
            title: "Team Meeting",
            description: "Weekly team sync and progress update",
            deadline: "2024-03-22 11:00",
        },
        {
            id: 12,
            title: "Code Review",
            description: "Review and approve pending pull requests",
            deadline: "2024-03-23 15:30",
        }
    ]
}

const categoryColors = {
    "To-Do": "bg-red-50",
    "In Progress": "bg-blue-50",
    "Done": "bg-green-50"
}

const AllTasksComponent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const handleEditClick = (task) => {
        setCurrentTask({ ...task });
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log("Updated Task:", currentTask);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleDeleteClick = (task) => {
        console.log("Delete this task: ", task)
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {Object.entries(tasks).map(([category, categoryTasks]) => (
                <Card key={category} className={`${categoryColors[category]} p-4`}>
                    <div className="flex gap-4">
                        <div className="writing-mode-vertical text-xl font-bold p-2 flex justify-center items-center">
                            {category}
                        </div>
                        <ScrollArea className="w-full">
                            <div className="flex flex-col gap-2">
                                {categoryTasks.map((task) => (
                                    <Card key={task.id}>
                                        <CardContent className="p-4">
                                            {isEditing && currentTask.id === task.id ? (
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
