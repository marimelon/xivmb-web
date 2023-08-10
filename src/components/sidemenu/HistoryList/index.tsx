import { SideMenuItem } from '../SideMenuItem'
import { useViewHistory } from '../../../client/firebase/history'

export const HistoryList = () => {
  const { items } = useViewHistory()
  return (
    <div>
      {items.map(item => {
        return (
          <SideMenuItem
            key={item}
            item={{ id: item, name: 'アイテム' + item }}
          />
        )
      })}
    </div>
  )
}
