import { useCallback } from 'react'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { HStack, Text } from '@yamada-ui/react'

import { Item } from '../../types/item'
import { ItemIcon } from '../ItemIcon'

type Props = {
  item: Item
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const SidebarItem = ({ item, onClick }: Props) => {
  const navigate = useNavigate()
  const { dc } = useSearch({ from: '/$itemid/' })
  const defaultHandleClick = useCallback(() => {
    navigate({
      to: '/$itemid',
      params: { itemid: String(item.id) },
      search: { dc },
    })
  }, [dc, item.id, navigate])

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    onClick ?? defaultHandleClick

  return (
    <HStack
      height="100%"
      width="100%"
      cursor="pointer"
      gap={1}
      _hover={{
        borderColor: '#8bb6e5',
        borderWidth: 1,
        boxShadow: '0rem 0rem 1rem 0rem rgba(137, 193, 202, 0.41)',
      }}
      onClick={handleClick}
    >
      <ItemIcon item={item} />
      <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {item.name}
      </Text>
    </HStack>
  )
}
