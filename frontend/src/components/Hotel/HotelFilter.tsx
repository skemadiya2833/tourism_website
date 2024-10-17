import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import PlaceListDropDown from "@/components/common/PlaceListDropDown";

interface HotelFilterProps {
  onFilterChange: (filters: {
    placeId?: number | string;
    hotelStarRating?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }) => void;
  reset: boolean;
}

const HotelFilter: React.FC<HotelFilterProps> = ({ onFilterChange, reset }) => {
  const [placeId, setPlaceId] = useState<string | undefined>(undefined);
  const [hotelStarRating, setHotelStarRating] = useState<number | undefined>(
    undefined
  );
  const [priceRange, setPriceRange] = useState<number[]>([500, 50000]);
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    if (reset) {
      setPlaceId(undefined);
      setHotelStarRating(undefined);
      setPriceRange([500, 1000]);
      setSortBy("");
    }
  }, [reset]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const applyFilters = () => {
    onFilterChange({
      placeId,
      hotelStarRating,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy,
    });
  };

  const handlePlaceChange = (selectedPlaceId: string) => {
    setPlaceId(selectedPlaceId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full sm:w-full md:w-full lg:w-1/4 mb-8">
      <PlaceListDropDown onPlaceChange={handlePlaceChange} />

      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">Rating</p>
        <select
          value={hotelStarRating || ""}
          onChange={(e) => setHotelStarRating(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
        >
          <option value="">Select rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">
          Your budget (per night):
        </p>
        <Box sx={{ width: "100%" }}>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={500}
            max={50000}
            sx={{ color: "#22C55E" }}
          />
        </Box>
        <div className="mt-2 text-sm text-gray-600">
          &#8377; {priceRange[0]} - &#8377; {priceRange[1]}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">Sort by</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
        >
          <option value="">Select sort option</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="hotelStarRating">Rating</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default HotelFilter;
