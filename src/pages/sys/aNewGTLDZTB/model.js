import * as api from '@/services'

export default {
    namespace:"aNewGTLDZTB",
    state:{},
    subscriptions: {
        //路由监听
        setupHistory({ dispatch, history }) {},
    },
    effects:{
        *getGTLDZTBInfo({ payload },{ call }){
            console.log(api)
            const { matters:{ aNewGTLDZTB:{ getGTLDZTBInfo } } } = api
            return yield call(getGTLDZTBInfo,payload)
        }
    },
    reducers:{
        save (state,action){
            return { ...state,...action.payload }
        }
    }
}