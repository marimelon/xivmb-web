import React, { Component, useState, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';

DarkUnica(Highcharts);

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
                zoomType: 'x',
                backgroundColor :"#15202B"
            },
            title:{
                text:null
            },
            legend:false,
            xAxis: {
                type: 'datetime',
                min: Date.UTC(2020, 0, 1),
                labels: { 
                    format: '{value:%Y-%m-%d}' 
                },
            },
            series: [{
                data: this.state.series
            }]
        };
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>);
    }
}

export default HistoryChart;