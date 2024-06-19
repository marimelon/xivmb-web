import { createFileRoute, redirect } from '@tanstack/react-router'

import { get_user } from '../client/firebase/firebase'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const user = await get_user()
    if (user === null) {
      throw redirect({ to: '/login' })
    }
    throw redirect({
      to: '/$itemId',
      params: { itemId: '2' },
      search: { dc: 'Elemental' },
    })
  },
  component: () => <div></div>,
})
