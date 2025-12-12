
import React from 'react';
import AgentLayout from './AgentLayout';

interface AgentPropertiesProps {
  onNavigate: (page: string) => void;
}

const AgentProperties: React.FC<AgentPropertiesProps> = ({ onNavigate }) => {
  const properties = [
    {
        id: 101,
        title: "Modern Family Home",
        location: "Cantonments, Accra",
        status: "For Sale",
        price: "$450,000",
        type: "House",
        views: 1240,
        image: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
    },
    {
        id: 102,
        title: "Luxury Apartment",
        location: "Osu, Accra",
        status: "For Rent",
        price: "$2,500 / mo",
        type: "Apartment",
        views: 856,
        image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    },
    {
        id: 103,
        title: "Commercial Space",
        location: "Airport City",
        status: "For Rent",
        price: "$5,000 / mo",
        type: "Commercial",
        views: 450,
        image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    },
    {
        id: 104,
        title: "Seaside Land",
        location: "Kokrobite",
        status: "Sold",
        price: "$80,000",
        type: "Land",
        views: 2100,
        image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
    }
  ];

  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-properties" title="My Properties">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Total Listings</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">For Sale</p>
              <h3 className="text-3xl font-bold text-green-600">8</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">For Rent</p>
              <h3 className="text-3xl font-bold text-blue-600">2</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Sold</p>
              <h3 className="text-3xl font-bold text-red-600">45</h3>
          </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
                <input type="text" placeholder="Search properties..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={() => onNavigate('agent-add-property')}
            className="w-full sm:w-auto px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] font-medium text-sm flex items-center justify-center gap-2"
          >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add New Property
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                              property.status === 'For Sale' ? 'bg-[#0A2B4C] text-white' : 
                              property.status === 'For Rent' ? 'bg-[#2563EB] text-white' : 
                              property.status === 'Sold' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                              {property.status}
                          </span>
                      </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{property.type}</p>
                        <h3 className="font-bold text-lg text-[#0A2B4C] mb-1 truncate">{property.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {property.location}
                        </p>
                        <p className="text-lg font-bold text-[#F9A826]">{property.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 border-t border-gray-100 pt-3">
                          <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                              {property.views} Views
                          </div>
                          <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                              5 Photos
                          </div>
                      </div>

                      <div className="flex gap-2 mt-auto">
                          <button className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                              Edit
                          </button>
                          <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                              Duplicate
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded transition-colors" title="Archive">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </AgentLayout>
  );
};

export default AgentProperties;
