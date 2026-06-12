import { config } from "../config";
import type { Order } from "../Models/Responses/Order";

const API_URL = `${config.api.url}/Order`;

export async function getOrders(): Promise<Order[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener las órdenes");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en orderService:", error);
        throw error;
    }
}