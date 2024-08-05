import { useCallback, useState } from 'react'

import { Button, useNotice } from '@yamada-ui/react'

import { XIVDataCenter } from '../../types/world'
import { fetchNewHistoryData } from '../../api/fetchNewHistoryData'
import { HistoryResponse } from '../../types/history'

type Props = {
  itemid: number
  dc: XIVDataCenter
  onUpdate: (res: HistoryResponse) => void
}

export const UpdateButton = ({ itemid, dc, onUpdate }: Props) => {
  const notice = useNotice()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchNewHistoryData(itemid, dc)
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
      }}
    >
      Update
    </Button>
  )
}
