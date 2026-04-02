import React, { useEffect, useRef, useState } from 'react'
import type { Message, Project, Version } from '../types';
import { BotIcon, EyeIcon, Loader2Icon, SendIcon, UserIcon } from 'lucide-react';
import api from '@/configs/axios'
import { toast } from 'sonner'
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

  const fetchProject = async () => {
  try {
    const { data } = await api.get(`/api/user/project/${project.id}`)
    setProject(data.project)
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message);
    console.log(error);
  }
}

//   const handleRollback = async (versionId: string) => {
//   try {
//     const confirm = window.confirm('Are you sure you want to rollback to this version?')
//     if (!confirm) return;

//     setChatButton(true);

//     const { data } = await api.get(`/api/project/rollback/${project.id}/${versionId}`);
//     const { data: data2 } = await api.get(`/api/user/project/${project.id}`);

//     toast.success(data.message);
//     setProject(data2.project);
//     setChatButton(false);

//   } catch (error: any) {
//     setChatButton(false);
//     toast.error(error?.response?.data?.message || error.message);
//     console.log(error);
//   }
// };
const handleRollback = async (versionId: string) => {
  try {
    const confirm = window.confirm('Are you sure you want to rollback to this version?')
    if (!confirm) return;
    setChatButton(true)
    const { data } = await api.get(`/api/project/rollback/${project.id}/${versionId}`);
    const { data: data2 } = await api.get(`/api/user/project/${project.id}`);

    toast.success(data.message)
    setProject(data2.project)
    setChatButton(false)

  } catch (error: any) {
    setChatButton(false)
    toast.error(error?.response?.data?.message || error.message);
    console.log(error);
  }
}
// const handelRevision = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!input.trim()) return;

//   try {
//     setChatButton(true);

//     // 🔥 ADD USER MESSAGE IMMEDIATELY (UI update)
//     const newMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input,
//       timestamp: new Date().toISOString(),
//     };

//     setProject({
//       ...project,
//       conversation: [...project.conversation, newMessage],
//     });

//     // 🔥 CALL BACKEND API
//     const res = await fetch(`http://localhost:3000/api/user/project/${project.id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: input,
//       }),
//     });

//     const data = await res.json();

//     // 🔥 UPDATE PROJECT WITH NEW DATA
//     setProject(data.project);

//     setInput(""); // clear input

//   } catch (error) {
//     console.log(error);
//   } finally {
//     setChatButton(false);
//   }
// };



// const handelRevision = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     try {
//         setChatButton(true);

//         // Add user message to UI immediately
//         setProject({
//             ...project,
//             conversation: [...project.conversation, {
//                 id: Date.now().toString(),
//                 role: 'user',
//                 content: input,
//                 timestamp: new Date().toISOString(),
//             }],
//         });

//         setInput('');

//         // ✅ Call correct revision endpoint
//         await api.post(`/api/project/revision/${project.id}`, { message: input });

//         // ✅ Fetch updated project after revision
//         const { data } = await api.get(`/api/user/project/${project.id}`);
//         setProject(data.project);

//         toast.success('Changes made successfully!');
//     } catch (error: any) {
//         toast.error(error?.response?.data?.message || error.message);
//         console.log(error);
//     } finally {
//         setChatButton(false);
//     }
// };

// const handelRevision = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!input.trim()) return;

//   try {
//     setChatButton(true);

//     const { data } = await api.post(`/api/project/revision/${project.id}`, {
//       message: input
//     });

//     setProject(data.project); // 🔥 THIS IS IMPORTANT
//     setInput("");

//   } catch (error: any) {
//     console.log(error);
//   } finally {
//     setChatButton(false);
//   }
// };

const handelRevision = async (e: React.FormEvent) => {
   e.preventDefault();
   let interval : number | undefined;
   try {
  setChatButton(true);
  interval = setInterval(() => {
    fetchProject();
  }, 10000)
  const { data } = await api.post(`/api/project/revision/${project.id}`, {
    message: input
  })
  fetchProject();
  toast.success(data.message)
  setInput('')
  clearInterval(interval)
  setChatButton(false);
} catch (error: any) {
  setChatButton(false);
  toast.error(error?.response?.data?.message || error.message);
  console.log(error);
}
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
                                   <button className='text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded' onClick={()=> handleRollback(ver.id)}>Roll back to this version</button>
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handelRevision(e);
                      }
                    }}
                    rows={2}
                    placeholder="Describe your website..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-200 resize-none"
                    disabled={chatButton}
                  />

                       <button
                        type="submit"
                        disabled={chatButton || !input.trim()}
                        className='p-2 bg-indigo-600 hover:bg-indigo-500 rounded-md'
                      >

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
