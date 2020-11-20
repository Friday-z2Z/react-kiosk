import React from 'react'
import router from 'umi/router'
import { BASIC_PATH } from '@/config/constant.config'
import { Layout } from 'antd'
import { sysFooterTitle, version } from '@/config/platform.config'
import styles from './index.less'
const { Footer } = Layout
/**
 * 
 * 事件监听事放在footer是因为定时器需要全局监听 状态独立  放在model中的话会引起不必要的组件渲染
 * 
 */

class GlobalFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countDuration: 12000000000,             // 默认屏幕倒计时时间
            resetCountDownNum: 60,          // 点击屏幕后重置的时间
            exitNum: 5,                      // 退出倒计时
            visible: false
        }
        this.tInterval = null
        this.tTimeout = null
    }

    componentDidMount () {
        const { location: { pathname } } = this.props
        if (!BASIC_PATH.includes(pathname)) {
            this.tickStart()
        }

        // 监听重置倒计时时间
        React.$eventEmitter.addListener('reSetModal', this.reSetModal)

        // 监听退出事件
        React.$eventEmitter.addListener('exit', this.exit)
    }

    componentDidUpdate (prevProps) {
        if (
            prevProps.location.pathname !== this.props.location.pathname &&
            !BASIC_PATH.includes(this.props.location.pathname)
        ) {
            this.tickStart()
        }
    }

    componentWillUnmount () {
        clearInterval(this.tInterval)
        React.$eventEmitter.removeListener('reSetModal', this.reSetModal)
        React.$eventEmitter.removeListener('exit', this.exit)
    }

    reSetModal = (num) => {
        const { resetCountDownNum } = this.state

        this.setState({
            countDuration: num || resetCountDownNum
        }, () => {
            this.tickStart()
        })
    }

    // 开始倒计时
    tickStart = () => {
        clearInterval(this.tInterval)
        this.tInterval = setInterval(() => {
            this.secondsDown()
        }, 1000)
    }

    // 10s倒计时
    secondsDown = () => {
        const { countDuration, visible, resetCountDownNum } = this.state
        this.setState({
            countDuration: countDuration - 1
        }, () => {
            if (this.state.countDuration <= 10 && !visible) {
                this.setState({
                    visible: true,
                })
                React.$tipModal.tickModal({
                    duration: this.state.countDuration,
                    countdown: true,
                    dbCountdown: true,
                    content: "秒后将自动返回首页，请尽快处理。温馨提示：点击页面任意处，可延长倒计时。",
                    handleClose: () => {
                        this.setState({
                            visible: false,
                            countDuration: resetCountDownNum
                        }, () => {
                            this.tickStart()
                        })
                        React.$tipModal.clear()
                        clearInterval(this.tInterval)
                    },
                    className: 'count-down-modal',
                    ...React.$tipModal.modalOPtion
                })
            }

            if (this.state.countDuration === 0) {
                this.exit()
            }
        })

    }

    // 退出至首页
    exit = () => {
        clearInterval(this.tInterval)
        const { exitNum } = this.state
        let tick = exitNum
        const contentText = '请取走您的二代身份证或社会保障卡'

        if (React.$tipModal.modal) {
            React.$tipModal.modal.update({
                content: contentText,
                duration: tick,
                className: 'count-down-modal',
                pathname: '/login'
            })
        } else {
            React.$tipModal.tickModal({
                content: contentText,
                duration: tick,
                className: 'count-down-modal',
                pathname: '/login'
            })
        }


        this.tInterval = setInterval(() => {
            tick--
            if (tick === 0) {
                React.$tipModal.clear()
                router.push({
                    pathname: '/login'
                })
            }
        }, 1000)
    }

    render () {
        const { machineCode, location: { pathname } } = this.props
        const { countDuration } = this.state
        return (
            <Footer className={styles.basicLayoutFoot}>
                <span>{sysFooterTitle} {machineCode}</span>
                <span className={styles.version}>
                    version：{version}
                    {
                        (!BASIC_PATH.includes(pathname)) && (
                            <span className={styles.countDown}>
                                返回首页倒计时:&nbsp;
                                <span className={styles.countNum}>{countDuration}</span>
                            </span>
                        )
                    }
                </span>
            </Footer>
        )
    }
}

export default GlobalFooter