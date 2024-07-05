import { use } from 'react'

import { Box, HStack, Icon, Image, Link, useClipboard } from '@yamada-ui/react'
import { LuClipboardCopy } from 'react-icons/lu'
import { MdOutlineStarBorder } from 'react-icons/md'

import { FavoriteContext } from '../../api/firebaseHooks'
import { Item } from '../../types/item'
import { ItemIcon } from '../ItemIcon'

const lodestoneURL = (lodestoneId: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/${lodestoneId}/`
}

const lodestoneFromName = (name: string) => {
  return `https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/?q=${name}`
}

type Prosp = {
  item: Item
}

export const ItemHeader = ({ item }: Prosp) => {
  const { onCopy, hasCopied } = useClipboard()

  const {
    items: favoriteItems,
    add: addFavorite,
    delete: deleteFavorite,
  } = use(FavoriteContext)

  return (
    <HStack>
      <ItemIcon item={item} style={{ height: '200%' }} />
      <Box fontWeight="bold">{item.name}</Box>
      <Icon
        width={6}
        height={6}
        cursor="pointer"
        as={LuClipboardCopy}
        color={hasCopied ? 'cyan.400' : undefined}
        onClick={() => {
          onCopy(item.name)
        }}
      />
      <Icon
        width={6}
        height={6}
        cursor="pointer"
        as={MdOutlineStarBorder}
        color={
          favoriteItems.map((e) => e.id).includes(item.id)
            ? 'yellow.400'
            : undefined
        }
        onClick={() => {
          favoriteItems.map((e) => e.id).includes(item.id)
            ? deleteFavorite(item.id)
            : addFavorite(item)
        }}
      />
      <Link
        isExternal
        rel="noopener noreferrer"
        href={`https://eriones.com/search?i=${item.name}`}
      >
        <Image alt={'eriones'} src={`/img/eriones.png`} width={5} height={5} />
      </Link>
      <Link
        isExternal
        rel="noopener noreferrer"
        href={
          item.lodestoneId
            ? lodestoneURL(item.lodestoneId)
            : lodestoneFromName(item.name)
        }
      >
        <Image alt={'lodestone'} src={`/img/meteor.png`} width={5} height={5} />
      </Link>
    </HStack>
  )
}
