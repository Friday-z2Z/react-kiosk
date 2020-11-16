import React from 'react'
import BaseForm from '@/components/BaseForm'
import BaseSelect from '@/components/BaseSelect'
import { SEX_OPTION, INTERRUPT_OPTION } from '@/config/constant.config'
import { Button } from 'antd'

class aNewGTLDZTB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        const { location:{ state } } = this.props
        this.setState({
            ...state
        },()=>{
            console.log(this.state)
        })
    }

    handleClick = () => {
        this.baseForm.validateFields((err, values)=> {
            if (!err) {
                values = {
                    ...values,
                    birthday:values['birthday'].format('YYYYMMDD')
                }
                console.log('Received values of form: ', values);
            }
        })
    }

    render() {
        const { targetMatter, userInfo, certNumber, sex, birthday, reason, contacterMobilephone } = this.state

        const fields = [{
            type:'Input',
            name:'certNumber',
            label:'身份证号',
            fieldDecoratorOps:{
                rules:[{ required:true, max: 18, }]
            },
            elementOpts:{
                disabled:true
            }
        }, {
            type:'Input',
            name:'name',
            label:'姓名',
            fieldDecoratorOps:{
                rules:[{ required:true, max: 10, }]
            },
            elementOpts:{
                disabled:true
            }
        }, {
            type:'Select',
            name:'sex',
            label:'性别',
            options:SEX_OPTION,
            fieldDecoratorOps:{
                rules:[{ required:true, max: 1, }]
            },
            elementOpts:{
                disabled:true,
                readOnly:true, // Select标签添加点击事件时必要加入此属性并使用以下触发方式
                onDropdownVisibleChange:()=>{
                    BaseSelect.show({
                        title:'性别选择',
                        options:SEX_OPTION,
                        value:sex,
                        multiple:false,
                        onOk:(val) => {
                            this.setState({
                                sex:val
                            })
                        }
                    })
                }
            }
        }, {
            type:'DatePicker',
            witch:'date',  // 目前只增加了 date 和 month 默认 date
            name:'birthday',
            label:'出生日期',
            fieldDecoratorOps:{
                rules:[{ required:true, message:'请选择出生日期' }]
            },
            elementOpts:{
                disabled:true,
                placeholder:'请选择出生日期',
                format:'YYYY-MM-DD'
            }
        },{
            type:'Select',
            name:'reason',
            label:'中断原因',
            options:INTERRUPT_OPTION,
            fieldDecoratorOps:{
                rules:[{ required:true, message:'请选择中断原因' }]
            },
            elementOpts:{
                readOnly:true, // Select标签添加点击事件时必要加入此属性并使用以下触发方式
                placeholder:'请选择中断原因',
                onDropdownVisibleChange:()=>{
                    BaseSelect.show({
                        title:'中断原因选择',
                        options:INTERRUPT_OPTION,
                        value:reason,
                        onOk:(val) => {
                            this.setState({
                                reason:val
                            })
                        }
                    })
                }
            }
        },{
            type:'Input',
            name:'contacterMobilephone',
            label:'联系电话',
            fieldDecoratorOps:{
                rules:[{
                        required:true, message:'请输入手机号'
                    }, { 
                        pattern: /(^1[3456789][0-9]\d{8}$)/, message:'请输入正确的手机号码' 
                    }]
            },
            elementOpts:{}
        }]

        let name = userInfo ? userInfo.name : ''
        const data = {
            certNumber,
            name,
            sex,
            birthday,
            reason,
            contacterMobilephone
        }

        return (
            <>
                <BaseForm
                    ref={ref=>{ this.baseForm=ref }}
                    target={targetMatter}
                    fields={fields}
                    data={data}
                />
                <Button onClick={this.handleClick}>dddd</Button>
            </>
        );
    }
}

export default aNewGTLDZTB;