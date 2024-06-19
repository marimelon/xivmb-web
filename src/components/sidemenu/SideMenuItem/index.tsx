import { CSSProperties, ReactNode } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { Item } from '@/types/item'

import { ItemIcon } from '../../common/ItemIcon/ItemIcon'
import cssStyle from './SidebarItem.module.scss'
import { Route } from '../../../routes/$itemId'

type SideMenuItemProps = {
  item: Item
  style?: CSSProperties
  children?: ReactNode
}

export const SideMenuItem = ({ item, style, children }: SideMenuItemProps) => {
  const params = Route.useParams()
  const search = Route.useSearch()
  const active = item.id === Number(params.itemId)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ to: '/$itemId', params: { itemId: String(item.id) }, search: { dc: search.dc}})
  }

  return (
    <div
      className={`${cssStyle.SidebarItem} ${active ? cssStyle.active : ''}`}
      style={style}
      onClick={handleClick}
    >
      <ItemIcon className={`${cssStyle.icon}`} item={item} />
      {item.name}
      {children}
    </div>
  )
}
