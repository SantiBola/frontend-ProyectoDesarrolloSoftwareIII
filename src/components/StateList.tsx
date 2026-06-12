import { useEffect, useState } from "react";
import type { State } from "../Models/Responses/State";
import { getStates } from "../services/StateService";

export function StateList() {
    const [states, setStates] = useState<State[]>([]);

    useEffect(() => {
        getStates()
            .then((data) => {
                setStates(data);
            })
            .catch((error) => {
                console.error("Error al obtener estados:", error);
            });
    }, []);

    return (
        <div>
            <h1>State List</h1>
            {states.map((state) => (
                <div key={state.idState}>
                    <p>{state.idCountry}</p>
                    <p>{state.stateName}</p>
                </div>
            ))}
        </div>
    );
}