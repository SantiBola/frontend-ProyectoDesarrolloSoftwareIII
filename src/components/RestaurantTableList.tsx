import { useEffect, useState } from "react";
import type { RestaurantTable } from "../Models/Responses/RestaurantTable";
import { getRestaurantTables } from "../services/RestaurantTableService";

export function RestaurantTableList() {
    const [restaurantTables, setRestaurantTables] = useState<RestaurantTable[]>([]);

    useEffect(() => {
        getRestaurantTables()
            .then((data) => {
                setRestaurantTables(data);
            })
            .catch((error) => {
                console.error("Error al obtener mesas:", error);
            });
    }, []);

    return (
        <div>
            <h1>Restaurant Table List</h1>
            {restaurantTables.map((table) => (
                <div key={table.idTable}>
                    <p>{table.idArea}</p>
                    <p>{table.tableDescription}</p>
                </div>
            ))}
        </div>
    );
}