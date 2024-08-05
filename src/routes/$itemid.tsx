import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import {
  Center,
  Resizable,
  ResizableItem,
  ResizableTrigger,
} from '@yamada-ui/react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import { get_user } from '../api/firebase'
import { FirebaseProvider } from '../api/firebaseHooks'
import { Sidebar } from '../components/Sidebar'
import { XIVDataCenter, isXIVDataCenter } from '../types/world'

type Search = {
  dc: XIVDataCenter
  hq?: boolean
}

export const Route = createFileRoute('/$itemid')({
  beforeLoad: async () => {
    if (!(await get_user())) {
      throw redirect({ to: '/login' })
    }
  },
  validateSearch: (search: Record<string, unknown>): Search => {
    const dcStr = search.dc as string
    const dc: XIVDataCenter = isXIVDataCenter(dcStr) ? dcStr : 'Elemental'

    return {
      dc: dc,
    }
  },
  loaderDeps: ({ search: { dc } }) => ({ dc }),
  loader: ({ params, deps: { dc } }) => {
    if (!Number.isInteger(Number(params.itemid))) {
      throw redirect({
        to: '/$itemid',
        params: { itemid: '2' },
        search: { dc },
      })
    }
  },
  component: Index,
})

function Index() {
  return (
    <FirebaseProvider>
      <div style={{ height: '100vh' }}>
        <Resizable h="md" rounded="md" borderWidth="1px" height="100vh">
          <ResizableItem as={Center} defaultSize={20}>
            <Sidebar />
          </ResizableItem>
          <ResizableTrigger />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Resizable>
      </div>
    </FirebaseProvider>
  )
}

function ErrorFallback({ error }: FallbackProps) {
  return (
    <ResizableItem>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </ResizableItem>
  )
}
