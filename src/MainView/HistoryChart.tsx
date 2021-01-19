import React, { Component } from 'react';
import Highstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';
DarkUnica(Highstock);
type State = any;
class HistoryChart extends Component<{}, State> {
    constructor() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        super();
        this.state = {
            series: [],
            loaded_itemid: 0
        };
    }
    componentDidMount() {
        if ((this.props as any).isshown) {
            fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${(this.props as any).itemid}`)
                .then(response => response.json())
                .then(res => {
                this.setState({ series: res.map((elm: any) => [elm.Date * 1000, elm.PC]), loaded_itemid: (this.props as any).itemid });
            });
        }
    }
    componentDidUpdate(prevProps: {}, prevState: State) {
        // 典型的な使い方(props を比較することを忘れないでください)
        if ((this.props as any).isshown) {
            if ((this.props as any).itemid !== this.state.loaded_itemid) {
                fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${(this.props as any).itemid}`)
                    .then(response => response.json())
                    .then(res => {
                    this.setState({ series: res.map((elm: any) => [elm.Date * 1000, elm.PC]), loaded_itemid: (this.props as any).itemid });
                });
            }
        }
    }
    render() {
        const options = {
            chart: {
                height: 300,
                //zoomType: 'x',
                backgroundColor: "#15202B"
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            navigator: {
                enabled: true,
            },
            scrollbar: {
                enabled: false
            },
            rangeSelector: {
                enabled: true,
                floating: true,
                inputEnabled: false,
                x: 0,
                verticalAlign: "top",
                buttonPosition: {
                    align: "left"
                },
                allButtonsEnabled: false,
                buttons: [
                    {
                        type: "month",
                        count: 2,
                        text: "Day",
                    },
                    {
                        type: "month",
                        count: 6,
                        text: "Week",
                    },
                    {
                        type: "all",
                        text: "All"
                    }
                ],
                selected: 3
            },
            legend: false,
            xAxis: {
                minRange: 1,
                type: 'datetime',
                //min: this.state.series.length>0? : Date.UTC(2020, 1, 1),
                labels: {
                    format: '{value:%Y-%m-%d}'
                },
                scrollbar: {
                    enabled: true
                },
                opposite: false
            },
            series: [{
                    data: this.state.series
                }]
        };
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div>
                {(this.props as any).isshown &&
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <HighchartsReact highcharts={Highstock} options={options}/>}
            </div>);
    }
}
export default HistoryChart;
