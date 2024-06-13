import React, { useEffect } from 'react';
import Product from "./product.js";
import "./productLogic.css";
import Config from "../config.js";

// Define the 'ProductLogic' component
const ProductLogic = () => {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        fetch('/api/products', {
            headers : {'Accept': 'application/json', 'x-access-token': Config.token}
        })
        .then ((response) => response.json())
        .then ((response) => {
            setLoading(false);
            setProducts(response)
        });
        return () => setProducts([]);
    }, [])
    

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='products'>
            <label>Products: </label>
            <ul>
                {
                    products.map((products) => <Product key={products._id} {...products} />)
                }
            </ul>   
        </div>
    );
};

export default ProductLogic;

