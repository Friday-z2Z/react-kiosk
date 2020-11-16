// import * as api from '../services'
import React from 'react'
import router from 'umi/router'
import { BASIC_PATH } from '@/config/constant.config'
import { Message, Modal } from 'antd'
import TipModal from '@/utils/tipModal'
import $tool from '@/utils/tools'

export default {
    namespace:"global",
    state:{
        token:'',
        name:'',                // name
        idCard:'',              // 身份证
        machineCode:null,       // 机器编号
        isShowMatter:false,     // 推荐页
        from:null,              // 来自地区
        testModal:false,        // 测试弹窗
    },
    subscriptions: {
        // 限制全局提示最大条数为 1 条
        setMessage() {
            Message.config({
                maxCount:1,
                top:120,
                getContainer:() => document.getElementById('root')
            })
        },
        //路由监听
        setupHistory({ dispatch, history }) {
            dispatch({
                type:'setMethod',
                payload:{
                    dispatch
                }
            })

            history.listen((location) => {
                const { pathname } = location;
                // 清除计时器
                if (
                    !BASIC_PATH.includes(pathname) &&
                    pathname!=='/'
                ) {
                    // 除了登录页和读卡页 自动进行倒计时
                    React.$tipModal.clear()
                }

                if (pathname === BASIC_PATH[0]){
                    dispatch({
                        type:'clear'
                    })
                }
            });
        },
    },
    effects:{
        *setMethod({ payload:{ dispatch } }, { call, select }){
            let countDuration = yield select(({ global }) => global.countDuration );
            let props = {
                dispatch,
                countDuration
            }
            
            // 添加全局方法
            const $tipModal = new TipModal(props)
            React.$tipModal = $tipModal
            React.$tools = $tool
            
        },
        *setToken({ payload },{ put }){
            const { token } = payload
            const storage = window.localStorage

            if (token!==''){
                React.$tools.setToken(token)
                storage.setItem('token',token)
            } else {
                router.push({
                    pathname:'/login'
                })
            }
            yield put({
                type:'save',
                payload:{
                    token:payload.token
                }
            })
        },
        *setInfo({ payload },{ put, select }){
            let originName = yield select(({ global }) => global.name );
            let { idCard, name } = payload
            name = originName||name

            const storage = window.localStorage
            React.$tools.setUserInfo({idCard,name})
            
            let josnStr = JSON.stringify({idCard,name})
            storage.setItem('userInfo',josnStr)

            yield put({
                type:'save',
                payload:{
                    idCard,
                    name
                }
            })
        },
        *setMachineCode({ payload },{ put }){
            yield put({
                type:'save',
                payload:{
                    machineCode:payload.machineCode
                }
            })
        },
        *setShowMatter({ payload },{ put }){
            yield put({
                type:'save',
                payload:{
                    isShowMatter:payload.isShowMatter
                }
            })
        },
        *setTestModal({ payload },{ put }){
            yield put({
                type:'save',
                payload:{
                    testModal:payload.testModal
                }
            })
        },
    },
    reducers:{
        save (state,action){
            return { ...state,...action.payload }
        },
        clear(state) {
            window.localStorage.clear()
            Modal.destroyAll()
            return {
                ...state,
                name:'',
                idCard:'',
                isShowMatter:false 
            };
        }
    }
}