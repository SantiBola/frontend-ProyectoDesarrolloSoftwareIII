import type { Menu } from "../Models/Responses/Menu";
// Importamos la configuración centralizada como dice la guía
import { config } from "../config"; 

// Construimos la URL dinámicamente usando el archivo JSON
const API_URL = `${config.api.url}/menu`;

export async function getMenus(): Promise<Menu[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener el menú");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en menuService:", error);
        throw error;
    }
}