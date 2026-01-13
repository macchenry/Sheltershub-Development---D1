
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import ReviewsSection from './ReviewsSection';
import { featuredProperties } from '../constants';

interface SingleDeveloperPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

// Mock Data for Projects
const projects = [
  {
    id: 1,
    name: "The Royal Gardens",
    image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    location: "East Legon, Accra",
    units: 45,
    priceRange: "$120k - $350k",
  },
  {
    id: 2,
    name: "Atlantic View Heights",
    image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    location: "Takoradi, Western",
    units: 30,
    priceRange: "$85k - $200k",
  },
  {
    id: 3,
    name: "Safari Valley Estates",
    image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
    location: "Aburi, Eastern",
    units: 12,
    priceRange: "$250k - $500k",
  }
];

const SingleDeveloperPage: React.FC<SingleDeveloperPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const developerName = "Empire Builders";

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="developers" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('developers')} className="hover:text-[#F9A826] transition-colors">Developers</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{developerName}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-12">
        
        {/* 1. Developer Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                     <img src="https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg" alt={`${developerName} Logo`} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center md:text-left space-y-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2B4C] mb-2">{developerName}</h1>
                        <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 text-lg">
                             <svg className="w-5 h-5 text-[#F9A826]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                             Accra, Ghana
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-y-3 gap-x-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                             <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                             +233 24 000 0000
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                             <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                             contact@empirebuilders.com
                        </div>
                         <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                             <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                             www.empirebuilders.com
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start items-center gap-10 border-t border-gray-100 pt-6 mt-4">
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-2xl text-[#0A2B4C]">12</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Projects</span>
                         </div>
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-2xl text-[#0A2B4C]">45</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Properties</span>
                         </div>
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-2xl text-[#0A2B4C]">15</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Years Exp.</span>
                         </div>
                    </div>
                </div>

                <div className="flex-shrink-0 self-center md:self-start mt-4 md:mt-0">
                    <button className="bg-[#F9A826] hover:bg-[#d88d15] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg">
                        Contact Developer
                    </button>
                </div>
            </div>
        </div>

        {/* 2. Developer Description */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-3">About {developerName}</h3>
            <div className="text-gray-600 leading-relaxed space-y-4 text-base">
                <p>
                    Empire Builders is a premier real estate development company committed to reshaping the landscape of modern living in Ghana. Since our inception in 2010, we have been at the forefront of delivering high-quality residential and commercial properties that blend aesthetic elegance with functional design.
                </p>
                <p>
                    Our mission is to create sustainable communities that offer exceptional value and a superior quality of life. We specialize in luxury apartments, gated communities, and mixed-use developments, ensuring that every project we undertake meets the highest standards of construction and environmental responsibility. At Empire Builders, we don't just build houses; we build homes where memories are made.
                </p>
            </div>
        </div>

        {/* 3. Developer Projects Section */}
        <div>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#0A2B4C]">Projects by {developerName}</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="relative h-56 overflow-hidden">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 right-4 bg-[#0A2B4C] text-white text-xs font-bold px-3 py-1 rounded shadow">
                                {project.units} Units
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="font-bold text-xl text-[#0A2B4C] mb-2">{project.name}</h4>
                            <p className="text-gray-500 flex items-center gap-1 mb-4 text-sm">
                                <svg className="w-4 h-4 text-[#F9A826]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {project.location}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="text-[#0A2B4C]">
                                    <span className="block text-xs text-gray-400 font-medium uppercase">Starting From</span>
                                    <span className="font-bold">{project.priceRange}</span>
                                </div>
                                <button className="text-[#F9A826] font-semibold hover:text-[#d88d15] text-sm flex items-center gap-1 transition-colors">
                                    View Details 
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* 4. Developer Properties Section */}
        <div>
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-[#0A2B4C]">Properties Listed by {developerName}</h3>
                <button 
                    onClick={() => onNavigate('all-properties')}
                    className="hidden sm:block text-[#F9A826] font-semibold hover:underline"
                >
                    View All Listing
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Reusing existing PropertyCard component with mock data */}
                 {featuredProperties.slice(0, 3).map((property) => (
                    <PropertyCard 
                        key={property.id} 
                        property={property} 
                        onClick={() => onNavigate('property-detail')}
                    />
                 ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
                 <button 
                    onClick={() => onNavigate('all-properties')}
                    className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                 >
                    View All Listings
                </button>
            </div>
        </div>

        {/* 5. Contact Form Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b border-gray-100 pb-4">Contact Developer</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" placeholder="+1 (000) 000-0000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input type="text" placeholder="Inquiry about project..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                     <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" placeholder="Write your message here..."></textarea>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="bg-[#F9A826] hover:bg-[#d88d15] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors w-full md:w-auto">
                        Send Message
                    </button>
                </div>
            </form>
        </div>

        {/* 6. Reviews Section */}
        <div className="max-w-4xl">
            <ReviewsSection targetName={developerName} userRole={userRole} />
        </div>

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleDeveloperPage;
