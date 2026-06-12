import { config } from "../config";
import type { Country } from "../Models/Responses/Country";

const API_URL = `${config.api.url}/Country`;

export async function getCountries(): Promise<Country[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los países");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en countryService:", error);
        throw error;
    }
}