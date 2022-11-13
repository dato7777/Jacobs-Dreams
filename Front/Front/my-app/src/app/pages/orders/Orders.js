import * as React from 'react';
import '../../Styles/OrderDetails.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectLogged, selectUserName, selectUserFirstName } from '../LoginSlice';
import { getOrdersAsync, getOrderDetailsAsync, selectorderdetails, selectorders } from './OrderSlice'
import { selectProducts, getProductsAsync } from '../ProductsSlice'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { UserDetailsSlice } from '../checkout/CheckoutSilce';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Orders = () => {
    const dispatch = useDispatch();
    const myOrders = useSelector(selectorders)
    const allProds = useSelector(selectProducts);
    const myOrderDetails = useSelector(selectorderdetails)
    const userName = useSelector(selectUserName)
    const token = localStorage.getItem("token")
    const logged1 = useSelector(selectLogged)
    const firstName = useSelector(selectUserFirstName)
    const myCategs = JSON.parse(localStorage.getItem('myLocalCategs'))
    // because my subtotal for every order is inside every order detail of an order, 
    // and order details can be more that one, as per order items, I found it a little hard to 
    // iterate inside the main map of order details, because i needed just one value from row,
    // so I just made calculations inside new arrays, each for "subtotals" and "discounts",
    // and while "i" is 1 inside main "myOrders" iteration, 
    // on every order I selected "[i-1]" for both subtotals and discount to fetch the relevant info.
    // see lines 155 and 160 respectively.
    const subtotals = myOrders.map(ord => ord.total > 199 ? (ord.total / 0.9).toFixed(2) : ord.total)
    const discounts = myOrders.map(ord => ord.total > 199 ? ((ord.total / 0.9).toFixed(2)-ord.total).toFixed(2) : 0)
  
    useEffect(() => {
        dispatch(getProductsAsync([]))
    }, [allProds.length])

    useEffect(() => {
        dispatch(getOrdersAsync({ token }))
        dispatch(getOrderDetailsAsync({ token }))

    }, [])

    const [expanded, setExpanded] = React.useState("");
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {/* running through client's orders  */}
            {myOrders.map((ord, i) => (
                // I am initiating "i" as 1 and adding 1 each time 
                // because i need "panel" to be added by 1 every time, ex: "panel1", "panel2"...
                i += 1,
                <Accordion expanded={
                // here "expanded" value state gets updated every time it iterates through orders
                // according to order number and this way my accordeon (drawer) from MUI gets updated 
                    expanded === "panel" + (myOrders.length - (myOrders.length - i)).toString()}
                    onChange={handleChange("panel" + (myOrders.length - (myOrders.length - i)).toString())}  >
                    <AccordionSummary aria-controls="panel1d-content" id={ord._id}>
                        <h2 style={{ textAlign: "center" }}><Typography variant="h5" align='center' color={'blue'}  >Order #{ord._id}</Typography></h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <section className="h-100 gradient-custom">
                                <div className="container py-5 h-100">
                                    <div className="row d-flex justify-content-center align-items-center h-100">
                                        <div className="col-lg-10 col-xl-8">
                                            <div className="card" style={{ borderRadius: "10px" }}>
                                                <div className="card-header px-1 py-2">
                                                    <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>{logged1 === true ? firstName : "guest"}</span>!</h5>
                                                </div>
                                                <div className="card-body p-4">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt</p>
                                                        <p className="small text-muted mb-0">Order ID# : {ord._id}</p>
                                                    </div>
                                                    <div className="card shadow-0 border mb-4">
                                                        {/* starting to iterate through my orderdetails  */}
                                                        {myOrderDetails.map(ordDet => (
                                                            ord._id === ordDet.order_id &&
                                                            <div className="card-body">
                                                                {/* starting to iterate through my prods from back because i need data of each order prod  */}
                                                                {allProds.map(prod => (
                                                                    ordDet.prod_id === prod._id &&
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <img src={`http://127.0.0.1:8000${prod.image}`}
                                                                                className="img-fluid" alt="Phone" />
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0">{prod.prod_desc}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            {/* iterating through my categories to enter the relevant category into table of orders  */}
                                                                            {myCategs.map(cat => (
                                                                                prod.catg_id === cat.catg_id &&
                                                                                <p className="text-muted mb-0 small">{cat.cat_desc}</p>
                                                                            ))}
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Price: ₪{prod.prod_price}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Qty: {ordDet.prod_quantity}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Cost: ₪{(ordDet.prod_quantity * prod.prod_price).toFixed(2)}</p>
                                                                        </div>
                                                                    </div>))}
                                                                <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />

                                                            </div>))}

                                                        <div>
                                                                <div className="d-flex justify-content-between pt-2">
                                                                    <p className="fw-bold mb-0">Order Details</p>
                                                                    <p className="text-muted mb-0"><span className="fw-bold me-4">SubTotal</span> ₪{subtotals[i-1]}</p>
                                                                </div>

                                                            <div className="d-flex justify-content-between pt-2">
                                                                <p className="text-muted mb-0">Inv # : 000{ord._id}</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> ₪{discounts[i-1]}</p>
                                                            </div>

                                                            <div className="d-flex justify-content-between mb-5">
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                                                            </div>

                                                            <div className="d-flex justify-content-between">
                                                                <p className="text-muted mb-0">Invoice Date : {ord.createdTime}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer border-0 px-4 py-5"
                                                    style={{ backgroundColor: "#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                                                        paid: <span className="h2 mb-0 ms-2">₪{ord.total}</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Typography>
                    </AccordionDetails>
                </Accordion>))}
        </div>
    )
}

export default Orders