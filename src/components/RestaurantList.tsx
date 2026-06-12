import { useEffect, useState } from "react";
import type { Restaurant } from "../Models/Responses/Restaurant";
import { getRestaurants } from "../services/RestaurantService";

export function RestaurantList() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((error) => {
                console.error("Error al obtener restaurantes:", error);
            });
    }, []);

    return (
        <div>
            <h1>Restaurant List</h1>
            {restaurants.map((restaurant) => (
                <div key={restaurant.idRestaurant}>
                    <p>{restaurant.restaurantName}</p>
                </div>
            ))}
        </div>
    );
}