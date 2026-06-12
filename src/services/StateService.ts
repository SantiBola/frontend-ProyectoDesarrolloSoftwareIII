import { config } from "../config";
import type { State } from "../Models/Responses/State";

const API_URL = `${config.api.url}/State`;

export async function getStates(): Promise<State[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los estados");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en stateService:", error);
        throw error;
    }
}