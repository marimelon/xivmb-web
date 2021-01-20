import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoadingPage from './Common/LoadingPage';
import Auth from './Auth';
import DataLoad from './DataLoad';

const SignIn = lazy(() => import('./Signin'));
const App = lazy(() => import('./App'));
const ViewApp = lazy(() => import('./ViewApp'));

const Page404 = () => <div>Page Not Found.</div>;

class AppRoute extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<LoadingPage />}>
                    <Switch>
                        <Redirect exact from='/' to='/2' />
                        <Redirect exact from='/view' to='/view/2' />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/view/:itemid(\d+)'>
                            <DataLoad>
                                <Route path='/view/:itemid(\d+)' component={ViewApp} />
                            </DataLoad>
                        </Route>

                        <Route path='/:itemid(\d+)'>
                            <Auth>
                                <Route path='/:itemid(\d+)' component={App} />
                            </Auth>
                        </Route>
                        <Route component={Page404} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
export default AppRoute;