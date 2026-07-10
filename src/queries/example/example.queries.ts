import { useQuery } from "@tanstack/react-query";

import { getExamples } from "../../services/services.index";

import { exampleKeys } from "./example.keys";

export function useExamples() {
    return useQuery({
        queryKey:
            exampleKeys.all,

        queryFn:
            getExamples,

    });
}