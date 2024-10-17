import React, { useCallback, useEffect, useState } from "react";
import HotelFilter from "@/components/Hotel/HotelFilter";
import SearchBar from "@/components/common/SearchBar";
import SearchedCard from "@/components/common/SearchResultCard";
import Pagination from "@/components/common/Pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { searchRequest } from "../Redux/slices/searchSlice";
import { SearchEntityType, HotelResponse, SearchHotelsResponse } from "@/types/search/searchPayload";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import explore from '../assets/exploreBg.jpeg';
import { EntityType } from "@/types/enum/entityType.enum";

const Hotel: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state: RootState) => state.search.HOTEL.results);

  const [value, setValues] = useState<HotelResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    placeId: undefined,
    hotelStarRating: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: undefined,
  });
  const [reset, setReset] = useState(false);

  useEffect(() => {
    dispatch(searchRequest({entityType: SearchEntityType.HOTEL,page: 1,limit:5, hotelStarRating:5}))
  },[])
  
  const handleSearch = useCallback(
    (searchTerm: string, entityType: SearchEntityType, page = 1) => {
      dispatch(
        searchRequest({
          keyword: searchTerm,
          entityType,
          placeId: filters.placeId,
          hotelStarRating: filters.hotelStarRating,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sortBy: filters.sortBy,
          page,
          limit: 5,
        })
      );
    },
    [dispatch, filters]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch("", SearchEntityType.HOTEL, page);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setReset(false);
    handleSearch("", SearchEntityType.HOTEL, currentPage);
  };

  useEffect(() => {
    if (searchResults?.data) {
      setValues(searchResults.data);
    }
  }, [searchResults]);

  return (
    <div>
      <SearchBar searchType={SearchEntityType.HOTEL} onSearch={(term) => handleSearch(term, SearchEntityType.HOTEL)} />
      <div className="bg-gray-100 flex flex-col md:flex-row justify-between pt-10 gap-6 px-10">
        <HotelFilter onFilterChange={handleFilterChange} reset={reset} /> 
        <div className="">
           {value.length > 0 ? (
            value.map((result) => (
              <SearchedCard
                key={result.id}
                name={result.name}
                description={result.description}
                imageUrl={result.thumbnailUrl}
                entityType={EntityType.HOTEL}
                pageType={SearchEntityType.HOTEL}
                price={result.price}
                rating={result.hotelStarRating}
                id={result.id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center"> 
              <Image src={explore} alt="explore"/>
              </div>
          )}

          {searchResults && searchResults.total && searchResults.limit && currentPage ? (
            <Pagination
              total={searchResults.total}
              limit={searchResults.limit}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
