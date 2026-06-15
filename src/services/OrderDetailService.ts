import { config } from "../config";
import type { OrderDetail } from "../Models/Responses/OrderDetail";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/OrderDetail`;

export async function getOrderDetails(): Promise<OrderDetail[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<OrderDetail[]>(response, "Error al obtener los detalles de orden");
}
