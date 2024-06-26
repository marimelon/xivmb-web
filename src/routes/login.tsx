import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@yamada-ui/react'

import { LoginForm } from '../components/LoginForm'

export const Route = createFileRoute('/login')({
  component: Index,
})

function Index() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Container centerContent>
        <LoginForm />
      </Container>
    </div>
  )
}
