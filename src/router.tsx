import { App } from './App.tsx'
import './index.css'
import { Router, Route, RootRoute } from '@tanstack/react-router'
import { LoginPage } from './login/index.tsx'
import { MainPage } from './main/index.tsx'

const rootRoute = new RootRoute({})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

export const itemRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$itemId',
  component: MainPage,
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, itemRoute])

// Create the router using your route tree
export const router = new Router({ routeTree })
