import { createBrowserRouter } from "react-router";
import RootLayout from "../Layoutes/RootLayout";
import Home from "../Pages/Home/Home";
import Tasks from "../Pages/Tasks/Tasks";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AddTask from "../Pages/AddTask/AddTask";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/tasks',
                Component: Tasks
            },
            {
                path: '/add-task',
                element: <PrivateRoute><AddTask /></PrivateRoute>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
]);

export default router;