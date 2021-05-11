import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Auth from './Auth'
import LoadingPage from './Common/LoadingPage'


const SignIn = lazy(() => import('./Signin'))
const App = lazy(() => import('./App'))

const Page404 = () => <div>Page Not Found.</div>

class AppRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Redirect exact from="/" to="/2" />
            <Redirect exact from="/view" to="/view/2" />
            <Route path="/signin" component={SignIn} />
            <Route path="/:itemid(\d+)">
              <Auth>
                <Route path="/:itemid(\d+)" component={App} />
              </Auth>
            </Route>
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}
export default AppRoute
