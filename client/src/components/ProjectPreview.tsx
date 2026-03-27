import React, { forwardRef, useRef } from 'react';
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';

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
  (
    {
      project,
      ChatButton,
      device = 'desktop',
      showEditorPanel = true,
    },
    ref
  ) => {
    const iframRef = useRef<HTMLIFrameElement>(null);

    const resolution = {
      phone: 'w-[412px]',
      tablet: 'w-[768px]',
      desktop: 'w-full',
    };

    const injectPriview = (html: string) => {
      if (!html) return '';
      if (!showEditorPanel) return html;

      if (html.includes('</body>')) {
        return html.replace('</body>', iframeScript + '</body>');
      } else {
        return html + iframeScript;
      }
    };

    return (
      <div className="w-full h-full flex justify-center items-center">
        {project.current_code ? (
          <iframe
            ref={iframRef}
            srcDoc={injectPriview(project.current_code)}
            className={`${resolution[device]} h-full border-none`}
          />
        ) : (
          ChatButton && <div>Loading..</div>
        )}
      </div>
    );
  }
);

export default ProjectPreview;