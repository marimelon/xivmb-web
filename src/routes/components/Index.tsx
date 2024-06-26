import { createFileRoute } from '@tanstack/react-router'
import {
  VStack,
  FormControl,
  Input,
  Card,
  Container,
  CardHeader,
  Heading,
} from '@yamada-ui/react'

export function Index() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Container centerContent>
        <Card
          direction={{ base: 'row', md: 'column' }}
          overflow="hidden"
          variant="outline">
          <CardHeader>
            <Heading size="md">『SLAM DUNK』（スラムダンク）</Heading>
          </CardHeader>
          <VStack>
            <FormControl
              isRequired
              label="Email address"
              errorMessage="Email is required.">
              <Input type="email" placeholder="your email address" />
            </FormControl>
            <FormControl
              isRequired
              label="Password"
              errorMessage="Email is required.">
              <Input type="password" placeholder="password" />
            </FormControl>
          </VStack>
        </Card>
      </Container>
    </div>
  )
}

export const Route = createFileRoute('/components/Index')({
  component: () => <div>Hello /Index!</div>,
})
