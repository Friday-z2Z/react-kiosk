import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import { Layout } from 'antd';
import MatterLists from './matterLists';
import Menus from '@/layouts/components/Menus'
import Context from '@/layouts/Context'
import mattersConfig from '@/config/matters.config'
import styles from './index.less'

const { Sider } = Layout;

class Matters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key:null
        }
    }

    onSelect = (key) => {
        let { dispatch }= this.props
        window.localStorage.setItem('defaultCount',key.toString())
        this.setState({
            key
        })
        dispatch({
            type:'matters/setCount',
            payload:{
                count:key
            }
        })
    }

    render() {
        const { mattersType = [] } = mattersConfig
        const { location:{ state:{ count:active }, count } } = this.props
        const { key } = this.state
        let selected = window.localStorage.getItem('defaultCount') || count || key || active || '0'
        const { sideWidth } = this.context
        return (
            <Layout className={styles.matetrLayout}>
                <Sider width={sideWidth} className={classnames(styles.side,'side'+selected)}>
                    <Menus mattersType={mattersType} active={selected} onSelect={this.onSelect}/>
                </Sider>
                <Layout className={styles.listLayout}>
                    <MatterLists active={selected} mattersConfig={mattersConfig}/>
                </Layout>
            </Layout>
        );
    }
}

Matters.contextType = Context

function mapStateToProps({ matters }){
    return {
        ...matters
    }
}

export default connect(mapStateToProps)(props=>
    <Matters {...props} />
);