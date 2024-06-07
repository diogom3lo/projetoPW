import React from 'react'; // Import the 'React' library
import Product from "./product.js";
import "./productLogic.css";
import Config from "../config.js";

// Define the 'ProductLogic' component
const ProductLogic = () => {
    const [loading, setLoading] = React.useState(true); // Use 'React.useState' instead of 'useState'
    const [products, setProducts] = React.useState([]);

    // Use 'React.useEffect' instead of 'useEffect'
    React.useEffect(() => {
        fetch ("/api/product", {
            headers: {"Accept": "application/json", "x-access-token": Config.token}
        })
        .then((response) => response.json())
        .then((response) =>{
            setLoading(false);
            setProducts(response);
        });
         return() => setProducts([]); // Return a function that sets 'products' to an empty array
        
    })

    // If 'loading' is true, return a 'Loading...' message
    if(loading){
        return <h1>Loading...</h1>;
    }

    return(
        <div className='products'>
            <label>Products: </label>
            <url>
                {
                    products.map((product) => <Product key={product._id} {...product}/>)
                }
            </url>
        </div>
    )
};

export default ProductLogic; // Export the 'ProductLogic' component