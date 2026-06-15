import { config } from "../config";
import type { Order } from "../Models/Responses/Order";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Order`;

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Order[]>(response, "Error al obtener las ordenes");
}
