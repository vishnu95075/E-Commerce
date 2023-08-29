import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"



const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 15,
        value: product.ratings,
        isHalf: true
    }
    console.log("prod ",product);

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            {/* "https://i.ibb.co/DRST11n/1.webp" */}
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>${product.price}</span>
        </Link>
    )
}

export default ProductCard