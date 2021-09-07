import React from 'react'
import ItemIcon from '../Common/ItemIcon'
import cssStyle from './SidebarItem.module.scss'

type DivProps = JSX.IntrinsicElements['div']
export type SidebarItemProps = Omit<DivProps, 'onClick'> & {
  itemid: number
  name: string
  isActive?: boolean
  className?: string
  iconStyle?: string
  nameStyle?: string
  onClick: (itemid: number, itemname: string) => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  itemid,
  name,
  isActive,
  className,
  iconStyle,
  nameStyle,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`${cssStyle.SidebarItem} ${className} ${
        isActive ? cssStyle.active : ''
      }`}
      onClick={() => {
        onClick(itemid, name)
      }}
      {...props}>
      <ItemIcon className={`${cssStyle.icon} ${iconStyle}`} itemid={itemid} />
      <div className={`${cssStyle.name} ${nameStyle}`}>{name}</div>
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
