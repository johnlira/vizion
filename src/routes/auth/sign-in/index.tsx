import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex flex-col items-center justify-center h-screen'>
    <p className='text-2xl font-bold'>Sign In</p>
  </div>
}
