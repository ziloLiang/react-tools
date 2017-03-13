/**
 * @file Popup
 * @author liangdong06
 */

'use strict';

import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import domHelper, {query} from 'dom-helpers';

import './Popup.less';

export default class Popup extends React.Component {

    static defaultProps = {
        placement: 'top',
        trigger: 'click',
        spacing: 5,
        className: '',
        triggle: true,
        insertBody: false
    }

    constructor(props, context) {
        super(props);
        if (!this.props.target) {
            throw 'You may forget to add a target';
        }
        this.container = null;
        this.state = {
            isShow: props.show
        };
    }

    componentWillReceiveProps(props) {
        if (props.show) {
            this.popupShow();
        }
        else {
            this.clearPopup();
        }
    }

    popupShow() {
        if (!this.props.insertBody) {
            this.setState({
                isShow: true
            });
        }
        else if (!this.container) {
            this.appendToBody();
        }
        if (!this.mountClick) {
            this.mountClick = this.autoClose.bind(this);
            document.addEventListener('click', this.mountClick, false);
        }
    }

    /**
     * 插入body
     */
    appendToBody() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.generateChild(),
            this.container
        );
    }

    /**
     * 点击屏幕关闭popup
     * @param {Object} e event
     */
    autoClose(e) {
        const self = ReactDOM.findDOMNode(this);
        if ((this.container && !query.contains(this.container, e.target))
            || (self && !query.contains(self, e.target))) {
            this.close();
        }
    }

    /**
     * 生成子节点
     * @return {jsx} 子节点
     */
    generateChild() {
        const triggerProp = {
            close: this.close.bind(this)
        };
        const child = cloneElement(this.props.children, triggerProp);
        return (<PopupInner {...this.props} close={this.close.bind(this)} >
                {child}
        </PopupInner>);
    }

    /**
     * 关闭Popup
     */
    close() {
        this.clearPopup();
        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    /**
     * 清除Popup
     */
    clearPopup() {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        else if (!this.props.insertBody) {
            this.setState({
                isShow: false
            });
        }
        document.removeEventListener('click', this.mountClick);
        this.mountClick = null;
    }
    componentWillUnmount() {
        this.clearPopup();
    }
    render() {
        const {children, ...props} = this.props;

        if (!this.state.isShow) {
            return null;
        }
        const Element = !this.props.insertBody ? this.generateChild() : null;
        return Element;
    }
}

class PopupInner extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            position: {
                positionLeft: 0,
                positionTop: 0
            },
            triggle: {
                placement: 'top',
                positionLeft: 0,
                positionTop: 0
            }
        };
    }
    componentDidMount() {
        this.target = this.getTarget();
        this.container = ReactDOM.findDOMNode(this);
        this.updatePosition();
    }
    componentDidUpdate() {
        // const pos = this.state.position;
        // const container = ReactDOM.findDOMNode(this);
        // const containBox = query.offset(container);
        // if (pos.containerW !== containBox.width
        //     || pos.containerH !== containBox.height) {
        //     // this.updatePosition();
        // }
    }
    getTarget() {
        if (typeof this.props.target === 'function') {
            return this.props.target();
        }
        return this.props.target;
    }
    preventPropagation(e) {
        e.stopPropagation();
    }
    updatePosition() {

        const targetBox = this.props.insertBody
                        ? query.offset(this.target) : query.position(this.target);
        console.log(query.offset(this.target));
        console.log(query.position(this.target));
        const containBox = query.offset(this.container);
        const triggleBox = {
            width: 16,
            height: 16
        };
        let pos = {
            containerW: containBox.width,
            containerH: containBox.height
        };
        let triggle = {};
        // 上部高度
        const top = targetBox.top - containBox.height - triggleBox.height / 2 - this.props.spacing;
        const bottom = targetBox.top + targetBox.height + triggleBox.height / 2 + this.props.spacing;
        switch (this.props.placement) {
            case 'right':
                Object.assign(pos, {
                    positionLeft: targetBox.left + targetBox.width,
                    positionTop: targetBox.top
                });
                break;
            case 'top':
                Object.assign(pos, {
                    positionLeft: targetBox.left,
                    positionTop: top
                });
                triggle = {
                    placement: 'top',
                    positionLeft: (targetBox.width - triggleBox.width) / 2,
                    positionTop: containBox.height - 1
                };
                break;
            case 'right top':
                Object.assign(pos, {
                    positionLeft: targetBox.left - containBox.width + targetBox.width,
                    positionTop: top
                });
                triggle = {
                    placement: 'top',
                    positionLeft: containBox.width - (targetBox.width + triggleBox.width) / 2,
                    positionTop: containBox.height - 1
                };
                break;
            case 'bottom left':
                Object.assign(pos, {
                    positionLeft: targetBox.left,
                    positionTop: bottom
                });
                triggle = {
                    placement: 'bottom',
                    positionLeft: (targetBox.width + triggleBox.width) / 2,
                    positionTop: - triggleBox.height + 1
                };
            default:
                // statements_def
                break;
        }
        this.setState({
            position: pos,
            triggle: triggle
        });
    }
    render() {
        const className = 'popup ' + this.props.className;
        const triggleClass = 'triggle ' + this.state.triggle.placement;
        const style = {
            left: this.state.position.positionLeft,
            top: this.state.position.positionTop
        };
        const triggleStyle = {
            left: this.state.triggle.positionLeft,
            top: this.state.triggle.positionTop
        };
        const child = React.cloneElement(this.props.children, {
        });
        return (
            <div id='popup' className={className} style={style} onClick={this.preventPropagation.bind(this)}>
                {
                    this.props.triggle
                        ? <span className={triggleClass} style={triggleStyle}>
                            <i className='tri triggle-outer'>
                            </i>
                            <i className='tri triggle-inner'></i>
                        </span>
                        : null
                }
                {child}
            </div>
        );
    }
}
