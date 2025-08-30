import React, { useContext, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext";

const ActivityChart = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchTasks = async () => {
            try {
                const res = await fetch(`http://localhost:5000/tasks/users/${user.email}`);
                const tasks = await res.json();

                // Map tasks by day
                const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const tasksByDay = {};

                tasks.forEach((task) => {
                    const day = daysOfWeek[new Date(task.createdAt).getDay()];
                    tasksByDay[day] = (tasksByDay[day] || 0) + 1;
                });

                // Prepare chart data in order Mon-Sun
                const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
                    day,
                    tasksCompleted: tasksByDay[day] || 0,
                }));

                setData(chartData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [user]);

    if (loading) return <p className="text-center py-10">Loading activity...</p>;

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Weekly Activity</h2>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="tasksCompleted" stroke="#6b46c1" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">No activity recorded this week.</p>
                )}
            </div>
        </section>
    );
};

export default ActivityChart;
