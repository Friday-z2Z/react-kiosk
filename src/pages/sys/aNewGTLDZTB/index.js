import React from 'react'
import BaseForm from '@/components/BaseForm'
import BaseSelect from '@/components/BaseSelect'
import BaseContent from '@/components/BaseContent'
import BaseMaterials from '@/components/BaseMaterials'
import { SEX_OPTION, INTERRUPT_OPTION } from '@/config/constant.config'
import { Button } from 'antd'

class aNewGTLDZTB extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount () {
		const { location: { state } } = this.props
		this.setState({
			...state
		}, () => {
			console.log(this.state)
		})
	}

	render () {
		const { targetMatter, userInfo, certNumber, sex, birthday, reason, contacterMobilephone, materials } = this.state

		const fields = [{
			type: 'Input',
			name: 'certNumber',
			label: '身份证号',
			fieldDecoratorOps: {
				rules: [{ required: true, max: 18, }]
			},
			elementOpts: {
				disabled: true
			}
		}, {
			type: 'Input',
			name: 'name',
			label: '姓名',
			fieldDecoratorOps: {
				rules: [{ required: true, max: 10, }]
			},
			elementOpts: {
				disabled: true
			}
		}, {
			type: 'Select',
			name: 'sex',
			label: '性别',
			options: SEX_OPTION,
			fieldDecoratorOps: {
				rules: [{ required: true, max: 1, }]
			},
			elementOpts: {
				disabled: true,
				readOnly: true, // Select标签添加点击事件时必要加入此属性并使用以下触发方式
				onDropdownVisibleChange: () => {
					BaseSelect.show({
						title: '性别选择',
						options: SEX_OPTION,
						value: sex,
						multiple: false,
						onOk: (val) => {
							this.setState({
								sex: val
							})
						}
					})
				}
			}
		}, {
			type: 'DatePicker',
			witch: 'date',  // 目前只增加了 date 和 month 默认 date
			name: 'birthday',
			label: '出生日期',
			fieldDecoratorOps: {
				rules: [{ required: true, message: '请选择出生日期' }]
			},
			elementOpts: {
				disabled: true,
				placeholder: '请选择出生日期',
				format: 'YYYY-MM-DD'
			}
		}, {
			type: 'Select',
			name: 'reason',
			label: '中断原因',
			options: INTERRUPT_OPTION,
			fieldDecoratorOps: {
				rules: [{ required: true, message: '请选择中断原因' }]
			},
			elementOpts: {
				readOnly: true, // Select标签添加点击事件时必要加入此属性并使用以下触发方式
				placeholder: '请选择中断原因',
				onDropdownVisibleChange: () => {
					BaseSelect.show({
						title: '中断原因选择',
						options: INTERRUPT_OPTION,
						value: reason,
						multiple: false,
						onOk: (val) => {
							this.setState({
								reason: val
							})
						}
					})
				}
			}
		}, {
			type: 'Input',
			name: 'contacterMobilephone',
			label: '联系电话',
			fieldDecoratorOps: {
				rules: [{
					required: true, message: '请输入手机号'
				}, {
					pattern: /(^1[3456789][0-9]\d{8}$)/, message: '请输入正确的手机号码'
				}]
			},
			elementOpts: {}
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

		const steps = [{
			title: '人员基本信息',
			content: <BaseForm ref={ref => { this.ref = ref }} fields={fields} data={data} />,
			onOk: () => {
				let res = false
				this.ref.validateFields((err, values) => {
					if (!err) {
						values = {
							...values,
							certNumber,
							name,
							birthday: values['birthday'].format('YYYYMMDD')
						}
						this.setState({
							...values
						})
						res = values
					}
				})
				return res
			}
		}, {
			title: '材料上传',
			content: <BaseMaterials dataSource={materials} />,
			onOk: () => {

			}
		}]

		return (
			<BaseContent
				target={targetMatter}
				dataSource={steps}
			>
			</BaseContent>
		)
	}
}

export default aNewGTLDZTB