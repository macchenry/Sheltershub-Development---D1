
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties, latestProperties } from '../constants';

interface FavoritesPageProps {
  onNavigate: (page: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate saved properties state with dummy data
  const [favorites, setFavorites] = useState([...featuredProperties.slice(0, 3), ...latestProperties.slice(0, 2)]);

  const handleRemove = (id: number) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="favorites" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">My Favorites</h1>
            <p className="text-gray-500 text-lg">Review and manage the properties you’ve saved.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        
        {favorites.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {favorites.map((property) => (
                        <div key={property.id} className="flex flex-col h-full">
                            <PropertyCard 
                                property={property} 
                                onClick={() => onNavigate('property-detail')} 
                            />
                            <div className="mt-3 flex justify-end">
                                <button 
                                    onClick={() => handleRemove(property.id)}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Suggested Properties (Optional) */}
                <div className="border-t border-gray-200 pt-12">
                    <h3 className="text-2xl font-bold text-[#0A2B4C] mb-6">You Might Also Like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestProperties.slice(2, 5).map((prop) => (
                            <PropertyCard key={prop.id} property={prop} onClick={() => onNavigate('property-detail')} />
                        ))}
                    </div>
                </div>
            </>
        ) : (
            /* Empty State */
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Your Favorites List is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    You haven’t added any properties to your favorites yet. Start browsing to find your dream home.
                </p>
                <button 
                    onClick={() => onNavigate('all-properties')}
                    className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg"
                >
                    Browse Properties
                </button>
            </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default FavoritesPage;
