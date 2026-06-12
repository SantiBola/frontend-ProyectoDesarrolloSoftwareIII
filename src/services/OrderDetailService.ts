import { config } from "../config";
import type { OrderDetail } from "../Models/Responses/OrderDetail";

const API_URL = `${config.api.url}/OrderDetail`;

export async function getOrderDetails(): Promise<OrderDetail[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los detalles de las órdenes");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en orderDetailService:", error);
        throw error;
    }
}