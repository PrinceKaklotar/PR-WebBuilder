import { AccountSettingsCards,ChangePasswordCard,DeleteAccountCard  } from '@daveyplate/better-auth-ui'
import React from 'react'

const Settings = () => {
  return (
    <div className="w-full p-4 flex justify-center items-center min-h-[90vh] bg-[#0a0a0a] felx flex-col gap-y-5">
      
      <div className="w-full max-w-xl p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        
        <div className="bg-[#0f0f0f] rounded-3xl p-6">
          <AccountSettingsCards />
        </div>

      </div>
       <div className=" w-full max-w-xl p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            <ChangePasswordCard />
       </div>

       <div className=" w-full max-w-xl p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            < DeleteAccountCard/>
       </div>



    </div>
  )
}

export default Settings