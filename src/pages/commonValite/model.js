import * as api from '@/services'

export default {
    namespace:"commonValite",
    state:{},
    subscriptions: {
        //路由监听
        setupHistory({ dispatch, history }) {
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
    effects:{
        *getCommonUserInfo({ payload },{ call }){
            const { common:{ getUserInfo } } = api
            return yield call(getUserInfo,payload)
        },
        *getTCQinfo({ payload },{ call }){
            const { common:{ getTCQinfo } } = api
            return yield call(getTCQinfo,payload)
        },
        *checkIsPeriod({ payload },{ call }){
            const { common:{ checkIsPeriod } } = api
            return yield call(checkIsPeriod,payload)
        },
        *getSXidInfo({ payload },{ call }){
            const { common:{ getSXidInfo } } = api
            return yield call(getSXidInfo,payload)
        },
        *getSituationMaterials({ payload },{ call }){
            const { common:{ getSituationMaterials } } = api
            return yield call(getSituationMaterials,payload)
        },
        // 个体停保前置校验
        *getGTLDZTBInfo({ payload },{ call }){
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