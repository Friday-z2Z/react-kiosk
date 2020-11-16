import React from 'react'
import { Modal } from 'antd';
import CountDownModal from '@/components/CountDownModal'

function Method(props){
    this.props = props;

    const icon = <img alt="提示图片" src={require('@/assets/common/img/icon_message.png')}></img>;

    this.modalOPtion = {
        icon,
        centered:true,
        width:'55rem'
    }

    // 设置倒计时时间
    this.setCountDownNum = (num) => {
        React.$eventEmitter.emit('reSetModal',num)
    }

    /**
     * @param {*} content 内容
     * @param {*} duration 倒计时长
     * @param {*} countdown 是否显示倒计时时间 右上角显示倒计时
     * @param {*} dbCountdown 是否显示内容倒计时时间 只为了10秒倒计时用
     * @param {*} pathname 跳转地址
     * @param {*} query 参数
     * @param {*} state 参数
     * @param {*} onClose 弹窗关闭后调用
     * countdown 为 false 时,弹窗不关闭; onClose 当 countdown 为 true 时有效, onClose 中不必写路由跳转,只需配 pathname
     */

     // 通用提示框
    this.tickModal = (option) => {
        this.modal = Modal.info({
            ...option,
            ...this.modalOPtion,
            className:'tick-modal',
            content:<CountDownModal 
                {...option}
                {...this.props}
            />,
            onClose:()=>{}
        });
    }

    this.clear = () => {
        this.modal = null
        Modal.destroyAll()
    }
}
export default Method;

