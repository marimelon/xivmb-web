import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import style from './App.module.css';

import { ItemIconURL } from './Common/ItemIcon'
import changeFavicon from './Common/changeFavicon'

import Auth from './Auth'
import SignIn from './Signin'
import Sidebar from "./Sidebar/Sidebar.js"
import MainView from "./MainView/MainView.js"

import './css/tabulator.css';
import './css/my_tabulator.css';

class App extends Component {
  constructor(props) {
    super(props);
    const {itemid} = props.match.params
    this.state = { itemid: Number(itemid), itemname: window.ItemList[Number(itemid)] };
    this.changeItem = this.changeItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.itemid !== this.state.itemid) {
        const {itemid} = nextProps.match.params;
        this.state.itemid = itemid;
        this.state.itemname = window.ItemList[Number(itemid)];
    }
  }

  changeItem(itemid, itemname) {
    this.setState({ itemid: itemid, itemname: itemname });
    this.props.history.push(`/${itemid}`);
  }

  render() {
    changeFavicon(ItemIconURL(this.state.itemid))
    document.title = this.state.itemname

    return (
      <div className={style.App}>
        <Sidebar changeItem={this.changeItem} />
        <MainView itemid={this.state.itemid} itemname={this.state.itemname} />
      </div>
    );
  }
}

class Viewer extends Component {
  constructor(props) {
    super(props);
    const {itemid} = props.match.params
    this.state = { itemid: Number(itemid), itemname: window.ItemList[Number(itemid)] };
    this.changeItem = this.changeItem.bind(this);
  }

  changeItem(itemid, itemname) {
    this.setState({ itemid: itemid, itemname: itemname });
    this.props.history.push(`/${itemid}`);
  }

  render() {
    changeFavicon(ItemIconURL(this.state.itemid))
    document.title = this.state.itemname

    return (
      <div className={style.App}>
        <MainView itemid={this.state.itemid} itemname={this.state.itemname} />
      </div>
    );
  }
}

class AppRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Auth>
            <Switch>
              <Redirect exact from='/' to='/2' />
              <Route path='/:itemid(\d+)' component={App} />
            </Switch>
          </Auth>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default AppRoute;
