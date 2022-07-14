import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import AppRoute from './AppRoute'
import * as serviceWorker from './serviceWorker'

import './css/react-virtualized.css'

import 'moment/locale/ja'
import moment from 'moment'
moment.locale('ja')

// ReactDOM.render(<AppRoute />, document.getElementById('root'))

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AppRoute />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
