import React from 'react'
import cssStyle from './SidebarItem.module.scss'

import ItemIcon from '../Common/ItemIcon'

interface Props {
  itemid: number
  name: string
  isActive?: boolean
  customStyles?: string
  iconStyle?: string
  nameStyle?: string
  onClick: (itemid: number, itemname: string) => void
  style?: React.CSSProperties
}

const SidebarItem: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <div
      className={`${cssStyle.SidebarItem} ${props.customStyles} ${
        props.isActive ? cssStyle.active : ''
      }`}
      onClick={() => {
        props.onClick(props.itemid, props.name)
      }}
      style={style}>
      <ItemIcon
        className={`${cssStyle.icon} ${props.iconStyle}`}
        itemid={props.itemid}
      />
      <div className={`${cssStyle.name} ${props.nameStyle}`}>{props.name}</div>
      {children}
    </div>
  )
}

SidebarItem.defaultProps = {
  isActive: false,
  customStyles: '',
  iconStyle: '',
  nameStyle: '',
  onClick: () => {},
}

export default SidebarItem
