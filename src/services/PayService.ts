import { config } from "../config";
import type { Pay } from "../Models/Responses/Pay";

const API_URL = `${config.api.url}/Pay`;

export async function getPays(): Promise<Pay[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los pagos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en payService:", error);
        throw error;
    }
}