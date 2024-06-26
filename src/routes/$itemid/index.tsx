import { Suspense, use, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ResizableItem, Center, VStack, HStack, Box } from '@yamada-ui/react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import { itemInfoQueryOptions } from '../../api/fetchItembyId'
import { HistoryContext } from '../../api/firebaseHooks'
import { HistoryTableContainer } from '../../components/HistoryTable'
import { ItemHeader } from '../../components/ItemHeader'
import { MarketContianer } from '../../components/MarketTable'
import { NavigateHeader } from '../../components/NavigateHeader'
import { WorldSelector } from '../../components/WorldSelector'

export const Route = createFileRoute('/$itemid/')({
  component: Index,
})

function Index() {
  const { itemid } = Route.useParams()
  const { dc } = Route.useSearch()

  const { data: item, error } = useQuery({
    ...itemInfoQueryOptions(Number(itemid)),
    initialData: { id: Number(itemid), name: '' },
  })

  const { add: addViewHistory } = use(HistoryContext)
  useEffect(() => {
    if (item.name !== '') {
      addViewHistory(item.id)
    }
  }, [addViewHistory, item])

  if (error) {
    return <ResizableItem>{error.message}</ResizableItem>
  }

  return (
    <ResizableItem as={Center} paddingX={4} paddingBottom={4}>
      <VStack height="100%">
        <NavigateHeader />
        <ItemHeader item={item} />

        <WorldSelector dc={dc}>
          {filter => (
            <HStack flexGrow={1} overflow={'auto'} width="100%" gap={0}>
              <Box height="100%" minWidth={700}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<Box>Loading...</Box>}>
                    <MarketContianer
                      key={`${item.id}${dc}${filter}`}
                      itemid={item.id}
                      dc={dc}
                      filter={filter}
                    />
                  </Suspense>
                </ErrorBoundary>
              </Box>
              <Box height="100%" minWidth={460}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<Box>Loading...</Box>}>
                    <HistoryTableContainer
                      key={`${item.id}${dc}${filter}`}
                      itemid={item.id}
                      dc={dc}
                      filter={filter}
                    />
                  </Suspense>
                </ErrorBoundary>
              </Box>
            </HStack>
          )}
        </WorldSelector>
      </VStack>
    </ResizableItem>
  )
}

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <Box>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </Box>
  )
}
