import { Item } from '@/types/item'

import style from './ItemIcon.module.scss'

export const ItemIconURL = (itemid: number) =>
  `${import.meta.env.VITE_PUBLIC_ITEM_ICON_HOST}${itemid}.png`

type ItemIconProps = {
  item: Item
  className?: string
}

export const ItemIcon = ({ item, className = '' }: ItemIconProps) => {
  return (
    <div className={`${style.icon} ${className}`}>
      <img
        className={style.iconimage}
        src={ItemIconURL(item.id)}
        onError={e => {
          e.currentTarget.src = `/img/unkown.png`
        }}
      />
      <img className={style.cover} src={`/img/itembg1.png`} />
    </div>
  )
}
