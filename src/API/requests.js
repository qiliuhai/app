import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/stroe'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

requests.interceptors.request.use(function (config) {
    nprogress.start()
    // 有uuid_token你再带过去
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.users.token) {
        config.headers.token = store.state.users.token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


requests.interceptors.response.use(function (response) {
    nprogress.done()
    return response.data
}, function (error) {
    return Promise.reject(error)
})
export default requests