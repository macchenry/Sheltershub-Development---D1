
import React, { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AddPropertyPageProps {
  onNavigate: (page: string) => void;
}

const AddPropertyPage: React.FC<AddPropertyPageProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock amenities list
  const amenitiesList = [
    "Air Conditioning", "Parking Space", "24/7 Security", "Water Supply", 
    "Fitted Kitchen", "Balcony", "Swimming Pool", "Gym", "Internet / Wi-Fi", 
    "Backup Generator", "Garden", "Elevator"
  ];

  const compressImage = async (file: File): Promise<string> => {
    const TARGET_MIN_SIZE = 100 * 1024; // 100 KB
    const TARGET_MAX_SIZE = 150 * 1024; // 150 KB

    // 1. If file is small enough, leave unchanged
    if (file.size <= TARGET_MAX_SIZE) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }

    // 2. Compress if larger than 150KB
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if excessively large to save performance (optional, keeping high res if possible)
        const MAX_DIMENSION = 2500;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            const ratio = width / height;
            if (width > height) {
                width = MAX_DIMENSION;
                height = Math.round(width / ratio);
            } else {
                height = MAX_DIMENSION;
                width = Math.round(height * ratio);
            }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            reject(new Error("Canvas context failed"));
            return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Binary search for quality
        let minQ = 0.0;
        let maxQ = 1.0;
        let currentQ = 0.8;
        let finalDataUrl = "";
        let iterations = 0;

        const attemptCompression = () => {
            const dataUrl = canvas.toDataURL('image/jpeg', currentQ);
            // Estimate base64 size in bytes: (length * 3/4) - padding
            const head = 'data:image/jpeg;base64,';
            const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);

            if ((sizeInBytes <= TARGET_MAX_SIZE && sizeInBytes >= TARGET_MIN_SIZE) || iterations > 6) {
                // Good enough or max attempts reached
                // If max attempts reached and still > max size, we accept it or force lower quality 
                // but usually binary search converges well.
                resolve(dataUrl);
            } else if (sizeInBytes > TARGET_MAX_SIZE) {
                // Too big, decrease quality
                maxQ = currentQ;
                currentQ = (minQ + maxQ) / 2;
                iterations++;
                attemptCompression();
            } else {
                // Too small (< 100KB), increase quality
                // Store this as a valid backup in case next step goes over
                finalDataUrl = dataUrl;
                minQ = currentQ;
                currentQ = (minQ + maxQ) / 2;
                iterations++;
                attemptCompression();
            }
        };

        attemptCompression();
      };

      img.onerror = (err) => reject(err);
    });
  };

  const processFiles = async (files: FileList | File[]) => {
    setIsProcessing(true);
    const newImages: string[] = [];
    const fileArray = Array.from(files);

    // Limit to 10 images total
    const remainingSlots = 10 - images.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    for (const file of filesToProcess) {
      if (file.type.startsWith('image/')) {
        try {
          const compressedDataUrl = await compressImage(file);
          newImages.push(compressedDataUrl);
        } catch (error) {
          console.error("Error processing image:", error);
        }
      }
    }

    setImages(prev => [...prev, ...newImages]);
    setIsProcessing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="add-property" />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Page Title */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Add a New Property</h1>
            <p className="text-gray-500">Enter your property details below to list it on Sheltershub.</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Property Published Successfully!"); }}>
            
            {/* 1. Property Basic Details */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title</label>
                        <input type="text" placeholder="e.g. Luxury 4 Bedroom House in East Legon" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                <option>Select Type</option>
                                <option>House</option>
                                <option>Apartment</option>
                                <option>Land</option>
                                <option>Commercial</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                <option>For Sale</option>
                                <option>For Rent</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                         <div className="relative">
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                <option>GHS (₵)</option>
                                <option>USD ($)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                        <input type="number" placeholder="e.g. 150000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                        <input type="text" placeholder="e.g. 123 Independence Avenue" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>

                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-2">Region / City</label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                <option>Select Region</option>
                                <option>Greater Accra</option>
                                <option>Ashanti</option>
                                <option>Central</option>
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Neighborhood</label>
                        <input type="text" placeholder="e.g. Cantonments" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                </div>
            </div>

            {/* 2. Property Specifications */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Property Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Size (sqft/sqm)</label>
                        <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year Built</label>
                        <input type="number" min="1900" placeholder="Optional" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                     <div className="col-span-2 md:col-span-4 flex items-center gap-4 mt-2">
                        <label className="block text-sm font-semibold text-gray-700">Furnished?</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#F9A826] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A2B4C]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* 3. Description & Amenities */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Description & Amenities</h2>
                
                <div className="mb-8">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                     <textarea rows={6} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" placeholder="Describe the property features, conditions, and key selling points..."></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Key Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {amenitiesList.map((amenity, index) => (
                             <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" className="h-5 w-5 text-[#F9A826] border-gray-300 rounded focus:ring-[#F9A826] transition duration-150 ease-in-out cursor-pointer" />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Upload Images */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Property Gallery</h2>
                <p className="text-sm text-gray-500 mb-4">Upload up to 10 photos. Large files (>150KB) will be automatically compressed.</p>
                
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
                         {isProcessing ? (
                             <div className="flex flex-col items-center">
                                 <svg className="animate-spin h-8 w-8 text-[#F9A826] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 <span className="text-sm text-gray-500">Processing images...</span>
                             </div>
                         ) : (
                             <>
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold text-[#F9A826] cursor-pointer hover:underline" onClick={triggerFileInput}>Click to upload</span> or drag and drop
                                </div>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB per image)</p>
                             </>
                         )}
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden h-24 shadow-sm border border-gray-200">
                                <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                                {idx === 0 && (
                                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] text-center py-1 font-medium">
                                        Cover Image
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 5. Contact & Ownership */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Are you an Agent or Owner?</label>
                        <input type="text" value="Agent" disabled className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input type="email" placeholder="agent@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Website (Optional)</label>
                        <input type="url" placeholder="https://" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                    </div>
                </div>
            </div>

            {/* 6. Submit Actions */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                    By publishing, you agree to Sheltershub's <a href="#" className="text-[#F9A826] hover:underline">Terms & Conditions</a>.
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button type="button" className="flex-1 sm:flex-none py-3 px-6 border border-[#0A2B4C] text-[#0A2B4C] font-bold rounded-lg hover:bg-gray-50 transition-colors">
                        Save as Draft
                    </button>
                    <button type="submit" disabled={isProcessing} className="flex-1 sm:flex-none py-3 px-8 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-all hover:shadow-lg disabled:opacity-50">
                        {isProcessing ? 'Processing...' : 'Publish Property'}
                    </button>
                </div>
            </div>

        </form>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddPropertyPage;
