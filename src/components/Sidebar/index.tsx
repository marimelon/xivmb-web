import { Suspense, use, useRef, useState } from 'react'

import { Tab, TabPanel, TabPanels, Tabs, VStack } from '@yamada-ui/react'

import { FavoriteContext, HistoryContext } from '../../api/firebaseHooks'
import { FavoriteLIst } from '../FavoriteList'
import { HistoryList } from '../HistoryList'
import { ItemSearchInput, ItemSearchResult } from '../ItemSearch'

type Props = {}

export const Sidebar = ({}: Props) => {
  const { items: favoriteItems } = use(FavoriteContext)
  const { items: historyItems } = use(HistoryContext)
  const [query, setQuery] = useState<string>('')
  const [tabIndex, setTabIndex] = useState<number>(0)

  const tabPanelsRef = useRef<HTMLDivElement>(null)

  return (
    <VStack height="100%">
      <ItemSearchInput
        query={query}
        onChange={(value) => {
          setQuery(value)
          if (value !== '') {
            setTabIndex(2)
          } else {
            setTabIndex(0)
          }
        }}
      />
      <Tabs
        align="center"
        overflow="hidden"
        flexGrow={1}
        paddingBottom={4}
        index={tabIndex}
        onChange={setTabIndex}
        lazyBehavior="unmount"
      >
        <Tab>Favorite</Tab>
        <Tab>History</Tab>
        {query !== '' && <Tab>Search</Tab>}

        <TabPanels ref={tabPanelsRef} overflow="scroll" flexGrow={1}>
          <TabPanel>
            <FavoriteLIst items={favoriteItems} />
          </TabPanel>
          <TabPanel>
            <HistoryList
              items={historyItems}
              parentElment={tabPanelsRef.current!}
            />
          </TabPanel>
          <TabPanel>
            <Suspense fallback={<div>Loading...</div>}>
              <ItemSearchResult
                query={query}
                parentElment={tabPanelsRef.current!}
              />
            </Suspense>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}
