import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

const PendingTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/tasks/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                const undoneTasks = data.filter(task => !task.completed);
                setTasks(undoneTasks);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <p className="text-center py-10">Loading tasks...</p>;

    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Pending Tasks</h2>

                {tasks.length === 0 ? (
                    <p className="text-center text-gray-600">No pending tasks. Great job!</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tasks.map(task => (
                            <div key={task._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-700 mt-1">{task.description}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Created on: {new Date(task.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-6">
                    <button
                        className="btn bg-primary text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
                        onClick={() => navigate("/tasks")}
                    >
                        Go to Tasks Page
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PendingTasks;
