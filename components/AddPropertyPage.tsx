
import React, { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AddPropertyPageProps {
  onNavigate: (page: string) => void;
}

const AddPropertyPage: React.FC<AddPropertyPageProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       // Mock adding image logic
       if (images.length < 5) {
         setImages([...images, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
       }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (images.length < 5) {
        setImages([...images, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logic to submit
      alert("Property posted successfully!");
      onNavigate('all-properties');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="add-property" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-3">Post a Property</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                List your property on Sheltershub and reach thousands of potential buyers and renters.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Property Details */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="e.g. Luxury Villa with Pool" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>House</option>
                            <option>Apartment</option>
                            <option>Commercial</option>
                            <option>Land</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price (GH₵)</label>
                        <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD - Optional)</label>
                        <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                </div>
            </div>

            {/* 2. Location */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="Street Address" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input type="text" placeholder="e.g. Accra" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>Greater Accra</option>
                            <option>Ashanti</option>
                            <option>Western</option>
                            <option>Central</option>
                            <option>Eastern</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 3. Features & Description */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Features & Description</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Area (sq ft)</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" placeholder="Describe the property..."></textarea>
                </div>
            </div>

            {/* 4. Upload Images */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Property Gallery</h2>
                <p className="text-sm text-gray-500 mb-4">Upload up to 5 photos. Large files (&gt;150KB) will be automatically compressed.</p>
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                />

                <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-[#F9A826] bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-3">
                         <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                         <div className="text-sm text-gray-600">
                             <button type="button" className="font-semibold text-[#F9A826] hover:underline focus:outline-none" onClick={triggerFileInput}>Click to upload</button> or drag and drop
                         </div>
                         <p className="text-xs text-gray-500">Supported: JPG, PNG, WEBP</p>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden h-24 w-full shadow-sm border border-gray-200">
                                <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                {idx === 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#0A2B4C] text-white text-[10px] font-bold text-center py-1 bg-opacity-90 z-10">
                                        Featured Image
                                    </div>
                                )}
                                <button 
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => onNavigate('home')} className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors">Post Property</button>
            </div>
        </form>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddPropertyPage;
