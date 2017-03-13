/**
 * @file tooltip Component
 * 配置params: body[要显示的文字] spacing[间距 默认 0] trigger: [触发事件 默认 hover]
 * @description RT
 * @author liangdong06
 */

'use strict';

import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import domHelper, {query} from 'dom-helpers';

import './tootips.less';

export default class Tooltips extends React.Component {

    static defaultProps = {
        trigger: 'hover',
        placement: 'bottom',
        timeout: 300,
        className: '',
        spacing: 3
    }

    constructor(props) {
        super(props);
        this.container = null;
    }

    componentWillUnmount() {
        this.removeFromBody();
    }
    insertContainer() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.overlay,
            this.container
        );
    }

    appendToBody() {
        if (!this.container && this.props.body !== undefined) {
            this.timer = setTimeout(() => {
                this.container = document.createElement('div');
                document.body.appendChild(this.container);
                this.insertContainer();
            }, this.props.timeout);
        }
    }

    removeFromBody() {
        clearTimeout(this.timer);
        this.timer = null;
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    onMouseEnter(e) {
        if (!this.timer && !this.container) {
            this.appendToBody();
        }
    }

    onMouseMove(e) {
        if (!this.timer && !this.container) {
            this.appendToBody();
        }
    }

    onMouseLeave(e) {
        this.removeFromBody();
    }
    generateProps() {
        switch (this.props.trigger) {
            case 'hover':
                return {
                    onMouseEnter: this.onMouseEnter.bind(this),
                    onMouseMove: this.onMouseMove.bind(this),
                    onMouseLeave: this.onMouseLeave.bind(this)
                };
            default:
                // statements_def
                break;
        }
    }
    render() {
        const triggerProps = this.generateProps();

        this.overlay = <Position
            target={this}
            container={this.container}
            {...this.props}
        >{this.props.body}</Position>;

        return cloneElement(this.props.children, triggerProps);
    }
}

class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                left: 0,
                top: 0
            }
        };
    }

    componentDidMount() {
        this.updatePosition();
    }

    updatePosition() {
        // console.log(this.caculatePosition())
        this.setState({
            position: this.caculatePosition()
        });
    }

    caculatePosition() {
        const {target, placement, spacing} = this.props;
        const $target = ReactDOM.findDOMNode(target);
        const $tooltip = ReactDOM.findDOMNode(this);
        const targetBox = query.offset($target);
        const tooltipBox = query.offset($tooltip);
        let pos = {
            tooltipW: tooltipBox.width,
            tooltipH: tooltipBox.height
        };
        switch (placement) {
            // case 'right':
            //     Object.assign(pos, {
            //         positionLeft: targetBox.left + targetBox.width,
            //         positionTop: targetBox.top
            //     });
            //     break;
            // case 'left':
            //     Object.assign(pos, {
            //         left: targetBox.left + spacing,
            //         top: targetBox.top - tooltipBox.height
            //     });
            //     break;
            // case 'top':
            //     Object.assign(pos, {
            //         left: targetBox.left + (targetBox.width - tooltipBox.width) / 2,
            //         top: targetBox.top - tooltipBox.height
            //     });
            //     break;
            case 'bottom':
                Object.assign(pos, {
                    left: targetBox.left,
                    top: targetBox.top + targetBox.height + spacing
                });
                break;
            case 'bottom right':
                Object.assign(pos, {
                    left: targetBox.left + targetBox.width - tooltipBox.width,
                    top: targetBox.top + targetBox.height + spacing
                });
                break;
            default:
                // statements_def
                break;
        }
        return pos;
    }

    render() {

        const styles = {
            left: this.state.position.left,
            top: this.state.position.top
        };
        const className = 'tooltip ' + this.props.className;

        return <div className={className} style={styles}>
            {this.props.children}
        </div>;
    }

}
