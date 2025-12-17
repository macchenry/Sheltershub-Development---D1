
import { Property, PropertyStatus } from './types';

export const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'All Properties', href: '#' },
  { name: 'For Rent', href: '#' },
  { name: 'For Sale', href: '#' },
  { name: 'Agencies', href: '#' },
  { name: 'Agents', href: '#' },
  { name: 'Developers', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
];

export const heroImages = [
  'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
  'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
  'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];

export const adSliderImages = [
    'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
    'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
    'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];

export const wideAdSliderImages = [
    'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
    'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
    'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];


const generateProperties = (startId: number, count: number): Property[] => {
    const properties: Property[] = [];
    const newImageUrl = 'https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg';
    for (let i = 0; i < count; i++) {
        // Randomize status including Sold
        const rand = Math.random();
        let status = PropertyStatus.ForSale;
        if (rand > 0.6) status = PropertyStatus.ForRent;
        if (rand > 0.9) status = PropertyStatus.Sold;

        properties.push({
            id: startId + i,
            images: [newImageUrl],
            status: status,
            daysAgo: Math.floor(Math.random() * 30) + 1,
            isPremium: Math.random() > 0.7,
            propertyType: 'House',
            name: i === 0 && startId === 10 ? 'Lakeside Estate' : 'Modern Family Home',
            beds: i === 0 && startId === 10 ? 3 : Math.floor(Math.random() * 3) + 2,
            baths: i === 0 && startId === 10 ? 4 : Math.floor(Math.random() * 3) + 2,
            garage: i === 0 && startId === 10 ? 2 : Math.floor(Math.random() * 2) + 1,
            areaSqm: i === 0 && startId === 10 ? 350 : Math.floor(Math.random() * 300) + 100,
            priceGHS: i === 0 && startId === 10 ? 1830055 : Math.floor(Math.random() * 2000000) + 500000,
            priceUSD: i === 0 && startId === 10 ? 150000 : Math.floor(Math.random() * 150000) + 40000,
        });
    }
    // Ensure the first property matches the design reference exactly
    if (startId === 10) {
        properties[0] = {
            id: 10,
            images: [newImageUrl],
            status: PropertyStatus.ForSale,
            daysAgo: 15,
            isPremium: true,
            propertyType: 'House',
            name: 'Lakeside Estate',
            beds: 3,
            baths: 4,
            garage: 2,
            areaSqm: 350,
            priceGHS: 1830055,
            priceUSD: 150000,
        };
    }
    return properties;
}


export const featuredProperties: Property[] = generateProperties(10, 6).map((p, index) => {
    // Explicitly set the 2nd property (Index 1) to SOLD for demonstration
    if (index === 1) {
        return { ...p, isPremium: true, status: PropertyStatus.Sold };
    }
    return { ...p, isPremium: true };
});

export const latestProperties: Property[] = generateProperties(16, 6).map((p, index) => {
    // Explicitly set the 4th property (Index 3) to SOLD for demonstration
    if (index === 3) {
        return { ...p, status: PropertyStatus.Sold };
    }
    return p;
});

export const allPropertiesList: Property[] = generateProperties(22, 12); // Generate 12 properties for the listing page


export const footerLinks = {
    'Property Type': {
        'Residential': [
            { name: 'House for Rent', href: '#' },
            { name: 'House for Sale', href: '#' },
            { name: 'Apartment/Condos for Rent', href: '#' },
            { name: 'Apartment/Condos for Sale', href: '#' },
            { name: 'Land for Sale', href: '#' },
            { name: 'Townhouse for Rent', href: '#' },
            { name: 'Townhouse for Sale', href: '#' },
        ],
        'Commercial': [
            { name: 'Office for Rent', href: '#' },
            { name: 'Office for Sale', href: '#' },
            { name: 'Warehouse', href: '#' },
            { name: 'Industry', href: '#' },
            { name: 'Land for Sale', href: '#' },
            { name: 'Shop for Rent', href: '#' },
            { name: 'Shop for Sale', href: '#' },
        ]
    },
    'About Us': [
        { name: 'About Sheltershub', href: '#' },
        { name: 'Terms of Use', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Policy', href: '#' },
    ],
    'Support': [
        { name: 'support@sheltershub.com', href: 'mailto:support@sheltershub.com' },
        { name: 'Safety tips', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'FAQ', href: '#' },
    ],
    'Our Socials': [
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'YouTube', href: '#' },
        { name: 'Twitter', href: '#' },
    ],
};
