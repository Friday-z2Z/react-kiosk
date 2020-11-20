import React from 'react'
import { Form, DatePicker, Input, Select, Layout, Row, Col } from 'antd'
import moment from 'moment'
import BaseHead from '@/components/BaseHead'

const { Search, TextArea } = Input
const { Option } = Select

const { MonthPicker } = DatePicker

/** 
 * fields: 表单
 * data:表单数据
 * labelCol:label span
 * wrapperCol:wrapper span
*/
class _BaseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    static defaultProps = {
        target: {},
        fields: [],
        data: {},
        labelCol: 7,
        wrapperCol: 15
    }

    getForm = () => {
        const { form: { getFieldDecorator }, labelCol, wrapperCol, fields } = this.props
        const fieldsList = fields || []
        const labelColItem = labelCol
        const wrapperColItem = wrapperCol
        const formItemLayout = {
            labelCol: { span: labelColItem },
            wrapperCol: { span: wrapperColItem },
        }

        const children = fieldsList.map((ele, index) => {
            let item
            switch (ele.type) {
                case 'Input':
                    item = getFieldDecorator(ele.name, ele.fieldDecoratorOps)(
                        <Input {...ele.elementOpts} />
                    )
                    break
                case 'Select':
                    item = getFieldDecorator(ele.name, ele.fieldDecoratorOps)(
                        <Select {...ele.elementOpts} open={false}>
                            {
                                ele.options.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                    )
                    break
                case 'DatePicker':
                    item = getFieldDecorator(ele.name, ele.fieldDecoratorOps)(
                        ele.witch === 'month' ? <MonthPicker /> : <DatePicker {...ele.elementOpts} />
                    )
                    break
                default:
                    item = getFieldDecorator(ele.name, ele.fieldDecoratorOps)(
                        <Input {...ele.elementOpts} />
                    )
                    break
            }
            item = (
                <Col lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }} key={index}>
                    <Form.Item {...formItemLayout} label={ele.label}>
                        {item}
                    </Form.Item>
                </Col>
            )
            return item
        })
        return (
            <Form>
                <Row>
                    {children}
                </Row>
            </Form>
        )
    }

    render () {
        const { target: { name } } = this.props

        return (
            // <Layout className={styles.layout}>
            //     <Header className={styles.header}>{ name }</Header>
            //     <Layout className={styles.contnetLayout}>
            //         <Content className={styles.contnet}>
            //             {this.getForm()}
            //         </Content>
            //     </Layout>
            // </Layout>
            this.getForm()
        )
    }
}


const BaseForm = Form.create({
    // React.$tools.noPassByName
    mapPropsToFields: (props) => {
        const { fields = [], data = [] } = props
        const values = {}
        fields.map(item => {
            const fieldName = item.name
            let value = data[fieldName]
            if (fieldName.indexOf('.' !== -1)) {
                try {
                    // eslint-disable-next-line no-eval
                    // 特殊多层结构数据获取值
                    value = eval('data.' + fieldName)
                } catch (error) {
                    console.error(error)
                }
            }
            if (value !== undefined && value !== null) {
                // 特殊数据处理
            }
            // 脱敏处理 字段统一
            switch (fieldName) {
                case 'name':
                    value = React.$tools.noPassByName((value || '').toString())
                    break
                case 'certNumber':
                    value = React.$tools.noPassByIdCard((value || '').toString())
                    break
                case 'birthday':
                    value = value ? moment(value, 'YYYY-MM-DD') : null
                    break
                // default:
                //     value = (value||'').toString();
                //     break;
                // 默认设空值 placeholder 则不显示 应设 undefined
            }
            values[fieldName] = Form.createFormField({ value })
            return item
        })
        return values
    }
})(_BaseForm)

export default BaseForm