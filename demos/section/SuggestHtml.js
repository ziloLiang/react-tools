'use strict';

import React from 'react';
import Container from '../component/Container';
import Suggest from '../../tools/Suggest';
import Highlight from 'react-highlight';
import xhr from '../utils/xhr';

export default class TooltipsHtml extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const config = {
            name: 'Suggest',
            desc: 'Suggest组件',
            options: [
                {key: 'handleChange', type: 'Function', default: '', required: 'Y', desc: 'suggest 输入框change时的回调函数 带一个默认参数 value(单签输入框的值) '},
                {key: 'disKey', type: 'string', default: 'name', desc: 'suggest返回的列表需要显示的值的key'},
                {key: 'placeholder', type: 'string', default: '', desc: 'placeholder'},
                {key: 'coverLabel', type: 'boolean', default: 'true', desc: '选中列表中某一对象后的状态，默认为标签覆盖suggest'},
                {key: 'labelKey', type: 'string', default: '同disKey', desc: '选中后显示值的key'},
                {key: 'removeLabel', type: 'Function', default: '', desc: '移出选中回调函数'},
                {key: 'defaultValue', type: 'string', default: '\'\'', desc: '默认选中显示值'},
                {key: 'wait', type: 'number', default: '300', desc: '防止频繁发送请求去抖延迟时间'},
                {key: 'trigger', type: 'Function', default: '', desc: '选中回调'}
            ],
        }
        const suggest = {
            handleChange: (value) => {
                return xhr('GET', '/datas/suggest.json')
                    .then((res) => {
                        return res.list;
                    });
            },
            trigger: (item) => {
                alert('I select email ' + item.email);
            }
        }
        return (
            <Container config={config}>
                <div className='example clearfix'>
                    <div className='fl' >
                        <Suggest {...suggest} />
                    </div>
                </div>
                <div className='code'>
                    <Highlight className='javascript' >
{`json:
{
    "list": [
        {"value": "A", "name": "suggest A", "email": "A@gmail.com"},
        {"value": "B", "name": "suggest B", "email": "B@gmail.com"},
        {"value": "C", "name": "suggest C", "email": "C@gmail.com"}
    ]
}

const suggest = {
    handleChange: (value) => {
        return xhr('GET', '/datas/suggest.json')
            .then((res) => {
                return res.list;
            });
    },
    trigger: (item) => {
        alert('I select email ' + item.email);
    }
}`}
                    </Highlight>
                    <Highlight className='html' >
{`<Suggest {...suggest} />`}
                    </Highlight>
                </div>
            </Container>
        )
    }
}
