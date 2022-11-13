import React from 'react'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { selectCategories, getCategoriesAsync } from '../CategoriesSlice'
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
import { selectLogged,selectUserFirstName,selectUserLastName } from '../LoginSlice'
import { addOrderAsync, clearCart } from '../orders/OrderSlice'



const theme = createTheme();
const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Review = () => {
    const dispatch = useDispatch();
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const clearMyCart = () => {
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("favourites", JSON.stringify([]));
        localStorage.setItem("totaltopay", JSON.stringify(""));
        localStorage.setItem("sum", JSON.stringify(""));
        localStorage.setItem("discount", JSON.stringify(""));
    };
   
    const [activeStep, setActiveStep] = React.useState(2);
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))
    let myCategs = JSON.parse(localStorage.getItem('myLocalCategs'))
    const StatusCategs = useSelector(selectCategories);

    const orderTotal = JSON.parse(localStorage.getItem('totaltopay'))
    const subtotal = JSON.parse(localStorage.getItem('sum'))
    const discount = JSON.parse(localStorage.getItem('discount'))
    const notifyEmptyCart = () => toast.success(`dear ${jwt_decode(localStorage.getItem('token')).username}! Your cart is empty!`, {
        id: 1,
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
    const logged = useSelector(selectLogged)
    const userFirstName=useSelector(selectUserFirstName)
    const userLastName=useSelector(selectUserLastName)
    
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',

                    }}
                >
                </AppBar>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>

                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}

                        </Stepper>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Order Review
                            </Typography>
                            <List disablePadding>
                                {cartItems.map((product) => (
                                    <ListItem key={product.Product_desc} sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary={product.Product_desc} secondary={myCategs.map(e => e.catg_id === product.Category_ID && e.cat_desc)} />
                                        <Typography variant="body2">₪{Number(product.Product_cost).toFixed(2)}</Typography>
                                    </ListItem>
                                ))}
                                <hr></hr>
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary="Subtotal" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        ₪{(JSON.parse(localStorage.getItem('sum')))}
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary="Discount" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        ₪{(JSON.parse(localStorage.getItem('discount')))}
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary="Totally" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        ₪{(JSON.parse(localStorage.getItem('totaltopay')))}
                                    </Typography>
                                </ListItem>
                            </List>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                        Shipping to:
                                    </Typography>
                                    <Typography gutterBottom>{userFirstName} {userLastName}</Typography>
                                    
                                </Grid>
                                <Grid item container direction="column" xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                        Payment details
                                    </Typography>
                                    <Grid container>
                                      
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                        <Link href="/paymentform" ><Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Back
                                        </Button></Link>

                                        {/* adding to order table :*/}
                                        {/* 1)  if user is logged in but no items in cart  */}
                                        {logged === true ?
                                            cartItems.length === 0 ?
                                                <Link href="#" > <Button
                                                    variant="contained"
                                                    onClick={() => dispatch(notifyEmptyCart())}
                                                    sx={{ mt: 3, ml: 1 }}
                                                    type='submit'
                                                >
                                                    Place order

                                                </Button><ToastContainer /><ToastContainer /></Link>
                                                :
                                                /* 2)  if user is logged in with items in cart  */
                                                
                                                <Link href="/ordersummary"  > <Button
                                                    variant="contained"
                                                    onClick={() => dispatch(
                                                        addOrderAsync({
                                                            token: localStorage.getItem('token'),
                                                            myCartItems: cartItems,
                                                            subtotal:subtotal,
                                                            discount:discount,
                                                            orderTotal: orderTotal
                                                        }),clearMyCart())}
                                                    sx={{ mt: 3, ml: 1 }}
                                                    // type='submit'
                                                >
                                                    Place order

                                                </Button></Link>
                                                
                                            /* 3)  If No user is logged in, redirecting him to login page  */
                                            :
                                            <Link href="/login" > <Button
                                                variant="contained"
                                                // onClick="#"
                                                sx={{ mt: 3, ml: 1 }}
                                            // type='submit'
                                            >
                                                Place order

                                            </Button></Link>
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Review