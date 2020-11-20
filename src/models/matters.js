// import * as api from '../services'

export default {
    namespace: "matters",
    state: {
        count: '0'         // 选中的类型
    },
    subscriptions: {
        //路由监听
        setupHistory ({ dispatch, history }) {
            // dispatch({
            //     type:'getMachineCode'
            // })
            // history.listen((location) => {
            //     const { pathname, query, state } = location;
            //     if (/^\/sys/.test(pathname)) {

            //     }
            // });
        },
    },
    effects: {
        *setCount ({ payload }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    count: payload.count
                }
            })
        }
    },
    reducers: {
        save (state, action) {
            return { ...state, ...action.payload }
        }
    }
}