import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import { ContainerQuery } from 'react-container-query';
import Media from 'react-media';
import classNames from 'classnames';
import { Layout, Button } from 'antd';
import GlobalFooter from '@/layouts/components/GlobalFooter'
import { ENTRY_PATH } from '@/config/constant.config'
import { query } from '../constant';
import Context from '../Context';
import styles from './index.less'

const { Content, Header } = Layout

class PlatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed:false,
            menuTheme:'dark'
        }
    }

    componentDidMount(){
        const { isMobile } = this.props;
        const { collapsed } = this.state;
        if (isMobile !== collapsed) {
            this.setState({ collapsed: isMobile });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.isMobile !== prevState.collapsed){
            this.setState({ collapsed: this.props.isMobile });
        }
    }

    logout = () => {
        React.$eventEmitter.emit('exit')
    }

    goback = () => {
        const { count } = this.props
        router.push({
            pathname:ENTRY_PATH[1],
            state:{
                count
            }
        })
    }

    getContext = (params) => {
        const { collapsed, menuTheme } = this.state
        let sideWidth = collapsed ? 150 : 250;
        return {
            params,
            collapsed,
            menuTheme,
            sideWidth
        }
    }

    render() {
        let { children, name, location:{ pathname } } = this.props
        name = name || (JSON.parse(window.localStorage.getItem('userInfo'))||{}).name
        let btn;
        if (ENTRY_PATH[1] === pathname){
            btn = (
                <Button type="text" icon='logout' key="logout" onClick={this.logout}>退出</Button>
            )
        } else {
            btn = (
                <Button type="text" icon='rollback' key="goback" onClick={this.goback}>返回</Button>
            )
        }
        return (
            <ContainerQuery query={query}>
                {params=>(
                    // react上下文
                    <Context.Provider value={this.getContext(params)}>
                        <Layout className={classNames(styles.basicLayout,params)}>
                            <Header className={styles.basicLayoutHead}>
                                <span>
                                    欢迎您，{ React.$tools.noPassByName(name) }
                                </span>
                                <span>
                                    { btn }
                                </span>
                            </Header>
                            <Content className={styles.basicLayoutContent}>
                                <Content className={styles.basicLayoutContentInner}>
                                    { children }
                                </Content>
                            </Content>
                            <GlobalFooter {...this.props}></GlobalFooter>
                        </Layout>
                    </Context.Provider>)
                }
            </ContainerQuery>
        );
    }
}

function mapStateToProps({ global, matters }){
    return {
        ...global,
        ...matters
    }
}

export default connect(mapStateToProps)(props =>
    // 媒体查询 小于1280px 判断为mobile
    <Media query="(max-width: 1279px)">
        {isMobile => <PlatForm {...props} isMobile={isMobile} />}
    </Media>
);