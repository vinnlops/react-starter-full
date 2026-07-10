import type {
    PropsWithChildren,
} from "react";

import {
    HelmetProvider as Provider,
} from "react-helmet-async";

export function HelmetProvider({
    children,
}: PropsWithChildren) {
    return (
        <Provider>
            {children}
        </Provider>
    );
}