import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import router from 'umi/router';
import { message } from 'antd';
import tools from './tools'

const baseUrl = '/api/api/';

// 创建一个 axios 实例
const service = axios.create({
    baseURL: baseUrl,                                       //添加在url前
    method: 'get',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 30000
})


const TranslateError = (msg,path) => {
    const result = tools.translateError(msg)._FriendlyPrompt
    React.$tipModal.clear()
    React.$tipModal.tickModal({
        content:result,
        duration:5,
        countdown:true,
        pathname:path || '/sys/matters',
        query:{},
        state:{}
    })
}

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        let { params={}, data={} } = config
        const token = Cookie.get('token')
        if (!token){
            console.log('token',token)
            TranslateError('权限为空','/login')
            return
        }
        params.token = token
        data.token = token
        
        config.headers['token'] = token
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        const dataAxios = response.data
        const { success, resultDes } = dataAxios
        if( success ){
            if (
                resultDes === null ||
                resultDes === undefined ||
                (Array.isArray(resultDes) && resultDes.length === 0) ||
                JSON.stringify(resultDes) === '{}'
            ) {
                TranslateError('接口"' + response.config.url + '"返回内容为空')
            } else {
                return dataAxios
            }
        } else {
            TranslateError(resultDes)
        }
    }, 
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: message.error('请求错误'); break
                case 401: message.error('未授权，请登录'); break
                case 403: message.error('拒绝访问'); break
                case 404: message.error('请求地址出错'); router.push('/404'); break
                case 408: message.error('请求超时'); break
                case 500: message.error('服务器内部错误'); router.push('/500'); break
                case 501: message.error('服务未实现'); break
                case 502: message.error('网关错误'); break
                case 503: message.error('服务不可用'); break
                case 504: message.error('网关超时'); break
                case 505: message.error('HTTP版本不受支持'); break
                default: break
            }
        }
        return Promise.reject(error)
    }
)

export default service;