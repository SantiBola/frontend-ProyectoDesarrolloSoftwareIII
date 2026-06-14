import { useEffect, useState } from "react";
import type { Country } from "../Models/Responses/Country";
import { getCountries } from "../services/CountryService";

export function CountryList() {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        getCountries()
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => {
                console.error("Error al obtener países:", error);
            });
    }, []);

    return (
        <div>
            <h1>Country List</h1>
            {countries.map((country) => (
                <div key={country.idCountry}>
                    <p>{country.countryName}</p>
                </div>
            ))}
        </div>
    );
}