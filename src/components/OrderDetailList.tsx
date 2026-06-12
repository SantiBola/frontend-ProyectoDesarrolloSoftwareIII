import { useEffect, useState } from "react";
import type { OrderDetail } from "../Models/Responses/OrderDetail";
import { getOrderDetails } from "../services/OrderDetailService";

export function OrderDetailList() {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

    useEffect(() => {
        getOrderDetails()
            .then((data) => {
                setOrderDetails(data);
            })
            .catch((error) => {
                console.error("Error al obtener detalles de órdenes:", error);
            });
    }, []);

    return (
        <div>
            <h1>Order Detail List</h1>
            {orderDetails.map((orderDetail) => (
                <div key={orderDetail.idDetails}>
                    <p>{orderDetail.description}</p>
                    <p>{orderDetail.quantity}</p>
                    <p>{orderDetail.idOrder}</p>
                    <p>{orderDetail.idMenu}</p>
                </div>
            ))}
        </div>
    );
}