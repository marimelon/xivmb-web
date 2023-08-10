import { Item } from '@/types/item'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { useState } from 'react'
import CopyToClipBoard from 'react-copy-to-clipboard'
import { ItemIcon } from '../../common/ItemIcon/ItemIcon'
import style from './ItemHeader.module.scss'

const lodestoneURL = (lodestoneId: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/${lodestoneId}/`
}

const lodestoneFromName = (name: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/?q=${name}`
}

type ItemHeaderProps = {
  item: Item
}

export const ItemHeader = ({ item }: ItemHeaderProps) => {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className={style.ItemHeader}>
      <ItemIcon item={item} />
      <div className={style.itemname}>{item.name}</div>
      <CopyToClipBoard
        onCopy={() => {
          setIsCopied(true)
        }}
        text={item.name}
      >
        <FileCopyIcon
          className={`${style.copyicon} ${isCopied ? style.active : ''}`}
        />
      </CopyToClipBoard>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://eriones.com/search?i=${item.name}`}
        style={{ display: 'flex', marginLeft: 8 }}
      >
        <img
          className={style.erioneslink}
          alt={'eriones'}
          src={`/img/eriones.png`}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={
          item.lodestoneId
            ? lodestoneURL(item.lodestoneId)
            : lodestoneFromName(item.name)
        }
        style={{ display: 'flex', marginLeft: 8 }}
      >
        <img
          className={style.erioneslink}
          alt={'lodestone'}
          src={`/img/meteor.png`}
        />
      </a>
    </div>
  )
}
