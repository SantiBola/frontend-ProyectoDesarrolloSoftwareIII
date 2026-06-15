import { config } from "../config";
import type { Area } from "../Models/Responses/Area";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Area`;
export type AreaPayload = Omit<Area, "idArea">;

export async function getAreas(): Promise<Area[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Area[]>(response, "Error al obtener las areas");
}

export async function createArea(area: AreaPayload): Promise<Area> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(area),
  });

  return handleJsonResponse<Area>(response, "Error al crear el area");
}

export async function updateArea(idArea: number, area: AreaPayload): Promise<Area> {
  const response = await fetch(`${API_URL}/${idArea}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idArea, ...area }),
  });

  return handleJsonResponse<Area>(response, "Error al actualizar el area");
}

export async function deleteArea(idArea: number): Promise<void> {
  const response = await fetch(`${API_URL}/${idArea}`, {
    method: "DELETE",
  });

  return handleJsonResponse<void>(response, "Error al eliminar el area");
}
