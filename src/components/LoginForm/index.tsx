import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import {
  Card,
  VStack,
  CardHeader,
  Heading,
  CardBody,
  FormControl,
  Input,
  Button,
} from '@yamada-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../api/firebase'

export const LoginForm = () => {
  const nevigate = useNavigate()

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await signInWithEmailAndPassword(auth, value.email, value.password)
        nevigate({
          to: '/$itemid',
          params: { itemid: '2' },
          search: { dc: 'Elemental' },
        })
      } catch (e) {
        alert(e)
      }
    },
  })

  return (
    <Card
      direction={{ base: 'row', md: 'column' }}
      overflow="hidden"
      variant="outline"
      width={500}>
      <VStack
        as="form"
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}>
        <CardHeader>
          <Heading size="md">FFXIV MarketBoard</Heading>
        </CardHeader>
        <CardBody>
          <FormControl
            isRequired
            label="Email address"
            errorMessage="Email is required.">
            <Field
              name="email"
              children={({ state, handleChange, handleBlur }) => (
                <Input
                  defaultValue={state.value}
                  onChange={e => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="email address"
                />
              )}
            />
          </FormControl>
          <FormControl
            isRequired
            label="Password"
            errorMessage="Password is required.">
            <Field
              name="password"
              children={({ state, handleChange, handleBlur }) => (
                <Input
                  type="password"
                  defaultValue={state.value}
                  onChange={e => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="password"
                />
              )}
            />
          </FormControl>
          <Button type="submit" colorScheme="primary" variant="solid">
            Login
          </Button>
        </CardBody>
      </VStack>
    </Card>
  )
}
