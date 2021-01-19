import React, { Component } from 'react';
//import style from './App.module.css';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ViewApp.module.scss' or its ... Remove this comment to see the full error message
import style from './ViewApp.module.scss';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Common/ItemIcon' was resolved to '/root/... Remove this comment to see the full error message
import { ItemIconURL } from './Common/ItemIcon';
import changeFavicon from './Common/changeFavicon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './MainView/ItemHeader' was resolved to '/r... Remove this comment to see the full error message
import ItemHeader from './MainView/ItemHeader';
// @ts-expect-error ts-migrate(6142) FIXME: Module './MainView/WorldTab' was resolved to '/roo... Remove this comment to see the full error message
import WorldTab from './MainView/WorldTab';
// @ts-expect-error ts-migrate(6142) FIXME: Module './MainView/MarketTable' was resolved to '/... Remove this comment to see the full error message
import MarketTable from './MainView/MarketTable';
// @ts-expect-error ts-migrate(6142) FIXME: Module './MainView/HistoryTable' was resolved to '... Remove this comment to see the full error message
import HistoryTable from './MainView/HistoryTable';
import './css/tabulator.css';
import './css/my_tabulator.css';
type State = any;
class ViewApp extends Component<{}, State> {
    unlisten: any;
    constructor(props: {}) {
        super(props);
        const { itemid } = (props as any).match.params;
        this.state = { itemid: Number(itemid), itemname: (window as any).ItemList[Number(itemid)], currentWorldTab: "Elemental" };
        this.unlisten = (props as any).history.listen((location: any) => {
            if (location.state === undefined) {
                var itemid = Number(location.pathname.slice(1));
                this.setState({ itemid: itemid, itemname: (window as any).ItemList[itemid] });
            }
            else {
                this.setState(location.state);
            }
        });
        this.tabChange = this.tabChange.bind(this);
    }
    componentWillUnmount() {
        this.unlisten();
    }
    tabChange(tabtype: any) {
        this.setState({ currentWorldTab: tabtype });
    }
    render() {
        changeFavicon(ItemIconURL(this.state.itemid));
        document.title = this.state.itemname;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.ViewApp}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemHeader itemid={this.state.itemid} itemname={this.state.itemname}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <WorldTab currentTabType={this.state.currentWorldTab} onClick={this.tabChange}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={style.TablesView}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MarketTable itemid={this.state.itemid} world={this.state.currentWorldTab} style={style.MarketTable}/>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <HistoryTable itemid={this.state.itemid} world={this.state.currentWorldTab} style={style.HistoryTable}/>
                </div>
            </div>);
    }
}
export default ViewApp;
