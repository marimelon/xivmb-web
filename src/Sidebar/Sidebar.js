import React, { Component } from 'react';
import style from './Sidebar.module.scss';
import ItemSearch from "./ItemSearch";
import Favorite from "./Favorite";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: null,favoriteList: JSON.parse(localStorage.getItem("favorite") || "[]") }
        this.changeActiveItem = this.changeActiveItem.bind(this);
        this.addFavoriteCB = this.addFavoriteCB.bind(this);
        this.changeFavoriteCB = this.changeFavoriteCB.bind(this);
        this.deleteFavoriteCB = this.deleteFavoriteCB.bind(this);
    }

    static defaultProps = {
        changeItem: () => { }
    };

    changeActiveItem(parent, itemid, name) {
        this.props.changeItem(itemid, name)
        this.setState({ activeItem: parent + itemid })
    }

    addFavoriteCB(itemid,name){
        const newlist = this.state.favoriteList.concat([{id:itemid,name:name}])
        localStorage.setItem("favorite", JSON.stringify(newlist));
        this.setState({ favoriteList: newlist })
    }

    changeFavoriteCB(newfavoriteList){
        localStorage.setItem("favorite", JSON.stringify(newfavoriteList));
        this.setState({ favoriteList: newfavoriteList })
    }

    deleteFavoriteCB(itemid){
        const newfavoriteList = this.state.favoriteList.filter(n => n.id != itemid)
        localStorage.setItem("favorite", JSON.stringify(newfavoriteList));
        this.setState({ favoriteList: newfavoriteList })
    }

    render() {
        return (
            <div className={style.Sidebar}>
                <div className={style.WebTitle}><a>FFXIVMarketBord</a></div>
                <ItemSearch
                    onClickItem={this.changeActiveItem}
                    activeItem={this.state.activeItem}
                    favoriteList={this.state.favoriteList}
                    addFavoriteCB={this.addFavoriteCB}
                />
                <Favorite
                    favoriteList={this.state.favoriteList}
                    activeItem={this.state.activeItem}
                    onChange={this.changeFavoriteCB}
                    deleteFavoriteCB={this.deleteFavoriteCB}
                    onClickItem={this.changeActiveItem}
                />
            </div>
        );
    }
}

export default Sidebar;