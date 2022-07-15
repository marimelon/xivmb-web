import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Auth from './Auth'
import firebase from './Common/firebase'
import LoadingPage from './Common/LoadingPage'

const SignIn = lazy(() => import('./Signin'))
const App = lazy(() => import('./App'))

const Page404 = () => <div>Page Not Found.</div>
const Redirect2LastItemPage = () => {
  const [goto, setGoto] = useState<number>()

  console.log('Page1')

  useEffect(() => {
    var unsubscribe: (() => void) | undefined = undefined

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        unsubscribe = firebase
          .firestore()
          .collection('user_histories')
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              const items = doc.get('history') as number[]
              console.log(items)
              if (items.length > 0) {
                setGoto(items[items.length - 1])
                return
              }
            }
            setGoto(2)
          })
      }
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  if (!goto) {
    return <LoadingPage />
  }

  return <Redirect to={`/${goto}`} />
}

export const AppRoute = ()=>{
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Redirect exact from="/view" to="/view/2" />
          <Route path="/signin" component={SignIn} />
          <Auth>
            <Route exact path="/" component={Redirect2LastItemPage} />
            <Route path="/:itemid(\d+)" component={App} />
          </Auth>
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
