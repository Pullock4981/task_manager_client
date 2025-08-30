import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-24 flex flex-col items-center justify-center text-center">
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Manage Your Tasks. Track Your Success.
            </motion.h1>
            <motion.p
                className="text-lg md:text-2xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Stay organized, stay productive.
            </motion.p>
            <Link to='/dashboard'>
                <motion.button
                    className="bg-white text-purple-700 font-bold py-2 px-6 rounded hover:bg-gray-100 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go to Dashboard
                </motion.button>
            </Link>
        </section>
    );
};

export default Banner;
