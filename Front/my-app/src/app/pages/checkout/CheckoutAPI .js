
import axios from "axios";
const URL_ADD_DET = "http://127.0.0.1:8000/updateusercheckout/"
const URL_ADD_PAY_DET = "http://127.0.0.1:8000/updateuserpaymentdetails/"

export function addUserDetail(token, userID,userBirth, uCity,uStreetNumber, uMobilePhone,uZipCode,uFirstName,uLastName) {
  token=token.replace(/"/g, '')
  return new Promise((resolve) =>
    axios.put(URL_ADD_DET+userID, { userBirth: userBirth, uCity: uCity, uStreetNumber: uStreetNumber, uMobilePhone: uMobilePhone,uZipCode:uZipCode, uFirstName:uFirstName, uLastName:uLastName}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => resolve({ data: res.data }))
  );
}
export function addUserPaymentDetails(token, userID,uNameOnCard, uCreditCard,uCardExp, uCcv3digit) {
  token=token.replace(/"/g, '')
  return new Promise((resolve) =>
    axios.put(URL_ADD_PAY_DET+userID, { uNameOnCard: uNameOnCard, uCreditCard: uCreditCard, uCardExp: uCardExp, uCcv3digit: uCcv3digit}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => resolve({ data: res.data }))
  );
}
