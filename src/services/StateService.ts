import { config } from "../config";
import type { State } from "../Models/Responses/State";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/State`;

export async function getStates(): Promise<State[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<State[]>(response, "Error al obtener los estados");
}
