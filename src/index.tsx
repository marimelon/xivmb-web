import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// @ts-expect-error ts-migrate(6142) FIXME: Module './AppRoute' was resolved to '/root/XIVMB_W... Remove this comment to see the full error message
import AppRoute from './AppRoute';
import * as serviceWorker from './serviceWorker';

import 'moment/locale/ja'
import moment from 'moment'
moment.locale('ja');

// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
ReactDOM.render(<AppRoute />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
