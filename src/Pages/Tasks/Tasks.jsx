import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch(`https://task-manager-backend-weld-nine.vercel.app/tasks/users/${user.email}`);
            const data = await res.json();
            const sortedTasks = data.sort((a, b) => {
                if (a.completed === b.completed) {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
                return a.completed ? 1 : -1;
            });
            setTasks(sortedTasks);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the task permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await fetch(`https://task-manager-backend-weld-nine.vercel.app/tasks/${id}`, { method: "DELETE" });
                Swal.fire("Deleted!", "Task has been deleted.", "success");
                fetchTasks();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete task", "error");
            }
        }
    };

    const toggleCompleted = async (task) => {
        if (task.completed) return;
        try {
            await fetch(`https://task-manager-backend-weld-nine.vercel.app/tasks/${task._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !task.completed }),
            });
            fetchTasks();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update task", "error");
        }
    };

    const handleUpdate = async (task) => {
        const { value: formValues } = await Swal.fire({
            title: "Update Task",
            html:
                `<input id="swal-title" class="swal2-input" placeholder="Title" value="${task.title}">` +
                `<textarea id="swal-desc" class="swal2-textarea" placeholder="Description">${task.description}</textarea>`,
            focusConfirm: false,
            preConfirm: () => ({
                title: document.getElementById("swal-title").value,
                description: document.getElementById("swal-desc").value,
            }),
        });

        if (formValues) {
            try {
                await fetch(`https://task-manager-backend-weld-nine.vercel.app/tasks/${task._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues),
                });
                Swal.fire("Updated!", "Task has been updated.", "success");
                fetchTasks();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to update task", "error");
            }
        }
    };

    if (!user) return <p className="text-center py-10">Please login to see your tasks</p>;
    if (loading) return <p className="text-center py-10">Loading tasks...</p>;

    return (
        <div className="max-w-3xl mx-auto my-10 space-y-4">
            <h1 className="text-3xl font-bold text-center mb-6">Your Tasks</h1>

            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks found. Add a task first!</p>
            ) : (
                tasks.map((task, index) => (
                    <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-lg shadow-md ${task.completed ? "bg-gray-100" : "bg-white"
                            }`}
                    >
                        <div className="flex-1">
                            <h2 className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                                {task.title}
                            </h2>
                            <p className={`${task.completed ? "line-through text-gray-400" : ""}`}>{task.description}</p>
                        </div>

                        <div className="flex gap-2 mt-3 md:mt-0">
                            <button
                                onClick={() => toggleCompleted(task)}
                                className={`btn btn-sm ${task.completed ? "btn-success" : "btn-outline"}`}
                                disabled={task.completed}
                            >
                                {task.completed ? "Completed" : "Mark Complete"}
                            </button>

                            {!task.completed && (
                                <button onClick={() => handleUpdate(task)} className="btn btn-sm btn-warning">
                                    Update
                                </button>
                            )}

                            <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error">
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default Tasks;
