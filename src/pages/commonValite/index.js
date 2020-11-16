import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import { Button } from 'antd'

class CommomValite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetMatter:{},
            userInfo:{},
            readInstructionList:[], // 阅读须知情形材料
            materials:[],   // 材料
            //... insuredList 参保信息
        }
    }

    componentDidMount(){
        const { location:{ state } } = this.props
        this.setState({
            targetMatter:{...state},
            userInfo:React.$tools.getUserInfo()
        },()=>{
            // 先判断
            this.judgement()
        })
    }

    componentWillUnmount(){

    }

    componentDidUpdate(){

    }

    // judgement
    judgement = () => {
        const { targetMatter:{ businessType } } = this.state
        if (businessType && businessType === '30A222'){
            this.getCommonUserInfo()
        }
    }

    // 获取人员信息
    getCommonUserInfo = () => {
        const { userInfo } = this.state

        React.$tipModal.tickModal({
            content:'正在查询，请稍候...',
        })
        this.props.dispatch({
            type:'commonValite/getCommonUserInfo',
            payload:userInfo
        }).then(res=>{
            if (res){
                this.setState({
                    ...res.result
                },()=>{
                    this.getTCQinfo()
                })
            }
        })
    }

    // 获取统筹区信息
    getTCQinfo = () => {
        this.props.dispatch({
            type:'commonValite/getTCQinfo',
            payload:{
                ...this.state.userInfo,
                businessType:this.state.targetMatter.businessType
            }
        }).then(res=>{
            if (res){
                if (res.result.length===1){
                    this.setState({
                        ...res.result[0]
                    },()=>{
                        this.checkIsPeriod()
                    })
                } else {
    
                }
                
            }
        })
    }

    // 校验是否在业务期内(除查询、打印业务)
    checkIsPeriod = () => {
        const { targetMatter:{ businessType }, regionCode } = this.state

        let type1 = 'BUSINESS_OPYM';
        let type2 = 'BUSINESS_PYYM_YL';
        let type3 = 'BUSINESS_PYYM_GS';
        let _businessType;
        
        if (businessType==='30A222'){
            _businessType = type1
        }

        let params = {
            regionCode,
            businessType:_businessType
        }

        this.props.dispatch({
            type:'commonValite/checkIsPeriod',
            payload:params
        }).then(res=>{
            if(res){
                this.getZgInfoList()
            }
        })
    }

    //  资格校验列表接口调用
    getZgInfoList = () => {
        const { targetMatter:{ businessType }, basicId, regionCode } = this.state
        const { dispatch } = this.props
        // 个体劳动者(灵活就业人员)停保登记
        if (businessType==='30A222'){
            dispatch({
                type:'commonValite/getGTLDZTBInfo',
                payload:{
                    basicId,
                    regionCode
                }
            }).then(res=>{
                if (res){
                    this.getSXidInfo()
                }
            })
        }
    }

    // 获取权力事项编码
    getSXidInfo = () => {
        this.props.dispatch({
            type:'commonValite/getSXidInfo',
            payload:{
                businessType:this.state.targetMatter.businessType
            }
        }).then(res=>{
            if(res){
                this.setState({
                    ...res.result
                },()=>{
                    this.getReadInstruction()
                })
            }
        })
    }

    // 阅读须知
    getReadInstruction = () => {
        const { powerMatterCode, regionCode } = this.state
        this.props.dispatch({
            type:'commonValite/getSituationMaterials',
            payload:{
                powerMatterCode,
                regionCode
            }
        }).then(res=>{
            if(res){
                React.$tipModal.clear()
                const { result:{ data, status } } = res
                if(status==='01'){

                } else {
                    this.setState({
                        materials:data
                    },()=>{
                        this.routerJump()
                    })
                }
            }
        })
    }

    routerJump = () => {
        router.push({
            pathname:'/sys/aNewGTLDZTB',
            state:{
                ...this.state
            }
        })
    }

    render() {
        return <></>;
    }
}

function mapStataToProps({ global, commonValite, loading }){
    return {
        name:global.name,
        idCard:global.idCard,
        ...commonValite,
        loading
    }
}

export default connect(mapStataToProps)(props=>
    <CommomValite {...props}></CommomValite>
)