const sampleListings = [
  {
    title: 'Serene Stay Hostel - Your Tranquil Retreat in Bhubaneswar',
    description: 'Welcome to Serene Stay Hostel, nestled in the peaceful neighborhood of Jayadev Vihar, Bhubaneswar, Odisha. Enjoy a relaxing and affordable stay with easy access to major city attractions, shopping centers, and local dining spots. Our hostel offers modern amenities, comfortable rooms, and a friendly atmosphere perfect for travelers and students alike. Experience the best of Bhubaneswar from the comfort of Serene Stay Hostel.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716218991/wanderlust/gk7rnrczvlrjpu9aqnjz.jpg',
      filename: 'wanderlust/gk7rnrczvlrjpu9aqnjz'
    },
    price: 2000,
    location: 'Address: Plot No. 234, Jayadev Vihar, Bhubaneswar, Odisha, 751013, India',
    country: 'India',

    geometry: { type: 'Point', coordinates: [ 85.805872, 20.29886 ] },

  
  },
  {
   
    title: 'Oasis Hostel - Your Comfortable Hub in Bhubaneswar',
    description: 'Experience the warmth of Oasis Hostel, located in the dynamic neighborhood of Kharavela Nagar, Bhubaneswar, Odisha. Our hostel provides a cozy and budget-friendly stay with excellent amenities, including free Wi-Fi, communal spaces, and a friendly environment. Conveniently positioned near major attractions, shopping areas, and public transport, Oasis Hostel is the ideal place for travelers and students seeking comfort and convenience in the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219090/wanderlust/gb4c0nceupp2vftpp6tx.jpg',
      filename: 'wanderlust/gb4c0nceupp2vftpp6tx'
    },
    price: 1900,
    location: 'Plot No. 567, Kharavela Nagar, Bhubaneswar, Odisha, 751001, India',
    country: 'india',
    reviews: [],
    geometry: { type: 'Point', coordinates: [ 85.838469, 20.26025 ] },
 
  },
  {

    title: 'Harmony Haven Hostel - Your Cozy Retreat in Bhubaneswar',
    description: 'Welcome to Harmony Haven Hostel, situated in the serene and well-connected neighborhood of Patia, Bhubaneswar, Odisha. Our hostel offers a welcoming and affordable stay with modern amenities, including high-speed Wi-Fi, communal kitchen, and relaxing common areas. Located close to major educational institutions, shopping centers, and cultural sites, Harmony Haven Hostel is perfect for students, professionals, and travelers seeking a convenient and comfortable home base in the city',   
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219155/wanderlust/fudbp46deboki2uyxkfj.jpg',
      filename: 'wanderlust/fudbp46deboki2uyxkfj'
    },
    price: 2300,
    location: ' Plot No. 1234, Patia, Bhubaneswar, Odisha, 751024, India',
    country: 'India',

    geometry: { type: 'Point', coordinates: [ 85.8273, 20.355327 ] },
  },
  {
    title: 'Tranquil Nest Hostel - Your Peaceful Stay in Bhubaneswar',
    description: 'Discover Tranquil Nest Hostel, located in the picturesque neighborhood of Chandrasekharpur, Bhubaneswar, Odisha. Enjoy a serene and budget-friendly stay with top-notch amenities, including free Wi-Fi, a shared kitchen, and inviting common areas. Our hostel is ideally situated near key attractions, educational institutions, and shopping hubs, making it the perfect retreat for students, professionals, and travelers looking for comfort and convenience',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219269/wanderlust/nhh4k3hzazvusl8kstyi.jpg',
      filename: 'wanderlust/nhh4k3hzazvusl8kstyi'
    },
    price: 1700,
    location: 'Plot No. 4321, Chandrasekharpur, Bhubaneswar, Odisha, 751016, India',
    country: 'India',
  
    geometry: { type: 'Point', coordinates: [ 85.810646, 20.333392 ] },
  
  },
  {
    title: 'GreenLeaf Hostel - Your Relaxing Getaway in Bhubaneswar',
    description: 'Welcome to GreenLeaf Hostel, nestled in the lush and vibrant neighborhood of Forest Park, Bhubaneswar, Odisha. Our hostel offers a serene and affordable retreat with excellent amenities, including complimentary Wi-Fi, a communal kitchen, and cozy lounge areas. Perfectly positioned near parks, cultural sites, and shopping areas, GreenLeaf Hostel is the ideal choice for travelers, students, and professionals seeking a peaceful and convenient stay in the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219339/wanderlust/wj8zltpscwmosaxydmki.jpg',
      filename: 'wanderlust/wj8zltpscwmosaxydmki'
    },
    price: 2600,
    location: 'Plot No. 678, Forest Park, Bhubaneswar, Odisha, 751009, India',
    country: 'India',
    geometry: { type: 'Point', coordinates: [ 85.827229, 20.258456 ] },

  },
  {

    title: 'Sunshine Hostel - Your Cozy Corner in Bhubaneswar',
    description: 'Welcome to Sunshine Hostel, located in the lively and convenient neighborhood of Saheed Nagar, Bhubaneswar, Odisha. Our hostel provides a warm and budget-friendly stay with modern amenities, including free Wi-Fi, a shared kitchen, and vibrant common areas. Perfectly situated near shopping centers, educational institutions, and public transport, Sunshine Hostel is an excellent choice for travelers, students, and professionals seeking a comfortable and accessible home away from home.',  
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219422/wanderlust/y8arpwgsqjwf8es91rio.jpg',
      filename: 'wanderlust/y8arpwgsqjwf8es91rio'
    },
    price: 2400,
    location: 'Plot No. 2345, Saheed Nagar, Bhubaneswar, Odisha, 751007, India',
    country: 'India',
    geometry: { type: 'Point', coordinates: [ 85.845948, 20.288388 ] },
  },
  {
    
    title: 'Lotus Lodge Hostel - Your Serene Stay in Bhubaneswar',
    description: 'Welcome to Lotus Lodge Hostel, situated in the tranquil and green neighborhood of Nayapalli, Bhubaneswar, Odisha. Our hostel offers a peaceful and affordable stay with excellent amenities, including complimentary Wi-Fi, a shared kitchen, and comfortable common areas. Conveniently located near major attractions, business hubs, and dining options, Lotus Lodge Hostel is the perfect place for travelers, students, and professionals seeking a serene and convenient stay in the city.',        
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219482/wanderlust/ml8xvsesizilo2i08gzm.jpg',
      filename: 'wanderlust/ml8xvsesizilo2i08gzm'
    },
    price: 2200,
    location: 'Plot No. 7890, Nayapalli, Bhubaneswar, Odisha, 751012, India',
    country: 'India',
    
    geometry: { type: 'Point', coordinates: [ 85.819382, 20.283453 ] },
    
  },
  {
    
    title: 'Urban Oasis Hostel - Your Vibrant Stay in Bhubaneswar',
    description: 'Welcome to Urban Oasis Hostel, located in the bustling and lively neighborhood of Janpath, Bhubaneswar, Odisha. Our hostel offers a vibrant and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy lounge areas. Conveniently situated near major attractions, shopping centers, and eateries, Urban Oasis Hostel is the perfect choice for travelers, students, and professionals seeking a dynamic and comfortable stay in the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219548/wanderlust/fepfmyd6hcxcn2vyve6e.jpg',
      filename: 'wanderlust/fepfmyd6hcxcn2vyve6e'
    },
    price: 2500,
    location: 'Plot No. 5678, Janpath, Bhubaneswar, Odisha, 751015, India',
    country: 'India',
    
    geometry: { type: 'Point', coordinates: [ 85.838469, 20.26025 ] },
   
   
  },
  {
    
    title: 'Zenith Hostel - Your Modern Haven in Bhubaneswar',
    description: 'Discover Zenith Hostel, situated in the modern and vibrant neighborhood of Patia, Bhubaneswar, Odisha. Our hostel offers a contemporary and budget-friendly stay with top-notch amenities, including complimentary Wi-Fi, a shared kitchen, and inviting common areas. Conveniently located near major educational institutions, shopping centers, and entertainment hubs, Zenith Hostel is the perfect choice for travelers, students, and professionals seeking comfort and convenience during their stay in the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219627/wanderlust/ihtavwmmjcj1qylxerbv.jpg',
      filename: 'wanderlust/ihtavwmmjcj1qylxerbv'
    },
    price: 1800,
    location: 'Plot No. 3456, Patia, Bhubaneswar, Odisha, 751024, India',
    country: 'India',
    
    geometry: { type: 'Point', coordinates: [ 85.8273, 20.355327 ] },
 
  },
  {
    
    title: 'Tranquility Hostel - Your Peaceful Retreat in Bhubaneswar',
    description: 'Welcome to Tranquility Hostel, nestled in the serene and green neighborhood of Jayadev Vihar, Bhubaneswar, Odisha. Our hostel offers a peaceful and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy common areas. Strategically located near major attractions, educational institutions, and shopping centers, Tranquility Hostel provides the perfect environment for travelers, students, and professionals seeking a tranquil stay in the city',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219708/wanderlust/arp3ghbzqlniu7ryzjss.jpg',
      filename: 'wanderlust/arp3ghbzqlniu7ryzjss'
    },
    price: 1800,
    location: 'Plot No. 4567, Jayadev Vihar, Bhubaneswar, Odisha, 751013, India',
    country: 'india',
    
    geometry: { type: 'Point', coordinates: [ 85.805872, 20.29886 ] },
    
  },
  {
    
    title: 'Harmony Hostel - Your Welcoming Haven in Bhubaneswar',
    description: 'Welcome to Harmony Hostel, situated in the friendly neighborhood of Rasulgarh, Bhubaneswar, Odisha. Our hostel offers a warm and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy communal spaces. Strategically positioned near major landmarks, educational institutions, and dining options, Harmony Hostel provides the perfect blend of comfort and convenience for travelers, students, and professionals visiting the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219813/wanderlust/zgltr2ekusn8kjzwqjz8.jpg',
      filename: 'wanderlust/zgltr2ekusn8kjzwqjz8'
    },
    price: 2600,
    location: 'Plot No. 789, Rasulgarh, Bhubaneswar, Odisha, 751010, India',
    country: 'India',
    
    geometry: { type: 'Point', coordinates: [ 85.859539, 20.296546 ] },
  
  },
  {
    
    title: 'Serendipity Hostel - Your Urban Escape in Bhubaneswar',
    description: 'Welcome to Serendipity Hostel, located in the vibrant neighborhood of Master Canteen Square, Bhubaneswar, Odisha. Our hostel offers an urban and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and inviting communal spaces. Conveniently situated near major attractions, shopping centers, and eateries, Serendipity Hostel is the perfect choice for travelers, students, and professionals seeking comfort and convenience during their stay in the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219885/wanderlust/dxfbllgf3ufodi0rjwkj.jpg',
      filename: 'wanderlust/dxfbllgf3ufodi0rjwkj'
    },
    price: 2100,
    location: 'Plot No. 123, Master Canteen Square, Bhubaneswar, Odisha, 751001, India',
    country: 'India',

    geometry: { type: 'Point', coordinates: [ 85.8412185, 20.2684465 ] },
  
  },
  {
   
    title: 'Vista Hostel - Your Scenic Retreat in Bhubaneswar',
    description: 'Welcome to Vista Hostel, nestled in the picturesque neighborhood of Sailashree Vihar, Bhubaneswar, Odisha. Our hostel offers a scenic and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy communal spaces. Conveniently located near major landmarks, educational institutions, and green spaces, Vista Hostel provides the perfect blend of tranquility and convenience for travelers, students, and professionals visiting the city.',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716219967/wanderlust/yg8mgkrja1dpcpni1aot.jpg',
      filename: 'wanderlust/yg8mgkrja1dpcpni1aot'
    },
    price: 2300,
    location: ' Plot No. 2345, Sailashree Vihar, Bhubaneswar, Odisha, 751021, India',
    country: 'India',
    geometry: { type: 'Point', coordinates: [ 85.807454, 20.337557 ] },
   
  },
  {
    
    title: 'Urban Heights Hostel - Your Modern Haven in Bhubaneswar',
    description: 'Welcome to Urban Heights Hostel, situated in the dynamic neighborhood of Unit 4, Bhubaneswar, Odisha. Our hostel offers a modern and budget-friendly stay with top-notch amenities, including complimentary Wi-Fi, a communal kitchen, and inviting communal spaces. Strategically positioned near major attractions, educational institutions, and dining options, Urban Heights Hostel provides the perfect blend of comfort and convenience for travelers, students, and professionals exploring the city',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716220046/wanderlust/ojjb9z5db2yt8cqgapkc.jpg',
      filename: 'wanderlust/ojjb9z5db2yt8cqgapkc'
    },
    price: 2100,
    location: 'Plot No. 789, Unit 4, Bhubaneswar, Odisha, 751001, India',
    country: 'india',
    geometry: { type: 'Point', coordinates: [ 85.830702, 20.278106 ] },
    
  },
  {
    title: 'Solace Hostel - Your Tranquil Haven in Bhubaneswar',
    description: 'Welcome to Solace Hostel, located in the peaceful neighborhood of Gajapati Nagar, Bhubaneswar, Odisha. Our hostel offers a serene and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy communal spaces. Conveniently situated near major landmarks, educational institutions, and green spaces, Solace Hostel provides the perfect blend of tranquility and convenience for travelers, students, and professionals visiting the city',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716220313/wanderlust/c3zytctl4endke5amxll.jpg',
      filename: 'wanderlust/c3zytctl4endke5amxll'
    },
    price: 2600,
    location: 'Plot No. 456, Gajapati Nagar, Bhubaneswar, Odisha, 751005, India',
    country: 'India',
   
    geometry: { type: 'Point', coordinates: [ 85.823831, 20.308983 ] },
    
  },
  {
    title: 'Tranquil Waves Hostel - Your Relaxing Haven in Bhubaneswar',
    description: 'Welcome to Tranquil Waves Hostel, nestled in the serene neighborhood of Kalinga Vihar, Bhubaneswar, Odisha. Our hostel offers a peaceful and budget-friendly stay with modern amenities, including complimentary Wi-Fi, a communal kitchen, and cozy communal spaces. Strategically located near major attractions, educational institutions, and dining options, Tranquil Waves Hostel provides the perfect blend of tranquility and convenience for travelers, students, and professionals exploring the city',
    image: {
      url: 'https://res.cloudinary.com/dlpbofeau/image/upload/v1716220410/wanderlust/pwbnket9ww1tldqin8xl.jpg',
      filename: 'wanderlust/pwbnket9ww1tldqin8xl'
    },
    price: 2400,
    location: 'Plot No. 789, Kalinga Vihar, Bhubaneswar, Odisha, 751019, India',
    country: 'India',
    geometry: { type: 'Point', coordinates: [ 84.808629, 22.243796 ] },
  }
];

module.exports = { data: sampleListings };