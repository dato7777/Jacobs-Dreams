import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectFavouriteItems, delFavItem } from '../pages/FavouritesSlice'
import { CategoryTitle } from '../Styles/CategoryStyles'
import { getProductsAsync } from './ProductsSlice'
import { signInAsync, signOut, selectEmail, selectUserName, selectToken, signUpAsync, selectLogged, selectStaff } from '../pages/LoginSlice'
import { selectItemsQuantity, selectCartItems, selectCartItemsCount, plusItemsQuantity, minusItemsQuantity, delCartItem } from './ShoppingCartSlice'
import { selectCategories, getCategoriesAsync } from './CategoriesSlice'
const ShoppingCart = () => {

    const dispatch = useDispatch();
    const itemsAmount = useSelector(selectItemsQuantity)
    const isLogged = useSelector(selectLogged)
    const StatusCategs = useSelector(selectCategories);
    let myCategs = JSON.parse(localStorage.getItem('myLocalCategs'))

    let myCartItems = JSON.parse(localStorage.getItem('cartItems'))
    let myCartCosts = myCartItems.map(e => e.Product_cost)
    let cartCountsLength = myCartItems.length
    const [itemQuantity, setItemQuantity] = useState(itemsAmount)
    const cartProds = useSelector(selectCartItems);
    let temp = 0
    for (let index = 0; index < myCartCosts.length; index++) {
        temp += Number(myCartCosts[index])
    }
    const sum = temp.toFixed(2)
    const discount = sum > 200 ? (sum / 10).toFixed(2) : 0
    const totalToPay = (sum - discount).toFixed(2)
    localStorage.setItem("totaltopay", JSON.stringify(totalToPay));
    localStorage.setItem("sum", JSON.stringify(sum));
    localStorage.setItem("discount", JSON.stringify(discount));

    useEffect(() => {
        getCategoriesAsync()
    }, []);

    useEffect(() => {

    }, [itemQuantity,]);


    return (
        <div className='catImgAnim' style={{
            backgroundImage: `url("https://parade.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTkwNTc5MDIzNDIxOTc0Mzk2/cheers-in-10-languages-ftr.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: 'auto',
            
          }}>
              
            <section className="h-100" style={{ backgroundColor: "#eee", width:"700px",height:"789",opacity:"0.9" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                {cartCountsLength > 0 ?
                                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3> :
                                    <h3 className="fw-normal mb-0 text-black">Your Cart is empty</h3>}
                                
                            </div>
                            <div className="card rounded-3 mb-4">
                                {myCartItems.map((prod) => (
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                <img
                                                    width='320px'
                                                    src={`http://127.0.0.1:8000${prod.Product_image}`}
                                                    className="img-fluid rounded-3" alt="drink image"></img>
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                <p className="lead fw-normal mb-2">{prod.Product_desc}</p>
                                                {cartCountsLength > 0 &&
                                                    (myCategs).map(cat =>

                                                        prod.Category_ID === cat.catg_id &&

                                                        <p><span className="text-muted">Category: </span>{cat.cat_desc}</p>

                                                    )}
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button className="btn btn-link px-2"
                                                >
                                                    <i className="fas fa-minus" onClick={() => dispatch(minusItemsQuantity(prod.Product_ID), setItemQuantity((c) => c - 1))}></i>
                                                </button>

                                                <input id="form1" name="quantity" type="number" min="1" style={{ width: "60px" }}  value={prod.Product_quantity} onChange={(e) => (e.target.value)}
                                                    className="form-control form-control-sm" />
                                                <button className="btn btn-link px-2"
                                                >
                                                    <i className="fas fa-plus" onClick={() => dispatch(plusItemsQuantity(prod.Product_ID), setItemQuantity((c) => c + 1))}></i>
                                                </button>
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 offset-lg-1">Cost
                                                
                                                <h5 className="mb-0">₪ {Number(prod.Product_cost).toFixed(2)}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <Link to="#" className="text-danger" onClick={() => dispatch(delCartItem(prod.Product_ID))}>
                                                    <i className="fas fa-trash fa-lg" ></i>
                                                </Link>
                                            </div>

                                        </div><hr></hr>
                                    </div>))}
                                
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="mb-0">Subtotal:  ₪ {sum}</h3>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="mb-0">Discount:  ₪ {discount} </h3>
                                </div>
                            </div>
                            <div className="card" style={{ backgroundColor: "blue", color: "snow" }}>
                                <div className="card-body">
                                    <h3 className="mb-0">Total to Pay:  ₪ {totalToPay} </h3>
                                </div>
                            </div>
                            {/* Discount/Promo code */}
                            < div className="card mb-4" >
                                <div className="card-body p-4 d-flex flex-row">
                                    <div className="form-outline flex-fill">
                                        <input type="text" id="form1" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form1">Discound code</label>
                                    </div>
                                    <button type="button" className="btn btn-outline-warning btn-lg ms-3">Apply</button>
                                </div>
                            </div>
                            {/* Proceed to checkout and continue shopping butons */}
                            <div className="card">
                                <div className="card-body">
                                    {isLogged & myCartItems.length>0 ? <Link to={'/confirmaddress'}><button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button></Link>
                                    : myCartItems.length===0 ? alert("your cart is empty"):  <Link to={'/login'}> <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button></Link> }
                                    &nbsp;&nbsp;
                                    <Link to={'/alldrinks'}><button type="button" className="btn btn-primary btn-block btn-lg">Continue Shopping</button></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default ShoppingCart