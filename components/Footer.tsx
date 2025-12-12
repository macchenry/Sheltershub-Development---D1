
import React from 'react';
import { footerLinks } from '../constants';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const propertyTypeLinks = footerLinks['Property Type'];
  
  const handleLinkClick = (e: React.MouseEvent, href: string, page?: string) => {
      e.preventDefault();
      if (onNavigate && page) {
          onNavigate(page);
      } else {
          // Default behavior for external links or unimplemented internal links
          console.log(`Navigating to ${href}`);
      }
  };

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          <div>
            <h3 className="font-bold mb-4">Residential</h3>
            <ul className="space-y-2 text-sm">
              {propertyTypeLinks['Residential'].map((link) => (
                <li key={link.name}><a href={link.href} className="hover:text-brand-orange">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Commercial</h3>
            <ul className="space-y-2 text-sm">
              {propertyTypeLinks['Commercial'].map((link) => (
                <li key={link.name}><a href={link.href} className="hover:text-brand-orange">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'about')} className="hover:text-brand-orange">
                    About Sheltershub
                  </a>
              </li>
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'terms')} className="hover:text-brand-orange">
                    Terms of Use
                  </a>
              </li>
              <li><a href="#" className="hover:text-brand-orange">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-orange">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@sheltershub.com" className="hover:text-brand-orange">support@sheltershub.com</a></li>
              <li><a href="#" className="hover:text-brand-orange">Safety tips</a></li>
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'contact')} className="hover:text-brand-orange">
                    Contact Us
                  </a>
              </li>
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'faq')} className="hover:text-brand-orange">
                    FAQ
                  </a>
              </li>
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'sitemap')} className="hover:text-brand-orange">
                    Sitemap
                  </a>
              </li>
              <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, '#', 'report-fraud')} className="hover:text-brand-orange">
                    Report Fraud
                  </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Our Socials</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks['Our Socials'].map((link) => (
                <li key={link.name}><a href={link.href} className="hover:text-brand-orange">{link.name}</a></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      <div className="bg-brand-blue-dark py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          Copyright© 2025 Sheltershub.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
