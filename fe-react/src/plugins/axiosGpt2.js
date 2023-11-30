import axios from 'axios'
const backendUrl = 'https://api.openai.com';
const KEY = "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";

const axiosGpt2 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: backendUrl,
    timeout: 100000,
    // headers: {'X-Custom-Header': 'foobar'}
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosGpt2.interceptors.request.use(config => {
    // Retrieve token from localStorage
    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = `Bearer ${KEY}`

    // Return modified config
    return config
})

// ℹ️ Add response interceptor to handle 403 response
axiosGpt2.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error);
    // Handle error
})
export default axiosGpt2