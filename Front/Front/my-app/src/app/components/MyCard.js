import React, { useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import '../Styles/CardStyle.css'
import {selectProducts, getProductsAsync, deleteProductAsync } from '../pages/ProductsSlice'
import { useSelector, useDispatch } from 'react-redux';
import {selectStaff, selectToken } from '../pages/LoginSlice'
import 'animate.css';
import { addFavCount} from '../pages/FavouritesSlice'
import { addCartCount ,selectItemsQuantity} from '../pages/ShoppingCartSlice'

const MyCard = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const itemsQuantity =useSelector(selectItemsQuantity)
    const allProds = useSelector(selectProducts);
    let favourites = JSON.parse(localStorage.getItem('favourites'))
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))
    let params = useParams();
    let id = params.id;
    
    useEffect(() => {
        dispatch(getProductsAsync(id))
    }, [id])

    const isStaff = useSelector(selectStaff)

    return (
        <div >
            <div className="container my-5" >
                <div className="row row-eq-height">
                    {/* starts to iterate through my prods    */}
                    {allProds.map(prod => (
                        // configuring card items per row and column 
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5" >
                            {/* starts the iteration through cards  */}
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
                                    {/* if shopping cart is not empty  */}
                                    {cartItems !== null &&
                                            // if shopping cart does not include the following item, then ...
                                        (cartItems.map(e => e.Product_ID)).includes(prod._id) === false ?
                                        <Link className="product-card__btn mr-3"
                                            to="#"
                                                    // add this item to shopping cart 
                                            onClick={() => dispatch
                                                (addCartCount(
                                                    { Product_ID: prod._id, Product_desc: prod.prod_desc, Category_ID: prod.catg_id, Product_quantity: itemsQuantity, Product_price: prod.prod_price, Product_cost:prod.prod_price, Product_image: prod.image }))} >
                                                    {/* show button of "add to cart" before clicking on it  */}
                                            <i className="fas fa-plus mr-2"></i>
                                            Add to Cart
                                        </Link> :
                                            // if shopping cart includes the item then show unclickable button which says already added...
                                        <span className='fa-stack fa-lg'>
                                            <i className='fas fa-plus mr-2 fa-stack-1x' style={{ color: "#fb6969" }}></i>
                                            <i className='fas fa-ban fa-stack-2x' style={{ color: "#fb6969" }}></i>
                                        </span>}
                                    {/* if favourites list is not empty  */}
                                    {favourites !== null &&
                                        // if favourites list includes the following item, then ..
                                        (favourites.map(e => e.Product_ID)).includes(prod._id) === true ?
                                        // show the unclickable button indicating it already exists in the favourites list 
                                        <span className='fa-stack fa-lg'>
                                            <i className='fas fa-heart fa-stack-1x' style={{ color: "#fb6969" }}></i>
                                            <i className='fas fa-ban fa-stack-2x' style={{ color: "#fb6969" }}></i>
                                        </span> :
                                        // if there is no item like this in the favourites, then just add it to the list 
                                        <Link className="product-card__icon-btn"
                                            to="#"
                                            onClick={() => dispatch
                                                (addFavCount(
                                                    { Product_ID: prod._id, Product_desc: prod.prod_desc, Product_price: prod.prod_price, Product_image: prod.image }))} >
                                            <i className="fas fa-heart"></i>

                                        </Link>}
                                    {/* if staff user is logged in, in "all products tab", "delete" icon is added to delete the unwanted items  */}
                                    {isStaff ?
                                        <Link className="product-card__icon-btn" to="#"
                                            onClick={() => dispatch(deleteProductAsync({ prodID: prod._id, token: token }))} >
                                            <i className='fa fa-trash'></i>
                                        </Link> : ""}
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    )
}

export default MyCard