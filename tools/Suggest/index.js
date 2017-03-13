/**
 * @file suggest
 * @description RT
 * @author liangdong06
 */

const React = require('react');
const searchIcon = require('./search.png');
const refreshIcon = require('./refresh.png');
require('./Suggest.less');

let timer = null;

const Suggest = React.createClass({
    getInitialState() {
        return {
            list: [],
            inputValue: '',
            label: this.props.defaultValue || ''
        };
    },
    getDefaultProps() {
        return {
            disKey: 'name',
            coverLabel: true
        };
    },
    componentWillReceiveProps(props) {
        this.setState({
            inputValue: '',
            label: props.defaultValue || ''
        });
    },
    handleClick(item) {
        const {labelKey, disKey, coverLabel, trigger, param} = this.props;
        const lKey = labelKey || disKey;

        this.setState({
            label: item[lKey],
            // inputValue: !coverLabel ? item[lKey] : '',
            list: []
        });

        if (trigger) {
            // let param = param || {};
            this.props.trigger(item, param);
        }
    },
    // 去抖
    debounce(value) {
        let wait = this.props.wait || 300;
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.handleCallback(value);
        }, wait);
    },
    handleChange(e) {
        let value = e.target.value;
        this.setState({
            inputValue: value
        });
        if (!value) {
            this.reset();
            return;
        }
        this.debounce(value);
    },
    handleCallback(value) {
        this.setState({
            loading: true
        });
        let promise = this.props.handleChange(value, this.setList);
        if (promise && typeof promise.then === 'function') {
            promise.then(list => {
                this.setList(list);
            });
        }
    },
    removeLabel() {
        this.setState({
            label: '',
            inputValue: ''
        });
        if (this.props.removeLabel) {
            this.props.removeLabel();
        }
    },
    setList(list) {
        this.setState({
            loading: false,
            list
        });
    },
    stopPropagation(event) {
        event.stopPropagation();
    },
    componentDidMount() {
        window.addEventListener('click', this.reset, false);
    },
    componentWillUnmount() {
        window.removeEventListener('click', this.reset, false);
    },
    reset() {
        this.setState({
            list: []
        });
        clearTimeout(timer);
    },
    render() {
        let hasList = this.state.list.length;
        let wrapClass = 'befe-suggest ' + (hasList ? 'show' : '');
        const {disKey, coverLabel, placeholder, template} = this.props;

        return (
            <div className={wrapClass} onClick={this.stopPropagation} >
                <div className="suggest-outer">
                    {
                        coverLabel && this.state.label
                        ? (<div className="suggest-label" >
                        <span className="suggest-label-text" >{this.state.label}</span>
                        <span onClick={this.removeLabel} className="suggest-icon suggest-close"></span>
                        </div>)
                        : null
                    }
                    <input className="suggest-input"
                        value={this.state.inputValue}
                        type="text" placeholder={placeholder || ''}
                        onChange={this.handleChange} />
                    {
                        this.state.loading ? <span className="suggest-icon refresh fa-spin"></span>
                        : <span className="suggest-icon search"></span>
                    }
                </div>
                {
                    hasList
                    ? <div className="suggest-hidden" >
                        <div className="suggest-inner" >
                            <div className="suggest-list" >
                                {
                                    this.state.list.map((item, i) => {
                                        return template
                                        ? template(item, i, this.handleClick.bind(this, item))
                                        : (<div
                                                className="suggest-li"
                                                key={i}
                                                onClick={this.handleClick.bind(this, item)} >
                                            {item[disKey]}
                                        </div>);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
});


module.exports = Suggest;
