import React from 'react'
import { Menu, } from 'antd'
import Context from '@/layouts/Context'
import styles from './index.less'

class Menus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // 上下文
    // static contextType = Context

    componentDidMount () {

    }

    renderMenu = () => {
        const { count, active, mattersType, onSelect } = this.props
        const menuItems = mattersType.map((item, index) => {
            const menuItem = (
                <Menu.Item key={item.count}>
                    { item.icon}
                    <span>{item.name}</span>
                </Menu.Item>
            )

            return menuItem
        })

        const menu = (
            <Menu
                defaultSelectedKeys={[active || count]}
                mode="inline"
                className={styles.sideMenu}
                onSelect={({ key }) => onSelect(key)}
            >
                { menuItems}
            </Menu>
        )

        return menu
    }

    render () {

        const Menu = this.renderMenu()

        return Menu
    }
}

Menus.contextType = Context
export default Menus