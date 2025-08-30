import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import PendingTasks from "./PendingTasks";

const Home = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <Banner />
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
            >
                <PendingTasks />
            </motion.div>
        </div>
    );
};

export default Home;
