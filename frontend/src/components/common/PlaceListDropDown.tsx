import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { fetchPlaceNameRequest } from "@/Redux/slices/placeSlice";
import { Name } from "@/types/place/placePayload";

interface PlaceListDropDownProps {
  onPlaceChange: (placeId: string) => void; 
}

const PlaceListDropDown: React.FC<PlaceListDropDownProps> = ({ onPlaceChange }) => {
  const dispatch = useAppDispatch();
  const names = useAppSelector((state: RootState) => state.place.name);
  const [placeNames, setPlaceNames] = useState<Name[]>([]);

  useEffect(() => {
    dispatch(fetchPlaceNameRequest({ name: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (names) {
      console.log("Fetched place names:", names);
      setPlaceNames(names);
    }
  }, [names]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlaceId = (e.target.value);
    onPlaceChange(selectedPlaceId); 
  };

  return (
    <div className="mb-6">
      <p className="font-semibold text-gray-700 mb-2">Place</p>
      <select
        className="w-full  overflow-y-scroll  h-20 border border-gray-300 rounded-md p-2 focus:outline-none"
        onChange={handleChange}
        size={4} 
        style={{
          overflowY: 'auto', 
          height: 'auto', 
          maxHeight: '10rem', 
        }}
      >
        {placeNames.length > 0 ? (
          placeNames.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
    </div>
  );
};

export default PlaceListDropDown;
