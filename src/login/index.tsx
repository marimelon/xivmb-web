import { useNavigate } from '@tanstack/react-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'

import { auth } from '../client/firebase/firebase'

export const LoginPage = () => {
  const nevigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          nevigate({ to: '/$itemId', params: { itemId: '2' } })
        })
        .catch(error => {
          alert(error)
        })
    },
  })

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  )
}
