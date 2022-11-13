import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {addUserDetailAsync} from './CheckoutSilce'
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import {selectLogged} from '../LoginSlice'

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme();
const ConfirmAddress = () => {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const logged=useSelector(selectLogged)
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
                // states of user details to be inputted 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [userCity, setUserCity] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [userZipCode, setUserZipCode] = useState("")
    // function that tests if inputted value is text 
    const isLetters = (str) => /^[A-Za-z]*$/.test(str);
    // function that tests if inputted value is number 
    const isNumbers = (str) => /^[0-9]*$/.test(str);

    const firstNameOnInputChange = (e) => {
        const { value } = e.target;
        if (isLetters(value)) {
            setFirstName(value);
        }
    };

    const lastNameOnInputChange = (e) => {
        const { value } = e.target;
        if (isLetters(value)) {
            setLastName(value);
        }
    };
    const cityOnInputChange = (e) => {
        const { value } = e.target;
        if (isLetters(value)) {
            setUserCity(value);
        }
    };
    const zipOnInputChange = (e) => {
        const { value } = e.target;
        if (isNumbers(value)) {
            setUserZipCode(value);
        }
    };
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
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Shipping address
                                </Typography>
                                {/* I am using the HTML form, which has built in validation and 
                                mixing it with react ,to avoid writing everything from scratch, 
                                the "onChange" key below ensures the inputted text is in format that I need  */}
                                <form >
                                    <Grid container spacing={3}
                                        autoComplete="off">
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="firstName"
                                                name="firstName"
                                                value={firstName}
                                                label="First name"
                                                onChange={firstNameOnInputChange}
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                                type="text"
                                                inputProps={{ minLength: 2 }}
                                                required
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="lastName"
                                                name="lastName"
                                                value={lastName}
                                                label="Last name"
                                                onChange={lastNameOnInputChange}
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                                inputProps={{ minLength: 2 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="address1"
                                                name="address1"
                                                value={userAddress}
                                                label="Address line "
                                                onChange={(e) => setUserAddress(e.target.value)}
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                                type="text"
                                                inputProps={{ minLength: 5 }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="city"
                                                name="city"
                                                value={userCity}
                                                label="City"
                                                onChange={cityOnInputChange}
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                                type="text"
                                                inputProps={{ minLength: 2 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                value={userPhone}
                                                label="Contact phone"
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                fullWidth
                                                placeholder="05X-XXX-XX-XX"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="zip"
                                                name="zip"
                                                value={userZipCode}
                                                label="Zip / Postal code"
                                                onChange={zipOnInputChange}
                                                fullWidth
                                                autoComplete="shipping postal-code"
                                                variant="standard"
                                                inputProps={{ minLength: 7, maxLength: 7 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="birthdate"
                                                name="birthdate"
                                                value={birthDate}
                                                // placeholder="DD/MM/YY"
                                                type="date"
                                                label="Birthday"
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                fullWidth
                                                // autoComplete="birth date"
                                                variant="standard"
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}

                                         {/* if all fields are valid within my requirements, AND user is logged in,  then... */}
                                        {firstName.length > 1 & lastName.length > 1 & userAddress.length > 4 & userCity.length > 1 & userZipCode.length > 6 & birthDate.length > 5 ?
                                            logged===true ?<Link href="/paymentform" > <Button
                                                variant="contained"
                                        //    then we go to the next page, while adding the inputted values from previous page:
                                                onClick={(id) => dispatch(
                                                    addUserDetailAsync({
                                                        token: localStorage.getItem('token'),
                                                        userID:jwt_decode(localStorage.getItem('token')).user_id,
                                                        userBirth: birthDate,
                                                        uCity: userCity,
                                                        uStreetNumber: userAddress,
                                                        uMobilePhone: userPhone,
                                                        uZipCode: userZipCode,
                                                        uFirstName: firstName,
                                                        uLastName: lastName,

                                                    }), handleNext())}
                                                sx={{ mt: 3, ml: 1 }}
                                            >
                                                NEXT
                                                
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
                                            <Link href="/confirmaddress" > <Button
                                                variant="contained"
                                                // onClick="#"
                                                sx={{ mt: 3, ml: 1 }}
                                                type='submit'
                                            >
                                                NEXT
                                            </Button></Link> }
                                    </Box>
                                </form>
                            </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default ConfirmAddress