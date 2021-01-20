import React from 'react';
export const ItemIconURL = (itemid: number) => `${process.env.REACT_APP_ITEM_ICON_HOST}${itemid}.png`

const ItemIcon: React.FC<{ itemid: number, className?: string }> = ({ itemid, className }) => (
    <img className={className} alt={`Item-${itemid}`} src={ItemIconURL(itemid)} />
)

export default ItemIcon

