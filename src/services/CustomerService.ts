import { config } from "../config";
import type { Customer } from "../Models/Responses/Customer";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/api/Customer`;
export type CustomerPayload = Omit<Customer, "idClient">;

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Customer[]>(response, "Error al obtener los clientes");
}

export async function createCustomer(customer: CustomerPayload): Promise<Customer> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  return handleJsonResponse<Customer>(response, "Error al crear el cliente");
}

export async function updateCustomer(idClient: number, customer: CustomerPayload): Promise<Customer> {
  const response = await fetch(`${API_URL}/${idClient}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idClient, ...customer }),
  });

  return handleJsonResponse<Customer>(response, "Error al actualizar el cliente");
}

export async function deleteCustomer(idClient: number): Promise<void> {
  const response = await fetch(`${API_URL}/${idClient}`, {
    method: "DELETE",
  });

  return handleJsonResponse<void>(response, "Error al eliminar el cliente");
}
