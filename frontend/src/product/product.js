import "./product.css";

const product = (props) => {

    const renderProduct = (product) => {
        return product.map((product) => {
            return (
                    <label key={product._id}> {product.category} </label>
            )
        })
    }

    return (
        <li className = "product">
            <div className = "product-cell product-name">
                <label className = "product-label">Name: {props.name}</label>
            </div>
            <div className = "product-cell product-number">
                <label className = "product-label">Number: {props.number}</label>
            </div>
            <div className = "product-cell product-price">
                <label className = "product-label">Price: {props.price}</label>
            </div>
            <div className = "product-cell product-category">
                <label className = "product-label">Name: {renderProduct(props.category)}</label>
            </div>
            <div className = "product-cell product-description">
                <label className = "product-label">Description: {props.description}</label>
            </div>
            <div className = "product-cell product-image">
                <label className = "product-label">Image: {props.image}</label>
            </div>
            <div className = "product-cell product-rating">
                <label className = "product-label">Rating: {props.rating}</label>
            </div>
        </li>
    )

}

export default product;