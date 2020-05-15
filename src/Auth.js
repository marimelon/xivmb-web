import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Common/firebase';
import { IndexedDBFunction } from './Common/database';

import  LoadingPage  from './Common/LoadingPage';

class Auth extends React.Component {

    state = {
        signinCheck: false, //ログインチェックが完了してるか
        signedIn: false, //ログインしてるか
        initDatabase: false
    }

    _isMounted = false; //unmountを判断（エラー防止用）

    componentDidMount = () => {
        //mountされてる
        this._isMounted = true;

        //ログインしてるかどうかチェック
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: true,
                    });
                }
            } else {
                if (this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: false,
                    });
                }
            }
        })

        //データベース初期化
        IndexedDBFunction().then(event => {
            if (this._isMounted) {
                this.setState({
                    initDatabase: true
                });
            }
        }).catch(event => {
            alert("Database error: " + event.target.errorCode);
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        //チェックが終わってないなら（ローディング表示）
        if (!this.state.signinCheck || !this.state.initDatabase) {
            return (
                <LoadingPage/>
                //<LoadingOverlay
                //    active={true}
                //    spinner
                //    text='Loading...'
                //>
                //</ LoadingOverlay>
            );
        }

        //チェックが終わりかつ
        if (this.state.signedIn) {
            //サインインしてるとき（そのまま表示）
            return this.props.children;
        } else {
            //してないとき（ログイン画面にリダイレクト）
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;