import HighchartsReact from 'highcharts-react-official'
import Highstock from 'highcharts/highstock'
import DarkUnica from 'highcharts/themes/dark-unica'
import React, { useEffect, useState } from 'react'
import { ChartResponse } from '../@types/chartResponse'

DarkUnica(Highstock)

const options = {
  chart: {
    height: 300,
    //zoomType: 'x',
    backgroundColor: '#15202B',
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  navigator: {
    enabled: true,
  },
  scrollbar: {
    enabled: false,
  },
  rangeSelector: {
    enabled: true,
    floating: true,
    inputEnabled: false,
    x: 0,
    verticalAlign: 'top',
    buttonPosition: {
      align: 'left',
    },
    allButtonsEnabled: false,
    buttons: [
      {
        type: 'month',
        count: 2,
        text: 'Day',
      },
      {
        type: 'month',
        count: 6,
        text: 'Week',
      },
      {
        type: 'all',
        text: 'All',
      },
    ],
    selected: 3,
  },
  legend: false,
  xAxis: {
    minRange: 1,
    type: 'datetime',
    //min: this.state.series.length>0? : Date.UTC(2020, 1, 1),
    labels: {
      format: '{value:%Y-%m-%d}',
    },
    scrollbar: {
      enabled: true,
    },
    opposite: false,
  },
}

interface State {
  series: number[][]
  loadedItemid?: number
}

interface Props {
  itemid: number
  isshown: boolean
}

const HistoryChart: React.FC<Props> = ({ itemid, isshown }) => {
  const [state, setState] = useState<State>({
    series: [],
    loadedItemid: undefined,
  })
  useEffect(() => {
    if (isshown && state.loadedItemid !== itemid) {
      fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${itemid}`)
        .then<ChartResponse>(response => response.json())
        .then(res => {
          setState({
            series: res.map(({ Date, PC }) => [Date * 1000, PC]),
            loadedItemid: itemid,
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemid, isshown])

  return (
    <div>
      {isshown && (
        <HighchartsReact
          highcharts={Highstock}
          options={{ ...options, ...{ series: [{ data: state.series }] } }}
        />
      )}
    </div>
  )
}

export default HistoryChart
