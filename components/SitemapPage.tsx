
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pages = [
    { title: 'Main', links: [
        { name: 'Home', page: 'home' },
        { name: 'About Us', page: 'about' },
        { name: 'Login / Register', page: 'login' },
        { name: 'User Profile', page: 'user-profile' },
        { name: 'My Favorites', page: 'favorites' },
        { name: 'Forgot Password', page: 'forgot-password' },
        { name: 'Reset Password', page: 'reset-password' },
        { name: 'Email Verification', page: 'email-verification' },
        { name: 'Search Results', page: 'search-results' },
        { name: 'Blog & News', page: 'blog' },
        { name: 'Single Blog Article (Demo)', page: 'blog-detail' },
        { name: 'Contact', page: 'contact' }, 
        { name: 'FAQ', page: 'faq' },
        { name: 'Report Fraud', page: 'report-fraud' },
        { name: 'Terms & Conditions', page: 'terms' },
        { name: 'Editor Registration', page: 'editor-register' },
    ]},
    { title: 'Properties', links: [
        { name: 'All Properties', page: 'all-properties' },
        { name: 'Single Property Detail (Demo)', page: 'property-detail' },
        { name: 'Compare Properties', page: 'compare-properties' },
        { name: 'Post a Property', page: 'add-property' },
    ]},
    { title: 'Agencies', links: [
        { name: 'Agencies List', page: 'agencies' },
        { name: 'Single Agency Detail (Demo)', page: 'agency-detail' },
        { name: 'Register Agency', page: 'add-agency' },
    ]},
    { title: 'Agents', links: [
        { name: 'Register Agent', page: 'add-agent' },
    ]},
    { title: 'Developers', links: [
        { name: 'Developers List', page: 'developers' },
        { name: 'Single Developer Detail (Demo)', page: 'developer-detail' },
        { name: 'Register Developer', page: 'add-developer' },
    ]},
    { title: 'Agent Dashboard', links: [
        { name: 'My Properties', page: 'agent-properties' },
        { name: 'Add Property', page: 'agent-add-property' },
        { name: 'Performance', page: 'agent-performance' },
        { name: 'Messages', page: 'agent-messages' },
        { name: 'Profile Settings', page: 'agent-settings' },
    ]},
    { title: 'Developer Dashboard', links: [
        { name: 'My Projects', page: 'developer-dashboard' },
        { name: 'Add Project', page: 'developer-add-project' },
        { name: 'Performance', page: 'developer-performance' },
        { name: 'Messages', page: 'developer-messages' },
        { name: 'Profile Settings', page: 'developer-settings' },
    ]},
    { title: 'Agency Dashboard', links: [
        { name: 'Dashboard', page: 'agency-dashboard' },
        { name: 'Team Members', page: 'agency-team' },
        { name: 'Add Agent', page: 'agency-add-agent' },
        { name: 'Managed Properties', page: 'agency-properties' },
        { name: 'Settings', page: 'agency-settings' },
    ]},
    { title: 'Admin Dashboard', links: [
        { name: 'Dashboard', page: 'admin-dashboard' },
        { name: 'Manage Properties', page: 'admin-properties' },
        { name: 'Manage Agents', page: 'admin-agents' },
        { name: 'Manage Agencies', page: 'admin-agencies' },
        { name: 'Manage Developers', page: 'admin-developers' },
        { name: 'Manage Users', page: 'admin-users' },
        { name: 'Manage Blog', page: 'admin-blog' },
        { name: 'Add Blog Post', page: 'admin-add-blog' },
        { name: 'Subscriptions', page: 'admin-subscriptions' },
        { name: 'Reports', page: 'admin-reports' },
        { name: 'Settings', page: 'admin-settings' },
        { name: 'CMS: Edit Home', page: 'admin-edit-home' },
        { name: 'CMS: Edit About Us', page: 'admin-edit-about' },
        { name: 'CMS: Edit Login / Register', page: 'admin-edit-login' },
        { name: 'CMS: Edit User Profile', page: 'admin-edit-user-profile' },
        { name: 'CMS: Edit My Favorites', page: 'admin-edit-favorites' },
        { name: 'CMS: Edit Forgot Password', page: 'admin-edit-forgot-password' },
        { name: 'CMS: Edit Reset Password', page: 'admin-edit-reset-password' },
        { name: 'CMS: Edit Email Verification', page: 'admin-edit-email-verification' },
        { name: 'CMS: Edit Search Results', page: 'admin-edit-search-results' },
        { name: 'CMS: Edit Blog & News Page', page: 'admin-edit-blog' },
        { name: 'CMS: Edit Single Blog Article', page: 'admin-edit-blog-detail' },
        { name: 'CMS: Edit Contact', page: 'admin-edit-contact' },
        { name: 'CMS: Edit FAQ', page: 'admin-edit-faq' },
        { name: 'CMS: Edit Report Fraud', page: 'admin-edit-report-fraud' },
        { name: 'CMS: Edit Terms & Conditions', page: 'admin-edit-terms' },
        { name: 'CMS: Edit Editor Registration', page: 'admin-edit-editor-register' },
    ]},
    { title: 'Editor Dashboard', links: [
        { name: 'Dashboard', page: 'admin-dashboard' },
        { name: 'Manage Properties', page: 'admin-properties' },
        { name: 'Manage Blog Posts', page: 'admin-blog' },
        { name: 'View Reports', page: 'admin-reports' },
        { name: 'CMS: Edit Home', page: 'admin-edit-home' },
        { name: 'CMS: Edit About Us', page: 'admin-edit-about' },
        { name: 'CMS: Edit Login / Register', page: 'admin-edit-login' },
        { name: 'CMS: Edit User Profile', page: 'admin-edit-user-profile' },
        { name: 'CMS: Edit My Favorites', page: 'admin-edit-favorites' },
        { name: 'CMS: Edit Forgot Password', page: 'admin-edit-forgot-password' },
        { name: 'CMS: Edit Reset Password', page: 'admin-edit-reset-password' },
        { name: 'CMS: Edit Email Verification', page: 'admin-edit-email-verification' },
        { name: 'CMS: Edit Search Results', page: 'admin-edit-search-results' },
        { name: 'CMS: Edit Blog & News Page', page: 'admin-edit-blog' },
        { name: 'CMS: Edit Single Blog Article', page: 'admin-edit-blog-detail' },
        { name: 'CMS: Edit Contact', page: 'admin-edit-contact' },
        { name: 'CMS: Edit FAQ', page: 'admin-edit-faq' },
        { name: 'CMS: Edit Report Fraud', page: 'admin-edit-report-fraud' },
        { name: 'CMS: Edit Terms & Conditions', page: 'admin-edit-terms' },
        { name: 'CMS: Edit Editor Registration', page: 'admin-edit-editor-register' },
    ]},
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Sitemap</h1>
            <p className="text-gray-500">Overview of all pages on Sheltershub.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">{section.title}</h2>
                    <ul className="space-y-3">
                        {section.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                                <button 
                                    onClick={() => onNavigate(link.page)}
                                    className="text-gray-600 hover:text-[#F9A826] hover:underline flex items-center gap-2 transition-colors text-left"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826]"></span>
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SitemapPage;
