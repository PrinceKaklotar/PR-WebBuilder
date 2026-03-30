import { useSearchParams } from 'react-router-dom'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  const handleReset = async () => {
    await authClient.resetPassword({ 
        newPassword: password,
        token: token!  
    })
    setDone(true)
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-[#0a0a0a]">
      <div className="w-full max-w-xl p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-[#0f0f0f] rounded-3xl p-6 text-white">
          {done ? (
            <p className="text-center text-green-400">Password reset! You can now sign in.</p>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
              <input
                type="password"
                placeholder="New password"
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 mb-4"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                onClick={handleReset}
                className="w-full p-3 rounded-lg bg-purple-600 hover:bg-purple-700"
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword