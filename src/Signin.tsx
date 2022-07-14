import { Formik } from 'formik'
import React, { useState } from 'react'
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
import firebase from './Common/firebase'

const Signin: React.FC = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
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
        <p style={{ textAlign: 'center' }}>サインイン</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
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
                  ログイン
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
