import React from 'react'
import { Form, Input, Button, Icon } from 'antd'
import BaseModal from '@/components/BaseModal'
import styles from './index.less'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

class TestModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    compareToPassword = (rule, value, callback) => {
        if (value && value !== '1120') {
            callback('请输入正确的密码!')
        } else {
            callback()
        }
    };

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'global/setInfo',
                    payload: {
                        idCard: values.idCard
                    }
                })
                this.props.onCancel()
            }
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <BaseModal
                title="测试"
                {...this.props}
            >
                <Form
                    onSubmit={this.handleSubmit}
                    className="test-modal-form"
                >
                    <Form.Item>
                        {getFieldDecorator('idCard', {
                            rules: [{ required: true, message: '请输入正确的身份证号' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入身份证号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入正确的密码' },
                                { validator: this.compareToPassword, }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="confirm-btn">
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </BaseModal>
        )
    }
}

export default Form.create({ name: 'Test_Modal' })(TestModal)

// export default TestModal;