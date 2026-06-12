import { config } from "../config";
import type { Area } from "../Models/Responses/Area";

const API_URL = `${config.api.url}/Area`;

export async function getAreas(): Promise<Area[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener las áreas");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en areaService:", error);
        throw error;
    }
}