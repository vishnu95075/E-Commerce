import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"



const Product = ({ product }) => {
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
        <Link className='productCard' to={product._id}>
            {/* product.images[0].url */}
            <img src={" "} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>{product.price}$</span>
        </Link>
    )
}

export default Product