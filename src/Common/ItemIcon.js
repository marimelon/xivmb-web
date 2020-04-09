import React from 'react';
export const ItemIconURL = itemid => (`https://objectstorage.ap-tokyo-1.oraclecloud.com/n/nrwicnrglpsf/b/img/o/${itemid}.png`)

const ItemIcon = ({ itemid, className }) => (
    <img className={className} src={ItemIconURL(itemid)} />
)
export default ItemIcon

