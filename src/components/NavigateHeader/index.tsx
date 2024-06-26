import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Divider, HStack, Text } from '@yamada-ui/react'
import { signOut } from 'firebase/auth'

import { auth } from '../../api/firebase'
import { XIVDataCenters } from '../../types/world'

type Props = {}

export const NavigateHeader = ({}: Props) => {
  const navigate = useNavigate()
  const routeSearch = useSearch({ strict: false })

  return (
    <HStack justifyContent="flex-end">
      {XIVDataCenters.filter(w => w !== routeSearch.dc).map(w => (
        <Link key={w} search={() => ({ dc: w })}>
          <Text _before={{ fontFamily: 'xivfonts', content: '"\\e075"' }}>
            {w}
          </Text>
        </Link>
      ))}
      <Divider orientation="vertical" variant="solid" />
      <Text
        cursor="pointer"
        onClick={() => {
          signOut(auth).finally(() => {
            navigate({ to: '/login' })
          })
        }}>
        Logout
      </Text>
    </HStack>
  )
}
