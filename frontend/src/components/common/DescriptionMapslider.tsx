import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PlaceDescription {
  titlle: string |null | undefined;
  description: string | null |undefined;
  mapUrl: string | null |undefined;

}
export default function PlaceDescription({ title, description, mapUrl }: { title: string |null; description: string |null; mapUrl: string|null }) {

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}, India</h2>
          <div
            className={`text-lg transition-all duration-300 overflow-hidden ${
              isExpanded ? "max-h-[1000px]" : "max-h-24"
            }`}
            style={{ maxHeight: isExpanded ? "none" : "6rem" }}
          >
            <p>
             {description}
            </p>
          </div>
          <button
            onClick={toggleReadMore}
            className="flex items-center text-blue-500 mt-2 hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
            {isExpanded ? (
              <FaChevronUp className="ml-1" />
            ) : (
              <FaChevronDown className="ml-1" />
            )}
          </button>
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
