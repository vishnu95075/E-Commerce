import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import { CgMouse } from "react-icons/cg";
import Product from "./ProductCard.js";
import MetaData from '../Layout/MetaData';
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment> <MetaData title="E-COMMERCE" />
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
                            return <Product key={product._id} product={product} />;
                        })
                    }
                </div>
            </Fragment>
            }
        </Fragment>
    )
}

export default Home