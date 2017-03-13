'use strict';

import React from 'react';
import Container from '../component/Container';
import Radio from '../../tools/Radio';
import Highlight from 'react-highlight';

export default class TooltipsHtml extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const config = {
            name: 'Radio',
            desc: 'Radio组件',
            options: [
                {key: 'radioList', type: 'Array', default: '[]', required: 'Y', desc: 'radio 对象数组 格式约定为[{value: radio的value, desc: radio的描述, ...other}]'},
                {key: 'defaultValue', type: '和radioList中value的type相同', default: '', desc: 'radio默认选中值 defaultValue === value'},
                {key: 'trigger', type: 'function', default: '', desc: '选中回调'}
            ],
        }
        const radio = {
            radioList: [
                {value: 'A', desc: 'radio A'},
                {value: 'B', desc: 'radio B'},
                {value: 'C', desc: 'radio C'}
            ],
            trigger: (item, idx) => {
                alert('I selected ' + item.desc);
            },
            defaultValue: 'B'
        }
        return (
            <Container config={config}>
                <div className='example clearfix'>
                    <div className='fl' >
                        <Radio {...radio} />
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
