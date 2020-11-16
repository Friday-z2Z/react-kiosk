import React from 'react'
import { Table } from 'antd'
import styles from './index.less'

class BaseTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render () {
		return (
			<Table {...this.props} />
		)
	}
}

export default BaseTable