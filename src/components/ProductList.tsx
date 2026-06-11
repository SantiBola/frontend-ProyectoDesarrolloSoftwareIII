import "./ProductList.css";
import { useEffect, useState } from "react";
import type { Product } from "../Models/Responses/Product";
import { getProducts } from "../services/ProductService";

export function ProductList() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });

    }, []);

    return (

        <div className="container">

            <h1 className="title">
                Productos
            </h1>

            <div className="product-grid">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.resourceId}
                    >

                        <h2 className="product-name">
                            {product.name}
                        </h2>

                        <p className="product-description">
                            {product.description}
                        </p>

                        <p className="product-price">
                            ₡ {product.price}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}