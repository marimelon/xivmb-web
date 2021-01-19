import React from 'react';
import { IndexedDBFunction } from './Common/database';
import  LoadingPage  from './Common/LoadingPage';
class DataLoad extends React.Component {
    state = {
        initDatabase: false
    }
    _isMounted = false; //unmountを判断（エラー防止用）

    componentDidMount = () => {
        //mountされてる
        this._isMounted = true;
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
        if (!this.state.initDatabase) {
            return (
                <LoadingPage/>
            );
        }
        return this.props.children;
    }
}

export default DataLoad;