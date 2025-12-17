
import React, { useState } from 'react';
import { navLinks } from '../constants';

const Logo: React.FC = () => (
    <img src="https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png" alt="Sheltershub Logo" className="h-[4.5rem] w-auto" />
);

interface HeaderProps {
    onNavigate?: (page: string) => void;
    activePage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage = 'home' }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent, linkName: string) => {
        e.preventDefault();
        if (onNavigate) {
            if (linkName === 'Home') onNavigate('home');
            else if (linkName === 'All Properties') onNavigate('all-properties');
            else if (linkName === 'For Rent') onNavigate('for-rent');
            else if (linkName === 'For Sale') onNavigate('for-sale');
            else if (linkName === 'Agencies') onNavigate('agencies');
            else if (linkName === 'Agents') onNavigate('agents');
            else if (linkName === 'Developers') onNavigate('developers');
            else if (linkName === 'Blog') onNavigate('blog');
            else if (linkName === 'Contact') onNavigate('contact');
        }
    };

    const handleAuthClick = (e: React.MouseEvent, type: string) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('login');
        }
    }
    
    const handlePostPropertyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('add-property');
        }
    };

    const handleAddAgencyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('add-agency');
        }
    };

    const handleAddAgentClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('add-agent');
        }
    };

    const handleAddDeveloperClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('add-developer');
        }
    };

    const submenuItems: Record<string, { label: string; onClick: (e: React.MouseEvent) => void; activePage: string }> = {
        'Agencies': { label: 'Add New Agency', onClick: handleAddAgencyClick, activePage: 'add-agency' },
        'Agents': { label: 'Add New Agent', onClick: handleAddAgentClick, activePage: 'add-agent' },
        'Developers': { label: 'Add New Developer', onClick: handleAddDeveloperClick, activePage: 'add-developer' },
    };

  return (
    <header className="bg-white relative z-50">
      {/* Top Bar */}
      <div className="bg-[#082956] text-white text-sm font-light">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span>The Most Trusted Real Estate Marketplace</span>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" onClick={handlePostPropertyClick} className="hover:text-brand-orange transition-colors">Post a Property</a>
            <a href="#" onClick={(e) => handleAuthClick(e, 'login')} className="hover:text-brand-orange transition-colors">Login</a>
            <a href="#" onClick={(e) => handleAuthClick(e, 'signup')} className="hover:text-brand-orange transition-colors">Signup</a>
          </div>
        </div>
      </div>
      
      {/* Middle Bar: Logo and Advert */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex bg-gray-300 items-center justify-center w-full max-w-md lg:max-w-2xl h-20 mx-4 rounded-lg">
            <span className="text-gray-600 font-semibold text-lg text-center">Advert Space by Google</span>
        </div>
        <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none" aria-label="Open menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>

      {/* Bottom Bar: Main Navigation */}
      <div className="border-t border-b border-gray-200 hidden lg:block">
        <div className="container mx-auto px-4 h-14 flex justify-center items-center">
             <nav className="hidden lg:flex items-center space-x-8 h-full">
                {navLinks.map((link) => {
                    const submenu = submenuItems[link.name];

                    if (submenu) {
                        return (
                            <div key={link.name} className="relative group h-full flex items-center">
                                <a 
                                    href={link.href} 
                                    onClick={(e) => handleNavClick(e, link.name)}
                                    className={`${(activePage === link.name.toLowerCase() || activePage === submenu.activePage) ? 'text-brand-orange' : 'text-gray-800'} hover:text-brand-orange font-semibold text-base transition-colors flex items-center gap-1 h-full`}
                                >
                                    {link.name}
                                    <svg className="w-4 h-4 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </a>
                                {/* Submenu */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block z-50">
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            submenu.onClick(e);
                                        }}
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors text-center"
                                    >
                                        {submenu.label}
                                    </a>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.name)}
                            className={`${(link.name === 'Home' && activePage === 'home') || (link.name === 'All Properties' && activePage === 'all-properties') || (link.name === 'For Rent' && activePage === 'for-rent') || (link.name === 'For Sale' && activePage === 'for-sale') || (link.name === 'Blog' && activePage === 'blog') || (link.name === 'Contact' && activePage === 'contact') ? 'text-brand-orange' : 'text-gray-800'} hover:text-brand-orange font-semibold text-base transition-colors h-full flex items-center`}
                        >
                            {link.name}
                        </a>
                    );
                })}
            </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
            <nav className="flex flex-col items-center py-4 space-y-2">
                {navLinks.map((link) => {
                    const submenu = submenuItems[link.name];
                    return (
                        <React.Fragment key={link.name}>
                            <a 
                                href={link.href}
                                onClick={(e) => {
                                    handleNavClick(e, link.name);
                                    setMenuOpen(false);
                                }}
                                className="text-gray-700 hover:text-brand-orange font-medium px-4 py-2 w-full text-center"
                            >
                                {link.name}
                            </a>
                            {submenu && (
                                <a 
                                    href="#"
                                    onClick={(e) => {
                                        submenu.onClick(e);
                                        setMenuOpen(false);
                                    }}
                                    className="text-gray-500 hover:text-brand-orange font-medium px-4 py-1 w-full text-center text-sm bg-gray-50"
                                >
                                    + {submenu.label}
                                </a>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
            <div className="flex flex-col items-center space-y-2 border-t pt-4 pb-4">
                <a href="#" onClick={(e) => { handlePostPropertyClick(e); setMenuOpen(false); }} className="text-gray-700 hover:text-brand-orange">Post a Property</a>
                <a href="#" onClick={(e) => {handleAuthClick(e, 'login'); setMenuOpen(false)}} className="text-gray-700 hover:text-brand-orange">Login</a>
                <a href="#" onClick={(e) => {handleAuthClick(e, 'signup'); setMenuOpen(false)}} className="text-gray-700 hover:text-brand-orange">Signup</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
