import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import firebase from '../Common/firebase'

import LoginHeader from './LoginHeader';
import ItemHeader from './ItemHeader';
import WorldTab from './WorldTab';
import TablesView from './TablesView';
import HistoryChart from './HistoryChart';

import Collapse from '@material-ui/core/Collapse';

import style from './MainView.module.scss';

const UpdateButton = ({ status, callback }) => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setIsLogin(true);
            }
        });
    }, []);
    const MarketUpdateButtonStateStyle = (() => {
        switch (status) {
            case 1:
                return style.loading
            case 2:
                return style.completed
            default:
                return ''
        }
    })()
    const MarketUpdateButtonProgressBarStyle = (() => {
        switch (status) {
            case 2:
            case 3:
                return style.active
            default:
                return ''
        }
    })()

    if (isLogin) {
        return (
            <button className={`${style.MarketUpdateButton} ${MarketUpdateButtonStateStyle}`}
                disabled={status !== 0}
                onClick={callback}>
                <span className={`${style.ProgressBar} ${MarketUpdateButtonProgressBarStyle}`}></span>
            </button>
        )
    } else {
        return <div></div>
    }
}

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = { currentWorldTab: "Elemental", updateButtonState: 0, isShownHistoryChart: false };
        this.tabChange = this.tabChange.bind(this);
        this.onClickMarketUpdateButton = this.onClickMarketUpdateButton.bind(this);
        this.onClickHistoryChartButton = this.onClickHistoryChartButton.bind(this);
        this.TablesViewRef = React.createRef();

        this.rate_limit = null;
    }

    tabChange(tabtype) {
        this.setState({ currentWorldTab: tabtype });
    }

    onClickHistoryChartButton(value) {
        this.setState({ isShownHistoryChart: value });
    }

    onClickMarketUpdateButton(event) {
        event.currentTarget.blur();
        this.setState({ updateButtonState: 1 })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken(true)
                    .then(idToken => {
                        if (!this.rate_limit) {
                            fetch(`${process.env.REACT_APP_API_URL}/rate_limit`, {
                                headers: { "Authorization": 'Bearer ' + idToken }
                            }).then(res => res.text())
                                .then(res => this.rate_limit = Number(res))
                        }

                        var itemid = this.props.itemid;
                        fetch(`${process.env.REACT_APP_API_URL}/newdata/market/${itemid}`, {
                            headers: { "Authorization": 'Bearer ' + idToken }
                        }).then(res => {
                            if (!res.ok) {
                                throw Error(res.statusText);
                            }
                            return res.json()
                        }).then(res => {
                            this.setState({ updateButtonState: 2 })
                            setTimeout(() => { this.setState({ updateButtonState: 0 }) }, (this.rate_limit ? this.rate_limit : 20) * 1000);
                            if (itemid === this.props.itemid) {
                                const _ = this.TablesViewRef.current?.market_table_ref.current?.setData(itemid, res); // eslint-disable-line
                            }
                        }).catch(err => {
                            this.setState({ updateButtonState: 0 })
                            alert(`更新に失敗しました (${err.message})`)
                        })
                    })
            } else {
                this.props.history.push('/signin')
            }
        })
    }

    componentWillReceiveProps() {
        if (this.state.updateButtonState === 2) {
            this.setState({ updateButtonState: 3 })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.itemid !== nextProps.itemid ||
            this.state.currentWorldTab !== nextState.currentWorldTab ||
            this.state.updateButtonState !== nextState.updateButtonState ||
            this.state.isShownHistoryChart !== nextState.isShownHistoryChart)
    }

    render() {
        const { itemid, itemname } = this.props;
        return (
            <div className={style.MainView}>
                <LoginHeader />
                <ItemHeader itemid={itemid} itemname={itemname} />
                <UpdateButton status={this.state.updateButtonState} callback={this.onClickMarketUpdateButton} />
                <WorldTab currentTabType={this.state.currentWorldTab} onClick={this.tabChange} />
                <Collapse in={this.state.isShownHistoryChart}><HistoryChart itemid={itemid} isshown={this.state.isShownHistoryChart} /></Collapse>
                <TablesView ref={this.TablesViewRef} itemid={itemid} world={this.state.currentWorldTab}
                    isShownChart={this.state.isShownHistoryChart} isShownChartCB={this.onClickHistoryChartButton} />
            </div>
        );
    }
}

export default withRouter(MainView);