import { config } from "../config";
import type { Menu } from "../Models/Responses/Menu";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Menu`;

export async function getMenus(): Promise<Menu[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Menu[]>(response, "Error al obtener el menu");
}
