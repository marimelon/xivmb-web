import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import firebase from '../Common/firebase'
import style from './LoginHeader.module.scss';
const LoginHeader = ({ history }) => {
    const [user, setState] = useState(null);
    useEffect(() => {
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
        <div className={style.LoginHeader}>
            <a
                className={style.logout}
                href="#"
                onClick={() => {
                    if (user) { logout() }
                    else { login() }
                }}>
                {user ? "Logout" : "Login"}
            </a>
        </div>);
}

export default withRouter(LoginHeader);