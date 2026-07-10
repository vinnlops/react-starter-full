import {
    createBrowserRouter,
} from "react-router-dom";

import { routes } from "./routes";
import { createRoutes } from "./createRoutes";

export const router = createBrowserRouter(
    createRoutes(routes)
);