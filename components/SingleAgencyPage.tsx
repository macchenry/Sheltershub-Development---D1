
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import ReviewsSection from './ReviewsSection';
import { featuredProperties } from '../constants';

interface SingleAgencyPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

// Mock Agent Data
const agents = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Sales Associate",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+233 24 000 0001",
    email: "sarah@prime-realestate.com"
  },
  {
    id: 2,
    name: "Michael Ofori",
    role: "Property Consultant",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+233 24 000 0002",
    email: "michael@prime-realestate.com"
  },
  {
    id: 3,
    name: "Jessica Boateng",
    role: "Rental Specialist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    phone: "+233 24 000 0003",
    email: "jessica@prime-realestate.com"
  },
  {
    id: 4,
    name: "David Mensah",
    role: "Commercial Real Estate",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    phone: "+233 24 000 0004",
    email: "david@prime-realestate.com"
  }
];

const SingleAgencyPage: React.FC<SingleAgencyPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agencies" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('agencies')} className="hover:text-[#F9A826] transition-colors">Agencies</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Prime Real Estate</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        
        {/* 1. Agency Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                     <img src="https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg" alt="Prime Real Estate Logo" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center md:text-left space-y-3">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0A2B4C]">Prime Real Estate</h1>
                        <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                             Greater Accra, Ghana
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                             <span className="bg-blue-50 text-[#0A2B4C] p-1.5 rounded-full">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                             </span>
                             +233 55 123 4567
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="bg-blue-50 text-[#0A2B4C] p-1.5 rounded-full">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                             </span>
                             info@prime-realestate.com
                        </div>
                         <div className="flex items-center gap-2">
                             <span className="bg-blue-50 text-[#0A2B4C] p-1.5 rounded-full">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                             </span>
                             www.prime-realestate.com
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start items-center gap-8 border-t border-gray-100 pt-4 mt-2">
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-xl text-[#0A2B4C]">12</span>
                            <span className="text-xs text-gray-500 uppercase">Agents</span>
                         </div>
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-xl text-[#0A2B4C]">36</span>
                            <span className="text-xs text-gray-500 uppercase">Properties</span>
                         </div>
                         <div className="text-center md:text-left">
                            <span className="block font-bold text-xl text-[#0A2B4C]">10+</span>
                            <span className="text-xs text-gray-500 uppercase">Years Exp.</span>
                         </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button className="bg-[#F9A826] hover:bg-[#d88d15] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors">
                        Contact Agency
                    </button>
                </div>
            </div>
        </div>

        {/* 2. Agency Description */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">About Prime Real Estate</h3>
            <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                    Prime Real Estate is a leading real estate agency based in Accra, dedicated to providing exceptional service in buying, selling, and renting properties. With over a decade of experience in the Ghanaian real estate market, we have established ourselves as a trusted partner for individuals and businesses alike.
                </p>
                <p>
                    Our mission is to make the process of finding your dream home or investment property as seamless and stress-free as possible. We pride ourselves on our integrity, professionalism, and deep market knowledge. Whether you are looking for a luxury apartment in the city center or a family home in the suburbs, our team of dedicated agents is here to guide you every step of the way.
                </p>
            </div>
        </div>

        {/* 3. Agents Section */}
        <div>
             <h3 className="text-2xl font-bold text-[#0A2B4C] mb-6">Agents in this Agency</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                    <div key={agent.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="relative h-64 overflow-hidden">
                            <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-5 text-center">
                            <h4 className="font-bold text-lg text-[#0A2B4C]">{agent.name}</h4>
                            <p className="text-sm text-gray-500 mb-4">{agent.role}</p>
                            
                            <div className="space-y-2">
                                <a href={`tel:${agent.phone}`} className="block w-full py-2 px-4 rounded border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 hover:text-[#0A2B4C] transition-colors">
                                    {agent.phone}
                                </a>
                                <button className="block w-full py-2 px-4 rounded bg-[#0A2B4C] text-white text-sm font-medium hover:bg-[#08223c] transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* 4. Properties Section */}
        <div>
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-[#0A2B4C]">Properties Listed by Prime Real Estate</h3>
                <button className="hidden sm:block text-[#F9A826] font-semibold hover:underline">View All Listing</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Reusing existing PropertyCard component with mock data */}
                 {featuredProperties.slice(0, 6).map((property) => (
                    <PropertyCard 
                        key={property.id} 
                        property={property} 
                        onClick={() => onNavigate('property-detail')}
                    />
                 ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
                 <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                    View All Listings
                </button>
            </div>
        </div>

        {/* 5. Contact Form Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b border-gray-100 pb-2">Contact Agency</h3>
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
                    <input type="text" placeholder="Inquiry about property..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                     <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" placeholder="Write your message here..."></textarea>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="bg-[#F9A826] hover:bg-[#d88d15] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors">
                        Send Message
                    </button>
                </div>
            </form>
        </div>

        {/* 6. Reviews Section */}
        <div className="max-w-4xl">
            <ReviewsSection targetName="Prime Real Estate" userRole={userRole} />
        </div>

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleAgencyPage;
