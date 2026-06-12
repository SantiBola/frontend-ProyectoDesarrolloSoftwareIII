import { useEffect, useState } from "react";
import type { Reservation } from "../Models/Responses/Reservation";
import { getReservations } from "../services/ReservationService";

export function ReservationList() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        getReservations()
            .then((data) => {
                setReservations(data);
            })
            .catch((error) => {
                console.error("Error al obtener reservaciones:", error);
            });
    }, []);

    return (
        <div>
            <h1>Reservation List</h1>
            {reservations.map((reservation) => (
                <div key={reservation.idReservation}>
                    <p>{reservation.idTable}</p>
                    <p>{reservation.idClient}</p>
                    <p>{reservation.dateReservation}</p>
                    <p>{reservation.timeReservation}</p>
                </div>
            ))}
        </div>
    );
}