import React, { Component, lazy, Suspense } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// @ts-expect-error ts-migrate(6142) FIXME: Module './Common/LoadingPage' was resolved to '/ro... Remove this comment to see the full error message
import LoadingPage from './Common/LoadingPage';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Auth' was resolved to '/root/XIVMB_WebFr... Remove this comment to see the full error message
import Auth from './Auth';
// @ts-expect-error ts-migrate(6142) FIXME: Module './DataLoad' was resolved to '/root/XIVMB_W... Remove this comment to see the full error message
import DataLoad from './DataLoad';

// @ts-expect-error ts-migrate(6142) FIXME: Module './Signin' was resolved to '/root/XIVMB_Web... Remove this comment to see the full error message
const SignIn = lazy(() => import('./Signin'));
// @ts-expect-error ts-migrate(6142) FIXME: Module './App' was resolved to '/root/XIVMB_WebFro... Remove this comment to see the full error message
const App = lazy(() => import('./App'));
// @ts-expect-error ts-migrate(6142) FIXME: Module './ViewApp' was resolved to '/root/XIVMB_We... Remove this comment to see the full error message
const ViewApp = lazy(() => import('./ViewApp'));

// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const Page404 = ()=><div>Page Not Found.</div>;

class AppRoute extends Component {
    render() {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <BrowserRouter>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Suspense fallback={<LoadingPage />}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Switch>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Redirect exact from='/' to='/2' />
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Redirect exact from='/view' to='/view/2' />
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path='/signin' component={SignIn} />
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path='/view/:itemid(\d+)'>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <DataLoad>
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <Route path='/view/:itemid(\d+)' component={ViewApp} />
                            </DataLoad>
                        </Route>

                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path='/:itemid(\d+)'>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <Auth>
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <Route path='/:itemid(\d+)' component={App} />
                            </Auth>
                        </Route>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route component={Page404} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
export default AppRoute;