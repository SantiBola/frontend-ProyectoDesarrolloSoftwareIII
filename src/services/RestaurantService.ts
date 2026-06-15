import { config } from "../config";
import type { Restaurant } from "../Models/Responses/Restaurant";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Restaurant`;

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Restaurant[]>(response, "Error al obtener los restaurantes");
}
