
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const suggestions = [
    { 
        name: 'Featured Properties', 
        page: 'all-properties', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
    },
    { 
        name: 'Agencies', 
        page: 'agencies', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> 
    },
    { 
        name: 'Developers', 
        page: 'developers', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> 
    },
    { 
        name: 'Contact Support', 
        page: 'home', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /> 
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="404" />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-2xl text-center">
            
            {/* Error Message Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
                <h1 className="text-8xl md:text-9xl font-extrabold text-[#0A2B4C] tracking-tight mb-2">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A2B4C] mb-3">Oops! The page you’re looking for doesn’t exist.</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    It may have been moved, deleted, or never existed.
                </p>

                {/* Call-to-Action Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg"
                    >
                        Go Back Home
                    </button>
                    <button 
                        onClick={() => onNavigate('all-properties')}
                        className="w-full sm:w-auto py-3 px-8 bg-white border border-[#0A2B4C] text-[#0A2B4C] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Browse Properties
                    </button>
                </div>
                
                <div className="mt-6">
                     <button onClick={() => onNavigate('home')} className="text-[#F9A826] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto">
                        Contact Support
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                </div>
            </div>

            {/* Suggested Links Section */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">You might be looking for</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {suggestions.map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => onNavigate(item.page)}
                            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F9A826] transition-all group flex flex-col items-center gap-3"
                        >
                            <div className="p-3 bg-gray-50 rounded-full text-[#0A2B4C] group-hover:bg-orange-50 group-hover:text-[#F9A826] transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {item.icon}
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-[#0A2B4C] text-sm text-center">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default NotFoundPage;
