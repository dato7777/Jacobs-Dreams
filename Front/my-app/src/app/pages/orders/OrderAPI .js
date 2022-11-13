// A mock function to mimic making an async request for data
// async (2)
import axios from "axios";
const URL_ADD_ORD = "http://127.0.0.1:8000/addorder/"
const URL_GET_ORD = "http://127.0.0.1:8000/getorders/"
const URL_GET_ORD_DET = "http://127.0.0.1:8000/getorderdetails/"

export function addOrder(token, myCartItems,subtotal, discount,orderTotal) {
  token=token.replace(/"/g, '')
  // console.log("token",token)
  return new Promise((resolve) =>
    axios.post(URL_ADD_ORD, { cartProds: myCartItems, subtotal:subtotal, discount:discount,orderTotal:orderTotal}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => resolve({ data: res.data }))
  );
}
    
export function getOrders(token) {
  token=token.replace(/"/g, '')
  
  return new Promise((resolve) =>
    axios(URL_GET_ORD ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => resolve({ data: res.data }))
  );
}
export function getOrderDetails(token) {
  token=token.replace(/"/g, '')
  
  return new Promise((resolve) =>
    axios(URL_GET_ORD_DET ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => resolve({ data: res.data }))
  );
}


