export const metadata = {
  title: 'Description',
  description: 'Manage your account settings'
}

import UsernameForm from '@/components/UsernameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'



const page = async ({ }) => {

  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || '/sign-in')
  }

  return <div className='max-w-4xl mx-auto py-12'>
    <div className="grid items-start gap-8 mb-4">
      <h1 className='font-bold text-3xl sm:text-4xl'>Setting</h1>
    </div>

    <div className="grid gap-10">
      <UsernameForm user={{
        id: session.user.id,
        username: session.user.username || ''
      }} />
    </div>
  </div>
}

export default page