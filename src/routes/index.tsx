import { createFileRoute, redirect } from '@tanstack/react-router'

import { get_user } from '../api/firebase'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    if (!(await get_user())) {
      throw redirect({ to: '/login' })
    }
    throw redirect({
      to: '/$itemid',
      params: { itemid: '2' },
      search: { dc: 'Elemental' },
    })
  },
  component: Index,
})

function Index() {
  return <div>loading</div>
}
