/**
 * SERVICES INDEX
 *
 * Este arquivo centraliza as exportações dos serviços da aplicação.
 *
 * Objetivo:
 *
 * Permitir imports consistentes:
 *
 * import { getUsers, createUser } from "@/services";
 *
 * Ao invés de:
 *
 * import { getUsers } from "@/services/users/users.service";
 *
 *
 * Sempre que um novo service for criado,
 * adicione sua exportação aqui.
 */


// API client
export * from "./api";


// Services
export * from "./example/example.service";


// Exemplos futuros:
//
// export * from "./auth/auth.service";
// export * from "./users/users.service";
// export * from "./workspaces/workspaces.service";