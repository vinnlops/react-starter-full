import type { RouteObject } from "react-router-dom";
import type { AppRoute } from "./types";

export function createRoutes(
    routes: AppRoute[]
): RouteObject[] {
    return routes.map((route) => {
        if (route.index) {
            return {
                index: true,
                element: route.element,
            };
        }

        return {
            path: route.path,
            element: route.element,
            children: route.children
                ? createRoutes(route.children)
                : undefined,
        };
    });
}