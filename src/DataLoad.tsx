import React from 'react';
import { IndexedDBFunction } from './Common/database';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Common/LoadingPage' was resolved to '/ro... Remove this comment to see the full error message
import  LoadingPage  from './Common/LoadingPage';

type State = any;
class DataLoad extends React.Component<{}, State> {
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
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <LoadingPage/>
            );
        }
        return this.props.children;
    }
}

export default DataLoad;