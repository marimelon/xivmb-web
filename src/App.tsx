import { Box, Drawer } from '@mui/material'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  writeBatch,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { XIVDataCenter } from './@types/world'
import { firestore, get_user } from './Common/firebase'
import { isXIVDataCenter } from './Common/worlds'
import { MainHeader } from './MainHeader'
import { MainView } from './MainView/MainView'
import { Sidebar } from './Sidebar/Sidebar'
import { get_iteminfo } from './Api/iteminfo'

export type AppLocationState = {
  itemid: number
  dc: XIVDataCenter
}

type iteminfo = {
  id: number
  name: string
}

const App = () => {
  const history = useHistory<AppLocationState>()
  const match = useRouteMatch<{ itemid: string }>()
  const search = useLocation().search
  const dc_query = new URLSearchParams(search).get('dc') ?? ''
  const itemid = Number(match.params.itemid)
  const [state, setState] = useState<AppLocationState>({
    itemid: itemid,
    dc: isXIVDataCenter(dc_query) ? dc_query : 'Elemental',
  })

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<iteminfo>()
  useEffect(() => {
    get_iteminfo(itemid)
      .then(data => {
        setItem(data)
        setLoading(false)
      })
      .catch(e => {
        console.error(e)
      })
  }, [itemid])

  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => {
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_histories', user.uid)
        getDoc(docRef).then(doc => {
          const batch = writeBatch(firestore)

          if (!doc.exists()) {
            batch.set(docRef, {
              history: [],
            })
          }

          batch.update(docRef, {
            history: arrayRemove(itemid),
          })
          batch.update(docRef, {
            history: arrayUnion(itemid),
          })
          batch.commit()
        })
      }
    })
  }, [itemid])

  if (loading) {
    return <div>loading...</div>
  }

  if (item === undefined) {
    return <div>Page Not Found.</div>
  }

  history.listen(location => {
    if (location.state === undefined) {
      setState(prev => ({
        itemid: item.id,
        itemname: item.name,
        dc: prev.dc,
      }))
    } else {
      setState(location.state)
    }
  })

  const changeItem = (itemid: number, itemname: string) => {
    setDrawerOpen(false)
    history.push({
      pathname: `/${itemid}`,
      state: { itemid: itemid, dc: state.dc },
    })
  }

  document.title = item.name

  const drawerWidth = 297

  return (
    <div style={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          justifyContent: 'center',
        }}>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false)
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
          }}>
          <Sidebar changeItem={changeItem} />
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
          open>
          <Sidebar changeItem={changeItem} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}>
        <MainHeader
          currentDC={state.dc}
          onMenuClick={() => setDrawerOpen(true)}
        />
        <MainView itemid={item.id} itemname={item.name} dataCenter={state.dc} />
      </Box>
    </div>
  )
}

export default App
