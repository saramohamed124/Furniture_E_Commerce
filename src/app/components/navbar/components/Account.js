import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import LogoutBtn from './LogoutBtn';
import { cookies } from 'next/headers';

const Account = async({action}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

  return (
    <>
        {!token ? (
    <details className="dropdown ">
        <summary className="flex flex-column gap-2 cursor-pointer p-2.5">
            <Image src={action.icon} alt={`${action.name} icon`} />
            {action.name}</summary>
        <ul className="menu bg-white">
            <li><Link href={'/login'}>Login</Link></li>
            <li><Link href={'/signup'}>New Account</Link></li>
        </ul>
        </details>
    ) : (
    <div className='flex justify-start px-2'>
        <Image src={action.icon} alt={`${action.name} icon`} />
        <p className='text-gray-500'>Hello, user</p>
        <LogoutBtn/>
    </div>
    )}
    </>
  )
}

export default Account
