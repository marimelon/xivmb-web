import { createFileRoute } from '@tanstack/react-router'

import { FavoriteLIst } from '../../components/FavoriteList'
import { Item } from '../../types/item'

export const Route = createFileRoute('/components/_sidebar')({
  component: Index,
})

function Index() {
  const items: Item[] = [...Array(10).keys()].map((i) => ({
    id: i,
    name: `アイテム${i}`,
    lodestoneId: 'xxx',
  }))

  return (
    <div style={{ width: '350px', margin: 'auto' }}>
      <FavoriteLIst items={items} />
    </div>
  )
}
