'use strict';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import TooltipsHtml from './section/TooltipsHtml';
import RadioHtml from './section/RadioHtml';
import SuggestHtml from './section/SuggestHtml';
import PopupHtml from './section/PopupHtml';

import './styles/base.less';

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='root' >
                <TooltipsHtml ></TooltipsHtml>
                <RadioHtml ></RadioHtml>
                <SuggestHtml ></SuggestHtml>
                <PopupHtml ></PopupHtml>
            </div>
        )
    }
}

render(
    <App />, document.getElementById('root')
);
