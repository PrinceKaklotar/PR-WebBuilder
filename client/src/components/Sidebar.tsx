import React, { useEffect, useRef, useState } from 'react'
import type { Message, Project, Version } from '../types';
import { BotIcon, EyeIcon, Loader2Icon, SendIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps{
   isMenuOpen : boolean;
   project: Project,
   setProject: (project:Project) => void;
   chatButton : boolean;
   setChatButton : (chatButton : boolean) => void;

}
const Sidebar = ({isMenuOpen,project,setProject,chatButton,setChatButton} : SidebarProps) => {

  const messageRef = useRef<HTMLDivElement>(null);
  const [input,setInput] = useState('');

  const handelRollback = async (versionId:string) => {
    
  }

  const handelRevision = async (e:React.FormEvent) => {
      e.preventDefault();
      setChatButton(true);
      setTimeout(()=> {
         setChatButton(false)
      },3000)

  }
  useEffect(()=>{
     if(messageRef.current) {
        messageRef.current.scrollIntoView({behavior: 'smooth'})
     }
  },[project.conversation.length,chatButton])
  return (

    <div className= {`h-full rounded-xl bg-gray-900 border-gray-800 transition-all ${isMenuOpen ? 'max-sm:w-0 overflow-hidden' : 'w-full'}`}>

       <div className='flex flex-col h-full'>

           {/* messege container  */}
             <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                 {[...project.conversation,...project.versions].sort((a,b)=> new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map((message)=>{
                    const isMessage = 'content' in message;

                     if(isMessage){
                       const msg = message as Message;
                       const isUser = msg.role === 'user';
                       return (
                           <div key={msg.id} className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}>

                           {!isUser && (
                                 <div className='p-2 bg-gray-800 rounded-full'>
                                   <BotIcon className='size-4 text-white'/>
                                 </div>
                              )}

                              <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm 
                              ${isUser 
                              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white" 
                              : "bg-gray-800 text-gray-100"}`}>

                                {msg.content}

                              </div>


                               {isUser && (
                                <div className='p-2 bg-indigo-600 rounded-full'>
                                   <UserIcon className='size-4 text-white'/>
                                </div>
                              )}

                        </div>
                       )
                     }
                     else {
                       const ver = message as Version;
                       return (
                        <div key={ver.id} className='bg-gray-800 p-3 rounded-lg text-sm flex justify-between items-center'>

                             <div className='text-gray-300'>
                                Code Updated <br />
                                <span className='text-xs text-gray-500'>
                                   {new Date(ver.timestamp).toLocaleString()}
                                </span>
                              </div>

                               <div className='flex items-center gap-2'>
                                 {project.current_version_index === ver.id ? (
                                   <button className='text-xs bg-green-600 px-2 py-1 rounded'> Curent Version</button>
                                 ): (
                                   <button className='text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded' onClick={()=> handelRollback(ver.id)}>Roll back to this version</button>
                                 )}
                                 <Link className='p-1 hover:bg-gray-700 rounded' target='_blank' to={`/preview/${project.id}/${ver.id}`}>
                                   <EyeIcon className='size-4'/>
                                 </Link>
                              </div>
                        </div>
                       )
                     }
                 })}

                     {chatButton&& (
                   <div className='flex items-center gap-2'>

                       <div className='p-2 bg-gray-800 rounded-full'>
                           <BotIcon className='size-4'/>
                       </div>

                       <div className='flex gap-1'>
                         <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'/>
                         <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]'/>
                         <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]'/>
                       </div>

                   </div>
                 )}

                 <div ref={messageRef}/>
            </div>
            
            {/* input area */}
            <div className='border-t border-gray-800 p-3'>

              <form onSubmit={handelRevision} className='relative'>

                  <div className='flex items-end gap-2 bg-gray-800 rounded-lg p-2'>

                       <textarea
                       onChange={(e)=> setInput(e.target.value)}
                       rows={2}
                       placeholder='Describe your website...'
                       className='flex-1 bg-transparent outline-none text-sm text-gray-200 resize-none'
                       disabled={chatButton}
                       />

                        <button disabled={chatButton || !input.trim()} className='p-2 bg-indigo-600 hover:bg-indigo-500 rounded-md'>

                           {chatButton 
                           ? <Loader2Icon className='animate-spin text-white size-4'/> 
                           : <SendIcon className='text-white size-4'/> }

                        </button>

                  </div>

              </form>

            </div>
         
       </div>
      
    </div>
  )
}

export default Sidebar
