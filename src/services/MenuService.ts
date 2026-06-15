import { config } from "../config";
import type { Menu } from "../Models/Responses/Menu";
import { handleJsonResponse } from "./apiClient";

const API_URL = `${config.api.url}/Menu`;
export type MenuPayload = Omit<Menu, "idMenu">;

export async function getMenus(): Promise<Menu[]> {
  const response = await fetch(API_URL);
  return handleJsonResponse<Menu[]>(response, "Error al obtener el menu");
}

export async function createMenu(menu: MenuPayload): Promise<Menu> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menu),
  });

  return handleJsonResponse<Menu>(response, "Error al crear el plato");
}

export async function updateMenu(idMenu: number, menu: MenuPayload): Promise<Menu> {
  const response = await fetch(`${API_URL}/${idMenu}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idMenu, ...menu }),
  });

  return handleJsonResponse<Menu>(response, "Error al actualizar el plato");
}

export async function deleteMenu(idMenu: number): Promise<void> {
  const response = await fetch(`${API_URL}/${idMenu}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el plato");
  }
}
