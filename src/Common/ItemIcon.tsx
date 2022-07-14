export const ItemIconURL = (itemid: number) =>
  `${process.env.REACT_APP_ITEM_ICON_HOST}${itemid}.png`

type ImgProps = JSX.IntrinsicElements['img']

type Props = { itemid: number } & ImgProps

const ItemIcon = ({ itemid, ...imgProps }: Props) => (
  <img
    alt={`${itemid}`}
    src={ItemIconURL(itemid)}
    onError={e => {
      e.currentTarget.src = `${process.env.PUBLIC_URL}/images/unkown.png`
    }}
    {...imgProps}
  />
)

export default ItemIcon
