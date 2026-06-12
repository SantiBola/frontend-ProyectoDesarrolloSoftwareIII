import { useEffect, useState } from "react";
import type { Customer } from "../Models/Responses/Customer";
import { getCustomers } from "../services/CustomerService";

export function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        getCustomers()
            .then((data) => {
                setCustomers(data);
            })
            .catch((error) => {
                console.error("Error al obtener clientes:", error);
            });
    }, []);

    return (
        <div>
            <h1>Customer List</h1>
            {customers.map((customer) => (
                <div key={customer.idClient}>
                    <p>{customer.clientName}</p>
                    <p>{customer.clientEmail}</p>
                    <p>{customer.idCountry}</p>
                    <p>{customer.idState}</p>
                    <p>{customer.idCity}</p>
                    <p>{customer.clientNumber}</p>
                    <p>{customer.birthdate}</p>
                    <p>{customer.addressDescription}</p>
                </div>
            ))}
        </div>
    );
}