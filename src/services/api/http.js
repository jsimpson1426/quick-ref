import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError = error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if(!expectedError){
      console.log("Logging...", error);
      toast.error("An unexpected error occured.");
    }

    return Promise.reject(error);
})

function setJWT(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default{
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT
}