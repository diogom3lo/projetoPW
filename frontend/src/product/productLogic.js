import React from 'react';
import Product from "./product.js";
import "./productLogic.css";
import Config from "../config.js";

// Define the 'ProductLogic' component
const ProductLogic = () => {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const headers = {
                    "Accept": "application/json",
                    "x-access-token": Config.token
                };
    
                const response = await fetch("/api/product", {
                    headers
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
    
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error('API response is not an array');
                }
            } catch (error) {
                console.error('Fetch error:', error); // Log the error for debugging
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    
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

