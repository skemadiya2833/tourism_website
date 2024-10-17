import { useEffect } from 'react';

interface ParallaxComponent {
    title: string;
    place: string;
    thumbnail: string;
}
const ParallaxComponent: React.FC<ParallaxComponent> = ({title, place, thumbnail})=> {
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector('.parallax-image') as HTMLElement | null;
      if (parallax) {
        const scrollPosition = window.scrollY;
        parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, 
      behavior: 'smooth', 
    });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="parallax-image absolute inset-0">
        <img
          src={thumbnail}
          alt="Photo of city during a sunset"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold italic bg-black">{title}</h1>
        <p className="mt-4 text-lg">
        
          <a href="https://unsplash.com/photos/4iXagiKXn3Y" target="_blank" rel="noopener noreferrer" className="underline">
            {place}, India
          </a>
        </p>
      
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollDown}
        >
          <div className="bg-white/50 border border-gray-300 rounded-full p-3">
            <svg className="w-8 h-8 text-gray-800 animate-bounce" viewBox="0 0 24 24">
              <path
                d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ParallaxComponent;