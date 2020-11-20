import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import BaseModal from '@/components/BaseModal'
import { Button, Checkbox, Radio } from 'antd'
import styles from './index.less'

class _BaseSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            multiple: false, // 是否多选
            options: [],
            values: null,
            disabled: true
        }
    }

    static defaultProps = {
        _title: '',
        _options: [],
        _onOk: () => { }
    }

    show = (config = {}) => {
        const { multiple, value } = config
        this.setState({
            visible: true,
            disabled: value ? false : true,
            values: value,
            multiple: multiple ? true : false,
            ...config
        })
    }

    hide = () => {
        this.setState({
            visible: false,
            disabled: true,
            values: null,
            options: []
        })
    }

    // 多选改变
    onCheckboxChange = (vals) => {
        this.setState({
            values: vals,
            disabled: false
        })
    }

    // 单选改变
    onRadioChange = (e) => {
        this.setState({
            values: e.target.value,
            disabled: false
        })
    }

    getVal = () => {
        const { values } = this.state
        this.state.onOk(values)
        setTimeout(() => {
            this.hide()
        }, 0)
    }

    getContent = () => {
        const { multiple, options = [], values } = this.state
        if (multiple) {
            // 多选内容
            return (
                <div className={classnames(styles.checkbox, { 'checkbox-single': options.length === 1, 'checkbox-more': options.length > 6 })}>
                    <Checkbox.Group value={values} options={options} onChange={this.onCheckboxChange} />
                </div>
            )
        } else {
            // 单选内容
            return (
                <div className={classnames(styles.radio, { 'radio-single': options.length === 1, 'radio-more': options.length > 6 })}>
                    <Radio.Group value={values} options={options} onChange={this.onRadioChange} />
                </div>
            )
        }
    }

    render () {
        const { title, visible, options = [], disabled } = this.state
        const content = this.getContent()
        return (
            <BaseModal
                wrapClassName={options.length === 0 ? 'common-baseSelect-single' : 'common-baseSelect-normal'}
                title={title}
                visible={visible}
                onCancel={this.hide}
                getContainer={false}
            >
                <div className={styles.baseSelect}>
                    {content}
                </div>
                <Button disabled={disabled} type="primary" onClick={this.getVal}>确定</Button>
            </BaseModal>
        )
    }
}

let div = document.createElement('div')
div.className = 'common-baseSelect'
document.body.appendChild(div)
let BaseSelect = ReactDOM.render(React.createElement(
    _BaseSelect
), div)

export default BaseSelect