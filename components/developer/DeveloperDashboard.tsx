
import React from 'react';
import DeveloperLayout from './DeveloperLayout';

interface DeveloperDashboardProps {
  onNavigate: (page: string) => void;
}

const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ onNavigate }) => {
  const projects = [
    {
        id: 1,
        name: "The Royal Gardens",
        location: "East Legon, Accra",
        status: "Active",
        units: 45,
        sold: 28,
        image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
        lastUpdated: "2 days ago"
    },
    {
        id: 2,
        name: "Atlantic View Heights",
        location: "Takoradi, Western",
        status: "Pending",
        units: 30,
        sold: 0,
        image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
        lastUpdated: "1 week ago"
    },
    {
        id: 3,
        name: "Safari Valley Estates",
        location: "Aburi, Eastern",
        status: "Completed",
        units: 12,
        sold: 12,
        image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
        lastUpdated: "1 month ago"
    }
  ];

  return (
    <DeveloperLayout onNavigate={onNavigate} activePage="developer-dashboard" title="My Projects">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Total Projects</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Active Units</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">145</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Revenue (YTD)</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">$2.4M</h3>
          </div>
      </div>

      <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Project List</h2>
          <button 
            onClick={() => onNavigate('developer-add-project')}
            className="px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] font-medium text-sm flex items-center gap-2"
          >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add New Project
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                              project.status === 'Active' ? 'bg-green-100 text-green-700' : 
                              project.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                              {project.status}
                          </span>
                      </div>
                  </div>
                  <div className="p-5">
                      <h3 className="font-bold text-lg text-[#0A2B4C] mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          {project.location}
                      </p>
                      
                      <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Sales Progress</span>
                              <span>{Math.round((project.sold / project.units) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-[#0A2B4C] h-2 rounded-full" style={{ width: `${(project.sold / project.units) * 100}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                              <span>{project.sold} Sold</span>
                              <span>{project.units} Total Units</span>
                          </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                          <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded">
                              Edit
                          </button>
                          <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded">
                              Manage Agents
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </DeveloperLayout>
  );
};

export default DeveloperDashboard;
