// A mock function to mimic making an async request for data
// async (2)
import axios from "axios";
const URL = "http://127.0.0.1:8000/token/"
const URLreg="http://127.0.0.1:8000/register/"
const URLregClient="http://127.0.0.1:8000/registerclient/"

export function signIn(cred) {
  
  return new Promise((resolve) =>
    axios.post(URL,cred).then((res) => resolve({ data: res.data }))
      // localStorage.setItem('token', res.data.access)))
    
  );
 
}
// export function signOut() {
  
//   return new Promise((resolve) =>
//     axios.post(URL,{username: "eyal", password: "123"}).then((res) => resolve({ data: res.data }))
//   );
// }
export function signUp(cred) {
  
  return new Promise((resolve) =>
    axios.post(URLreg,cred).then((res) => resolve({ data: res.data })),
    console.log(cred)
  );
}
export function signUpClient(cred) {
  
  return new Promise((resolve) =>
    axios.post(URLregClient,cred).then((res) => resolve({ data: res.data })),
    console.log(cred)
  );
}
