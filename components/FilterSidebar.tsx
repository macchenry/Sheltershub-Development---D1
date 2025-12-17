
import React, { useState } from 'react';

const FilterSidebar: React.FC = () => {
  // These states are for visual interactivity of the UI components
  const [activeTab, setActiveTab] = useState('For Rent');
  
  return (
    <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
      {/* Top Tabs */}
      <div className="flex space-x-6 mb-6 text-sm font-medium border-b border-gray-100 pb-2">
        <button 
            className={`${activeTab === 'For Rent' ? 'text-[#0A2B4C]' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('For Rent')}
        >
            For Rent
        </button>
        <button 
            className={`${activeTab === 'For Sale' ? 'text-[#0A2B4C]' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('For Sale')}
        >
            For Sale
        </button>
      </div>

      {/* Search by Keyword */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search by keyword..." 
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A2B4C] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Property Type</label>
        <div className="border border-gray-300 rounded px-2 py-2 flex flex-wrap gap-2 min-h-[42px] relative bg-white items-center">
             <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">
                Apartment <button className="hover:text-red-500 text-gray-400 font-bold ml-1">×</button>
             </span>
             <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">
                House <button className="hover:text-red-500 text-gray-400 font-bold ml-1">×</button>
             </span>
             <button className="text-gray-400 hover:text-gray-600 text-lg absolute right-2 top-1.5 leading-none">×</button>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Location</label>
        <div className="border border-gray-300 rounded px-2 py-2 flex flex-wrap gap-2 min-h-[42px] relative bg-white items-center">
             <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">
                Bronx <button className="hover:text-red-500 text-gray-400 font-bold ml-1">×</button>
             </span>
             <button className="text-gray-400 hover:text-gray-600 text-lg absolute right-2 top-1.5 leading-none">×</button>
        </div>
      </div>

      {/* Price Slider */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Price</label>
        <div className="relative h-1.5 bg-gray-200 rounded-full my-4">
            <div className="absolute left-0 w-1/3 h-full bg-[#0A2B4C] rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A2B4C] rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A2B4C] rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>$0</span>
            <span>$150 000</span>
        </div>
      </div>

      {/* Size Slider */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Size</label>
        <div className="relative h-1.5 bg-gray-200 rounded-full my-4">
            <div className="absolute left-0 w-2/3 h-full bg-[#0A2B4C] rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A2B4C] rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A2B4C] rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>0ft²</span>
            <span>1000ft²</span>
        </div>
      </div>

      {/* Beds / Baths */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
            <label className="block text-sm text-gray-600 mb-2">Bedrooms</label>
            <div className="border border-gray-300 rounded px-3 py-2.5 text-sm flex justify-between items-center bg-white">
                <span className="text-gray-700">2</span>
                <button className="text-gray-400 hover:text-red-500 bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold leading-none">×</button>
            </div>
        </div>
        <div>
            <label className="block text-sm text-gray-600 mb-2">Bathrooms</label>
             <input type="text" placeholder="Placeholder" className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0A2B4C] text-gray-700 placeholder-gray-400" />
        </div>
      </div>

      {/* Advanced Features */}
      <div className="mb-8">
        <button className="flex items-center text-sm font-bold text-[#0A2B4C] mb-4 hover:text-[#08223c] transition-colors">
            <span className="mr-2 rounded-full border border-[#0A2B4C] w-4 h-4 flex items-center justify-center text-xs leading-none pb-0.5">-</span>
            Advanced features
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2">
            {[
                'Balcony', 'Fitness center', 
                'Storage Unit', 'Disabled access', 
                'Central Heating', 'Air conditioning', 
                'Renovation', 'Wi-Fi', 
                'Fireplace', 'Walk-in Closet', 
                'Parking', 'Swimming pool', 
                'Fully furnished', 'Cable TV', 
                'Security alarm', 'Garage', 
                'Yard', 'Intercom'
            ].map((item) => (
                 <label key={item} className="flex items-center text-sm text-gray-600 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            className="peer h-4 w-4 border-2 border-gray-300 rounded text-[#0A2B4C] focus:ring-[#0A2B4C] transition-colors cursor-pointer checked:border-[#0A2B4C]" 
                            defaultChecked={['Balcony', 'Central Heating', 'Fireplace', 'Parking', 'Garage'].includes(item)} 
                        />
                    </div>
                    <span className="ml-2 group-hover:text-gray-900 transition-colors">{item}</span>
                 </label>
            ))}
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-[#0A2B4C] text-white font-medium text-lg py-3 rounded shadow-sm hover:bg-[#08223c] transition-colors duration-200">
        Search
      </button>

    </div>
  );
};

export default FilterSidebar;
