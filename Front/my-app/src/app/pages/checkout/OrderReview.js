import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { selectorders, getOrdersAsync } from '../orders/OrderSlice'
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

          // THIS IS AN ORDER CONFIRMATION PAGE WITH MESSAGE ABOUT ORDER ID 
          // AND WHERE ORDER DETAILS CAN BE VIEWED 

const theme = createTheme();
const OrderReview = () => {
  const dispatch = useDispatch();
  const myOrders = useSelector(selectorders)
  const token = localStorage.getItem("token")
  const orderIDs = myOrders.map(e => e._id)
  const lastOrderID = orderIDs.slice(-1)
  useEffect(() => {
    dispatch(getOrdersAsync({ token }))
  }, [])


  return (
    <div style={{
      backgroundImage: `url(https://thumbs.dreamstime.com/b/champagne-cheers-glasses-splash-isolated-black-background-35409744.jpg)`,
      height: "789",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
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
              Order Summary
            </Typography>
            <React.Fragment>
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{lastOrderID}. Please check "My orders" in your user zone in the top
                  right side of the screen.Be sure that we will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
              <React.Fragment>
              </React.Fragment>
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>


    </div>
  )
}

export default OrderReview