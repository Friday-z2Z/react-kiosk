import React from 'react'
import { Tag, Button } from 'antd'
import BaseTable from '@/components/BaseTable'
import styles from './index.less'

class BaseMaterials extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentMaterial: {},
			currentIndex: null,
			materialMap: new Map()
		}
	}

	componentDidMount () {
		// 上传材料回调
		window.callbackOpenCamera = (str) => {
			let res = JSON.parse(str)
			console.log(res)
			if (res.success) {
				const { currentMaterial: { clmc }, currentIndex, materialMap } = this.state
				materialMap.set(currentIndex, { keys: res.result[0].key, name: clmc })

			}
		}

	}

	uploadMaterial = (text, record, index) => {
		this.setState({
			currentMaterial: record,
			currentIndex: index
		}, () => {
			// ...提示正在上传
			window.OpenCamera(window.callbackOpenCamera)
		})
	}

	render () {

		const columns = [{
			title: '材料名称',
			dataIndex: 'clmc',
			key: 'clmc',
			align: 'center',
			width: 500,
			render: text => <a>{text}</a>
		}, {
			title: '是否必传',
			dataIndex: 'reqed',
			key: 'reqed',
			// fixed: 'right',
			align: 'center',
			width: 120,
			render: mark => {
				let color = mark === '1' ? '#f5222d' : '#aaaaaa'
				return (
					<Tag color={color} key={mark}>{mark === '1' ? '是' : '否'}</Tag>
				)
			}
		}, {
			title: '上传标识',
			dataIndex: 'isUpload',
			key: 'isUpload',
			// fixed: 'right',
			align: 'center',
			width: 120,
			render: mark => {
				let color = mark === '1' ? '#87d068' : '#aaaaaa'
				return (
					<Tag color={color} key={mark}>{mark === '1' ? '已上传' : '未上传'}</Tag>
				)
			}
		}, {
			title: '操作',
			key: 'operation',
			fixed: 'right',
			align: 'center',
			width: 160,
			render: (text, record, index) => <Button type="primary" onClick={() => this.uploadMaterial(text, record, index)}>上传</Button>,
		}]

		const { dataSource } = this.props
		console.log(dataSource)
		return (
			<BaseTable
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				rowClassName='baseMaterialsRow'
				rowKey='clxxkId'
				scroll={{ x: 'max-content', y: 'calc(100vh - 450px)' }}
			/>
		)
	}
}

export default BaseMaterials