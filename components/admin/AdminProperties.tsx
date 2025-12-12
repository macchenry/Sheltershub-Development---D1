
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

interface AdminPropertiesProps {
  onNavigate: (page: string) => void;
}

const AdminProperties: React.FC<AdminPropertiesProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All');

  const properties = [
    { id: 101, title: 'Luxury Villa', location: 'Malibu', type: 'House', price: '$1.2M', status: 'Active', agent: 'Sarah Jenkins' },
    { id: 102, title: 'Downtown Apt', location: 'New York', type: 'Apartment', price: '$850k', status: 'Pending', agent: 'Mike Ross' },
    { id: 103, title: 'Seaside Condo', location: 'Miami', type: 'Condo', price: '$450k', status: 'Active', agent: 'Rachel Zane' },
    { id: 104, title: 'Mountain Cabin', location: 'Aspen', type: 'House', price: '$2.1M', status: 'Archived', agent: 'Harvey Specter' },
    { id: 105, title: 'Modern Loft', location: 'Chicago', type: 'Apartment', price: '$600k', status: 'Active', agent: 'Donna Paulsen' },
  ];

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-properties" title="Manage Properties">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">Filter: All</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">Sort: Newest</button>
            </div>
            <div className="flex gap-3">
                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Import/Export
                 </button>
                 <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add Property
                 </button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3">Property</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Agent</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {properties.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{p.title}</div>
                                <div className="text-xs text-gray-400">{p.location}</div>
                            </td>
                            <td className="px-6 py-4">{p.type}</td>
                            <td className="px-6 py-4">{p.price}</td>
                            <td className="px-6 py-4">{p.agent}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    p.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                    p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {p.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <span>Showing 1-5 of 124 properties</span>
            <div className="flex gap-1">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Prev</button>
                <button className="px-3 py-1 border rounded bg-[#0A2B4C] text-white">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
