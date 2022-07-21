import { signInWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap'
import * as Yup from 'yup'
import { auth } from './Common/firebase'

const Signin = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = (email: string, password: string) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(ret => {
        setLoading(false)
        history.push('/')
      })
      .catch(error => {
        setLoading(false)
        alert(error)
      })
  }

  return (
    <div className="container" style={{ color: 'black' }}>
      <div
        className="mx-auto"
        style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}
      >
        <p style={{ textAlign: 'center' }}>Sign in to FFXIVMarket</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => onSubmit(email, password)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.email && errors.email ? true : false}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.password && errors.password ? true : false}
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <div style={{ textAlign: 'center' }}>
                <Button color="primary" type="submit" disabled={loading}>
                  <Spinner
                    size="sm"
                    color="light"
                    style={{ marginRight: 5 }}
                    hidden={!loading}
                  />
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Signin
