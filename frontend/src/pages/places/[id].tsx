import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../../Redux/store";
import { fetchPlaceByIdRequest } from "@/Redux/slices/placeSlice";
import { searchRequest } from "@/Redux/slices/searchSlice";
import HotelCard from "../../components/Place/HotelCard";
import background from "../../assets/darkGreenfloral.jpg";
import {
  HeritageResponse,
  HotelResponse,
  SearchEntityType,
} from "@/types/search/searchPayload";
import { Place } from "@/types/place/placePayload";

import PlaceDescription from "../../components/common/DescriptionMapslider";

const PlaceDetails = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const placeResponse = useAppSelector((state: RootState) => state.place.place);
  const listOfHeritagesResponse = useAppSelector(
    (state: RootState) => state.search.HERITAGE.results
  );
  const listOfHotelsResponse = useAppSelector(
    (state: RootState) => state.search.HOTEL.results
  );

  const [place, setPlace] = useState<Place | null>(null);
  const [heritages, setHeritages] = useState<HeritageResponse[] | null>(null);
  const [hotels, setHotels] = useState<HotelResponse[] | null>(null);

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      dispatch(fetchPlaceByIdRequest(id as string));
      dispatch(
        searchRequest({
          placeId: id as string,
          entityType: SearchEntityType.HOTEL,
        })
      );
      dispatch(
        searchRequest({
          placeId: id as string,
          entityType: SearchEntityType.HERITAGE,
        })
      );
    }
  }, [dispatch, router.query]);

  useEffect(() => {
    if (placeResponse) {
      setPlace(placeResponse);
    }
    if (listOfHeritagesResponse?.data) {
      setHeritages(listOfHeritagesResponse.data);
    }
    if (listOfHotelsResponse?.data) {
      setHotels(listOfHotelsResponse.data);
    }
  }, [
    placeResponse,
    listOfHeritagesResponse?.data,
    listOfHotelsResponse?.data,
  ]);

  const getGridClass = (index: number, totalImages: number) => {
    if (totalImages === 1) {
      return "col-span-2";
    }
    const layoutVariants = [
      "col-span-2",
      "col-span-1 row-span-2",
      "col-span-1",
    ];

    return layoutVariants[index % layoutVariants.length];
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onClick}
      >
        <FaArrowLeft className="text-white text-4xl bg-black p-2 rounded-full cursor-pointer" />
      </div>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onClick}
      >
        <FaArrowRight className="text-white text-4xl bg-black p-2 rounded-full cursor-pointer" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    fade: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const settingsForHeritage = {
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "40px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  const settingsForHotels = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
 
  return (
    <div className="overflow-hidden">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-5xl font-bold font-caveat text-black md:text-7xl lg:text-8xl">
          {place?.name}
        </div>

        <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 font-caveat text-5xl md:text-7xl lg:text-8xl flex font-bold justify-center text-white bounce">
          {place &&
            place.name.split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block animate-bounce`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
        </h3>
        <Slider {...settings} className="group">
          {place &&
            place.images?.map((img, index) => (
              <div key={index} className="relative">
                <div
                  className="absolute inset-0 -z-10 overflow-hidden"
                  style={{
                    backgroundImage: `url(${img.link})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(10px)",
                    transform: "scale(1.1)",
                  }}
                />
                <Image
                  src={img.link}
                  alt="place images"
                  width={700}
                  height={600}
                  className="relative w-full h-[90vh] object-contain"
                />
              </div>
            ))}
        </Slider>
      </div>

      <PlaceDescription
        title={place?.name ?? ""}
        description={place?.description ?? ""}
        mapUrl={place?.mapUrl ?? ""}
      />

      <div
        className="flex flex-col justify-center items-center min-h-screen bg-fill bg-center"
        style={{ backgroundImage: `url(${background.src})`, objectFit: "fill" }}
      >
        <h2 className="text-white font-bold text-3xl my-20">Heritage Sites</h2>
        <Slider {...settingsForHeritage} className="w-full max-w-[1200px]">
          {heritages?.map((heritage) => (
            <div
              key={heritage.id}
              className="group relative w-[380px] h-[500px] px-5 mb-20"
            >
              <div className="relative h-full transition-transform duration-500 ease-out transform group-hover:-translate-y-2">
                <img
                  src={heritage.thumbnailUrl}
                  alt={heritage.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 rounded-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10">
                  <div className="relative z-20 flex flex-col justify-end h-full p-6 transform translate-y-8 group-hover:translate-y-0  text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h1 className="text-xl mb-2">{heritage.name}</h1>
                    <p className="text-sm mb-4 line-clamp-2">
                      {heritage.description}
                    </p>
                    <button className="px-3 py-2 bg-white text-black font-bold rounded hover:bg-green-900 hover:text-white transition duration-300">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {hotels && (
        <div className="w-full overflow-hidden">
          {" "}
        
          <h2 className="text-3xl font-bold text-center my-20">
            Places to stay
          </h2>
          <div className="flex justify-center items-center gap-10 mb-20 w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <Slider {...settingsForHotels} className="w-full max-w-[1200px]">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="px-2 sm:px-1 w-[200px] sm:w-full md:w-full lg-w-full" 
                  >
                    <HotelCard
                      thumbnail={hotel.thumbnailUrl}
                      rating={hotel.hotelStarRating}
                      id={hotel.id}
                      title={hotel.name}
                      description={hotel.description}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
