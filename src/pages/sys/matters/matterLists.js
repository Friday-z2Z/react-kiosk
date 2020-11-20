import React from 'react'
import router from 'umi/router'
import { Row, Col } from 'antd'
import classnames from 'classnames'
import styles from './index.less'

class MatterLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    animateStart = (e) => {
        e.persist()
        let target = e.currentTarget
        target.style['transform'] = 'scale(0.7)'
        setTimeout(() => {
            target.style['transform'] = 'scale(1)'
        }, 300)
    }

    animateEnd = (e) => {
        e.persist()
        e.currentTarget.style['transform'] = 'scale(1)'
    }

    handleClick = (ele) => {
        router.push({
            pathname: '/commonValite',
            state: {
                ...ele
            }
        })
    }

    renderList = () => {
        const { active, mattersConfig: { mattersType = [] } } = this.props
        const { selectedCount } = this.state
        let mapList = []
        if (active === '0') {
            mattersType.forEach(ele => {
                ele.list = ele.list || []
                ele.list.forEach(item => {
                    item.count = ele.count
                })
                mapList = mapList.concat(ele.list || [])
            })
        } else {
            mapList = mattersType[active].list || []
        }


        const itemLists = mapList.map((ele, index) => {
            let selected = ele.count || active
            const item = (
                <Col sm={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 6 }} key={index}>
                    <li
                        className={
                            classnames(styles.listItem, 'listItem' + selected, {
                                'closed': ele.closed, 'active': selectedCount === index
                            })
                        }
                        onTouchStart={this.animateStart}
                        onTouchEnd={this.animateEnd}
                        onMouseDown={this.animateStart}
                        onMouseUp={this.animateEnd}
                        onClick={() => this.handleClick(ele)}
                    >
                        <div className={classnames(styles.listItemType, 'listItemType')}>
                            {ele.type}
                            {
                                ele.recommend && (
                                    <span style={{ 'fontSize': '2.167rem' }} className="iconfont">&#xeaf6;</span>
                                )
                            }
                        </div>
                        <div className={classnames(styles.listItemContent, 'listItemContent')}>
                            <p className={styles.listItemName}>{ele.name}</p>
                            <p className={styles.listItemDes}>{ele.describe}</p>
                        </div>
                        {
                            ele.closed && (
                                <div className={styles.closedTips}>
                                    { ele.closedDesc || ''}
                                </div>
                            )
                        }
                    </li>
                </Col>
            )
            return item
        })

        return (
            <div className={styles.listsWrap}>
                <div className={styles.lists}>
                    <ul>
                        <Row>
                            {itemLists}
                        </Row>
                    </ul>
                </div>
            </div>
        )
    }

    render () {
        const list = this.renderList()
        return list
    }
}

export default MatterLists