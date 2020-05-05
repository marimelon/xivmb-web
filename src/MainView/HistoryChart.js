import React, { Component, useState, useEffect } from 'react';

import Highstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';

DarkUnica(Highstock);

class HistoryChart extends Component {
    constructor() {
        super();
        this.state = {
            series: []
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${this.props.itemid}`)
            .then(response => response.json())
            .then(res => {
                this.setState({ series: res.map(elm=>[elm.Date*1000,elm.PC]) });
            });
    }

    componentDidUpdate(prevProps) {
        // 典型的な使い方(props を比較することを忘れないでください)
        if (this.props.itemid !== prevProps.itemid) {
            fetch(`${process.env.REACT_APP_API_URL}/data/history/chart?q=${this.props.itemid}`)
            .then(response => response.json())
            .then(res => {
                this.setState({ series: res.map(elm=>[elm.Date*1000,elm.PC]) });
            });
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
            rangeSelector: {
                enabled: true,
                inputEnabled: true,
                x: 0,
                verticalAlign: "top",
                buttonPosition: {
                  align: "left"
                },
                allButtonsEnabled: true,
                buttons: [
                  {
                    type: "month",
                    count: 3,
                    text: "Day",
                    dataGrouping: {
                      forced: true,
                      units: [["day", [1]]]
                    }
                  },
                  {
                    type: "year",
                    count: 1,
                    text: "Week",
                    dataGrouping: {
                      forced: true,
                      units: [["week", [1]]]
                    }
                  },
                  {
                    type: "all",
                    text: "Month",
                    dataGrouping: {
                      forced: true,
                      units: [["month", [1]]]
                    }
                  }
                ],
                selected: 1
              },
            legend:false,
            xAxis: {
                minRange: 1,
                type: 'datetime',
                min: Date.UTC(2020, 0, 1),
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
                <HighchartsReact highcharts={Highstock} options={options} />
            </div>);
    }
}

export default HistoryChart;