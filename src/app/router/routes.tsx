import { MainLayout } from "../../layouts/MainLayout";

import HomePage from "../../pages/Home";
import AboutPage from "../../pages/About";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            }
        ],
    },
];