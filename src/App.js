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
    this.unlisten = props.history.listen((location)=>{
      if(location.state===undefined){
        var itemid = Number(location.pathname.slice(1));
        this.setState({itemid:itemid,itemname:window.ItemList[itemid]});
      }
      else{
        this.setState(location.state);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  changeItem(itemid, itemname) {
    this.props.history.push({pathname:`/${itemid}`,state:{itemid:itemid,itemname:itemname}});
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
