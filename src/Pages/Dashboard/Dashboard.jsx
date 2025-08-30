import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import ActivityChart from "../Home/ActivityChart";
import Reports from "../Home/Reports";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <p className="text-center py-10">Loading user data...</p>;
    if (!userData) return <p className="text-center py-10">No data found.</p>;

    const handleGoToTasks = () => navigate("/tasks");

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto p-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
        >
            <motion.h1
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Dashboard
            </motion.h1>

            <motion.div
                className="card bg-base-100 shadow-xl p-6 flex flex-col md:flex-row items-center gap-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={userData.photoURL || "/default-user.png"}
                    alt={userData.name || userData.email}
                    className="w-32 h-32 rounded-full border-2 border-primary object-cover"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">{userData.name}</h2>
                    <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Email:</span> {userData.email}
                    </p>
                    <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Joined On:</span>{" "}
                        {new Date(userData.createdAt).toLocaleDateString()}
                    </p>
                    <button
                        onClick={handleGoToTasks}
                        className="mt-4 btn btn-primary text-white"
                    >
                        Go to My Tasks
                    </button>
                </div>
            </motion.div>

            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="text-xl font-bold mb-4">Welcome, {userData.name}!</h2>
                <p className="text-gray-700">
                    Here you can manage your tasks, view your profile info, and track your progress.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <ActivityChart />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <Reports />
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
