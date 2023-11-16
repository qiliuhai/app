import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockAjax = axios.create({
    baseURL: '/mock',
    timeout: 5000,
})

mockAjax.interceptors.request.use(function (config) {
    nprogress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})


mockAjax.interceptors.response.use(function (response) {
    nprogress.done()
    return response.data
}, function (error) {
    return Promise.reject(error)
})
export default mockAjax