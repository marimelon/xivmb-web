import { Item } from '@/types/item'
import { CSSProperties } from 'react'
import cssStyle from './SidebarItem.module.scss'
import { ItemIcon } from '../../common/ItemIcon/ItemIcon'
import { useNavigate } from '@tanstack/react-router'

type SideMenuItemProps = {
  item: Item
  style?: CSSProperties
}

export const SideMenuItem = ({ item, style }: SideMenuItemProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate({ to: '/$itemId', params: { itemId: item.id } })
  }

  return (
    <div className={cssStyle.SidebarItem} style={style} onClick={handleClick}>
      <ItemIcon className={`${cssStyle.icon}`} item={item} />
      {item.name}
    </div>
  )
}
