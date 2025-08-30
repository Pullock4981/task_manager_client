import React, { useState } from "react";
import Swal from "sweetalert2";

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            completed: false,
            createdAt: new Date(), 
        };

        setLoading(true);

        try {
            const response = await fetch("https://task-manager-backend-weld-nine.vercel.app/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error("Failed to add task");

            const data = await response.json();
            console.log("Task added:", data);

            Swal.fire("Success", "Task added successfully!", "success");
            setTitle("");
            setDescription("");

            if (onTaskAdded) onTaskAdded();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to add task", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-base-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Add a New Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control w-full">
                    <label htmlFor="taskTitle" className="label font-medium">
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="taskTitle"
                        placeholder="Enter task title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control w-full">
                    <label htmlFor="taskDescription" className="label font-medium">
                        Task Description
                    </label>
                    <textarea
                        id="taskDescription"
                        placeholder="Enter task description"
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-block bg-primary text-white transition duration-200"
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
