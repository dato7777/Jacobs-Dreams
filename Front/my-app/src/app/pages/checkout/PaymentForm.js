import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {addUserPaymentDetailsAsync} from './CheckoutSilce'
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import {selectLogged} from '../LoginSlice'

const theme = createTheme();
const steps = ['Shipping address', 'Payment details', 'Review your order'];

const PaymentForm = () => {
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // this function tests if inputted data is text 
  const isLetters = (str) => /^[A-Za-z]*$/.test(str);
  // this function tests if inputted data is number 
  const isNumbers = (str) => /^[0-9]*$/.test(str);
  const [expDate, setExpDate] = useState("")
  const [userCvv, setUserCvv] = useState("")
  const [activeStep, setActiveStep] = React.useState(1);
  const [nameOnCard, setNameOnCard] = useState("")
  const [creditCardNumber, setCreditCardNumber] = useState("");

  const nameOnCardOnInputChange = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setNameOnCard(value);
    }
  };
  const cardNumOnInputChange = (e) => {
    const { value } = e.target;
    if (isNumbers(value)) {
      setCreditCardNumber(value);
    }
  };
  const userCvvOnInputChange = (e) => {
    const { value } = e.target;
    if (isNumbers(value)) {
      setUserCvv(value);
    }
  };
  const logged=useSelector(selectLogged)


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
        {/* the header of checkout  */}
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
                Payment method
              </Typography>
               {/* I am using the HTML form, which has built in validation and 
                mixing it with react ,to avoid writing everything from scratch, 
                the "onChange" key below ensures the inputted text is in format that I need  */}
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardName"
                      label="Name on card"
                      value={nameOnCard}
                      onChange={nameOnCardOnInputChange}
                      fullWidth
                      autoComplete="cc-name"
                      variant="standard"
                      inputProps={{ minLength: 4 }}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardNumber"
                      label="Card number (without spaces)"
                      value={creditCardNumber}
                      onChange={cardNumOnInputChange}
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                      placeholder='0000-0000-0000-0000'
                      type="text"
                      inputProps={{ minLength: 16, maxLength: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="expdate"
                      label="Expiry"
                      helperText="Choose expiration Year and Month of your card"
                      fullWidth
                      autoComplete="cc-csc"
                      variant="standard"
                      onChange={(e) => setExpDate(e.target.value)}
                      value={expDate}
                      type="month"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cvv"
                      label="CVV"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      autoComplete="cc-csc"
                      variant="standard"
                      onChange={userCvvOnInputChange}
                      value={userCvv}
                      inputProps={{ minLength: 3, maxLength: 3 }}
                    />
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Link href="/confirmaddress" ><Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button></Link>

                    {/* if all fields are valid within my requirements, AND user is logged in,  then... */}

                    {nameOnCard.length > 3 & creditCardNumber.length > 15 & expDate.length > 5 & userCvv.length > 2 ?
                      logged===true ? <Link href="/orderreview" > <Button
                        variant="contained"
                      // then we go to the next page, while adding the inputted values from previous page:
                        onClick={(id) => dispatch(
                          addUserPaymentDetailsAsync({
                              token: localStorage.getItem('token'),
                              userID:jwt_decode(localStorage.getItem('token')).user_id,
                              uNameOnCard: nameOnCard,
                              uCreditCard: creditCardNumber,
                              uCardExp: expDate,
                              uCcv3digit: userCvv

                          }), handleNext())}
                        sx={{ mt: 3, ml: 1 }}
                      // type='submit'
                      >
                        NEXT
                        {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                      </Button></Link> :
                      // if user is not logged in, then i redirect him to the login page
                      <Link href="/login" > <Button
                        variant="contained"
                        // onClick="#"
                        sx={{ mt: 3, ml: 1 }}
                        // type='submit'
                      >
                        NEXT
                      
                      </Button></Link> :
                      // if user is logged in BUT the inputted data is not valid, then he stays on same page
                      // until he enters the valid data 
                      <Link href="/paymentform" > <Button
                        variant="contained"
                        // onClick="#"
                        sx={{ mt: 3, ml: 1 }}
                        type='submit'
                      >
                        NEXT
                      </Button></Link>}
                  </Box>
                </Grid>
              </form>
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default PaymentForm