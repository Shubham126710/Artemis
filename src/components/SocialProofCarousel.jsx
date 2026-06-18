import { motion } from 'framer-motion';

const studios = [
  { name: "Marvel", logo: "/Marvel_Logo.png" },
  { name: "Warner Bros", logo: "/warner_bros_logo.png", alwaysWhite: true },
  { name: "Universal", logo: "/universal_logo.png" },
  { name: "Paramount", logo: "/Paramount_logo.png" },
  { name: "Lionsgate", logo: "/Lionsgate_logo.png" },
  { name: "Pixar", logo: "/Pixar_logo.png", alwaysWhite: true },
  { name: "DreamWorks", logo: "/dreamworks_logo.jpeg", alwaysWhite: true },
  { name: "Sony Pictures", logo: "/Sony_Pictures_logo.png", alwaysWhite: true },
  { name: "Disney", logo: "/Disney_logo.svg", alwaysWhite: true }
];

// Duplicate array for seamless infinite scroll
const carouselItems = [...studios, ...studios];

const SocialProofCarousel = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-bg-elevated/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          Partnered with the biggest names in entertainment
        </p>
      </div>
      
      <div className="relative w-full flex overflow-hidden group">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-marquee py-4">
          <div className="flex gap-12 pr-12 w-1/2 justify-around">
            {studios.map((studio, index) => {
              const isJpeg = studio.logo.endsWith('.jpeg') || studio.logo.endsWith('.jpg');
              let effectClass = 'logo-white-effect';
              if (isJpeg) effectClass = 'logo-jpeg-effect';
              if (studio.alwaysWhite) {
                effectClass = isJpeg ? 'logo-jpeg-white-always' : 'logo-white-always';
              }
              
              return (
                <div 
                  key={`set1-${studio.name}-${index}`}
                  className="flex items-center justify-center min-w-[150px] h-[80px] cursor-pointer"
                >
                  <img 
                    src={studio.logo} 
                    alt={studio.name} 
                    className={`max-h-16 max-w-[150px] object-contain ${effectClass}`} 
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-12 pr-12 w-1/2 justify-around">
            {studios.map((studio, index) => {
              const isJpeg = studio.logo.endsWith('.jpeg') || studio.logo.endsWith('.jpg');
              let effectClass = 'logo-white-effect';
              if (isJpeg) effectClass = 'logo-jpeg-effect';
              if (studio.alwaysWhite) {
                effectClass = isJpeg ? 'logo-jpeg-white-always' : 'logo-white-always';
              }
              
              return (
                <div 
                  key={`set2-${studio.name}-${index}`}
                  className="flex items-center justify-center min-w-[150px] h-[80px] cursor-pointer"
                >
                  <img 
                    src={studio.logo} 
                    alt={studio.name} 
                    className={`max-h-16 max-w-[150px] object-contain ${effectClass}`} 
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default SocialProofCarousel;
