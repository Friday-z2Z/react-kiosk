import React from 'react'
import { Tag, Button } from 'antd'
import BaseTable from '@/components/BaseTable'
import styles from './index.less'

class BaseMaterials extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			currentMaterial: {},
			currentIndex: null,
			materialMap: new Map()
		}
	}

	componentDidMount () {
		const { dataSource } = this.props
		this.setState({
			dataSource
		})
		// 上传材料回调
		window.callbackOpenCamera = (str) => {
			const { dataSource, currentMaterial, currentMaterial: { clmc }, currentIndex, materialMap } = this.state
			let res = JSON.parse(str)
			if (res.success) {
				// isUpload上传状态
				currentMaterial.isUpload = currentMaterial.status = '1'
				materialMap.set(currentIndex, { keys: res.result[0].key, name: clmc })
			} else {
				if (currentMaterial.isUpload !== '1') {
					currentMaterial.status = '2'
				} else {
					currentMaterial.status = currentMaterial.isUpload
				}
			}
			this.setState({
				dataSource
			})
		}

	}

	uploadMaterial = (text, record, index) => {
		// status提示状态
		record.status = '3'
		this.setState({
			currentMaterial: record,
			currentIndex: index
		}, () => {
			// 打开高拍仪
			window.OpenCamera(window.callbackOpenCamera)
		})
	}

	// 材料校验
	validate = () => {
		const { dataSource, materialMap } = this.state
		const materials = [...materialMap].map(item => {
			return item[1]
		})
		let next = materials
		for (let i = 0; i < dataSource.length; i++) {
			if (dataSource[i].reqed === '1' && dataSource[i].reqed !== dataSource[i].isUpload) {
				next = false
				React.$tipModal.tickModal({
					content: '请上传所有的必传材料',
					duration: 5,
					countdown: true
				})
				break
			}
		}
		return next
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
			render: (mark, record) => {
				let color = record.status === '1' ? '#87d068' : record.status === '3' ? '#f50' : '#aaaaaa'
				return (
					<Tag color={color} key={mark}>{record.status === '1' ? '已上传' : record.status === '3' ? '正在上传' : '未上传'}</Tag>
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

		const { dataSource } = this.state
		return (
			<BaseTable
				className="table-classname"
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				rowClassName='baseMaterialsRow'
				rowKey='clxxkId'
				// scroll={{ x: 'max-content', y: 'calc(100vh - 450px)' }}
				scroll={{ x: 'max-content', y: 200 }}
				ref={ ref => this.baseTableRef = ref }
				onRow={record => {
					return {
						onClick: event => {
							/**
							 * record 当前行数据
							 * event 当前行点击事件
							 * dataSource 数据源
							 * table-classname table 类名
							 * ant-table-body-inner 滚动节点类名
							 */
							// 设定点击一次滚动的条数
							const scrollNum = 1
							// 容器节点
							const dom = document.getElementsByClassName('table-classname')[0]
							// 60 表头高度
							const domH = dom.clientHeight - 60
							// 当前行高度
							const cDomH = event.currentTarget.clientHeight
							// 当前行相对顶部距离
							const offsetDomT = event.currentTarget.offsetTop
							// 滚动节点
							const sDom = document.getElementsByClassName('ant-table-body-inner')[0]
							const containerNumMax = parseInt(domH / cDomH) 
							let startRowIndex = null
							let endRowIndex = null
							// 每次设置滚动值前根据已经滚动的距离计算开始和结束行索引
							// 设置顶部开始索引
							startRowIndex = Math.ceil(sDom.scrollTop / cDomH)
							// 设置尾部开始索引
							endRowIndex = startRowIndex + containerNumMax - 1
							// 当前行索引
							const cIndex = dataSource.indexOf(record)
							// endRowIndex > startRowIndex 排除滚动区域很小的情况 例如滚动节点只能可视3条数据
							let _scrollDomTop = sDom.scrollTop
							// 不可以判断 >=
							if (endRowIndex > startRowIndex){
								// 点击了滚动节点上部分
								if (cIndex <= startRowIndex){
									// 点击行上线条刚好和表头下面线条重合
									if (offsetDomT - _scrollDomTop === 0){
										sDom.scrollTop = _scrollDomTop - scrollNum * cDomH
									} else {
										// 点击行在表头下面 或者 点击行与表头下线条重叠
										sDom.scrollTop = offsetDomT - cDomH - scrollNum * cDomH
									}
								}

								// 点击了滚动节点下部分
								// if (cIndex >= endRowIndex){
								// 	sDom.scrollTop = _scrollDomTop + cDomH - (domH - containerNumMax * cDomH) + scrollNum * cDomH + 10
								// }
							}
						}
					};
				}}
			/>
		)
	}
}

export default BaseMaterials