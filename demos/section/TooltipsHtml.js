'use strict';

import React from 'react';
import Container from '../component/Container';
import Tooltips from '../../tools/Tooltips';
import Highlight from 'react-highlight';

export default class TooltipsHtml extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const config = {
            name: 'Tooltips',
            desc: 'tooltips组件',
            options: [
                {key: 'body', type: 'string', default: '', required: 'Y', desc: '要显示的提示'},
                {key: 'placement', type: 'string', default: 'bottom', desc: 'tooltips出现的位置 可选值：(\'bottom\' 和 \'bottom right\')'},
                {key: 'className', type: 'string', default: '', desc: '自定义类名'},
                {key: 'timeout', type: 'number', default: 300, desc: 'tooltip出现的延迟时间'},
                {key: 'spacing', type: 'number', default: 3, desc: 'tooltip距离目标dom的间隔'}
            ],
        }
        const styles = {
            display: 'inline-block',
            width: '200px'
        }
        const text = '明月几时有？把酒问青天。不知天上宫阙、今夕是何年？我欲乘风归去，惟恐琼楼玉宇，高处不胜寒．起舞弄清影，何似在人间？  转朱阁，低绮户，照无眠。不应有恨、何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共蝉娟。';
        return (
            <Container config={config}>
                <div className='example clearfix'>
                    <div className='fl' >
                        <label className='example-label ver-middle' >bottom:</label>
                        <Tooltips body={text}>
                            <div className='ellipsis ver-middle' style={styles} >{text}</div>
                        </Tooltips>
                    </div>
                    <div className='fl' >
                        <label className='example-label ver-middle' >bottom right: </label>
                        <Tooltips body={text} placement='bottom right'>
                            <div className='ellipsis ver-middle' style={styles} >{text}</div>
                        </Tooltips>
                    </div>
                </div>
                <div className='code'>

                    <Highlight className='javascript' >
{`const text = '明月几时有？把酒问青天。不知天上宫阙、今夕是何年？我欲乘风归去，惟恐琼楼玉宇，高处不胜寒．起舞弄清影，何似在人间？  转朱阁，低绮户，照无眠。不应有恨、何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共蝉娟。'`}
                    </Highlight>
                    <Highlight className='html' >
{`<Tooltips body={text}>
    <div className='ellipsis' style={styles} >{text}</div>
</Tooltips>`}
                    </Highlight>
                </div>
            </Container>
        )
    }
}
