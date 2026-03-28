import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPannel = ({ selectedElement, onUpdate, onClose }: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  const handelChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handelStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };

  return (
    <div className='absolute right-0 top-0 h-full w-72 bg-gray-900 border-l border-gray-700 shadow-xl z-50 overflow-y-auto'>

      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-700 sticky top-0 bg-gray-900 z-10'>
        <h3 className='text-sm font-semibold text-white tracking-wide'>Edit Element</h3>
        <button
          onClick={onClose}
          className='p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      {/* Body */}
      <div className='p-4 space-y-5'>

        {/* Tag badge */}
        <div className='flex items-center gap-2'>
          <span className='text-xs text-gray-400'>Tag:</span>
          <span className='text-xs bg-indigo-600 text-white px-2 py-0.5 rounded font-mono'>
            {values.tagName}
          </span>
        </div>

        {/* Text Content */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            Text Content
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handelChange('text', e.target.value)}
            rows={3}
            className='w-full bg-gray-800 text-gray-100 text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 resize-none placeholder-gray-500'
            placeholder='Enter text...'
          />
        </div>

        {/* Class Name */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            Class Name
          </label>
          <input
            type='text'
            value={values.className || ''}
            onChange={(e) => handelChange('className', e.target.value)}
            className='w-full bg-gray-800 text-gray-100 text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500'
            placeholder='e.g. text-lg font-bold'
          />
        </div>

        {/* Divider */}
        <div className='border-t border-gray-700' />

        {/* Padding & Margin */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Padding
            </label>
            <input
              type='text'
              value={values.styles.padding}
              onChange={(e) => handelStyleChange('padding', e.target.value)}
              className='w-full bg-gray-800 text-gray-100 text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500'
              placeholder='e.g. 8px'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Margin
            </label>
            <input
              type='text'
              value={values.styles.margin}
              onChange={(e) => handelStyleChange('margin', e.target.value)}
              className='w-full bg-gray-800 text-gray-100 text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500'
              placeholder='e.g. 16px'
            />
          </div>
        </div>

        {/* Font Size */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            Font Size
          </label>
          <input
            type='text'
            value={values.styles.fontSize}
            onChange={(e) => handelStyleChange('fontSize', e.target.value)}
            className='w-full bg-gray-800 text-gray-100 text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500'
            placeholder='e.g. 16px'
          />
        </div>

        {/* Divider */}
        <div className='border-t border-gray-700' />

        {/* backgroundColor Color */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            backgroundColor Color
          </label>
          <div className='flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-md px-3 py-2'>
            <input
              type='color'
              value={
                values.styles.backgroundColor === 'rgba(0,0,0,0)'
                  ? '#ffffff'
                  : values.styles.backgroundColor
              }
              onChange={(e) => handelStyleChange('backgroundColor', e.target.value)}
              className='w-8 h-8 rounded cursor-pointer border-0 bg-transparent'
            />
            <span className='text-xs text-gray-400 font-mono'>
              {values.styles.backgroundColor}
            </span>
          </div>
        </div>

        {/* Text Color */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            Text Color
          </label>
          <div className='flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-md px-3 py-2'>
            <input
              type='color'
              value={values.styles.color}
              onChange={(e) => handelStyleChange('color', e.target.value)}
              className='w-8 h-8 rounded cursor-pointer border-0 bg-transparent'
            />
            <span className='text-xs text-gray-400 font-mono'>
              {values.styles.color}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorPannel;