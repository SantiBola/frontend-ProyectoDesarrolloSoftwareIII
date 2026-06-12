import { useEffect, useState } from "react";
import type { Area } from "../Models/Responses/Area";
import { getAreas } from "../services/AreaService";

export function AreaList() {
    const [areas, setAreas] = useState<Area[]>([]);

    useEffect(() => {
        getAreas()
            .then((data) => {
                setAreas(data);
            })
            .catch((error) => {
                console.error("Error al obtener áreas:", error);
            });
    }, []);

    return (
        <div>
            <h1>Area List</h1>
            {areas.map((area) => (
                <div key={area.idArea}>
                    <p>{area.idRestaurant}</p>
                    <p>{area.areaDescription}</p>
                </div>
            ))}
        </div>
    );
}