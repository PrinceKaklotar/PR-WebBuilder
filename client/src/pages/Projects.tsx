import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types';
import { Loader2Icon } from 'lucide-react';
import { dummyConversations, dummyProjects } from '../assets/assets';

const Projects = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();

  const [project,setProject] = useState<Project | null>(null);
  const [loading,setLoading] = useState(true);
  const [chatButon,setChatButton] = useState(true);
  const [device,setdivive] = useState<'phone' | 'tablet' | 'desktop'>("desktop");

  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const [isSaving,setIsSeving] = useState(false);

  const fetchProject = async () => {
    const project = dummyProjects.find(project => project.id == projectId)
    setTimeout(()=>{
      if(project) {
        setProject({...project,conversation:dummyConversations}),
        setLoading(false);
        setChatButton(project.current_code ? false:true)
      }
    },2000)

  }
    useEffect(() => {
    fetchProject();
  },[])

 if (loading) {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    </>
  );
}

  return project ? (
    <div>
       <h1>Projects</h1>
    </div>
  )
  :
  (
    <div className='flex items-center justify-center h-screen'>
       <p className='text-amber-300 text-3xl'>Unable to load the Project!</p>
    </div>
  )
}

export default Projects
