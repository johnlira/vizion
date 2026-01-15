import { Outlet, createRootRoute } from '@tanstack/react-router'
import { UserProvider } from '@/contexts/user-context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  )
}
