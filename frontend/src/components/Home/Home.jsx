import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import { CgMouse } from "react-icons/cg";
import Product from "./Product.js";
import MetaData from '../Layout/MetaData';
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title="E-COMMERCE" />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>SCROL <CgMouse /></button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Products</h2>
            <div className="container" id="container">

                {
                    products && products.map((product) => {
                        return <Product  key={product._id} product={product} />;
                    })
                }
            </div>

        </Fragment>
    )
}

export default Home