import { useCallback, useEffect, useState } from 'react'

import { Item } from '@/types/item'

import { search_items } from '../../../client/api/search_item'
import style from './ItemSearch.module.scss'
import { ItemSearchInput } from './ItemSearchInput'
import { ItemSearchResult } from './ItemSearchResult'

export const ItemSearch = () => {
  const [value, setValue] = useState<string>('')
  const [items, setItems] = useState<Item[]>([])
  const handleChange = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  useEffect(() => {
    if (value === '') {
      setItems([])
      return
    }
    const delayDebounceFn = setTimeout(() => {
      search_items([value]).then(data => {
        setItems(data.items)
      })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [value])

  return (
    <div className={style.ItemSearch}>
      <ItemSearchInput value={value} onChange={handleChange} />
      <ItemSearchResult items={items} />
    </div>
  )
}
