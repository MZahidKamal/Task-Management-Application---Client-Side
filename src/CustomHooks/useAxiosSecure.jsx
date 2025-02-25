import axios from "axios";
import {BASE_URL} from "../SharedUtilities/SharedUtilities.jsx";
import {useContext, useEffect} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const instance = axios.create({
    baseURL: `${BASE_URL}`,
    //timeout: 1000,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
});


const UseAxiosSecure = () => {

    const {signOutCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {


        // Add a request interceptor
        instance.interceptors.request.use(request => {
            // console.log('Request intercepted: ', request?.data)
            return request;
        },
        error => {
            console.log('Error caught in request interceptor:')
            return Promise.reject(error);
        });


        // Add a response interceptor
        instance.interceptors.response.use(response => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // console.log("Response intercepted: ", response?.data)
            return response;
        },
        error => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            console.log('Error caught in response interceptor: ', error)

            if (error?.status === 401 || error?.status === 403) {
                signOutCurrentUser();
                navigate('/sign-in');
                console.log('Requesting forbidden access. User is logged out.')
            }

            return Promise.reject(error);
        });


    }, [navigate, signOutCurrentUser]);


    return instance;
};


export default UseAxiosSecure;
