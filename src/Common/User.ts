import firebase from '../Common/firebase';
class User {
    constructor() {
        (this as any).isLogin = false;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                (this as any).isLogin = true;
            }
        });
    }
}
export default new User();
