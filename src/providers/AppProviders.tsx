import type { PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";
import { HelmetProvider } from "./HelmetProvider";

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <QueryProvider>
            <HelmetProvider>
                {children}
            </HelmetProvider>
        </QueryProvider>
    );
}