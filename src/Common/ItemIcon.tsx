import React from 'react'

export const ItemIconURL = (itemid: number) =>
  `${process.env.REACT_APP_ITEM_ICON_HOST}${itemid}.png`

const ItemIcon: React.FC<{ itemid: number; className?: string }> = ({
  itemid,
  className,
}) => (
  <img
    className={className}
    alt={`${itemid}`}
    src={ItemIconURL(itemid)}
    onError={e => {
      e.currentTarget.src = `${process.env.PUBLIC_URL}/images/unkown.png`
    }}
  />
)

export default ItemIcon
