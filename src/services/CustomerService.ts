import { config } from "../config";
import type { Customer } from "../Models/Responses/Customer";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Customer`;

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Customer[]>(response, "Error al obtener los clientes");
}
