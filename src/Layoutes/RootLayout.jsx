import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/NAvbar";
import Footer from "../Shared/Footer/Footer";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;
