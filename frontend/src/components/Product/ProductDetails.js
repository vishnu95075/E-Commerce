import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import { clearErrors, getProductDetails } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import './ProductDetails.css'
import ReviewCard from "./ReviewCard.js"
import { useAlert } from "react-alert"
import MetaData from '../Layout/MetaData';

const ProductDetails = () => {
    const params = useParams();
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, error, alert])


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 15,
        value: product.ratings,
        isHalf: true
    }

    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE` }/>

                    <div className='ProductDeatials'>
                        <div>
                            <Carousel>
                                {
                                    product.images && product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slides`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button >-</button>
                                        <input readOnly type="number" value={1} />
                                        <button >+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                    // onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    {
                        product.reviwes && product.reviwes[0] ? (
                            <div className='reviews'>
                                {
                                    product.reviwes &&
                                    product.reviwes.map(review => (
                                        <ReviewCard review={review} />
                                    ))
                                }
                            </div>
                        ) : (
                            <p className='noReviews'>No Reviews Yet</p>
                        )
                    }
                </Fragment>
            }

        </Fragment>

    )
}

export default ProductDetails