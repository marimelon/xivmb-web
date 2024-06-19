import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginPage } from '../login'

export const Route = createLazyFileRoute('/login')({
  component: LoginPage
})
