import { config } from "../config";
import type { Pay } from "../Models/Responses/Pay";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Pay`;

export async function getPays(): Promise<Pay[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Pay[]>(response, "Error al obtener los pagos");
}
