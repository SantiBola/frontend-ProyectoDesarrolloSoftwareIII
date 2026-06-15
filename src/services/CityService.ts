import { config } from "../config";
import type { City } from "../Models/Responses/City";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/City`;

export async function getCities(): Promise<City[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<City[]>(response, "Error al obtener las ciudades");
}
