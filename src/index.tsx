import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppRoute from './AppRoute';
import * as serviceWorker from './serviceWorker';

import './css/tabulator.css';
import './css/my_tabulator.css';

import 'moment/locale/ja'
import moment from 'moment'
moment.locale('ja');

ReactDOM.render(<AppRoute />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
