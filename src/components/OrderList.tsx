import { useEffect, useState } from "react";
import type { Order } from "../Models/Responses/Order";
import { getOrders } from "../services/OrderService";

export function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Error al obtener órdenes:", error);
            });
    }, []);

    return (
        <div>
            <h1>Order List</h1>
            {orders.map((order) => (
                <div key={order.idOrder}>
                    <p>{order.idTable}</p>
                    <p>{order.idClient}</p>
                    <p>{order.status}</p>
                    <p>{order.dateOrder}</p>
                </div>
            ))}
        </div>
    );
}