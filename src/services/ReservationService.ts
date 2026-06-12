import { config } from "../config";
import type { Reservation } from "../Models/Responses/Reservation";

const API_URL = `${config.api.url}/Reservation`;

export async function getReservations(): Promise<Reservation[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener las reservaciones");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en reservationService:", error);
        throw error;
    }
}