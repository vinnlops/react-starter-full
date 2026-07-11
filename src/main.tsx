import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import { AppProviders } from "./providers/AppProviders";

import './index.css'
import { initTheme } from "./utils/theme";

initTheme()

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <AppProviders>
        <RouterProvider router={router} />
    </AppProviders>
);