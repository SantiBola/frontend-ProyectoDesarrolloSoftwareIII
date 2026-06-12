import { config } from "../config";
import type { Customer } from "../Models/Responses/Customer";

const API_URL = `${config.api.url}/Customer`;

export async function getCustomers(): Promise<Customer[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los clientes");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en customerService:", error);
        throw error;
    }
}