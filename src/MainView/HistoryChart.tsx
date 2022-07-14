import HighchartsReact from 'highcharts-react-official'
import Highstock from 'highcharts/highstock'
import DarkUnica from 'highcharts/themes/dark-unica'
import { useEffect, useState } from 'react'
import { XIVWorld } from '../@types/world'
import { get_history_chart } from '../Api/get_history_chart'

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

type State = {
  series: number[][]
}

type HistoryChartProps = {
  itemid: number
  world?: XIVWorld
  isshown: boolean
}

const HistoryChart = ({ itemid, world, isshown }: HistoryChartProps) => {
  const [state, setState] = useState<State>({
    series: [],
  })
  useEffect(() => {
    let unmounted = false
    if (isshown) {
      get_history_chart(itemid, world).then(res => {
        if (!unmounted) {
          setState({
            series: res.map(({ Date, PC }) => [Date * 1000, PC]),
          })
        }
      })
    }
    return () => {
      unmounted = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemid, world, isshown])

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
