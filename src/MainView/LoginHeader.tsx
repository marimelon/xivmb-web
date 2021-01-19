import React, { useState, useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { withRouter } from 'react-router';
import firebase from '../Common/firebase'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './LoginHeader.module.scss' or ... Remove this comment to see the full error message
import style from './LoginHeader.module.scss';
const LoginHeader = ({
    history
}: any) => {
    const [user, setState] = useState(null);
    useEffect(() => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Dispatch<SetStateAction<null>>' ... Remove this comment to see the full error message
        firebase.auth().onAuthStateChanged(setState)
    }, []);
    const login = () => {
        history.push('/login')
    }
    const logout = () => {
        firebase.auth().signOut()
            .then(_ => { setState(null) },
                err => { console.log(err) });
    }
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={style.LoginHeader}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div
                className={style.logout}
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: string; className: any; href: st... Remove this comment to see the full error message
                href="#"
                onClick={() => {
                    if (user) { logout() }
                    else { login() }
                }}>
                {user ? "Logout" : "Login"}
            </div>
        </div>);
}

export default withRouter(LoginHeader);