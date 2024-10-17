import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchHotelByIdRequest } from "../../Redux/slices/hotelSlice";
import { RootState } from "../../Redux/store";
import { Hotel } from "@/types/hotel/hotelPayload";
import HotelHeroSection from "@/components/Hotel/ParallaxSection";
import HotelDetailsCard from "@/components/Hotel/HotelDetailsCard";

export default function HotelDetails() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const data = useAppSelector((state: RootState) => state.hotel.hotel);
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      dispatch(fetchHotelByIdRequest(id as string));
    }
  }, [dispatch, router.query]);

  useEffect(() => {
    if (data) {
      setHotel(data);
    }
  }, [data]);

  if (!hotel) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <HotelHeroSection
        title={hotel.name}
        place={hotel.place.name}
        thumbnail={hotel.thumbnailUrl}
      />
      <HotelDetailsCard
        title={hotel.name}
        description={hotel.description}
        price={hotel.price}
        starRating={hotel.hotelStarRating}
        location={hotel.address}
        mapUrl={hotel.mapUrl}
        website={hotel.websiteLink}
        contact={hotel.contact}
        email={hotel.owner.email}
        availableRooms={hotel.availableRooms}
      />
    </>
  );
}
