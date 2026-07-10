/**
 * EXEMPLO DE SERVICE
 *
 * Services são responsáveis por concentrar comunicação com APIs.
 *
 * Responsabilidades:
 *
 * - Fazer chamadas HTTP
 * - Tipar respostas
 * - Transformar dados vindos da API quando necessário
 *
 * Não deve:
 *
 * X Conter lógica de componente
 * X Acessar hooks do React
 * X Alterar estado global
 * X Controlar loading/error de interface
 */

import { api } from "../api";

import type { Example, CreateExampleDTO, UpdateExampleDTO, } from "./example.types";

// ========== Buscar todos os registros ===============================

export async function getExamples(): Promise<Example[]> {
    const response = await api.get<Example[]>("/examples");
    return response.data;
}

// ========== Buscar registro por ID ==================================

export async function getExampleById(id: string): Promise<Example> {
    const response = await api.get<Example>(`/examples/${id}`);
    return response.data;
}

// ========== Criar novo registro =====================================

export async function createExample(data: CreateExampleDTO): Promise<Example> {
    const response = await api.post<Example>("/examples", data);
    return response.data;
}

// ========== Atualizar registro existente ============================

export async function updateExample(id: string, data: UpdateExampleDTO): Promise<Example> {
    const response = await api.put<Example>(`/examples/${id}`, data);
    return response.data;
}

// ==========  Remover registro =======================================

export async function deleteExample(id: string): Promise<void> {
    await api.delete(`/examples/${id}`);
}