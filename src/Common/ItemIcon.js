import React from 'react';
export const ItemIconURL = itemid => (`${process.env.REACT_APP_ITEM_ICON_HOST}${itemid}.png`)

const ItemIcon = ({ itemid, className }) => (
    <img className={className} alt={`Item-${itemid}`} src={ItemIconURL(itemid)} />
)
export default ItemIcon

