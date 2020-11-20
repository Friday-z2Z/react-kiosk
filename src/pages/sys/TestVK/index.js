import React from 'react'
import { VKB } from '@/components/VK'
import { Input } from 'antd'

class TestVK extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.V = { value: 'hello' }
    }

    componentDidMount () {
        React.$tipModal.setCountDownNum(300000000000000000)
    }

    render () {
        return (
            <Input onClick={(e) => VKB.showKeyboardSetState(this.V, this, e)} value={this.V.value} />
        )
    }
}

export default TestVK