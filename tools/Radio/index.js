/**
 * @file Radio Component
 * @description 类radio组件
 * @author liangdong06
 */

'use strict';

import React from 'react';
import './styles.less';

export default class Text extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedIndex: this.findDefault(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        this.state.checkedIndex = this.findDefault(nextProps);
    }
    findDefault(props) {
        const {defaultValue, radioList} = props;
        let idx = -1;
        if (defaultValue) {
            for (let i = radioList.length - 1; i >= 0; i--) {
                if (radioList[i].value === defaultValue) {
                    idx = i;
                    break;
                }
            }
        }
        return idx;
    }
    changeHandle(item, idx) {
        this.setState({
            checkedIndex: idx
        });
        if (this.props.trigger) {
            this.props.trigger(item, idx);
        }
    }

    render() {
        // const {desc, } =  this.props;

        return (
            <div className='erp-radio-wrap'>
                {
                    this.props.radioList.map((item, idx) => {
                        return (
                            <label key={item.value} onClick={this.changeHandle.bind(this, item, idx)}>
                                <span className='radio' >
                                    {
                                        this.state.checkedIndex === idx
                                        ? (<span className='radio-inner' ></span>) : null
                                    }
                                </span>
                                <span className='desc'>{item.desc}</span>
                            </label>
                        );
                    })
                }
            </div>
        );
    }
}
