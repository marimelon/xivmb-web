import { useCallback, useState } from 'react'

import { Button, useNotice } from '@yamada-ui/react'

import { fetchNewMarketData } from '../../api/fetchNewMarketData'
import { MarketDataResponse } from '../../types/market'
import { XIVDataCenter } from '../../types/world'

type Props = {
  itemid: number
  dc: XIVDataCenter
  onUpdate: (res: MarketDataResponse) => void
}

export const UpdateButton = ({ itemid, dc, onUpdate }: Props) => {
  const notice = useNotice()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchNewMarketData(itemid, dc)
      onUpdate(res)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'unknown error'
      notice({
        title: 'Failed to update',
        description: message,
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [dc, itemid, notice, onUpdate])

  return (
    <Button
      colorScheme="primary"
      variant="ghost"
      loadingText="Loading..."
      isLoading={isLoading}
      onClick={() => {
        handleUpdate()
      }}>
      Update
    </Button>
  )
}
