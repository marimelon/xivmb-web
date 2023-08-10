import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import useDimensions from 'react-cool-dimensions'
import { XIVDataCenter, XIVWorld } from '@/types/world'
import { getWorlds, isXIVDataCenter } from '@/client/xiv/world'
import { Tab } from '@/components/common/Tab/Tab'
import style from './WorldTab.module.scss'

type TabProps = {
  tabList: (XIVWorld | XIVDataCenter)[]
  currentTabType: XIVWorld | XIVDataCenter
  onClick: (item: XIVWorld | XIVDataCenter) => void
}

const WorldTabNomal = ({ tabList, currentTabType, onClick }: TabProps) => {
  return (
    <Tab
      items={tabList.map(v => {
        const node = isXIVDataCenter(v) ? (
          <>
            <i className={'crossworld-icon'}></i>
            {v}
          </>
        ) : (
          v
        )
        return { value: v, display: node }
      })}
      value={currentTabType}
      onChange={onClick}
    />
  )
}

const StyledSelect = styled(Select)(() => ({
  '& .MuiSelect-icon': { color: '#CCCCCC' },
}))

const WorldTabDoropDown = ({ tabList, currentTabType, onClick }: TabProps) => {
  return (
    <div className={style.WorldTab}>
      <StyledSelect
        disableUnderline
        value={currentTabType}
        onChange={event => {
          onClick(event.target.value as XIVWorld | XIVDataCenter)
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
            {isXIVDataCenter(item) && <i className={'crossworld-icon'}></i>}{' '}
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  )
}

type WorldTabProps = {
  dataCenter: XIVDataCenter
  currentTabType: XIVWorld | XIVDataCenter
  onClick: (item: XIVWorld | XIVDataCenter) => void
}

export const WorldTab = ({
  dataCenter,
  currentTabType,
  onClick,
}: WorldTabProps) => {
  const { observe, currentBreakpoint } = useDimensions<HTMLDivElement>({
    // COMPACT : 0px - 759px , FULL : 760px ~
    breakpoints: { COMPACT: 0, FULL: 760 },
    updateOnBreakpointChange: true,
  })

  const worldList = [dataCenter, ...getWorlds(dataCenter)]

  if (currentTabType !== dataCenter && !worldList.includes(currentTabType)) {
    onClick(dataCenter)
    return <div ref={observe}></div>
  }

  return (
    <div ref={observe}>
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
