import { Router, Route, RootRoute } from '@tanstack/react-router'

import { App } from './App.tsx'
import { isXIVDataCenter } from './client/xiv/world.ts'
import './index.css'
import { LoginPage } from './login/index.tsx'
import { MainPage } from './main/index.tsx'
import { XIVDataCenter } from './types/world.ts'

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

type MainPageSearch = {
  dc: XIVDataCenter
}

export const itemRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$itemId',
  component: MainPage,
  validateSearch: (search: Record<string, unknown>): MainPageSearch => {
    const dcParam = search.dc as string
    const dc: XIVDataCenter = isXIVDataCenter(dcParam) ? dcParam : 'Elemental'
    return {
      dc: dc,
    }
  },
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, itemRoute])

// Create the router using your route tree
export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
