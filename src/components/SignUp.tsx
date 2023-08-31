import { FC } from 'react'
import { Icons } from './Icons'
import Link from 'next/link';
import UserAuthForm from './UserAuthForm';


const SignUp: FC = () => {
  return <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
    <div className="flex flex-col space-y-2 text-center">
      <Icons.logo className='mx-auto h-6 w-6' />
      <h1 className="text-2xl font-semibold tracking-tight">Регистрация</h1>
      <p className='text-sm max-w-xs mx-auto '>
        Продолжая вы регистрируете аккаунт в Breadit и соглашаетесь на наше Пользовательское соглашение и Политику Конфиденциальности.
      </p>
      {/* sign in form */}

      <UserAuthForm className='' />
      <p className='px-8 text-center text-sm text-zinc-700 '>
        Уже есть аккаунт в Breadit?{' '}
        <Link href="/sign-in" className='hover:text-zinc-800 text-sm underline-offset-4'>Войти</Link>
      </p>
    </div>
  </div>
}

export default SignUp