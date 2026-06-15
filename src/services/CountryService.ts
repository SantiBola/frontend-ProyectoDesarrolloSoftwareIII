import { config } from "../config";
import type { Country } from "../Models/Responses/Country";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Country`;

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Country[]>(response, "Error al obtener los paises");
}
