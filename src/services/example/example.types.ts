/**
 * TYPES DE EXEMPLO DE SERVICE
 *
 * Centralize aqui os tipos relacionados ao recurso.
 *
 * Recomendação:
 *
 * services/
 * └── nome-do-recurso/
 *     ├── nome.service.ts
 *     └── nome.types.ts
 *
 * Evite declarar interfaces diretamente dentro do service
 * quando elas forem utilizadas em outros locais.
 */


export interface Example {
    id: string;
    name: string;
    createdAt: string;
}


export interface CreateExampleDTO {
    name: string;
}


export interface UpdateExampleDTO {
    name?: string;
}