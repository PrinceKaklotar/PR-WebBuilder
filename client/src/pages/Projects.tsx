import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams , Link} from 'react-router-dom'
import type { Project } from '../types';
import { DownloadIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon, MessageSquareIcon, PhoneIcon, SaveIcon, SmartphoneIcon, TabletIcon, UploadIcon, XIcon } from 'lucide-react';
import { dummyConversations, dummyProjects , assets, dummyVersion} from '../assets/assets';
import Sidebar from '../components/Sidebar';
import ProjectPreview, { type ProjectPreviewRef } from '../components/ProjectPreview';


const Projects = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState(350);
   const isResizing = useRef(false);
  const [project,setProject] = useState<Project | null>(null);
  const [loading,setLoading] = useState(true);
  const [chatButton,setChatButton] = useState(true);
  const [device,setdivice] = useState<'phone' | 'tablet' | 'desktop'>("desktop");

  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const [isSaving,setIsSeving] = useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    const project = dummyProjects.find(project => project.id == projectId)
    setTimeout(()=>{
      if(project) {
        setProject({...project,conversation:dummyConversations , versions:dummyVersion}),
        setLoading(false);
        setChatButton(project.current_code ? false:true)
      }
    },2000)

  }

  const SaveProject = async () => {
    
  }

  const DownloadCode = () => {

  }

  const TogglePublish = async () => {
    
  }

  const startResize = () => {
  isResizing.current = true;
};

const stopResize = () => {
  isResizing.current = false;
};

const resize = (e: MouseEvent) => {
  if (isResizing.current) {
    setSidebarWidth(e.clientX);
  }
};


    useEffect(() => {
    fetchProject();
  },[])

  useEffect(() => {
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", stopResize);

  return () => {
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  };
}, []);

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
    
   
    <div className='flex flex-col h-screen w-full bg-gray-900 text-white relative'>
    
    {/* builder navbar */}

        <div className='flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar'>
             
          {/* ------------------- left------------------------------------- */}
            <div className="flex items-center gap-4 flex-1">

              <img
                src={assets.logo3}
                alt="logo"
                className="h-10 cursor-pointer"
                onClick={() => navigate('/')}
              />

              <div className="flex flex-col">
                <p className="font-semibold text-sm sm:text-base ">{project.name}</p>
                <p className="text-xs text-gray-400">
                  Previewing your last saved version..
                </p>
              </div>

              <div className="sm:hidden ml-auto cursor-pointer">
                {isMenuOpen ? (
                  <MessageSquareIcon onClick={() => setIsMenuOpen(false)} />
                ) : (
                  <XIcon onClick={() => setIsMenuOpen(true)} />
                )}
              </div>
            {/* ---------------------------middle------------------------- */}
             
              <div className='hidden sm:flex gap-2 ml-20  bg-gray-950 p-1.5 rounded-md'>
                  <SmartphoneIcon onClick={()=> setdivice('phone')} className = 
                    {`size-6 p1 rounded cursor-pointer ${device === 'phone' ? "bg-gray-700" : ""}`} />

                  <TabletIcon onClick={()=> setdivice('tablet')} className = 
                    {`size-6 p1 rounded cursor-pointer ${device === 'tablet' ? "bg-gray-700" : ""}`} />

                  <LaptopIcon onClick={()=> setdivice('desktop')} className = 
                    {`size-6 p1 rounded cursor-pointer ${device === 'desktop' ? "bg-gray-700" : ""}`} />
                </div>
            </div>
    
          {/* right */}
          <div className="flex items-center gap-3 ml-auto">

            <button disabled={isSaving} onClick={SaveProject} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">

              {isSaving ? <Loader2Icon className="animate-spin"/> : <SaveIcon className="w-4 h-4" />} Save
            
            </button>

            <Link
              target="_blank"
              to={`/preview/${projectId}`}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-sm"
            >
              <FullscreenIcon className="w-4 h-4" />
              Preview
            </Link>

            <button onClick={DownloadCode} className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
              <DownloadIcon className="w-4 h-4"/> Download
            </button>

            <button onClick={TogglePublish} className="flex items-center gap-1.5 px-3 py-1.5 text-black font-bold bg-green-600 hover:bg-green-500 rounded-md text-sm font-medium">
              {project.isPublished ? <EyeOffIcon size={16}/> :  <EyeIcon size={16}/> }
               {project.isPublished ? "Unpublish" :  "Publish"  }
            
            </button>

          </div>

        </div>

    {/* navbar finish */}
         
    <div className="flex-1 flex pt-2 overflow-hidden">

  {/* Sidebar */}
  <div style={{ width: sidebarWidth }} className="h-full">
    <Sidebar
      isMenuOpen={isMenuOpen}
      project={project}
      setProject={(p)=>setProject(p)}
      chatButton={chatButton}
      setChatButton={setChatButton}
    />
  </div>

  {/* Drag Divider */}
  <div
    onMouseDown={startResize}
    className="w-1 cursor-col-resize bg-gray-700 hover:bg-indigo-500 transition"
  />

  {/* Project Preview */}
  <div className="flex-1 pl-4 h-full overflow-hidden">
  <div className="w-full h-full bg-white text-black font-bold rounded-2xl overflow-hidden">
        <ProjectPreview 
        ref={previewRef}
        project={project}
        ChatButton={chatButton}
        device={device}
        
        />
        </div>
  </div>

</div>
      
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
