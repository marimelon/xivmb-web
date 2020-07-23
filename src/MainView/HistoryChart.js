import React, { Component } from 'react';

import Highstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';

DarkUnica(Highstock);

class HistoryChart extends Component {
    constructor() {
        super();
        this.state = {
            series: [],
            loaded_itemid:0
        };
    }

    componentDidMount() {
        if (this.props.isshown) {
            fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${this.props.itemid}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({ series: res.map(elm => [elm.Date * 1000, elm.PC]),loaded_itemid:this.props.itemid });
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // 典型的な使い方(props を比較することを忘れないでください)
        if (this.props.isshown) {
            if (this.props.itemid !== this.state.loaded_itemid) {
                fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${this.props.itemid}`)
                    .then(response => response.json())
                    .then(res => {
                        this.setState({ series: res.map(elm => [elm.Date * 1000, elm.PC]) ,loaded_itemid:this.props.itemid});
                    });
            }
        }
    }
      
    render() {
        const options = {
            chart:{
                height: 300,
                //zoomType: 'x',
                backgroundColor :"#15202B"
            },
            title:{
                text:null
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
                inputEnabled:false,
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
            legend:false,
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
        return (
            <div>
                {this.props.isshown &&
                        <HighchartsReact highcharts={Highstock} options={options} />
                }
            </div>
        )
    }
}

export default HistoryChart;