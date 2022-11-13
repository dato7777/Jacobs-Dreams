import React, { useState, CSSProperties, useEffect } from 'react'
import '../Styles/SearchBoxStyle.css'
import {
    useLocation,
    NavLink,
    Outlet,
    Link,
    useSearchParams,
} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from 'react-redux';
import MyCard from '../components/MyCard';
import { selectLogged, selectStaff, selectToken } from './LoginSlice'
import { selectFavouriteItems, addFavCount } from '../pages/FavouritesSlice'
import { addProductAsync, selectProducts, getProductsAsync, deleteProductAsync } from './ProductsSlice'
import MyLoader from '../components/MyLoader';
import { addCartCount, selectCartItems, selectItemsQuantity } from '../pages/ShoppingCartSlice'
import { CategoryTitle } from '../Styles/CategoryStyles'

const SearchProd = () => {
    const dispatch = useDispatch();
    const isStaff = useSelector(selectStaff)
    const itemsQuantity = useSelector(selectItemsQuantity)
    const token = useSelector(selectToken);
    const [searchInput, setSearchInput] = useState("")

    const favProds = useSelector(selectFavouriteItems);
    let idArray = favProds.map(e => e.Product_ID)
    const allProds = useSelector(selectProducts);
    // console.log("search prods",allProds)
    let idArray2 = JSON.parse(localStorage.getItem('favourites'))
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoaderOn()
        }, 1000);
    }, [searchInput.length]);

    useEffect(() => {
        setTimeout(setLoaderOff, 2000);
    }, [searchInput.length])

    const setLoaderOff = () => {
        setLoading(false)
    }
    const setLoaderOn = () => {
        setLoading(true)
    }
    return (
        <div className='mainContainer'>
            <div className='catImgAnim' style={{
                padding: "2px" ,
                backgroundImage: `url("https://www.publicholidayguide.com/wp-content/uploads/2021/04/world-whisky-day.jpg")`,
                // backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                // width: '100vw',
                // height: 'auto',
                // opacity: 0.9,
                // animationName: 'animar_fondo',
                // animationDuration: '20s',
                // animationTimingFunction: 'linear',
                // animationIterationCount: 'infinite',
                // animationDirection: 'alternate',
            }}>
                <CategoryTitle style={{
                    mixBlendMode: "screen",
                    fontSize: "80px",
                    textAlign: "center",
                    backgroundColor: "white",
                    width: "800px",
                    margin: "20px auto"
                }}>All Products</CategoryTitle>
                {loading && <div ><MyLoader></MyLoader></div>}
                <div className="s130"  >
                    <form>
                        <div className="inner-form">
                            <div className="input-field first-wrap">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </div>

                                <input
                                    id="search"
                                    type="text"
                                    placeholder="What are you looking for?"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}

                                />

                            </div>
                        </div>
                        <span className="info">ex. Drink name..</span>
                    </form>
                </div>

                {/* loop through filtered cards */}
                    <div className="container my-5" >
                        <div className="row row-eq-height">
                            {allProds.map((prod) => (
                                !loading &&
                                prod.prod_desc.toLowerCase().includes(searchInput.toLowerCase()) &&
                                // setLoading(false) +
                                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5" >
                                    <div className="product-card h-100 mb-0" >
                                        <a className="product-card__content" href="#" >
                                            <span className="product-card__img" style={{ backgroundImage: `url(http://127.0.0.1:8000${prod.image})` }}> </span>
                                            <span className="product-card__title">
                                                {prod.prod_desc}
                                            </span>
                                            <span className="product-card__price">
                                                ₪{prod.prod_price}
                                            </span>
                                        </a>
                                        <div className="product-card__actions">
                                            {cartItems !== null &&
                                                (cartItems.map(e => e.Product_ID)).includes(prod._id) === false ?
                                                <Link className="product-card__btn mr-3"
                                                    to="#"
                                                    onClick={() => dispatch
                                                        (addCartCount(
                                                            { Product_ID: prod._id, Product_desc: prod.prod_desc, Category_ID: prod.catg_id, Product_quantity: itemsQuantity, Product_price: prod.prod_price, Product_cost: prod.prod_price, Product_image: prod.image }))} >
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Add to Cart
                                                </Link> :
                                                <span className='fa-stack fa-lg'>
                                                    <i className='fas fa-plus mr-2 fa-stack-1x' style={{ color: "#fb6969" }}></i>
                                                    <i className='fas fa-ban fa-stack-2x' style={{ color: "#fb6969" }}></i>
                                                </span>}
                                            {idArray2 !== null ?

                                                (idArray2.map(e => e.Product_ID)).includes(prod._id) === true ?

                                                    <span className='fa-stack fa-lg'>
                                                        <i className='fas fa-heart fa-stack-1x' style={{ color: "#fb6969" }}></i>
                                                        <i className='fas fa-ban fa-stack-2x' style={{ color: "#fb6969" }}></i>
                                                    </span> :
                                                    <Link className="product-card__icon-btn"
                                                        to="#"
                                                        onClick={() => dispatch
                                                            (addFavCount(
                                                                { Product_ID: prod._id, Product_desc: prod.prod_desc, Product_price: prod.prod_price, Product_image: prod.image }))} >
                                                        <i className="fas fa-heart"></i>

                                                    </Link> : idArray2 = []}
                                            {isStaff ?
                                                <Link className="product-card__icon-btn" to="#"
                                                    onClick={() => dispatch(deleteProductAsync({ prodID: prod._id, token: token }))}
                                                >
                                                    <i className='fa fa-trash'></i>
                                                </Link> : ""}
                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                
            </div>
            {/* <Outlet></Outlet> */}
        </div >
    );
}

export default SearchProd