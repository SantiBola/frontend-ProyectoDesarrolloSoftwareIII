import { config } from "../config";
import type { Area } from "../Models/Responses/Area";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Area`;

export async function getAreas(): Promise<Area[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Area[]>(response, "Error al obtener las areas");
}
