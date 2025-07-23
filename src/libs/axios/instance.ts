import environtment from '@/config/env'; // use @ for alias import src
import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react'; 
import { SessionExtended } from '@/types/Auth';

const headers = {
    "Content-Type": "application/json"
}

// Create an Axios instance with the base URL and headers
const instance = axios.create({
    baseURL: environtment.API_URL,
    headers,
    timeout: 60 * 1000, // 60 seconds
})

// Add a request interceptor to handle any pre-request logic
instance.interceptors.request.use(
    async (request) => {
        const session: SessionExtended | null = await getSession(); // get session from next-auth
        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`; // set the access token in the request headers
        }
        return request; // return request to continue the request
    },
    (error) => Promise.reject(error) // reject the error to stop the request
)

// Add a response interceptor to handle any post-response logic
instance.interceptors.response.use(
    (response) => response, // return response to continue the response
    (error) => Promise.reject(error) // reject the error to stop the response
)

export default instance;