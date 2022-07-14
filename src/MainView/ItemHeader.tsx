import FileCopyIcon from '@material-ui/icons/FileCopy'
import React, { useEffect, useState } from 'react'
import CopyToClipBoard from 'react-copy-to-clipboard'
import { get_iteminfo } from '../Api/iteminfo'
import ItemIcon from '../Common/ItemIcon'
import style from './ItemHeader.module.scss'

const lodestoneURL = (lodestoneId: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/${lodestoneId}/`
}

const lodestoneFromName = (name: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/?q=${name}`
}

interface Props {
  itemid: number
  itemname: string
}

const ItemHeader = React.memo(({ itemid, itemname }: Props) => {
  const [iscopied, setIscopied] = useState(false)
  const [lodestoneId, setLodetoneId] = useState<string>()

  useEffect(() => {
    setIscopied(false)
    get_iteminfo(itemid).then(data => {
      setLodetoneId(data.lodestone)
    })
  }, [itemid])

  return (
    <div className={style.ItemHeader}>
      <div className={style.icon}>
        <ItemIcon className={style.iconimage} itemid={itemid} />
        <img
          className={style.cover}
          alt={itemname}
          src={`${process.env.PUBLIC_URL}/images/itembg1.png`}
        />
      </div>
      <div className={style.itemname}>{itemname}</div>
      <CopyToClipBoard
        onCopy={() => {
          setIscopied(true)
        }}
        text={itemname}
      >
        <FileCopyIcon
          className={`${style.copyicon} ${iscopied ? style.active : ''}`}
        />
      </CopyToClipBoard>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://eriones.com/search?i=${itemname}`}
      >
        <img
          className={style.erioneslink}
          alt={'eriones'}
          src={`${process.env.PUBLIC_URL}/images/eriones.png`}
        />
      </a>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={
          lodestoneId ? lodestoneURL(lodestoneId) : lodestoneFromName(itemname)
        }
      >
        <img
          className={style.erioneslink}
          alt={'lodestone'}
          src={`${process.env.PUBLIC_URL}/images/meteor.png`}
        />
      </a>
    </div>
  )
})

export default ItemHeader
