import { config } from "../config";
import type { RestaurantTable } from "../Models/Responses/RestaurantTable";

const API_URL = `${config.api.url}/Table`;

export async function getRestaurantTables(): Promise<RestaurantTable[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener las mesas");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en restaurantTableService:", error);
        throw error;
    }
}