import { Dialog } from "@/components/ui/Dialog";
import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, task, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDeadline(task.deadline);
        }
    }, [task]);

    const handleSave = () => {
        onSave({ ...task, title, description, deadline });
        onClose();
    };

    if (!task) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white rounded p-6">
                    <Dialog.Title>Edit Task</Dialog.Title>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        className="border p-2 w-full"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                        className="border p-2 w-full mt-2"
                    />
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                    <button onClick={handleSave} className="bg-blue-500 text-white mt-4 p-2 rounded">
                        Save
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white mt-2 p-2 rounded">
                        Cancel
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    );
};

export default Modal;
