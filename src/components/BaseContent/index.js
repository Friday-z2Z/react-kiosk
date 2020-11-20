import React from 'react'
import { Layout, Button, Steps } from 'antd'
import classnames from 'classnames'
import styles from './index.less'

const { Header, Sider, Content } = Layout
const { Step } = Steps

class BaseContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 0,
			animateClass: '',
			result: []
		}
	}

	static defaultProps = {
		target: {},
		dataSource: []
	}

	prev = () => {
		const current = this.state.current - 1
		this.setState({ current })
	}

	next = () => {
		const { dataSource } = this.props
		let { result, current } = this.state
		const res = dataSource[current].onOk()
		result[current] = res
		if (res) {
			this.setState({
				result
			}, () => {
				if (current !== dataSource.length - 1) {
					const current = this.state.current + 1
					this.setState({ current }, () => {
						console.log(this.state)
					})
				} else {
					// ...保存
					dataSource[current].submit(result)
				}
			})
		}
	}

	componentDidMount () {

	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.current !== this.state.current && this.state.current !== this.props.dataSource.length) {
			this.setState({
				animateClass: 'slide'
			}, () => {
				setTimeout(() => {
					this.setState({
						animateClass: ''
					})
				}, 0)
			})
		}
	}

	render () {
		const { target: { name }, dataSource } = this.props
		const { current, animateClass } = this.state
		const content = dataSource[current].content
		const title = dataSource[current].title

		return (
			<Layout className={styles.layout}>
				<Header className={styles.header}>{name}</Header>
				<Layout className={styles.contnetLayout}>
					<Content className={styles.contnet}>
						<div className={classnames(styles.contnetInner, animateClass)}>
							<h2>{title}</h2>
							<div className={styles.main}>{content}</div>
						</div>
					</Content>
					<Sider className={styles.sider}>
						<Steps direction="vertical" current={current}>
							{
								dataSource.map((item, index) => {
									return <Step key={index} title={item.title} />
								})
							}
						</Steps>
						<div className={styles.stepsAction}>
							{current > 0 && (
								<Button onClick={() => this.prev()}>
									上一步
								</Button>
							)}
							{current < dataSource.length - 1 && (
								<Button type="primary" onClick={() => this.next()}>
									下一步
								</Button>
							)}
							{current === dataSource.length - 1 && (
								<Button type="primary" onClick={() => this.next()}>
									提交
								</Button>
							)}
						</div>
					</Sider>
				</Layout>
			</Layout>
		)
	}
}

export default BaseContent