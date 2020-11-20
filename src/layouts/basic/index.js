import React from 'react'
import { connect } from 'dva'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import { Layout } from 'antd'
import GlobalHead from '@/layouts/components/GlobalHead'
import GlobalFooter from '@/layouts/components/GlobalFooter'
import { query } from '../constant'
import styles from './index.less'

const { Content } = Layout

class BasicLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        const { children, btns } = this.props

        return (
            <ContainerQuery query={query}>
                {params => (
                    <Layout className={classNames(styles.basicLayout, params)}>
                        <GlobalHead>
                            <span>
                                {
                                    Object.keys(btns).map(ele => {
                                        return btns[ele]
                                    })
                                }
                            </span>
                        </GlobalHead>
                        <Content className={styles.basicLayoutContent}>
                            {children}
                        </Content>
                        <GlobalFooter {...this.props}></GlobalFooter>
                    </Layout>)
                }
            </ContainerQuery>
        )
    }
}

function mapStateToProps ({ matters }) {
    return {
        ...matters
    }
}

export default connect(mapStateToProps)(props =>
    <BasicLayout {...props} />
)