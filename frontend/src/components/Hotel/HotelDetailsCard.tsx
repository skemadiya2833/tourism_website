import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaLaptop,
  FaPhone,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMailOutline, MdEventAvailable } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface HotelDetailsProps {
  title: string | null | undefined;
  description: string | null | undefined;
  price: number | null | undefined;
  starRating: number | null | undefined;
  location: string | null | undefined;
  mapUrl: string | null | undefined;
  website: string | null | undefined;
  email: string | null | undefined;
  contact: string | null | undefined;
  availableRooms: number | null | undefined;
}

export default function HotelDetails({
  title,
  description,
  price,
  starRating,
  location,
  mapUrl,
  website,
  email,
  contact,
  availableRooms,
}: HotelDetailsProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4 py-2">
      <div
        ref={ref}
        className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8"
      >
        <div
          className={`w-full md:w-1/2 p-8 transition-transform duration-700 ease-out ${
            inView ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Details</h1>
              <h1 className="text-xl font-semibold text-gray-700 mt-2">
                {title}
              </h1>
              <h2 className="text-md text-gray-600 mt-1">{location}</h2>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-sm text-gray-600 flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> {starRating} Star
                Hotel
              </h1>
            </div>
            <div className="text-sm text-gray-600 flex items-center mb-4">
              <FaIndianRupeeSign className="mr-2" /> {price} per night
            </div>

            <div className="mb-4">
              <h2 className="text-sm text-gray-600 flex items-center">
                <CiLocationOn className="text-blue-500 mr-2" /> Location
              </h2>
            </div>

            {website && (
              <div className="mb-4">
                <h1 className="text-sm text-gray-600 flex items-center">
                  <FaLaptop className="text-gray-500 mr-2" /> {website}
                </h1>
              </div>
            )}

            <div className="mb-4">
              <h1 className="text-sm text-gray-600 flex items-center">
                <MdOutlineMailOutline className="text-gray-500 mr-2" /> {email}
              </h1>
            </div>

            {contact && (
              <div className="mb-4">
                <h1 className="text-sm text-gray-600 flex items-center">
                  <FaPhone className="text-green-500 mr-2" /> {contact}
                </h1>
              </div>
            )}

            <div>
              <h1 className="text-sm text-gray-600 flex items-center">
                <MdEventAvailable className="text-red-500 mr-2" />{" "}
                {availableRooms} Available Rooms
              </h1>
            </div>

            <div className="mt-6">
              <div
                className={`text-xs transition-all duration-300 overflow-hidden ${
                  isExpanded ? "max-h-[1000px]" : "max-h-24"
                }`}
                style={{ maxHeight: isExpanded ? "none" : "6rem" }}
              >
                <p>{description}</p>
              </div>
              <button
                onClick={toggleReadMore}
                className="flex text-xs items-center text-blue-500 mt-2 hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
                {isExpanded ? (
                  <FaChevronUp className="ml-1" />
                ) : (
                  <FaChevronDown className="ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-full md:w-1/2 transition-transform duration-700 ease-out ${
            inView ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <iframe
            src={mapUrl ?? ""}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
