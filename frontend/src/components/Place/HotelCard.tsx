import Image from "next/image";
import { useState } from "react";
import { FaCircle, FaRegCircle, FaStar } from "react-icons/fa";
import ExternalLink from "../../assets/external-link-svgrepo-com.svg";
export default function Card({ thumbnail, rating, id, title, description }: { thumbnail: string; rating: number; id: string; title: string , description: string}) {
  const [isHovered, setIsHovered] = useState(false);
  return (

    <div className="flex justify-center items-center h-auto">

    <a
      href="#"
      className="card shadow-lg relative block w-[clamp(300px,50vmin,600px)] aspect-[4/3] rounded-2xl overflow-hidden transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative">
        <Image
          src={thumbnail}
          alt="balloon with an emoji face"
          layout="fill"
          objectFit="cover"
          className={`transition-transform duration-300 h ${
            isHovered ? "scale-110" : "scale-100 "
          } ` }
          />
      </div>

      <span className="absolute bottom-0 left-0 w-full bg-white  p-6 grid gap-1 h-[40%] items-center">
        <span className="text-lg font-semibold -mb-2 ">{title}</span>
        <div className="flex items-center gap-1  text-xs">
            
            {[...Array(5)].map((_, index) =>
              index < rating ? (
                <FaStar key={index} className="text-green-600" /> 
              ) : undefined
            )}
            <span className="ml-2 text-xs ">{rating} rating</span>

          </div>
          <div>
            <p className="line-clamp-1">{description}</p>
          </div>
   
      </span>

      <span
        className={`absolute bottom-[30%] right-6 aspect-square w-[15%] bg-white/30 backdrop-blur-[8px] rounded-md flex justify-center items-center transition-transform duration-300 ${
          isHovered ? "translate-y-[-20%]" : "translate-y-[200px]"
        }`}
        >
        <Image src={ExternalLink} alt="link" />
      </span>

  
    </a>
        </div>
  );
}
