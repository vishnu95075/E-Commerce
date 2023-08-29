import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from "../Home/ProductCard"
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import  Pagination  from 'react-js-pagination';
const Products = () => {
  const alert = useAlert();
  const param = useParams();


  const dispatch = useDispatch();
  const {loading,error, products,productsCount,resultPerPage } = useSelector(state => state.products);
  const keyword = param.keyword;
  const [currentPage,setcurrentPage]=useState(1);
  const setcurrentPageNo=(e)=>{
    setcurrentPage(e)
  }

  useEffect(() => {
      if(error){
          alert.error(error);
          dispatch(clearErrors());
      }
      dispatch(getProduct(keyword));
  }, [dispatch,error,alert,keyword])
  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
              {
                products && products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))

              }
            </div>

            <div className='paginationBox'>
              <Pagination
              ativePage={currentPage}
              itemCountPerPagev={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setcurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActi'
              activeLinkClass='pageLinkActive'
              />

            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Products