import type { Users } from "../Models/Responses/Users";

const API_URL = "http://localhost:8080/users";

export async function getUsers(): Promise<Users[]> {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        return await response.json();

    } catch (error) {

        console.error("Error en userService:", error);
        throw error;
    }
}