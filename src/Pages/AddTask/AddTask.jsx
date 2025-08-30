import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const AddTask = ({ onTaskAdded }) => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.email) return Swal.fire("Error", "You must be logged in to add a task", "error");

        const newTask = {
            title,
            description,
            userEmail: user.email, // Attach logged-in user email
            completed: false,
            createdAt: new Date(),
        };

        setLoading(true);
        try {
            const res = await fetch("https://task-manager-backend-weld-nine.vercel.app/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!res.ok) throw new Error("Failed to add task");

            const data = await res.json();
            Swal.fire("Success", "Task added successfully!", "success");
            setTitle("");
            setDescription("");

            if (onTaskAdded) onTaskAdded(); // Refresh task list
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
                    <label htmlFor="taskTitle" className="label font-medium">Task Title</label>
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
                    <label htmlFor="taskDescription" className="label font-medium">Task Description</label>
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
