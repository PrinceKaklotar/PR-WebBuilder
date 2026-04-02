import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import ProjectPreview from '../components/ProjectPreview';
import type { Project, Version } from '../types';
import api from '@/configs/axios';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const Preview = () => {
 const{data : session,isPending} = authClient.useSession();
  const {projectId,versionID} = useParams();
  const [code,setCode] = useState('')
  const [loading,setLoading] = useState(true);

  const fetchCode = async () => {
        try {
            const {data} = await api.get(`/api/project/preview/${projectId}`)
            setCode(data.project.current_code)
            if(versionID) {
                data.project.versions.forEach((version: Version) => {
                  if(version.id===versionID) {}
                  setCode(version.code)
                })
            }

            setLoading(false);
        } catch (error:any) {
             console.log(error);
              toast.error(error?.response?.data?.message || error.message)
        }
      
    }
    useEffect(()=>{
      if(!isPending && session?.user) {
           fetchCode()
      }
 
    },[session?.user])
  
    if(loading){
      return (
<div className="fixed inset-0 flex items-center justify-center bg-black z-50">
  <div className="relative">
    <div className="absolute inset-0 rounded-full bg-blue-500 blur-2xl opacity-60 animate-pulse"></div>
    <Loader2Icon className="w-20 h-20 text-blue-400 animate-spin" />
  </div>
</div>
      )
    }

  return (
    <div className='h-screen'>
        {code && <ProjectPreview project = {{current_code : code} as Project} ChatButton={false} showEditorPanel={false}/>}
    </div>
  )
}

export default Preview
