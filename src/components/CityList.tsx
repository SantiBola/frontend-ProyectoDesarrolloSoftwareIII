import { useEffect, useState } from "react";
import type { City } from "../Models/Responses/City";
import { getCities } from "../services/CityService";

export function CityList() {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        getCities()
            .then((data) => {
                setCities(data);
            })
            .catch((error) => {
                console.error("Error al obtener ciudades:", error);
            });
    }, []);

    return (
        <div>
            <h1>City List</h1>
            {cities.map((city) => (
                <div key={city.idCity}>
                    <p>{city.idCountry}</p>
                    <p>{city.idState}</p>
                </div>
            ))}
        </div>
    );
}