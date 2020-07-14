import React, { Component } from 'react';
import style from './Sidebar.module.scss';
import ItemSearch from "./ItemSearch";
import Favorite from "./Favorite";
import firebase from '../Common/firebase';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: null, favoriteList: [] }
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

    fetchFireStore() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.firestore()
                    .collection('user_bookmark')
                    .doc(user.uid)
                    .onSnapshot(doc => {
                        if (doc.exists) {
                            if (doc.metadata.hasPendingWrites === false) {
                                this.setState({ favoriteList: doc.get('favorite') });
                            }
                        }
                    });
            }
        });
    }

    updateFireStore(favoriteList) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.firestore()
                    .collection('user_bookmark')
                    .doc(user.uid)
                    .set({ favorite: favoriteList });
            }
        });
    }

    addFavoriteCB(itemid, name) {
        const newlist = this.state.favoriteList.concat([{ id: itemid, name: name }])
        this.setState({ favoriteList: newlist });
        this.updateFireStore(newlist);
    }

    changeFavoriteCB(newfavoriteList) {
        this.setState({ favoriteList: newfavoriteList })
        this.updateFireStore(newfavoriteList);
    }

    deleteFavoriteCB(itemid) {
        const newfavoriteList = this.state.favoriteList.filter(n => n.id !== itemid)
        this.setState({ favoriteList: newfavoriteList });
        this.updateFireStore(newfavoriteList);
    }

    componentDidMount() {
        this.fetchFireStore();
    }

    render() {
        return (
            <div className={style.Sidebar}>
                <div className={style.WebTitle}><div>FFXIVMarketBord</div></div>
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