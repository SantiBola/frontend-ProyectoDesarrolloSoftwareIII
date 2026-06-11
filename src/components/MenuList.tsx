import "./MenuList.css";
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
                console.error("Error al obtener menu:", error);
            });

    }, []);

    return (
    <div className="container">

        <h1 className="title" style={{ color: '#1a1a1a' }}>Menu</h1>

        <div className="product-grid">

            {menus.map((menu) => (
                
                <div key={menu.idMenu} className="product-card">
                    
                    <h2 className="product-name" style={{ color: '#2d3748' }}>
                        {menu.name}
                    </h2>

                    <p className="product-price" style={{ color: '#1a1a1a' }}>
                        ₡ {menu.price.toLocaleString('es-CR')}
                    </p>

                </div>

            ))}

        </div>

    </div>
);
}