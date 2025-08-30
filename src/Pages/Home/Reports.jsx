import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Reports = () => {
    const { user } = useContext(AuthContext);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://task-manager-backend-weld-nine.vercel.app/tasks/users/${user.email}`)
            .then(res => res.json())
            .then(tasks => {
                const completed = tasks.filter(task => task.completed).length;
                const pending = tasks.filter(task => !task.completed).length;
                const overdue = tasks.filter(task => {
                    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                    return dueDate && !task.completed && dueDate < new Date();
                }).length;

                setReportData([
                    { title: "Completed Tasks", count: completed, color: "bg-green-500" },
                    { title: "Pending Tasks", count: pending, color: "bg-yellow-500" },
                    { title: "Overdue Tasks", count: overdue, color: "bg-red-500" },
                ]);

                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <p className="text-center py-10">Loading reports...</p>;

    return (
        <section className="py-12">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Task Reports</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {reportData.map((report, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded shadow-lg ${report.color} text-white flex flex-col items-center`}
                        >
                            <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                            <p className="text-3xl font-bold">{report.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reports;
