import React from 'react'
import VConsole from 'vconsole'
import { EventEmitter } from 'events'
import { ErrorBoundary, TestModal } from '@/components/index'
import { TEST_MODAL_PATH } from '@/config/constant.config'

class LayoutWrap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        // 事件公交车
        // React.$eventEmitter.addLinster('name',function) 添加/监听
        // React.$eventEmitter.removeLinster('name',function) 删除
        // React.$eventEmitter.emit('name',args) 抛出
        const Events = new EventEmitter()
        React.$eventEmitter = Events

    }

    componentDidMount () {
        let touch__VConsole = null
        let touch_VCDom = null
        let _this = this

        // 触摸屏手势出发事件
        document.body.addEventListener('touchstart', function (event) {
            const touches = event.touches
            if (
                touches[0].clientX <= 200 &&
                touches[0].clientY <= 200 &&
                (window.outerHeight - touches[1].clientY <= 200) &&
                (window.outerWidth - touches[1].clientX <= 200)
            ) {
                if (!touch__VConsole) {
                    touch__VConsole = new VConsole()
                } else {
                    touch_VCDom = document.getElementById('__vconsole')
                    let style = touch_VCDom.style.display === 'block' ? 'none' : 'block'
                    touch_VCDom.style.display = style
                }
            } else if (
                touches[0].clientX <= 200 &&
                touches[0].clientY <= 200 &&
                touches[1].clientX <= 200 &&
                (window.outerHeight - touches[1].clientY <= 200)
            ) {
                // 弹窗测试
                let _visible = TEST_MODAL_PATH.includes(_this.props.location.pathname) ? true : false
                _visible && (
                    _this.props.dispatch({
                        type: 'global/setTestModal',
                        payload: {
                            testModal: true
                        }
                    })
                )
            }

            if (event.touches.length > 1) {
                event.preventDefault()
            }
        }, false)

        let lastTouchEnd = 0
        document.body.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime()
            if (now - lastTouchEnd <= 300) {
                event.preventDefault()
            }
            lastTouchEnd = now
        }, false)

        // alt + v 调取取消VConsole
        let __VConsole = null
        let VCDom = null
        document.onkeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode
            var altKey = e.altKey || e.metaKey
            if (altKey && keyCode === 86) {
                if (!__VConsole) {
                    __VConsole = new VConsole()
                } else {
                    VCDom = document.getElementById('__vconsole')
                    let style = VCDom.style.display === 'block' ? 'none' : 'block'
                    VCDom.style.display = style
                }
            } else if (altKey && keyCode === 84) {
                // 弹窗测试
                let _visible = TEST_MODAL_PATH.includes(_this.props.location.pathname) ? true : false
                _visible && (
                    _this.props.dispatch({
                        type: 'global/setTestModal',
                        payload: {
                            testModal: true
                        }
                    })
                )
            }
        }

        this.reSetFontSize()

        window.addEventListener('resize', () => {
            this.reSetFontSize()
        })
    }

    componentWillMount () { }

    componentDidCatch (error, info) {
        console.error(error, info.componentStack)
    }

    // 设置html根字体大小
    reSetFontSize = () => {
        let html = document.getElementsByTagName("html")[0]
        if (html) {
            let clientW = document.documentElement.clientWidth || document.body.clientWidth
            let clientH = document.documentElement.clientHeight || document.body.clientHeight
            if (!clientW) return
            const scale = clientW / clientH
            html.style.fontSize =
                (scale > 1.5) ?
                    (scale > 2 ?
                        scale > 2.2 ?
                            12 / 2200 * clientW + "px"
                            : 12 / 2000 * clientW + "px"
                        : 12 / 1920 * clientW + "px"
                    ) : (12 / 1680 * clientW + "px")
        }
    }

    onCancel = () => {
        this.props.dispatch({
            type: "global/setTestModal",
            payload: {
                testModal: false
            }
        })
    }

    render () {
        const { testModal } = this.props
        return (
            <ErrorBoundary {...this.props}>
                { this.props.children}
                {
                    testModal ?
                        <TestModal visible={testModal} onCancel={this.onCancel} {...this.props} /> :
                        ''
                }
            </ErrorBoundary>
        )
    }
}

export default LayoutWrap