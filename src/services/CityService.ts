import { config } from "../config";
import type { City } from "../Models/Responses/City";

const API_URL = `${config.api.url}/City`;

export async function getCities(): Promise<City[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener las ciudades");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en cityService:", error);
        throw error;
    }
}