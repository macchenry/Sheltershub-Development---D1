
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminPageEditorProps {
  onNavigate: (page: string) => void;
  pageName: string;
  userRole: string;
}

const AdminPageEditor: React.FC<AdminPageEditorProps> = ({ onNavigate, pageName, userRole }) => {
  // Mock function to format page name for display
  const displayTitle = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Changes saved for ${displayTitle}`);
  };

  return (
    <AdminLayout onNavigate={onNavigate} activePage={`admin-edit-${pageName}`} title={`Edit Page: ${displayTitle}`} userRole={userRole}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#0A2B4C]">Page Content Editor</h2>
            <div className="text-sm text-gray-500">Last updated: 2 hours ago by Admin</div>
        </div>
        
        <p className="text-gray-500 mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm">
            You are currently editing the content for the <strong>{displayTitle}</strong> page. 
            Changes made here will reflect on the live site after saving.
        </p>
        
        <form className="space-y-8" onSubmit={handleSave}>
            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title (Browser Title)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" defaultValue={displayTitle} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slug / URL</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-100 text-gray-500" defaultValue={`/${pageName}`} disabled />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Meta Description</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" rows={3} defaultValue={`Find the best real estate deals on Sheltershub - ${displayTitle}.`}></textarea>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Content Editor Mock */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Main Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="font-bold text-serif">B</span></button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="italic font-serif">I</span></button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="underline font-serif">U</span></button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H1</button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H2</button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H3</button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center text-xs gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Image
                        </button>
                    </div>
                    {/* Editable Area */}
                    <div className="p-4 h-96 overflow-y-auto bg-white text-gray-800 text-sm leading-relaxed" contentEditable suppressContentEditableWarning>
                        <h1 className="text-2xl font-bold mb-4">{displayTitle}</h1>
                        <p className="mb-4">This is a placeholder for the rich text editor content. Administrators and Editors can modify the text, images, and layout of this page here.</p>
                        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <ul>
                            <li>Feature list item 1</li>
                            <li>Feature list item 2</li>
                            <li>Feature list item 3</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-2.5 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors">Save & Publish</button>
            </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
