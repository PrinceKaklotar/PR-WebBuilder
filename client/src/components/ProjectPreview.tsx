import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';
import EditorPannel from './EditorPannel';
import LoaderSteps from './LoaderSteps';

interface ProjectPreviewProps {
  project: Project;
  ChatButton: boolean;
  device?: 'phone' | 'tablet' | 'desktop';
  showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  ({ project, ChatButton, device = 'desktop', showEditorPanel = true }, ref) => {
    const iframRef = useRef<HTMLIFrameElement>(null);
    const [selectedElement, setSelectedElement] = useState<any>(null);

    const resolution = {
      phone: 'w-[412px]',
      tablet: 'w-[768px]',
      desktop: 'w-full',
    };

    useImperativeHandle(ref,()=>({
      getCode: ()=>{
           const doc = iframRef.current?.contentDocument;
           if(!doc) return undefined;

           // when we click any element on website it will show outline , but when we download the code at that time we have to remove this class

           doc.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach((el)=>{
                 el.classList.remove('ai-selected-element');
                 el.removeAttribute('data-ai-selected');
                 (el as HTMLElement).style.outline = '';
           })

           // now remove injected style + script from the document

           const previewStyle = doc.getElementById('ai-preview-style');
           if(previewStyle) previewStyle.remove();

           const previewScript = doc.getElementById('ai-preview-script');
           if(previewScript) previewScript.remove();

             
           // serialzie clean html
           const html = doc.documentElement.outerHTML;
           return html;
      }
    }))

    // Bug fix 1: moved addEventListener inside effect, added cleanup return
useEffect(() => {
  const handelMessage = (event: MessageEvent) => {
    if (event.data.type === 'ELEMENT_SELECTED') {
      setSelectedElement(event.data.payload);
    } else if (event.data.type === 'CLEAR_SELECTION') {
      setSelectedElement(null);
    }
  };
  window.addEventListener('message', handelMessage);
  return () => window.removeEventListener('message', handelMessage); // ✅ cleanup
}, []);

    const handleUpdate = (updates: any) => {
      if (iframRef.current?.contentWindow) {
        iframRef.current.contentWindow.postMessage(
          { type: 'UPDATE_ELEMENT', payload: updates },
          '*'
        );
      }
    };

    const injectPriview = (html: string) => {
      if (!html) return '';
      if (!showEditorPanel) return html;
      if (html.includes('</body>')) {
        return html.replace('</body>', iframeScript + '</body>');
      }
      return html + iframeScript;
    };

    return (
      <div className="w-full h-full flex justify-center items-start">
        {/* Bug fix 4: was {project.current_code} ? (...) — brace closed too early */}
        {project.current_code ? (
          // Bug fix 5: iframe + EditorPannel wrapped in fragment as siblings
          <>
            <iframe
              ref={iframRef}
              srcDoc={injectPriview(project.current_code)}
              className={`${resolution[device]} border-none`}
              style={{ height: '100%' }}
            />
            {showEditorPanel && selectedElement && (
              <EditorPannel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null);
                  if (iframRef.current?.contentWindow) {
                    iframRef.current.contentWindow.postMessage(
                      { type: 'CLEAR_SELECTION_REQUEST' },
                      '*'
                    );
                  }
                }}
              />
            )}
          </>
        ) : (
          ChatButton && (
            <LoaderSteps/>
          )
        )}
      </div>
    );
  }
);

export default ProjectPreview;