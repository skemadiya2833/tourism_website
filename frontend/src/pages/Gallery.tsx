import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../Redux/store";
import { Name } from "@/types/place/placePayload";
import { fetchPlaceByIdRequest, fetchPlaceNameRequest } from "@/Redux/slices/placeSlice";
import Cookies from "js-cookie"; 
import { Image as ImageType } from "../types/common/image"

export default function Gallery() {
  const dispatch = useAppDispatch();
  const names = useAppSelector((state: RootState) => state.place.name);
  const images = useAppSelector((state: RootState) => state.place.place?.images);
  
  const [activeName, setActiveName] = useState<Name | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 

  useEffect(() => {
    dispatch(fetchPlaceNameRequest({ name: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (activeName) {
      dispatch(fetchPlaceByIdRequest(activeName.id));
    }
  }, [activeName, dispatch]);

 
  useEffect(() => {
  
    const userLocation = Cookies.get("userLocation")

    if (userLocation && names) {
      const foundName = names.find((name: Name) => name.name === userLocation);
      if (foundName) {
        setActiveName(foundName); 
        dispatch(fetchPlaceByIdRequest(foundName.id)); 
      } else {
        setActiveName(names[0]); 
      }
    } else if (names) {
      setActiveName(names[0]); 
    }
  }, [names, dispatch]); 


  const filteredNames = names?.filter((name: Name) =>
    name.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };


  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  const handleChipClick = (name: Name) => {
    setActiveName(name);
    dispatch(fetchPlaceByIdRequest(name.id)); 
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search place..."
          className="border rounded-lg px-4 py-2 w-full sm:max-w-[44%]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-4 m-4 p-4 overflow-auto"> 
        {filteredNames?.map((name: Name) => (
          <button
            key={name.id}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
              ${activeName === name ? "bg-green-900 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleChipClick(name)} 
          >
            {name.name}
          </button>
        ))}
      </div>

      <div className="mx-auto">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images?.map((image:ImageType, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer"
              onClick={() => handleImageClick(image.link)}
            >
              <Image
                src={image.link}
                alt={`image ${index}`}
                width={300}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeFullScreen}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full-screen"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
