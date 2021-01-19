import React from 'react';
export const ItemIconURL = (itemid: any) => `${process.env.REACT_APP_ITEM_ICON_HOST}${itemid}.png`

const ItemIcon = ({
    itemid,
    className
}: any) => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img className={className} alt={`Item-${itemid}`} src={ItemIconURL(itemid)} />
)
export default ItemIcon

