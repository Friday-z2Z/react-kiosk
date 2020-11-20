import * as api from '@/services'

export default {
    namespace: "aNewGTLDZTB",
    state: {},
    subscriptions: {
        //路由监听
        setupHistory ({ dispatch, history }) { },
    },
    effects: {
        // 该方法删除
        *submit ({ payload }, { call }) {
            const { matters: { aNewGTLDZTB: { submit } } } = api
            return yield call(submit, payload)
        }
    },
    reducers: {
        save (state, action) {
            return { ...state, ...action.payload }
        }
    }
}