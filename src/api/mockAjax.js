//对于axios进行二次封装
import axios from 'axios'
import { Promise } from 'core-js'

/* start代表进度条开始，done代表进度条结束 */
import nprogress from 'nprogress'
/* 引入进度条样式 */
import "nprogress/nprogress.css"


const requests = axios.create({
    //配置对象
    //基础路径，发请求之后，路径中会出现这个api
    baseURL: '/mock',
    //代表请求超时的事件
    timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //config是一个配置对象，里面有一个属性很重要，header请求头
    //请求开始则进度条开始
    nprogress.start();
    return config
})

//响应拦截器
requests.interceptors.response.use((response) => {
    //成功的回调函数,数据响应回来之后，我们可以监测到并且可以做一些事情
    //请求成功则进度条结束
    nprogress.done()
    return response.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new error('fail'))
})

export default requests