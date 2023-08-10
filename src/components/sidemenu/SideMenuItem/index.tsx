import { CSSProperties } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { Item } from '@/types/item'

import { ItemIcon } from '../../common/ItemIcon/ItemIcon'
import cssStyle from './SidebarItem.module.scss'

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
