import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import background from "../../assets/topPlaceSliderBg.jpg";
import { RootState } from "../../Redux/store";
import { fetchPlacesRequest } from "../../Redux/slices/placeSlice";
import { Place } from "../../types/place/placePayload";
import router from "next/router";

const TopPlaceSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { places, loading, error } = useAppSelector(
    (state: RootState) => state.place
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows:false
        },
      },
    ],
  };

  const handleOnClick = (id: string) => {
    router.push(`/places/${id}`);
  }
  useEffect(() => {
    dispatch(fetchPlacesRequest({page: 1, limit: 5}));
  }, [dispatch]);

  return (
    <div className="relative bg-cover bg-center h-[100vh] w-full">
      <Image
        src={background}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-center text-white mt-10 md:mt-20 px-4">
        <p className="text-3xl md:text-4xl font-bold">Top Tourism Places</p>
      </div>

      <div className="relative mt-10 z-10 max-w-5xl mx-auto px-4">
        {loading && (
          <div className="flex justify-center items-center h-32">
            <p className="text-white">Loading...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-32">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        {!loading && !error && places && places?.data.length > 0 ? (
          <Slider {...settings} className="w-full">
            {places?.data.map((data: Place) => (
              <div key={data.id} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col items-center h-full">
                  <div className="w-full h-[250px] relative">
                    {data.thumbnailUrl ? (
                      <Image
                        src={data.thumbnailUrl}
                        alt={data.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col items-center">
                    <p className="text-lg md:text-xl font-semibold">
                      {data.name}
                    </p>
                    <p className="text-center text-gray-700 mt-2 line-clamp-3">
                      {data.description}
                    </p>
                    <button className="mt-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => {handleOnClick(data.id)}}>
                      Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          !loading && (
            <p className="text-white text-center">No places available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default TopPlaceSlider;
