import { Outlet, createRootRoute } from '@tanstack/react-router'
import { UserProvider } from '@/contexts/user-context'
import { ImagesProvider } from '@/contexts/images-context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <UserProvider>
      <ImagesProvider>
        <Outlet />
      </ImagesProvider>
    </UserProvider>
  )
}
