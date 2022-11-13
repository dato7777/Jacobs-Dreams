// A mock function to mimic making an async request for data
// async (2)
import axios from "axios";
const URL_ADD_CAT = "http://127.0.0.1:8000/addcategory/"
const URL_GET_CATS = "http://127.0.0.1:8000/categories/"
const URL_DEL_CATG = "http://127.0.0.1:8000/deletecategory/"

export function addCategory(token,categDesc) {
  token=token.replace(/"/g, '')
  return new Promise((resolve) =>
  
    axios.post(URL_ADD_CAT,{cDescrp:categDesc},{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then((res) => resolve({ data: res.data }))
      
  )
  ;
}
export function getCategories() {
  return new Promise((resolve) =>
    axios(URL_GET_CATS).then((res) => resolve({ data: res.data }))
  );
}

export function deleteCategory(token,catID) {
  token=token.replace(/"/g, '')
  return new Promise((resolve) =>
  axios.delete(URL_DEL_CATG+catID, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((res) => resolve({ catID}))
  );
}
