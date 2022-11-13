import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {addUserDetail,addUserPaymentDetails} from './CheckoutAPI '

// state-data (initial data)
const initialState = {
  userDetails: []
};

export const addUserDetailAsync = createAsyncThunk(
  'userDetails/addUserDetail',
  async (data) => {
    const response = await addUserDetail(
        data.token, data.userID,data.userBirth, data.uCity, data.uStreetNumber, data.uMobilePhone,data.uZipCode,data.uFirstName,data.uLastName);
    return response.data;
  }
);
export const addUserPaymentDetailsAsync = createAsyncThunk(
  'userDetails/addUserPaymentDetails',
  async (data) => {
    const response = await addUserPaymentDetails(
        data.token, data.userID,data.uNameOnCard, data.uCreditCard, data.uCardExp, data.uCcv3digit);
    return response.data;
  }
);

export const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {
    builder
      .addCase(addUserDetailAsync.fulfilled, (state, action) => {
      })
  },
});
// export of sync methods only

// export of any part of the state
export const selectUserDetails = (state) => state.userDetails.userDetails;

export default UserDetailsSlice.reducer;