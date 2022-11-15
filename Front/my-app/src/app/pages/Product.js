import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from "react-router-dom";
import { signInAsync, signOut, selectEmail, selectUserName, selectToken, signUpAsync, selectLogged, selectStaff } from './LoginSlice';
import { addProductAsync, selectProducts, getProductsAsync, deleteProductAsync, updateProductAsync } from './ProductsSlice'
import { selectCategories } from './CategoriesSlice'
import { useSelector, useDispatch } from 'react-redux';
import { getCategoriesAsync } from './CategoriesSlice'
import myCard from '../components/MyCard';
import jwt_decode from "jwt-decode";

const Product = () => {

    const dispatch = useDispatch();
    let params = useParams();
    let id = params.id;
    const token = useSelector(selectToken);
    const StatusCategs = useSelector(selectCategories);
    const allProds = useSelector(selectProducts);

    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [newProdPrice, setNewProdPrice] = useState("")
    const [categ, setCateg] = useState("")
    
    // const [staff, setStaff] = useState(false)
    const [myImage, setMyImage] = useState(null)
    const isStaff = useSelector(selectStaff)
    const clean = (state) => {
        setDesc("")
        setPrice("")
        setCateg("")
        
    }
    const cleanUpdates = (state) => {
        setNewProdPrice("")
    }
    useEffect(() => {
        dispatch(getCategoriesAsync())
    }, [])
    useEffect(() => {
        dispatch(getProductsAsync([]))
    }, [allProds.length])
    
    return (
        isStaff &&
        <div>
            <nav className="bg-dark navbar-dark navbar">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <h3>Add Product</h3>
                </div>
            </nav>
            <div className="form" enctype="multipart/form-data">
                <div className="form-body">
                    <div className="desc">
                        <label className="form__label" htmlFor='desc'>Item Description </label>
                        <input type="text" placeholder="name" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="price">
                        <label className="form__label" htmlFor="price">Price </label>
                        <input className="form__input" value={price} onChange={(e) => setPrice(e.target.value)} type={"number"} placeholder="Price" />
                    </div>
                    <div className="categ">
                        <label className="form__label" htmlFor="categ">Category name</label>
                        <select onChange={(e) => setCateg(e.target.value)}>
                            {StatusCategs.map((cat) =>
                            (<option value={cat.catg_id}>{cat.cat_desc}  </option>
                            ))}
                        </select>
                        <div className="myImage">
                            <label className="form__label" htmlFor='file'>Upload Image </label>
                            <input type="file" placeholder="myPlaceholder.png" onChange={(e) => setMyImage(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Link to="#"><button onClick={(id) => dispatch(
                        addProductAsync({
                            token: token,
                            userID:jwt_decode(localStorage.getItem('token')).user_id,
                            productDesc: desc,
                            productPrice: price,
                            productCatID: categ,
                            myImage: myImage 
                        }), clean())}>add</button></Link>
                </div>

            </div>
            <div >
                <nav className="bg-dark navbar-dark navbar">
                    <div className="row col-12 d-flex justify-content-center text-white">
                        <h3>Edit Product</h3>
                    </div>
                </nav>
                <div className='form'>
                    {/* list of products to delete */}

                    {allProds.map(prod => <div>Name:<p1 style={{ color: "blue", fontWeight: "20px" }}>{prod.prod_desc}</p1>, Price:<p1 style={{ color: "red", fontWeight: "40px" }}>₪{prod.prod_price}</p1> &nbsp;&nbsp;
                        <input type="number" placeholder='price' style={{ width: "60px" }} name={prod.prod_desc} value={newProdPrice.name} onChange={(e) => setNewProdPrice(e.target.value)}  ></input>&nbsp;
                        <Link to="#"><button onClick={() => dispatch(updateProductAsync({ prodID: prod._id, newPrice: newProdPrice, token: token }), cleanUpdates())} >Update</button></Link> &nbsp;
                        <button onClick={() => dispatch(deleteProductAsync({ prodID: prod._id, token: token }))}  >Delete</button></div>)}

                </div>
            </div>
        </div>
    )
}
export default Product
