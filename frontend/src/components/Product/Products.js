import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from "../Home/ProductCard"
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography, Slider } from '@material-ui/core';
import MetaData from '../Layout/MetaData';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
  "Fan",
  "Watch",
  "Book"
];

const Products = () => {
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const alert = useAlert();
  const param = useParams();


  const dispatch = useDispatch();
  const { loading, error, productsCount, resultPerPage, products } = useSelector((state) => state.products);
  const keyword = param.keyword;
  const [currentPage, setcurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct
      (
        keyword,
        currentPage,
        price,
        category,
        ratings
      ));
  }, [
    dispatch,
    error,
    alert,
    keyword,
    currentPage,
    price,
    category,
    ratings
  ]);

  let count;
  products && (count = Object.keys(products).length);

  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title={"PROUCTS -- ECOMMERCE"} />
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
              {
                products && products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))

              }
            </div>

            <div className='filterBox' >
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={250000}
              />
              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {
                  categories.map((category) => (
                    <li
                      className='category-link'
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))
                }
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby='continuous-slider'
                  min={0}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </fieldset>
            </div>

            {
              (resultPerPage < productsCount && resultPerPage === count) && (
                <div className='paginationBox'>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"

                  />

                </div>
              )
            }


          </Fragment>
      }
    </Fragment>
  )
}

export default Products