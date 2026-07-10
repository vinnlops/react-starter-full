import { QueryClient } from "@tanstack/react-query";

import { queryConfig } from "@/config/query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: queryConfig.staleTime,
            gcTime: queryConfig.gcTime,
            retry: queryConfig.retry,
            refetchOnWindowFocus:
                queryConfig.refetchOnWindowFocus,
            refetchOnReconnect:
                queryConfig.refetchOnReconnect,
        },
    },
});