import React from 'react'
import router from 'umi/router'
import classNames from 'classnames'
import { connect } from 'dva'
import { USER_INFO, TOKEN } from '@/config/constant.config'
import { Layout, Card, Button } from 'antd';
import styles from './index.less'

const { Content } = Layout;
const { Meta } = Card;

class ReadcardCX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTest:process.env.NODE_ENV === 'development'
        }

        // window.callbackGetIdCard = function(str){

        // }

        const { dispatch } = this.props
        // React.$tipModal.setCountDownNum(30000000000)

        window.callbackGetIdCard = (str) => {
            let res = JSON.parse(str);
            console.log(res)
            const idCard = res.result.replace(/\s*/g, '').split('|')[0]
            const name = res.result.replace(/\s*/g, '').split('|')[1] || '测试账号'
            dispatch({
                type:'global/setInfo',
                payload:{
                    isTest:this.state.isTest,
                    idCard,
                    name
                }
            })
        }
    }

    readCard = () => {
        const { dispatch, location: { state } } = this.props
        console.log(window,window.callbackGetIdCard)
        window.GetData(2, '%cardId%|%name%', window.callbackGetIdCard);
        // const testInfo = {
        //     name:USER_INFO.NAME,
        //     idCard:USER_INFO.IDCARD
        // }
        // setTimeout(()=>{
        //     // 设置个人信息
        //     dispatch({
        //         type:'global/setInfo',
        //         payload:{...testInfo}
        //     })
        //     dispatch({
        //         type:'global/setToken',
        //         payload:{token:TOKEN}
        //     })
        //     // 设置所选事项类型
        //     dispatch({
        //         type:'matters/setCount',
        //         payload:{
        //             count:state.count||'0'
        //         }
        //     })
        //     window.localStorage.setItem('defaultCount',state.count)
        //     React.$tipModal.clear()
        //     router.push({
        //         pathname:'/sys/matters',
        //         state:{ ...state,...testInfo }
        //     })
        //     // const storage = window.localStorage
        //     // let josnStr = JSON.stringify(testInfo)
        //     // storage.setItem('userInfo',josnStr)
        // },5000)
        // let str = this.state.isTest?'测试':''
        // React.$tipModal.tickModal({
        //     content:str + '正在读卡，请稍候...',
        //     countdown:false
        // })
    }

    componentDidMount() {
        

        // window.GetData(2, '%cardId%|%name%', window.callbackGetIdCard);

        // 事件function的监听
        // React.$eventEmitter.addListener('function',function(){})
        // console.log(React.$eventEmitter)

    }

    render() {
        const readcardBtn = (
            <Button type="primary" onClick={this.readCard}>开始读卡</Button>
        )
        const scanBtn = (
            <Button type="primary">开始扫描</Button>
        )
        return (
            <Content className={styles.readcardCXWrap}>
                <div className={classNames(styles.readcardCX,styles.flex)}>
                    <p className={styles.typesName}>请选择身份认证方式</p>
                    <div className={styles.flex} ref={(ref)=>{this.contentRef = ref}}>
                        <Card
                            className={styles.card}
                            cover={<img alt="readcard" src={require("@/assets/common/img/readCard.gif")}/>}
                        >
                            <Meta title="请放入二代身份证或社会保障卡" description={readcardBtn} />
                        </Card>
                        <Card
                            className={styles.card}
                            cover={<img alt="readcard" src={require("@/assets/common/img/selfmachine_ewm.gif")}/>}
                        >
                            <Meta title='请打开电子社保卡二维码，然后点击"开始扫描"按钮' description={scanBtn} />
                        </Card>
                    </div>
                </div>
            </Content>
        );
    }
}

function mapStateToProps({ global, matters }) {
    return {
        ...global,
        ...matters
    }
}

export default connect(mapStateToProps)(props =>
    <ReadcardCX {...props}></ReadcardCX>
);

// export default ReadcardCX;