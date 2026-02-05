'use client'

import { logout } from '@/app/actions/auth'
import { LogOutIcon } from 'lucide-react'
import React from 'react'

const LogoutBtn = () => {
    
  return (
    <button className='cursor-pointer' onClick={
        async() => await logout()
    }>
      <LogOutIcon size={20}/>
    </button>
  )
}

export default LogoutBtn
