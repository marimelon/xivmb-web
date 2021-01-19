import React, { Component } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Sidebar.module.scss' or its ... Remove this comment to see the full error message
import style from './Sidebar.module.scss';
// @ts-expect-error ts-migrate(6142) FIXME: Module './ItemSearch' was resolved to '/root/XIVMB... Remove this comment to see the full error message
import ItemSearch from "./ItemSearch";
// @ts-expect-error ts-migrate(6142) FIXME: Module './Favorite' was resolved to '/root/XIVMB_W... Remove this comment to see the full error message
import Favorite from "./Favorite";
import firebase from '../Common/firebase';
type OwnState = any;
type State = OwnState & typeof Sidebar.defaultProps;
class Sidebar extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { activeItem: null, favoriteList: [] };
        this.changeActiveItem = this.changeActiveItem.bind(this);
        this.addFavoriteCB = this.addFavoriteCB.bind(this);
        this.changeFavoriteCB = this.changeFavoriteCB.bind(this);
        this.deleteFavoriteCB = this.deleteFavoriteCB.bind(this);
    }
    static defaultProps = {
        changeItem: () => { }
    };
    changeActiveItem(parent: any, itemid: any, name: any) {
        (this.props as any).changeItem(itemid, name);
        this.setState({ activeItem: parent + itemid });
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
    updateFireStore(favoriteList: any) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.firestore()
                    .collection('user_bookmark')
                    .doc(user.uid)
                    .set({ favorite: favoriteList });
            }
        });
    }
    addFavoriteCB(itemid: any, name: any) {
        const newlist = this.state.favoriteList.concat([{ id: itemid, name: name }]);
        this.setState({ favoriteList: newlist });
        this.updateFireStore(newlist);
    }
    changeFavoriteCB(newfavoriteList: any) {
        this.setState({ favoriteList: newfavoriteList });
        this.updateFireStore(newfavoriteList);
    }
    deleteFavoriteCB(itemid: any) {
        const newfavoriteList = this.state.favoriteList.filter((n: any) => n.id !== itemid);
        this.setState({ favoriteList: newfavoriteList });
        this.updateFireStore(newfavoriteList);
    }
    componentDidMount() {
        this.fetchFireStore();
    }
    render() {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.Sidebar}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={style.WebTitle}><div>FFXIVMarketBord</div></div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemSearch onClickItem={this.changeActiveItem} activeItem={this.state.activeItem} favoriteList={this.state.favoriteList} addFavoriteCB={this.addFavoriteCB}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Favorite favoriteList={this.state.favoriteList} activeItem={this.state.activeItem} onChange={this.changeFavoriteCB} deleteFavoriteCB={this.deleteFavoriteCB} onClickItem={this.changeActiveItem}/>
            </div>);
    }
}
export default Sidebar;
