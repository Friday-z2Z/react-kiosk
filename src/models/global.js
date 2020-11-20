// import * as api from '../services'
import React from 'react'
import router from 'umi/router'
import Cookie from 'js-cookie'
import { BASIC_PATH } from '@/config/constant.config'
import { Message, Modal } from 'antd'
import TipModal from '@/utils/tipModal'
import $tool from '@/utils/tools'
import * as api from '@/services'

export default {
    namespace: "global",
    state: {
        name: '',                // name
        idCard: '',              // 身份证
        machineCode: null,       // 机器编号
        isShowMatter: false,     // 推荐页
        from: null,              // 来自地区
        testModal: false,        // 测试弹窗
    },
    subscriptions: {
        // 限制全局提示最大条数为 1 条
        setMessage () {
            Message.config({
                maxCount: 1,
                top: 120,
                getContainer: () => document.getElementById('root')
            })
        },
        //路由监听
        setupHistory ({ dispatch, history }) {
            dispatch({
                type: 'setMethod',
                payload: {
                    dispatch
                }
            })

            history.listen((location) => {
                const { pathname } = location
                // 清除计时器
                if (
                    !BASIC_PATH.includes(pathname) &&
                    pathname !== '/'
                ) {
                    // 除了登录页和读卡页 自动进行倒计时
                    React.$tipModal.clear()
                }

                if (pathname === BASIC_PATH[0]) {
                    dispatch({
                        type: 'clear'
                    })
                }
            })
        },
    },
    effects: {
        *setMethod ({ payload: { dispatch } }, { call, select }) {
            let countDuration = yield select(({ global }) => global.countDuration)
            let props = {
                dispatch,
                countDuration
            }

            // 添加全局方法
            const $tipModal = new TipModal(props)
            React.$tipModal = $tipModal
            React.$tools = $tool

        },
        *setInfo ({ payload }, { put, select }) {
            let originName = yield select(({ global }) => global.name)
            let originIdCard = yield select(({ global }) => global.idCard)
            let { idCard, name } = payload
            name = name || originName
            idCard = originIdCard || idCard

            const storage = window.localStorage
            React.$tools.setUserInfo({ idCard, name })

            let josnStr = JSON.stringify({ idCard, name })
            storage.setItem('userInfo', josnStr)

            yield put({
                type: 'save',
                payload: {
                    idCard,
                    name
                }
            })
        },
        *setMachineCode ({ payload }, { put }) {
            const storage = window.localStorage
            const { machineCode: _machineCode } = payload
            React.$tools.setMachineCode({ machineCode:_machineCode })
            let josnStr = JSON.stringify({ machineCode:_machineCode })
            storage.setItem('machineCode', josnStr)

            yield put({
                type: 'save',
                payload: {
                    machineCode: _machineCode
                }
            })
        },
        *setShowMatter ({ payload }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    isShowMatter: payload.isShowMatter
                }
            })
        },
        *setTestModal ({ payload }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    testModal: payload.testModal
                }
            })
        },
        *addDothing ({ payload }, { put, call }) {
            const { common: { addDothing } } = api
            return yield call(addDothing, payload)
        },
    },
    reducers: {
        save (state, action) {
            return { ...state, ...action.payload }
        },
        clear (state) {
            window.localStorage.clear()
            Cookie.remove('token')
            Modal.destroyAll()
            return {
                ...state,
                name: '',
                idCard: '',
                isShowMatter: false,
                testModal: false
            }
        }
    }
}