import { config } from "../config";
import type { Restaurant } from "../Models/Responses/Restaurant";

const API_URL = `${config.api.url}/Restaurant`;

export async function getRestaurants(): Promise<Restaurant[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los restaurantes");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en restaurantService:", error);
        throw error;
    }
}