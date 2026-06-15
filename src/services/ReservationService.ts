import { config } from "../config";
import type { Reservation } from "../Models/Responses/Reservation";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Reservation`;

export type CreateReservationRequest = {
  idClient: number;
  idTable: number;
  dateReservation: string;
  timeReservation: string;
};

export async function getReservations(): Promise<Reservation[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Reservation[]>(response, "Error al obtener las reservaciones");
}

export async function createReservation(reservation: CreateReservationRequest): Promise<Reservation> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });

  return handleJsonResponse<Reservation>(response, "No pudimos guardar tu reserva");
}
