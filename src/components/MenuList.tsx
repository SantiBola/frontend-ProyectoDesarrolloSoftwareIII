import { useEffect, useState } from "react";
import type { Menu } from "../Models/Responses/Menu";
import { getMenus } from "../services/MenuService";

export function MenuList() {
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        getMenus()
            .then((data) => {
                setMenus(data);
            })
            .catch((error) => {
                console.error("Error al obtener menús:", error);
            });
    }, []);

    return (
        <div>
            <h1>Menu List</h1>
            {menus.map((menu) => (
                <div key={menu.idMenu}>
                    <p>{menu.name}</p>
                    <p>{menu.price}</p>
                </div>
            ))}
        </div>
    );
}