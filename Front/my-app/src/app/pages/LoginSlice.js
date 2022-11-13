import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp, signUpClient } from './LoginAPI';
import jwt_decode from "jwt-decode";


// state-data (initial data)

const initialState = localStorage.getItem('token') === null ? {
  userName: "",
  email: "",
  userFirstName:"",
  userLastName:"",
  token: "",
  logged: false,
  staff: false,
} : jwt_decode(localStorage.getItem('token')).staff===true ?
  {
    userName: jwt_decode(localStorage.getItem('token')).username,
    email: jwt_decode(localStorage.getItem('token')).email,
    userFirstName:jwt_decode(localStorage.getItem('token')).firstName,
    userLastName:jwt_decode(localStorage.getItem('token')).lastName,
    staff: true,
    token: localStorage.getItem('token'),
    logged: true, 
    
  }:
  {
    userName: jwt_decode(localStorage.getItem('token')).username,
    email: jwt_decode(localStorage.getItem('token')).email,
    userFirstName:jwt_decode(localStorage.getItem('token')).firstName,
    userLastName:jwt_decode(localStorage.getItem('token')).lastName,
    staff: false,
    token: localStorage.getItem('token'),
    logged: true, 
    
  };
  


// simple async method(component can call it)
// async (1)
export const signInAsync = createAsyncThunk(
  'login/signIn',
  async (action) => {
    const response = await signIn(action);
    // console.log(state.token)
    return response.data;
  }
);

export const signUpAsync = createAsyncThunk(
  'login/signUp',
  async (cred) => {
    // console.log(cred)
    const response = await signUp(cred);
    return response.data;
  }
);
export const signUpClientAsync = createAsyncThunk(
  'login/signUpClient',
  async (cred) => {
    // console.log(cred)
    const response = await signUpClient(cred);
    return response.data;
  }
);

export const LoginSlice = createSlice({

  name: 'login',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = "";
      state.logged = false;
      state.staff=false
      state.userName = ""
      state.email = ""

      localStorage.removeItem('token')
    },
  },

  //   useEffect(() => {
  //     const storedToken = localStorage.getItem("token");
  //     if (storedToken !== null) {
  //         setMyToken(storedToken)

  //     };
  // }, []);
  // happens when async is done - callback
  // async (3)

  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        if (action.payload.access) {
          state.token = action.payload.access;
          state.logged = true;
          state.userName = jwt_decode(action.payload.access).username;
          state.userFirstName = jwt_decode(action.payload.access).firstName;
          state.userLastName=jwt_decode(action.payload.access).lastName;
          state.email = jwt_decode(action.payload.access).email;
          state.staff = jwt_decode(action.payload.access).staff;
          localStorage.setItem('token', JSON.stringify(state.token))
        }
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
      })
      .addCase(signUpClientAsync.fulfilled, (state, action) => {

      });
  },
});

// export of sync methods only
export const { signOut } = LoginSlice.actions;
// export of any part of the state

export const selectLogged = (state) => state.login.logged;
export const selectEmail = (state) => state.login.email;
export const selectUserName = (state) => state.login.userName;
export const selectUserFirstName = (state) => state.login.userFirstName;
export const selectUserLastName = (state) => state.login.userLastName;
export const selectToken = (state) => state.login.token;
export const selectStaff = (state) => state.login.staff;
// export reducer to the application
export default LoginSlice.reducer;
