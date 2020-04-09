import firebase from '../Common/firebase'

class User {
    constructor() {
        this.isLogin = false
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.isLogin = true
            }
        })
    }
}

export default new User();