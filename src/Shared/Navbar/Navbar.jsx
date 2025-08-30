import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import { AuthContext } from "../../Context/AuthContext";
import './Navbar.css';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navLinks = (
        <>
            <div className="flex md:flex-row flex-col gap-4 font-bold">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/tasks">Tasks</NavLink>
                </li>
                <li>
                    <NavLink to="/add-task">Add Task</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
            </div>
        </>
    );

    const handleLogout = () => {
        logOut().catch((err) => console.error(err));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-16 px-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Logo />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            <div className="navbar-end flex items-center gap-2">
                {user ? (
                    <>
                        <img
                            src={user.photoURL || "/default-user.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full border"
                            title={user.displayName || user.email}
                        />
                        <button onClick={handleLogout} className="btn btn-outline btn-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-sm">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
