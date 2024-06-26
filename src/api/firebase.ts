import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

const firebaseApp = initializeApp(config)

export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

export const get_user = async () => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(
      auth,
      user => {
        resolve(user)
      },
      error => {
        reject(error)
      },
    )
  })
}

export const get_token = async (forceRefresh: boolean = false) => {
  const user = await get_user()
  if (user == null) {
    throw Error('Not authenticated')
  }

  return await user.getIdToken(forceRefresh)
}

// type UserContextType = User | undefined

// const UserContext = createContext<UserContextType>(undefined)

// let __local_user: UserContextType = undefined

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const navigate = useNavigate()

//   if (typeof window !== 'undefined' && __local_user === undefined) {
//     throw get_user().then(_user => {
//       if (_user === null) {
//         navigate({ to: '/login' })
//         return
//       }
//       __local_user = _user
//     })
//   }

//   return (
//     <UserContext.Provider value={__local_user}>{children}</UserContext.Provider>
//   )
// }

// export const useUser = () => {
//   const navigate = useNavigate()
//   const user = useContext(UserContext)
//   const _signOut = () => {
//     signOut(auth).finally(() => {
//       navigate({ to: '/login' })
//     })
//   }
//   return { user, signOut: _signOut }
// }
