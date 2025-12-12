
import React from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencyPropertiesProps {
  onNavigate: (page: string) => void;
}

const AgencyProperties: React.FC<AgencyPropertiesProps> = ({ onNavigate }) => {
  const properties = [
    { id: 101, title: 'Luxury Villa', location: 'East Legon', price: '$1.2M', agent: 'Sarah Jenkins', status: 'Active' },
    { id: 102, title: 'Downtown Apt', location: 'Osu', price: '$850k', agent: 'Michael Ofori', status: 'Pending' },
    { id: 103, title: 'Seaside Condo', location: 'Labadi', price: '$450k', agent: 'Sarah Jenkins', status: 'Active' },
    { id: 104, title: 'Warehouse', location: 'Tema', price: '$2.1M', agent: 'Unassigned', status: 'Active' },
  ];

  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-properties" title="Managed Properties">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">All</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Active</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Pending</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Sold</button>
                </div>
                <div className="flex gap-3">
                     <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                        Export List
                     </button>
                     <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm">
                        Add Property
                     </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Property</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Assigned Agent</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {properties.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                                <td className="px-6 py-4">{p.location}</td>
                                <td className="px-6 py-4 font-bold text-[#F9A826]">{p.price}</td>
                                <td className="px-6 py-4">
                                    {p.agent === 'Unassigned' ? (
                                        <span className="text-red-500 italic text-xs">Unassigned</span>
                                    ) : (
                                        <span className="text-gray-700">{p.agent}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium mr-2">Edit</button>
                                    <button className="text-gray-500 hover:text-gray-700 text-xs font-medium">Reassign</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </AgencyLayout>
  );
};

export default AgencyProperties;
