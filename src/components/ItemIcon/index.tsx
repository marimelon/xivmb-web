import { Image } from '@yamada-ui/react'

import { Item } from '../../types/item'

export const ItemIconURL = (itemid: number) =>
  `${import.meta.env.VITE_PUBLIC_ITEM_ICON_HOST}${itemid}.png`

type ItemIconProps = {
  item: Item
  className?: string
  style?: React.CSSProperties
}

export const ItemIcon = ({ item, style }: ItemIconProps) => {
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        height: '100%',
        aspectRatio: 1,
        ...style,
      }}>
      <Image
        style={{
          position: 'absolute',
          height: '100%',
          transform: 'scale(0.84)',
          top: 0,
          left: 0,
        }}
        src={`${import.meta.env.VITE_PUBLIC_ITEM_ICON_HOST}${item.id}.png`}
        fallbackStrategy="onError"
        fallback="/img/unkown.png"
      />
      <Image
        style={{ position: 'absolute', top: '4%', height: '100%', left: 0 }}
        src={`/img/itembg1.png`}
      />
    </div>
  )
}
