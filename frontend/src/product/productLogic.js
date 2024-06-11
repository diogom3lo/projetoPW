import React from 'react';
import Product from "./product.js";
import "./productLogic.css";
import Config from "../config.js";

// Define the 'ProductLogic' component
const ProductLogic = () => {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [error, setError] = React.useState(null);

    // Fetch products on component mount
    React.useEffect(() => {
        fetch("/api/product", {
            headers: {
                "Accept": "application/json",
                "x-access-token": Config.token
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                throw new Error('API response is not an array');
            }
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });

        return () => setProducts([]); // Cleanup function
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className='products'>
            <label>Products: </label>
            <ul>
                {products.map((product) => (
                    <Product key={product._id} {...product} />
                ))}
            </ul>
        </div>
    );
};

export default ProductLogic;

