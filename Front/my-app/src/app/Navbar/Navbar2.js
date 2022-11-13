import React, { useRef, useState, useEffect, createRef} from 'react'
import { gsap } from "gsap";
import { Link} from "react-router-dom";
import './Navbar2.scss';
import { selectLogged, signOut, selectUserName, selectStaff } from '../pages/LoginSlice'
import App from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import About from '../pages/About';
import {} from '../components/MyCard'
import {selectFavourites} from '../pages/FavouritesSlice'
import {selectCartItemsCount,selectCartItems} from '../pages/ShoppingCartSlice'

const Navbar2 = () => {
    const logged1 = useSelector(selectLogged)
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName)
    const cartItemsCount = useSelector(selectCartItemsCount)
    const cartItems=useSelector(selectCartItems)
    const isStaff = useSelector(selectStaff)
    const favourites = useSelector(selectFavourites);
    let favCounts=JSON.parse(localStorage.getItem('favourites'))
    let favCountsLength=favCounts.length
    let cartCounts=JSON.parse(localStorage.getItem('cartItems'))
    let cartCountsLength=cartCounts.length

    // here are my navigation items, through which I iterate to create navbar 
    
    const navItems = [
        {
            name: "Home",
            color: "#ffeb2b",
            NavLink: "/",
        },
        {
            name: "About",
            color: "#ffeb2b",
            NavLink: "/about",
        },
        {
            name: "Categories",
            color: "#ffeb2b",
            NavLink: "/categories",
        },
        {
            name: "All drinks",
            color: "#ffeb2b",
            NavLink: "/alldrinks",
        },
       
            // if no user is logged in, "Sign in" tab appears 
        logged1 === false ?
            {
                name: "Sign In",
                color: "#ffeb2b",
                NavLink: "/login",
                // myAction:"#"

            } : 
            // if regular user is logged in, "My cart" tab appears 
            {
                name: "My Cart",
                color: "#ffeb2b",
                NavLink: "/shoppingcart",
                // myAction:"#"

            }

    ];

    <App data={navItems} />
    const $root = useRef()
    const $indicator1 = useRef()
    const $indicator2 = useRef()
    const $items = useRef(navItems.map(createRef))
    const [active, setActive] = useState(0)
    const animate = () => {
        const menuOffset = $root.current.getBoundingClientRect()
        const activeItem = $items.current[active].current
        const { width, height, top, left } = activeItem.getBoundingClientRect()

        const settings = {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width: width,
            height: height,
            backgroundColor: navItems[active].color,
            ease: 'elastic.out(.7, .7)',
            duration: .8
            
        }

        gsap.to($indicator1.current, {
            ...settings,
        })

        gsap.to($indicator2.current, {
            ...settings,
            duration: 1
        })
    }
    useEffect(() => {
        animate()
        window.addEventListener('resize', animate)

        return (() => {
            window.removeEventListener('resize', animate)
        })
    }, [active])
    function refreshPage() {
        window.location.reload(false);
      }


    useEffect(() => {
    }, [cartCountsLength])
    
    

    return (
        <div ref={$root} className="menu" >
            {/* here is my logo on the left side of navbar  */}
            <Link to={"/"}><img src="/images/mylogo.jpeg" alt="horse" width="100" height="100"  style={{ position: "fixed", top: "10px", left: "10px" }} /></Link> 
            {/* here starts the iteration through nav items  */}
            {navItems.map((item, index) => (
                <div key={index}>
                    <Link key={item.name} onMouseEnter={() => {
                        setActive(index)
                    }}
                        ref={$items.current[index]}
                        className={`item ${active === index ? 'active' : ''}`}
                        to={item.NavLink} >
                        {item.name}
                    </Link>
                </div>

            ))}

            <div
                ref={$indicator1}
                className="indicator"
            />
            <div
                ref={$indicator2}
                className="indicator"
            />

            <div>
                {(() => {
                    // IF REGULAR USER IS LOGGED:
                    if (logged1 === true & isStaff === false) {
                        return (
                            <div>
                                <div className="dropdown" style={{ position: "fixed", top: "10px", right: "10px" }}>
                                    <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userName} Logged 
                                    </button>
                                    <ul className="dropdown-menu pull-right dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item active" href="#">Edit details</a></li>
                                        <li><Link to={"/shoppingcart"}> <a className="dropdown-item" >My cart</a></Link></li>
                                        <li><Link to={"/favourites"}> <a className="dropdown-item" >My Favorites</a></Link></li>
                                        <li><Link to={"/orderdetails"}> <a className="dropdown-item" >My Orders</a></Link></li>
                                        <Link to={"/login"}><li style={{ color: "crimson" }}><a className="dropdown-item" onClick={() => dispatch(signOut(),refreshPage)} href="#">Logout</a></li></Link>
                                    </ul>
                                </div>
                            </div>
                        )
                        // IF STAFF IS LOGGED
                    } else if (logged1 === true & isStaff === true) {
                        return (
                            <div>
                                <div className="dropdown" style={{ position: "fixed", top: "10px", right: "10px" }}>
                                    <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        staff {userName}
                                    </button>
                                    <ul className="dropdown-menu pull-right dropdown-menu dropdown-menu-dark">
                                        <li> <Link className="dropdown-item active" to="/addstaff"> Add staff </Link> </li>
                                        <li><Link className="dropdown-item" element={<About />} to="/addproduct">Edit Products</Link> </li>
                                        <li><Link className="dropdown-item" to="/addcategory">Edit Categories</Link> </li>
                                      <Link to={"/login"} > <li style={{ color: "crimson" }}><a className="dropdown-item" onClick={() => dispatch(signOut())} >Logout</a></li></Link> 
                                    </ul>
                                </div>
                            </div>
                        )
                        // GUEST USER==NOTHING SHOWN ON RIGHT SIDE
                    } else {
                        return (
                            ""
                        )
                    }
                })()}
                {/* ICONS FOR "FAVOURITES" AND "SHOPPING CART" ARE SHOWN ON THE RIGHT EDGE  */}
                <Link to={"/shoppingcart"}>
                <div className='fas fa-shopping-cart icon-heart' style={{ fontSize: "30px"  }}>
                    <span className='badge badge-warning' id='lblCartCount'> {cartCountsLength} </span>
                </div> 
                </Link>
                
                <Link to={"/favourites"}>
                <div className='fas fa-heart icon-heart' 
                style={{ fontSize: "30px", position: "absolute", marginTop: "2px", marginRight: "70px"  }}>
                    <span className='badge badge-warning' id='lblCartCount' style={{  position: "absolute", marginTop: "0.5px", marginRight: "40px"}}> {favCountsLength}</span>
                </div>
                </Link>
                
            </div>
        </div>
    )
}
export default Navbar2;







