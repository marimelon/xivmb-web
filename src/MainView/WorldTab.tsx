import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { XIVDataCenter } from '../@types/world'
import { getWorlds } from '../Common/worlds'
import { Tab } from '../Components/Tab/Tab'
import style from './WorldTab.module.scss'

type TabProps = {
  tabList: readonly string[]
  currentTabType: string
  onClick: (item: string) => void
}

const WorldTabNomal = React.memo(
  ({ tabList, currentTabType, onClick }: TabProps) => {
    return (
      <Tab
        items={tabList.map(value => ({ value: value, display: value }))}
        value={currentTabType}
        onChange={onClick}
      />
    )
  }
)

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-icon': { color: '#CCCCCC' },
}))

const WorldTabDoropDown = React.memo(
  ({ tabList, currentTabType, onClick }: TabProps) => {
    return (
      <div className={style.WorldTab}>
        <StyledSelect
          disableUnderline
          value={currentTabType}
          onChange={(event, _) => {
            onClick(event.target.value as string)
          }}
          className={style.CompactWorldTab}
          variant={'standard'}
          MenuProps={{
            PaperProps: {
              sx: {
                color: '#CCCCCC',
                backgroundColor: '#192734',
                '& li:hover': {
                  color: 'rgb(79, 180, 243)',
                },
              },
            },
          }}
        >
          {tabList.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </StyledSelect>
      </div>
    )
  }
)

type WorldTabProps = {
  dataCenter: XIVDataCenter
  currentTabType: string
  onClick: (item: string) => void
}

const WorldTab = ({ dataCenter, currentTabType, onClick }: WorldTabProps) => {
  const { ref, currentBreakpoint } = useDimensions<HTMLDivElement>({
    // COMPACT : 0px - 759px , FULL : 760px ~
    breakpoints: { COMPACT: 0, FULL: 760 },
    updateOnBreakpointChange: true,
  })

  const worldList = [dataCenter, ...getWorlds(dataCenter)]

  return (
    <div ref={ref}>
      {currentBreakpoint === 'COMPACT' && (
        <WorldTabDoropDown
          tabList={worldList}
          currentTabType={currentTabType}
          onClick={onClick}
        />
      )}
      {currentBreakpoint === 'FULL' && (
        <WorldTabNomal
          tabList={worldList}
          currentTabType={currentTabType}
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default WorldTab
