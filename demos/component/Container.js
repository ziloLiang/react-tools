'use strict';

import React from 'react';

export default class Container extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const config = this.props.config;
        return (
            <div className='container' >
                <h1>{config.name}</h1>
                <div className='box'>
                    <h2># 说明 (Description)：</h2>
                    <p className='desc' >{config.desc}</p>
                </div>
                <div className='box'>
                    <h2># 配置项 (Options)：</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>属性（key）</th>
                                <th>类型（type）</th>
                                <th>默认值（default）</th>
                                <th>必需（required）</th>
                                <th>说明（desc）</th>
                            </tr>
                        </thead>
                        <tbody>
                            {config.options.map((item, idx) => {
                                return <tr key={idx}>
                                    <td>{item.key}</td>
                                    <td>{item.type}</td>
                                    <td>{item.default}</td>
                                    <td>{item.required}</td>
                                    <td>{item.desc}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='box'>
                    <h2># 实例 (Examples)：</h2>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
