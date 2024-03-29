import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { Drawer } from '@mui/material'
import { useNavigate, useSearch, useParams } from '@tanstack/react-router'

import { MainView } from '@/components/main/MainView/MainView'
import { Item } from '@/types/item'

import { get_iteminfo } from '../client/api/get_iteminfo'
import { UserProvider } from '../client/firebase/firebase'
import { SideMenu } from '../components/sidemenu/SideMenu'
import { itemRoute } from '../router'
import { PageHeader } from './PageHeader'

export const MainPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const params = useParams({ from: itemRoute.id })
  const drawerWidth = 297
  const { dc } = useSearch({ from: itemRoute.id })
  const [item, setItem] = useState<Item>()
  useEffect(() => {
    const itemid = Number(params.itemId)
    if (isNaN(itemid)) {
      navigate({ to: '/$itemId', params: { itemId: '2' } })
      return
    }
    get_iteminfo(itemid).then(item => {
      setItem(item)
    })
  }, [params, navigate])

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <UserProvider>
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
            justifyContent: 'center',
          }}
        >
          <Drawer
            variant="temporary"
            open={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false)
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundImage: 'initial',
              },
            }}
          >
            <SideMenu />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                left: 'initial',
              },
            }}
            open
          >
            <SideMenu />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <PageHeader dc={dc} onClickMenu={() => setIsDrawerOpen(true)} />
          {item && <MainView item={item} dc={dc} />}
        </Box>
      </UserProvider>
    </div>
  )
}
