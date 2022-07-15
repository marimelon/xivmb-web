import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles({
  icon: {
    color: '#CCCCCC',
  },
  select: {
    '& ul': {
      backgroundColor: '#192734',
    },
    '& li': {
      color: '#CCCCCC',
      fontSize: 12,
    },
    '& li:hover': {
      color: 'rgb(79, 180, 243)',
    },
  },
})

const WorldTabDoropDown = React.memo(
  ({ tabList, currentTabType, onClick }: TabProps) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      onClick(event.target.value as string)
    }

    const classes = useStyles()

    return (
      <div className={style.WorldTab}>
        <Select
          disableUnderline
          value={currentTabType}
          onChange={handleChange}
          className={style.CompactWorldTab}
          classes={{ icon: classes.icon }}
          MenuProps={{ classes: { paper: classes.select } }}
        >
          {tabList.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
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
