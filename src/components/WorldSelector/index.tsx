import { ReactNode, useState } from 'react'

import { Tab, Tabs } from '@yamada-ui/react'

import { XIVDataCenter, XIVWorld, getWorlds } from '../../types/world'

type Props = {
  dc: XIVDataCenter
  children?: (filter: XIVWorld | undefined) => ReactNode
}

export const WorldSelector = ({ dc, children }: Props) => {
  const [index, onChange] = useState<number>(0)
  const tabs = [
    <Tab key={dc} _before={{ fontFamily: 'xivfonts', content: '"\\e075"' }}>
      {dc}
    </Tab>,
    ...getWorlds(dc).map(w => <Tab key={w}>{w}</Tab>),
  ]
  const filters = [undefined, ...getWorlds(dc)]
  return (
    <>
      <Tabs index={index} onChange={onChange}>
        {...tabs}
      </Tabs>
      {children && children(filters[index])}
    </>
  )
}
