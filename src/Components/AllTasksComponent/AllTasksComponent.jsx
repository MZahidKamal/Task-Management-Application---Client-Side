import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    return (
        <div className="flex flex-col gap-6 my-6">
            {Object.entries(tasks).map(([category, categoryTasks]) => (
                <Card key={category} className={`${categoryColors[category]} p-4`}>
                    <div className="flex gap-4">
                        <div className="writing-mode-vertical text-xl font-bold p-2 flex justify-center items-center">
                            {category}
                        </div>
                        <ScrollArea className="w-full">
                            <div className="flex flex-col gap-3">
                                {categoryTasks.map(task => (
                                    <Card key={task.id}>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-2">{task.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                            <p className="text-xs text-gray-500">Deadline: {task.deadline}</p>
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

export default AllTasksComponent
