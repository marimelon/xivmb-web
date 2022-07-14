import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
  apiKey: 'AIzaSyBK3yG6oqn9OB_sAF25VBn3k1-M0xjduE8',
  authDomain: 'ffxivmarkettool.firebaseapp.com',
  databaseURL: 'https://ffxivmarkettool.firebaseio.com',
  projectId: 'ffxivmarkettool',
  storageBucket: 'ffxivmarkettool.appspot.com',
  messagingSenderId: '486314008620',
  appId: '1:486314008620:web:02a23ac6092fb89dadb189',
  measurementId: 'G-C0F7WK1FL1',
}

firebase.initializeApp(config)

export const get_user = async () => {
  return new Promise<firebase.User | null>((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user)
    })
  })
}

export const get_token = async (forceRefresh: boolean = false) => {
  var user = await get_user()
  if (user == null) {
    throw Error('Not authenticated')
  }

  return await user.getIdToken(forceRefresh)
}

export default firebase
