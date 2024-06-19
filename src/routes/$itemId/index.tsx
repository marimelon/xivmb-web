import { createFileRoute } from '@tanstack/react-router'

import { isXIVDataCenter } from '../../client/xiv/world'
import { MainPage } from '../../main/index'
import { XIVDataCenter } from '../../types/world'

type MainPageSearch = {
  dc: XIVDataCenter
}

export const Route = createFileRoute('/$itemId/')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): MainPageSearch => {
    const dcStr = search.dc as string
    const dc: XIVDataCenter = isXIVDataCenter(dcStr) ? dcStr : 'Elemental'

    return {
      dc: dc,
    }
  },
})

function Index() {
  const { itemId } = Route.useParams()
  const { dc } = Route.useSearch()

  return <MainPage itemid={Number(itemId)} dc={dc} />
}
