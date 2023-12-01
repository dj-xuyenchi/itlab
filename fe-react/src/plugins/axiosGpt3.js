import axios from 'axios'
const backendUrl = 'https://api.openai.com';
const KEY = "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";

const axiosGpt3 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: backendUrl,
    timeout: 100000,
    // headers: {'X-Custom-Header': 'foobar'}
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosGpt3.interceptors.request.use(config => {
    // Retrieve token from localStorage
    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = `Bearer ${KEY}`

    // Return modified config
    return config
})

// ℹ️ Add response interceptor to handle 403 response
axiosGpt3.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error);
    // Handle error
})
export default axiosGpt3