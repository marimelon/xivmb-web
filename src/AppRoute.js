import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoadingOverlay from 'react-loading-overlay';

import Auth from './Auth';

const SignIn = lazy(() => import('./Signin'));
const App = lazy(() => import('./App'));

class AppRoute extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<LoadingOverlay active={true} spinner text='Loading...'/>}>
                    <Switch>
                        <Route path='/signin' component={SignIn} />
                        <Auth>
                            <Switch>
                                <Redirect exact from='/' to='/2' />
                                <Route path='/:itemid(\d+)' component={App} />
                            </Switch>
                        </Auth>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
export default AppRoute;