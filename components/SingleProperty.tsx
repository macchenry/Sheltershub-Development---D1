
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../constants';
import { BedIcon, BathIcon, GarageIcon, AreaIcon, HeartIcon, LocationIcon, CheckIcon, ShareIcon, PrintIcon, DownloadIcon } from './icons/PropertyIcons';

interface SinglePropertyProps {
  onNavigate: (page: string) => void;
  propertyId?: number;
}

const SingleProperty: React.FC<SinglePropertyProps> = ({ onNavigate, propertyId }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  
  // Watermark State
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice Freeman", rating: 5, date: "Oct 12, 2024", comment: "Absolutely stunning property! The view is breathtaking." },
    { id: 2, name: "John Smith", rating: 4, date: "Sep 28, 2024", comment: "Great location and amenities. Garage is a bit small though." }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  // Calculate Average Rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;
    
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: "Just now",
      comment: newReview.comment
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-[#F9A826]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Helper to format property ID (e.g. SH-010)
  const formatPropertyId = (id: number) => {
    return `SH-${id.toString().padStart(3, '0')}`;
  };

  const getStatusColor = (status: string) => {
      switch (status) {
          case 'For Sale': return 'bg-[#0A2B4C] text-white';
          case 'For Rent': return 'bg-[#2563EB] text-white';
          case 'Sold': return 'bg-red-600 text-white';
          default: return 'bg-gray-100 text-gray-800';
      }
  };

  // Mock Data for the selected property
  // ID 11 is forced to be SOLD in constants.ts
  const isSoldDemo = propertyId === 11;

  const property = {
    id: propertyId || 10,
    title: isSoldDemo ? "Modern Family Home (SOLD)" : "Luxury Villa with Panoramic Ocean Views",
    address: isSoldDemo ? "45 Airport Residential Area, Accra" : "123 Coastal Highway, Malibu, CA 90265",
    priceGHS: isSoldDemo ? 2500000 : 18500000,
    priceUSD: isSoldDemo ? 210000 : 1250000,
    description: "Experience the pinnacle of luxury living in this stunning modern family home. Nestled in a quiet, tree-lined street, this property offers a perfect blend of contemporary design and comfort. The spacious open-plan living area is flooded with natural light, featuring high ceilings and premium finishes throughout.\n\nThe gourmet kitchen is equipped with state-of-the-art appliances, custom cabinetry, and a large island, making it a chef's dream. Step outside to your private oasis, complete with a landscaped garden and a sparkling swimming pool, perfect for entertaining guests or enjoying a quiet evening with family.",
    type: "House",
    propertyTypeDetail: "Detached Villa",
    usage: "Residential",
    region: "Greater Accra",
    city: "Accra",
    neighborhood: isSoldDemo ? "Airport Residential" : "Cantonments",
    status: isSoldDemo ? "Sold" : "For Sale",
    isPremium: true,
    bedrooms: 5,
    bathrooms: 4,
    garage: 3,
    area: 4500, // sqft
    yearBuilt: 2022,
    listedBy: "SheltersHub Agency",
    developer: "Prestige Homes",
    availability: isSoldDemo ? "Sold" : "Immediately",
    images: [
      "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
      "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
      "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg"
    ],
    features: [
      "Air Conditioning", "Swimming Pool", "Central Heating", "Laundry Room", "Gym", "Alarm", 
      "Window Covering", "WiFi", "TV Cable", "Dryer", "Microwave", "Washer", "Refrigerator", "Outdoor Shower"
    ],
    agent: {
      name: "Martin McDermott",
      title: "Senior Property Agent",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 987-6543",
      email: "martin@sheltershub.com"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPhone(false);
  }, [propertyId]);

  // Watermark Generation Logic
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);
    setWatermarkedImage(null); // Clear previous to show loading state

    const generateWatermark = async () => {
      try {
        const imageUrl = property.images[activeImage];
        const logoUrl = "https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png";

        // Helper to load image
        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous"; // Important to prevent canvas tainting
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        // Load both images
        const [mainImg, logoImg] = await Promise.all([
            loadImage(imageUrl),
            loadImage(logoUrl)
        ]);

        if (!isMounted) return;

        const canvas = document.createElement('canvas');
        canvas.width = mainImg.width;
        canvas.height = mainImg.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // 1. Draw Main Image
            ctx.drawImage(mainImg, 0, 0);

            // 2. Configure Watermark
            // Scale to 30% of the image's width
            const watermarkScale = 0.30; 
            const logoWidth = mainImg.width * watermarkScale;
            // Maintain aspect ratio
            const logoAspectRatio = logoImg.width / logoImg.height;
            const logoHeight = logoWidth / logoAspectRatio;

            // Center the watermark
            const x = (mainImg.width - logoWidth) / 2;
            const y = (mainImg.height - logoHeight) / 2;

            // 3. Draw Logo with Opacity (50%)
            ctx.globalAlpha = 0.50; // 50% Opacity
            ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
            ctx.globalAlpha = 1.0; // Reset opacity

            // 4. Set Result
            setWatermarkedImage(canvas.toDataURL('image/jpeg', 0.95));
        }
      } catch (error) {
        console.error("Watermark generation failed:", error);
        // Fallback to original image if something fails (e.g. CORS error)
        if (isMounted) setWatermarkedImage(property.images[activeImage]);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    generateWatermark();

    return () => {
        isMounted = false;
    };
  }, [activeImage, property.images]);

  const handleDownload = () => {
    if (watermarkedImage) {
        const link = document.createElement('a');
        link.download = `Sheltershub_Property_${formatPropertyId(property.id)}_${activeImage + 1}.jpg`;
        link.href = watermarkedImage;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('reportTarget', `Property ID: ${formatPropertyId(property.id)} - ${property.title}`);
    onNavigate('report-fraud');
  };

  const handleCallClick = (e: React.MouseEvent) => {
    if (!showPhone) {
        e.preventDefault();
        setShowPhone(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="properties" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('all-properties')} className="hover:text-[#F9A826] transition-colors">Properties</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">{property.title}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <span className={`${getStatusColor(property.status)} text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide`}>{property.status}</span>
                    <span className="text-gray-500 text-sm">ID: {formatPropertyId(property.id)}</span>
                    {property.isPremium && (
                        <span className="bg-[#F9A826] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">Featured</span>
                    )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0A2B4C] leading-tight">{property.title}</h1>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <LocationIcon className="w-5 h-5 mr-1 text-gray-400" />
                    {property.address}
                </div>
            </div>
            <div className="text-left md:text-right">
                 <p className="text-3xl font-bold text-[#0A2B4C]">GH₵{property.priceGHS.toLocaleString()}</p>
                 <p className="text-gray-500 font-medium">USD {property.priceUSD.toLocaleString()}</p>
            </div>
        </div>

        {/* Tools Bar */}
        <div className="flex justify-end gap-3 mb-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <ShareIcon className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <HeartIcon className="w-4 h-4" /> Save
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <PrintIcon className="w-4 h-4" /> Print
            </button>
            <button 
                onClick={handleDownload}
                disabled={isGenerating || !watermarkedImage}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
                {isGenerating ? 'Preparing...' : <><DownloadIcon className="w-4 h-4" /> Download</>}
            </button>
        </div>

        {/* Gallery Section */}
        <div className="mb-10">
            <div className="rounded-xl overflow-hidden shadow-sm h-[300px] md:h-[500px] w-full bg-gray-200 mb-4 relative group flex items-center justify-center">
                {watermarkedImage ? (
                    <img 
                        src={watermarkedImage} 
                        alt={property.title} 
                        className="w-full h-full object-cover transition-transform duration-500" 
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="animate-spin h-10 w-10 mb-2 text-[#F9A826]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs font-semibold">Applying Watermark...</span>
                    </div>
                )}
                
                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    aria-label="Previous image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    aria-label="Next image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 shadow transition-all z-10">
                    <HeartIcon className="w-6 h-6" isFilled={isFavorited} />
                </button>
            </div>
            
            {/* Thumbnails (Without Watermark) */}
            <div className="grid grid-cols-5 gap-2 md:gap-4">
                {property.images.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveImage(idx)}
                        className={`rounded-lg overflow-hidden h-20 md:h-28 border-2 transition-all ${activeImage === idx ? 'border-[#F9A826] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Core Property Details (Region, City, Area, Type, Usage) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Region</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.region}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">City</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.city}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Area</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.neighborhood}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Type of Property</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.propertyTypeDetail}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Property Usage</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.usage}</span>
                        </div>
                    </div>
                </div>

                {/* Key Info Strip */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
                        <div className="flex flex-col items-center justify-center text-center p-2">
                            <span className="text-gray-400 text-sm mb-1">Bedrooms</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <BedIcon className="w-6 h-6 text-[#F9A826]" /> {property.bedrooms}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Bathrooms</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <BathIcon className="w-6 h-6 text-[#F9A826]" /> {property.bathrooms}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Garage</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <GarageIcon className="w-6 h-6 text-[#F9A826]" /> {property.garage}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Area Size</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <AreaIcon className="w-6 h-6 text-[#F9A826]" /> {property.area} <span className="text-sm font-normal text-gray-500">sqft</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Type</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                {property.type}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {property.description}
                    </p>

                    <h4 className="text-lg font-bold text-[#0A2B4C] mt-8 mb-4">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                        {property.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-600 text-sm">
                                <div className="min-w-[20px] mr-2 text-[#F9A826]">
                                    <CheckIcon />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Details Table */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property ID:</span>
                            <span className="text-gray-800 font-semibold">{formatPropertyId(property.id)}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property Type:</span>
                            <span className="text-gray-800 font-semibold">{property.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property Status:</span>
                            <span className="text-gray-800 font-semibold">{property.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Year Built:</span>
                            <span className="text-gray-800 font-semibold">{property.yearBuilt}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Garages:</span>
                            <span className="text-gray-800 font-semibold">{property.garage}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Bedrooms:</span>
                            <span className="text-gray-800 font-semibold">{property.bedrooms}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Bathrooms:</span>
                            <span className="text-gray-800 font-semibold">{property.bathrooms}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Listed By:</span>
                            <span className="text-gray-800 font-semibold">{property.listedBy}</span>
                        </div>
                    </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">Location</h3>
                    <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        {/* Simulated Map */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                        <div className="z-10 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2">
                             <LocationIcon className="text-red-500" />
                             <span className="font-semibold text-gray-800">{property.address}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                
                {/* Agent Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                        <div>
                            <h4 className="text-lg font-bold text-[#0A2B4C]">{property.agent.name}</h4>
                            <p className="text-sm text-gray-500">{property.agent.title}</p>
                            <a href="#" className="text-xs text-[#F9A826] hover:underline mt-1 block">View Profile</a>
                        </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                         <a 
                            href={showPhone ? `tel:${property.agent.phone}` : '#'}
                            onClick={handleCallClick}
                            className="flex items-center justify-center gap-2 w-full bg-[#0A2B4C] hover:bg-[#08223c] text-white font-semibold py-3 px-4 rounded transition-colors"
                         >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            {showPhone ? property.agent.phone : 'Call'}
                         </a>
                         <a href="#" className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            WhatsApp
                         </a>
                         <button className="flex items-center justify-center gap-2 w-full bg-white border-2 border-[#0A2B4C] text-[#0A2B4C] hover:bg-gray-50 font-semibold py-3 px-4 rounded transition-colors">
                            Message Agent
                         </button>
                    </div>

                    <form className="space-y-3">
                        <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        <input type="tel" placeholder="Your Phone" className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        <textarea rows={3} placeholder="I am interested in this property..." className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]"></textarea>
                        <button type="submit" className="w-full bg-[#F9A826] text-white font-bold py-2 rounded hover:bg-[#d88d15] transition-colors">
                            Send Request
                        </button>
                    </form>
                </div>

                {/* Safety Tips (Optional but standard) */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-[#0A2B4C] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#F9A826]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        Safety Tips
                    </h4>
                    <ul className="text-xs text-gray-500 space-y-2 list-disc list-inside mb-4">
                        <li>Avoid sending money before viewing.</li>
                        <li>Check all documentation carefully.</li>
                        <li>Meet in a safe, public place.</li>
                    </ul>
                    <div className="border-t border-gray-100 pt-3">
                        <a 
                            href="#" 
                            onClick={handleReportClick}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            Report This Listing
                        </a>
                    </div>
                 </div>

                 {/* Property Review & Rating Section */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4">Reviews & Ratings</h3>
                    
                    {/* Summary */}
                    <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                       <div className="text-4xl font-bold text-[#0A2B4C]">{averageRating}</div>
                       <div>
                          <div className="flex text-[#F9A826] mb-1">{renderStars(Math.round(parseFloat(averageRating)))}</div>
                          <div className="text-xs text-gray-500 font-medium">{reviews.length} Reviews</div>
                       </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-5 mb-8 max-h-80 overflow-y-auto pr-2">
                       {reviews.map(r => (
                          <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                             <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-sm text-[#0A2B4C]">{r.name}</span>
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{r.date}</span>
                             </div>
                             <div className="flex text-[#F9A826] mb-2 scale-75 origin-left">{renderStars(r.rating)}</div>
                             <p className="text-xs text-gray-600 leading-relaxed italic">"{r.comment}"</p>
                          </div>
                       ))}
                    </div>

                    {/* Write a Review Form */}
                    <div className="border-t border-gray-200 pt-6">
                       <h4 className="font-bold text-sm text-[#0A2B4C] mb-3 uppercase tracking-wide">Write a Review</h4>
                       <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Rating</label>
                            <div className="flex gap-1">
                               {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                  >
                                    <svg className={`w-6 h-6 ${star <= newReview.rating ? 'text-[#F9A826]' : 'text-gray-300'} transition-colors`} fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </button>
                               ))}
                            </div>
                          </div>
                          
                          <input 
                            type="text" 
                            required
                            value={newReview.name}
                            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                            placeholder="Your Name" 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                          />
                          
                          <textarea 
                            required
                            rows={3} 
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            placeholder="Share your experience..." 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"
                          ></textarea>
                          
                          <button 
                            type="submit" 
                            className="w-full bg-[#0A2B4C] text-white font-bold py-2 rounded text-sm hover:bg-[#08223c] transition-colors"
                          >
                            Submit Review
                          </button>
                       </form>
                    </div>
                 </div>

            </aside>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-[#0A2B4C] mb-8">Similar Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.slice(0, 3).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} onClick={() => onNavigate('property-detail')} />
                ))}
            </div>
        </div>

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleProperty;
