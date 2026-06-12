import { useEffect, useState } from "react";
import type { Pay } from "../Models/Responses/Pay";
import { getPays } from "../services/PayService";

export function PayList() {
    const [pays, setPays] = useState<Pay[]>([]);

    useEffect(() => {
        getPays()
            .then((data) => {
                setPays(data);
            })
            .catch((error) => {
                console.error("Error al obtener pagos:", error);
            });
    }, []);

    return (
        <div>
            <h1>Pay List</h1>
            {pays.map((pay) => (
                <div key={pay.idPay}>
                    <p>{pay.datePay}</p>
                    <p>{pay.idOrder}</p>
                    <p>{pay.amount}</p>
                </div>
            ))}
        </div>
    );
}