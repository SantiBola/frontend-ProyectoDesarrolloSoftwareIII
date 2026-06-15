import { config } from "../config";
import type { RestaurantTable } from "../Models/Responses/RestaurantTable";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/RestaurantTable`;

export async function getRestaurantTables(): Promise<RestaurantTable[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<RestaurantTable[]>(response, "Error al obtener las mesas");
}
