import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectFavouriteItems, delFavItem } from '../pages/FavouritesSlice'
import { CategoryTitle } from '../Styles/CategoryStyles'
import { addCartCount } from './ShoppingCartSlice'
import { selectProducts } from './ProductsSlice'

const Favourites = () => {
    const dispatch = useDispatch();
    const favProds = useSelector(selectFavouriteItems);
    const allProds = useSelector(selectProducts);
    let idArray2 = JSON.parse(localStorage.getItem('favourites'))
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const [myCartItems, setMyCartItems] = useState(cartItems)

    
    return (
        <div className='catImgAnim' style={{
            padding: "2px" ,
            backgroundImage: `url("https://cdn.pixabay.com/photo/2020/04/13/08/13/celebration-5037173_960_720.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: 'auto',
            
          }}>
            <CategoryTitle style={{
                mixBlendMode: "screen",
                fontSize: "80px",
                textAlign: "center",
                backgroundColor: "white",
                width: "800px",
                margin: "20px auto"
            }}>Your Favourites</CategoryTitle>
            <div className="container my-5" >
                <div className="row row-eq-height">
                    {idArray2.map(prod => (
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5" >
                            <div className="product-card h-100 mb-0" >
                                <a className="product-card__content" href="#" >
                                    <span className="product-card__img" style={{ backgroundImage: `url(http://127.0.0.1:8000${prod.Product_image})` }}> </span>
                                    <span className="product-card__title">
                                        {prod.Product_desc}
                                    </span>
                                    <span className="product-card__price">
                                        ₪{prod.Product_price}
                                    </span>
                                </a>
                                <div className="product-card__actions">
                                    {cartItems.length !== 0 ?
                                        (cartItems.map(e => e.Product_ID)).includes(prod.Product_ID) === true ?
                                            <span className='fa-stack fa-lg'>
                                                <i className='fas fa-plus mr-2 fa-stack-1x' style={{ color: "#fb6969" }}></i>
                                                <i className='fas fa-ban fa-stack-2x' style={{ color: "#fb6969" }}></i>
                                            </span>
                                            :
                                            <Link className="product-card__btn mr-3"
                                                to="#"
                                                onClick={() => dispatch
                                                    (addCartCount(
                                                        { Product_ID: prod.Product_ID, Product_desc: prod.Product_desc, Category_ID: prod.Category_ID, Product_quantity: 1, Product_price: prod.Product_price, Product_cost: prod.Product_price, Product_image: prod.Product_image }),setMyCartItems(cartItems.length+1))} >
                                                <i className="fas fa-plus mr-2"></i>
                                                Add to Cart
                                            </Link>
                                        :
                                        <Link className="product-card__btn mr-3"
                                            to="#"
                                            onClick={() => dispatch
                                                (addCartCount(
                                                    { Product_ID: prod.Product_ID, Product_desc: prod.Product_desc, Category_ID: prod.Category_ID, Product_quantity: 1, Product_price: prod.Product_price, Product_cost: prod.Product_price, Product_image: prod.Product_image }),setMyCartItems(cartItems.length+1))} >
                                            <i className="fas fa-plus mr-2"></i>
                                            Add to Cart
                                        </Link>
                                    }

                                    <Link className="product-card__icon-btn" to="#"
                                        onClick={() => dispatch(delFavItem(prod.Product_ID))} >
                                        <i className='fa fa-trash'></i>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    )
}

export default Favourites