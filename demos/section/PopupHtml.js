'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../component/Container';
import Popup from '../../tools/Popup';
import Highlight from 'react-highlight';

export default class TooltipsHtml extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    render() {

        const config = {
            name: 'Popup',
            desc: 'Popup组件',
            options: [
                {key: 'radioList', type: 'Array', default: '[]', required: 'Y', desc: 'radio 对象数组 格式约定为[{value: radio的value, desc: radio的描述, ...other}]'},
                {key: 'defaultValue', type: '和radioList中value的type相同', default: '', desc: 'radio默认选中值 defaultValue === value'},
                {key: 'trigger', type: 'function', default: '', desc: '选中回调'}
            ],
        }
        return (
            <Container config={config}>
                <div className='example clearfix'>
                    <div className='fl' >
                        <button className='btn blue' ref='btn'
                            onClick={() => {this.setState({show: true})}} >
                            <span>click me</span>
                            <Popup
                                show={this.state.show}
                                onHide={() => {this.setState({show: false})}}
                                target={() => ReactDOM.findDOMNode(this.refs.btn)}>
                                <Inner />
                            </Popup>
                        </button>
                    </div>
                </div>
                <div className='code'>
                    <Highlight className='javascript' >
{`const radio = {
    radioList: [
        {value: 'A', desc: 'radio A'},
        {value: 'B', desc: 'radio B'},
        {value: 'C', desc: 'radio C'}
    ],
    trigger: (item, idx) => {
        alert('I selected ' + item.desc');
    },
    defaultValue: 'B'
}`}
                    </Highlight>
                    <Highlight className='html' >
{`<Radio {...radio} />`}
                    </Highlight>
                </div>
            </Container>
        )
    }
}

class Inner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className=''>
                <a onClick={this.props.close}>close me</a>
            </div>
        )
    }
}
