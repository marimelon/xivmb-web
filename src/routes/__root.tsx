import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { extendConfig, getColorModeScript, UIProvider } from '@yamada-ui/react'

const customConfig = extendConfig({
  initialThemeScheme: 'dark',
  initialColorMode: 'dark',
})

const injectColorModeScript = () => {
  const scriptContent = getColorModeScript({
    initialColorMode: customConfig.initialColorMode,
  })

  const script = document.createElement('script')

  script.textContent = scriptContent

  document.head.appendChild(script)
}

injectColorModeScript()

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <UIProvider config={customConfig}>
        <Outlet />
      </UIProvider>
    </>
  ),
})
