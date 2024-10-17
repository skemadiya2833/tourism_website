import Image from "next/image";
import React from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa6";
import { TbReceiptRupee } from "react-icons/tb";
import { EntityType } from "@/types/enum/entityType.enum";
import { SearchEntityType } from "@/types/search/searchPayload";
interface SearchResultCardProps {
  name: string;
  description: string;
  imageUrl: string;
  entityType: EntityType;
  pageType: SearchEntityType;
  price?: number;
  rating?: number;
  id: string;
  tags?:string[];
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  name,
  description,
  imageUrl,
  entityType,
  pageType,
  price,
  rating = 0,
  id,
  tags
}) => {

  const totalRating = 5;
  const handleClick = () => {
    if (entityType === EntityType.HOTEL) {
      window.location.href = `/hotels/${id}`;
    } else if (entityType === EntityType.HERITAGE) {
      window.location.href = `/heritages/${id}`;
    } else if (entityType === EntityType.PLACE) {
      window.location.href = `/places/${id}`;
    }
  };
  return (
    <div
      className="rounded-lg bg-white flex flex-col md:flex-row gap-6 shadow-sm mb-8 w-full md:w-[800px] max-w-[100%] hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full md:w-72 h-52">
        <Image
          src={imageUrl}
          alt={name}
          width={700}
          height={400}
          className="object-cover w-full md:w-64 h-full rounded-tl-lg rounded-bl-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full p-2">
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="p-1 text-xs border font-bold border-black rounded-md inline-block">
              {entityType}
            </div>
            <div>
              {price && (
                <div className="text-sm font-bold flex items-center">
                  <TbReceiptRupee />
                  <span>{price}</span>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>

          {entityType === "HOTEL" && pageType === "HOTEL" ? (
            <div className="flex items-center gap-1 text-green-600 text-xs">
            
              {[...Array(totalRating)].map((_, index) =>
                index < rating ? (
                  <FaCircle key={index} /> 
                ) : (
                  <FaRegCircle key={index} /> 
                )
              )}
              <span className="ml-2 text-xs text-black">{rating} rating</span>
            </div>
          ) : (
            <div></div>
          )}
          
          <div className="text-sm my-5 text-gray-700 overflow-hidden line-clamp-3 max-h-16">
            {description}
          </div>

          {
            tags && tags.map(tag => {
              return (
                <span key={tag} className="mr-2 p-1 text-xs mt-5 rounded-full text-white bg-green-900 font-semibold">
                  {tag}
                </span>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
