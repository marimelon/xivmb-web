import React, { useEffect, useState } from 'react'
import ItemIcon from '../Common/ItemIcon'
import cssStyle from './SidebarItem.module.scss'
import { get_iteminfo } from '../Api/iteminfo'

type DivProps = JSX.IntrinsicElements['div']
export type SidebarItemProps = Omit<DivProps, 'onClick'> & {
  itemid: number
  name?: string
  isActive?: boolean
  className?: string
  iconStyle?: string
  nameStyle?: string
  onClick: (itemid: number, itemname: string) => void
}

export const SidebarItem = ({
  children,
  itemid,
  name,
  isActive,
  className,
  iconStyle,
  nameStyle,
  onClick,
  ...props
}: SidebarItemProps) => {
  const [_name, setName] = useState(name ?? '')
  useEffect(() => {
    if (name === undefined) {
      get_iteminfo(itemid).then(item => {
        setName(item.name)
      })
    }
  }, [itemid, name])

  return (
    <div
      className={`${cssStyle.SidebarItem} ${className} ${
        isActive ? cssStyle.active : ''
      }`}
      onClick={() => {
        onClick(itemid, _name)
      }}
      {...props}>
      <ItemIcon className={`${cssStyle.icon} ${iconStyle}`} itemid={itemid} />
      <div className={`${cssStyle.name} ${nameStyle}`}>{_name}</div>
      {children}
    </div>
  )
}

SidebarItem.defaultProps = {
  isActive: false,
  className: '',
  iconStyle: '',
  nameStyle: '',
  onClick: () => {},
}
