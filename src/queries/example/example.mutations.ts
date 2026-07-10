import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createExample } from "../../services/services.index";

import { exampleKeys } from "./example.keys";

export function useCreateExample() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:
            createExample,


        onSuccess() {
            queryClient.invalidateQueries({

                queryKey:
                    exampleKeys.all

            });
        },
    });
}