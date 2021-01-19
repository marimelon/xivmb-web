import React, { Component } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './App.module.css' or its corre... Remove this comment to see the full error message
import style from './App.module.css';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Common/ItemIcon' was resolved to '/root/... Remove this comment to see the full error message
import { ItemIconURL } from './Common/ItemIcon';
import changeFavicon from './Common/changeFavicon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Sidebar/Sidebar.js' was resolved to '/ro... Remove this comment to see the full error message
import Sidebar from "./Sidebar/Sidebar.js";
// @ts-expect-error ts-migrate(6142) FIXME: Module './MainView/MainView.js' was resolved to '/... Remove this comment to see the full error message
import MainView from "./MainView/MainView.js";
import './css/tabulator.css';
import './css/my_tabulator.css';
type State = any;
class App extends Component<{}, State> {
    unlisten: any;
    constructor(props: {}) {
        super(props);
        const { itemid } = (props as any).match.params;
        this.state = { itemid: Number(itemid), itemname: (window as any).ItemList[Number(itemid)] };
        this.changeItem = this.changeItem.bind(this);
        this.unlisten = (props as any).history.listen((location: any) => {
            if (location.state === undefined) {
                var itemid = Number(location.pathname.slice(1));
                this.setState({ itemid: itemid, itemname: (window as any).ItemList[itemid] });
            }
            else {
                this.setState(location.state);
            }
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    changeItem(itemid: any, itemname: any) {
        (this.props as any).history.push({ pathname: `/${itemid}`, state: { itemid: itemid, itemname: itemname } });
    }
    tabChange(tabtype: any) {
        this.setState({ currentWorldTab: tabtype });
    }
    render() {
        changeFavicon(ItemIconURL(this.state.itemid));
        document.title = this.state.itemname;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.App}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Sidebar changeItem={this.changeItem}/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MainView itemid={this.state.itemid} itemname={this.state.itemname}/>
      </div>);
    }
}
export default App;
