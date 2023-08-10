import { Box, Typography } from '@mui/material'
import { ItemSearch } from '../ItemSearch'
import { ItemListKind, SideMenuTab } from '../SideMenuTab'
import { useState } from 'react'
import { FavoriteList } from '../FavoriteList'
import { HistoryList } from '../HistoryList'
import { FavoriteProvider } from '../../../client/firebase/favorite'

export const SideMenu = () => {
  const [tabType, setTabType] = useState<ItemListKind>('favorite')

  return (
    <Box sx={{ mt: '8px' }}>
      <FavoriteProvider>
        <Typography
          variant="h5"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          FFXIVMarketBord
        </Typography>
        <ItemSearch />
        <SideMenuTab selected={tabType} onChange={setTabType} />
        {tabType === 'favorite' && <FavoriteList />}
        {tabType === 'history' && <HistoryList />}
      </FavoriteProvider>
    </Box>
  )
}
