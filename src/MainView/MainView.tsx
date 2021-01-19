import React, { Component, useState, useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { withRouter } from 'react-router';
import firebase from '../Common/firebase';
// @ts-expect-error ts-migrate(6142) FIXME: Module './LoginHeader' was resolved to '/root/XIVM... Remove this comment to see the full error message
import LoginHeader from './LoginHeader';
// @ts-expect-error ts-migrate(6142) FIXME: Module './ItemHeader' was resolved to '/root/XIVMB... Remove this comment to see the full error message
import ItemHeader from './ItemHeader';
// @ts-expect-error ts-migrate(6142) FIXME: Module './WorldTab' was resolved to '/root/XIVMB_W... Remove this comment to see the full error message
import WorldTab from './WorldTab';
// @ts-expect-error ts-migrate(6142) FIXME: Module './TablesView' was resolved to '/root/XIVMB... Remove this comment to see the full error message
import TablesView from './TablesView';
// @ts-expect-error ts-migrate(6142) FIXME: Module './HistoryChart' was resolved to '/root/XIV... Remove this comment to see the full error message
import HistoryChart from './HistoryChart';
import Collapse from '@material-ui/core/Collapse';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MainView.module.scss' or its... Remove this comment to see the full error message
import style from './MainView.module.scss';
const UpdateButton = ({ status, callback }: any) => {
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
                return style.loading;
            case 2:
                return style.completed;
            default:
                return '';
        }
    })();
    const MarketUpdateButtonProgressBarStyle = (() => {
        switch (status) {
            case 2:
            case 3:
                return style.active;
            default:
                return '';
        }
    })();
    if (isLogin) {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<button className={`${style.MarketUpdateButton} ${MarketUpdateButtonStateStyle}`} disabled={status !== 0} onClick={callback}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <span className={`${style.ProgressBar} ${MarketUpdateButtonProgressBarStyle}`}></span>
            </button>);
    }
    else {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <div></div>;
    }
};
type MainViewState = any;
class MainView extends Component<{}, MainViewState> {
    TablesViewRef: any;
    rate_limit: any;
    constructor(props: {}) {
        super(props);
        this.state = { currentWorldTab: "Elemental", updateButtonState: 0, isShownHistoryChart: false };
        this.tabChange = this.tabChange.bind(this);
        this.onClickMarketUpdateButton = this.onClickMarketUpdateButton.bind(this);
        this.onClickHistoryChartButton = this.onClickHistoryChartButton.bind(this);
        this.TablesViewRef = React.createRef();
        this.rate_limit = null;
    }
    tabChange(tabtype: any) {
        this.setState({ currentWorldTab: tabtype });
    }
    onClickHistoryChartButton(value: any) {
        this.setState({ isShownHistoryChart: value });
    }
    onClickMarketUpdateButton(event: any) {
        event.currentTarget.blur();
        this.setState({ updateButtonState: 1 });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken(true)
                    .then(idToken => {
                    if (!this.rate_limit) {
                        fetch(`${process.env.REACT_APP_API_URL}/rate_limit`, {
                            headers: { "Authorization": 'Bearer ' + idToken }
                        }).then(res => res.text())
                            .then(res => this.rate_limit = Number(res));
                    }
                    var itemid = (this.props as any).itemid;
                    fetch(`${process.env.REACT_APP_API_URL}/newdata/market/${itemid}`, {
                        headers: { "Authorization": 'Bearer ' + idToken }
                    }).then(res => {
                        if (!res.ok) {
                            throw Error(res.statusText);
                        }
                        return res.json();
                    }).then(res => {
                        this.setState({ updateButtonState: 2 });
                        setTimeout(() => { this.setState({ updateButtonState: 0 }); }, (this.rate_limit ? this.rate_limit : 20) * 1000);
                        if (itemid === (this.props as any).itemid) {
                            const _ = this.TablesViewRef.current?.market_table_ref.current?.setData(itemid, res); // eslint-disable-line
                        }
                    }).catch(err => {
                        this.setState({ updateButtonState: 0 });
                        alert(`更新に失敗しました (${err.message})`);
                    });
                });
            }
            else {
                (this.props as any).history.push('/signin');
            }
        });
    }
    componentWillReceiveProps() {
        if (this.state.updateButtonState === 2) {
            this.setState({ updateButtonState: 3 });
        }
    }
    shouldComponentUpdate(nextProps: {}, nextState: MainViewState) {
        return ((this.props as any).itemid !== (nextProps as any).itemid ||
            this.state.currentWorldTab !== nextState.currentWorldTab ||
            this.state.updateButtonState !== nextState.updateButtonState ||
            this.state.isShownHistoryChart !== nextState.isShownHistoryChart);
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemid' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { itemid, itemname } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.MainView}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <LoginHeader />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemHeader itemid={itemid} itemname={itemname}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <UpdateButton status={this.state.updateButtonState} callback={this.onClickMarketUpdateButton}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <WorldTab currentTabType={this.state.currentWorldTab} onClick={this.tabChange}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Collapse in={this.state.isShownHistoryChart}><HistoryChart itemid={itemid} isshown={this.state.isShownHistoryChart}/></Collapse>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TablesView ref={this.TablesViewRef} itemid={itemid} world={this.state.currentWorldTab} isShownChart={this.state.isShownHistoryChart} isShownChartCB={this.onClickHistoryChartButton}/>
            </div>);
    }
}
export default withRouter(MainView);
