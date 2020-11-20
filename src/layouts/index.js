import React from 'react'
import router from 'umi/router'
import { connect } from 'dva'
import BasicLayout from './basic'
import PlatformLayout from './platform'
import LayoutWrap from './layout'
import { Button } from 'antd'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // const { dispatch } = this.props 


        // let dom = document.getElementsByClassName('ant-message')[0]
        // dom.onClick = () => {
        //     console.log(1)
        // }

        // 获取机器编号
        // window.callbackMachine = (str) => {
        //     console.log('machineCode',str);
        //     dispatch({
        //         type:'global/setMachineCode',
        //         payload:{
        //             machineCode:'111'
        //         }
        //     })
        // }

        // window.GetWebSocket('getmachineCode', window.callbackMachine)
        // window.CallOldEptouch();

        // window.callbackToken = (str) => {
        //     let res = JSON.parse(str);
        //     console.log('token',str)
        //     dispatch({
        //         type:'global/setToken',
        //         payload:{
        //             token:res.token
        //         }
        //     })
        // }
        // window.GetWebSocket('getTokenEpsoft20190510',window.callbackToken)

    }

    logout = () => {
        router.push({
            pathname: '/login'
        })
    }

    componentDidUpdate(){
        // if (!this.props.loading){
        //     React.$tipModal.clear()
        // }
    }

    componentWillUnmount () {
        React.$tipModal.clear()
    }

    render () {
        
        let btn = {}
        const { children, location: { pathname } } = this.props
        let content

        if (
            pathname === '/login' ||
            pathname === '/readcardCX'
        ) {
            if (pathname === '/readcardCX') {
                const logout = (
                    <Button type="text" icon='logout' onClick={this.logout} key="logout">返回首页</Button>
                )
                btn = {
                    logout
                }
            }

            content = (
                <BasicLayout btns={btn} {...this.props}>{children}</BasicLayout>
            )
        } else {
            content = (
                <PlatformLayout {...this.props} btns={btn}>{children}</PlatformLayout>
            )
        }

        return (
            <LayoutWrap {...this.props}>{content}</LayoutWrap>
        )
    }
}

function mapStateToProps ({ global, matters, loading }) {
    return {
        ...global,
        ...matters,
        loading: loading.global
    }
}

export default connect(mapStateToProps)(props =>
    <Index {...props}></Index>
)