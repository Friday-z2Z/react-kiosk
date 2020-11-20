import React from 'react'
import router from 'umi/router'
import { connect } from 'dva'
import classNames from 'classnames'
import { Col, Row } from 'antd'
import styles from './index.less'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            otherList: [
                { type: 'A01', name: '个人参保证明', id: '20' },
                { type: 'E04', name: '养老历年参保证明', id: '21' },
                { type: 'D02', name: '缴费明细查询', id: '22' },
                { type: 'A01', name: '个体劳动者参保登记', id: '23' }
            ]
        }

    }

    componentDidMount () {
        const { dispatch } = this.props
        //获取机器编码
        window.callbackMachine = function (str) {
            let res = JSON.parse(str)
            const { machineCode } = res
            dispatch({
                type: 'global/setMachineCode',
                payload: {
                    machineCode
                }
            })
        }
        // 项目开发完后解开
        // window.GetWebSocket('getmachineCode', window.callbackMachine)
    }

    cutLink = (id, count) => {

        router.push({
            pathname: '/readcardCX',
            query: {
                whichId: id
            },
            state: {
                count
            }
        })
    }

    render () {
        const { otherList } = this.state
        return (
            <div className={classNames(styles.content, 'media-content')}>
                <Row gutter={52}>
                    <Col span={16} className={styles.mainListCol}>
                        <Row gutter={28}>
                            <Col span={8}>
                                <div className={styles.flex}>
                                    <div className={classNames(styles.item, styles.item1)} onClick={() => this.cutLink(11, '4')}>查询</div>
                                    <div className={classNames(styles.item, styles.item2)} onClick={() => this.cutLink(11, '2')}>养老待遇</div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={styles.flex}>
                                    <div className={classNames(styles.item, styles.item3)} onClick={() => this.cutLink(11, '5')}>证明待遇</div>
                                    <div className={classNames(styles.item, styles.item4)} onClick={() => this.cutLink(11, '3')}>工伤待遇</div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={classNames(styles.item, styles.item5)} onClick={() => this.cutLink(11, '1')}>
                                    参保征缴
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} className={styles.otherListCol}>
                        {
                            otherList.map((item, index) => {
                                const oTiem = (
                                    <div className={styles.otherList} key={index} onClick={() => this.cutLink(item.id)}>
                                        <span className={styles.icon}>{item.type}</span>
                                        <span>{item.name}</span>
                                    </div>
                                )
                                return oTiem
                            })
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}


function mapStateToProps ({ matters }) {
    return {
        ...matters
    }
}

export default connect(mapStateToProps)(props =>
    <Login {...props}></Login>
)