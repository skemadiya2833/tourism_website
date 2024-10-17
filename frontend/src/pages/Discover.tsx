import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import SearchedCard from "@/components/common/SearchResultCard";
import { searchRequest } from "../Redux/slices/searchSlice";
import {  SearchEntityType, SearchResponseItem } from "@/types/search/searchPayload";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../Redux/store";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/router";
import DataNotFound from '../assets/data not found.jpeg'
import Cookies from "js-cookie";
import Image
 from "next/image";
const SearchAll: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(
    (state: RootState) => state.search.ALL.results
  );
const router = useRouter()
  const [value, setValues] = useState<SearchResponseItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { searchTerm } = router.query;

  const handleSearch = useCallback(
    (searchTerm: string, entityType: SearchEntityType, page = 1) => {
      dispatch(
        searchRequest({
          keyword: searchTerm,
          entityType,
          page,
          limit: 5,
        })
      );
    },
    [dispatch]
  );

  useEffect(()=> {
    const location = Cookies.get("userLocation");
    if (location) {
      dispatch(searchRequest({keyword: location, entityType: SearchEntityType.ALL,page: 1,limit:5}))
    }
  },[])

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm as string, SearchEntityType.ALL);
    }
  }, [searchTerm, handleSearch]);
  useEffect(() => {
    if (searchResults?.data) {
      setValues(searchResults.data);
    }
  }, [searchResults]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch("", SearchEntityType.ALL, page);
  };

  return (
    <div>
      <SearchBar searchType={SearchEntityType.ALL} onSearch={(term) => handleSearch(term, SearchEntityType.ALL)} />
      <div className="bg-gray-100 pt-10 px-10">
        <div className="flex justify-center items-center flex-col">
          {value.length > 0 ? (
            value.map((result) => (
              <SearchedCard
                key={result.id}
                name={result.name}
                description={result.description}
                imageUrl={result.thumbnailUrl}
                entityType={result.entity}
                pageType={SearchEntityType.ALL}
                id={result.id}
              />
            ))
          ) : (
            <div className="mb-10">
              <Image src={DataNotFound} alt="data not found"/>
            </div>
          )}
        </div>

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
  );
};

export default SearchAll;
