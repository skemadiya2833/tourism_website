import TypeWriter from "typewriter-effect";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import background from "../../assets/heroSectionBg.jpg";
import { useState } from "react";
import router from "next/router";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {  
      router.push(`/Discover?searchTerm=${searchTerm.trim()}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-[50vh] md:h-[60vh] lg:h-[70vh]">
      <Image
        src={background}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="z-0"
      />

      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      <div className="relative z-20 flex flex-col items-center text-center text-white space-y-4">
        <p className="text-xl md:text-2xl lg:text-3xl font-light">Visit</p>

        <div className="animatedTyping font-bold text-3xl md:text-5xl lg:text-6xl underline decoration-4 underline-offset-4 font-bebas">
          <TypeWriter
            options={{
              strings: ["KASHMIR", "JAIPUR", "CHENNAI"],
              autoStart: true,
              loop: true,
              cursor: "",
            }}
          />
        </div>

        <div className="flex items-center bg-white text-black rounded-full px-4 py-2 space-x-2 w-72 md:w-96 lg:w-[400px]">
          <CiSearch className="text-xl md:text-2xl lg:text-3xl" />
          <input
            type="text"
            placeholder="Place to go"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDownCapture={handleKeyDown}  
            className="w-full bg-transparent outline-none placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
