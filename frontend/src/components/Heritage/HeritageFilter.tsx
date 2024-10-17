import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useState, useEffect } from "react";
import PlaceListDropDown from "../common/PlaceListDropDown";
import { RootState } from "../../Redux/store";
import { fetchTagsRequest } from "@/Redux/slices/tagSlice";
import { Tag } from "@/types/tag/tag";

interface HeritageFilterProps {
  onApplyFilters: (placeId: string, selectedTags: string) => void;
  reset: boolean;
}

const HeritageFilter: React.FC<HeritageFilterProps> = ({ onApplyFilters, reset }) => {
  const dispatch = useAppDispatch();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>();
  const tagsResponse = useAppSelector((state:RootState) => state.tag.tags)

  useEffect(() => {
    console.log(" use effect of filter is called in reset change " , reset)
    if (reset) {
      setSelectedPlaceId("")
      setSelectedTags([]);
    }
  },[reset])

  useEffect(() => {
    dispatch(fetchTagsRequest());
  }, [dispatch])

  useEffect(() => {
    if (tagsResponse) {
      setTags(tagsResponse);
    }
  },[tagsResponse] )

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleApplyFilters = () => {
    // if (selectedPlaceId) {
    //     onApplyFilters(selectedPlaceId, selectedTags.join(","));
    // }
  console.log(" selected TAgs" , selectedTags);
    onApplyFilters(selectedPlaceId, selectedTags.join(","));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-2/4 h-full">
      <PlaceListDropDown onPlaceChange={setSelectedPlaceId} />

      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags && tags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => toggleTag(tag.name)}
              className={`cursor-pointer px-3 py-1 rounded-full border ${
                selectedTags.includes(tag.name)
                  ? "bg-green-500 text-white"
                  : "bg-white border-green-500 text-green-500"
              } transition`}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default HeritageFilter;
