import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../../Redux/store";
import { fetchHeritageByIdRequest } from "@/Redux/slices/heritageSlice";
import { Heritage } from "@/types/heritage/heritagePayload";
import HeritageThumbnailAnimation from "@/components/Heritage/HeritageThumbnailAnimation";
import DescriptionMapSlider from "@/components/common/DescriptionMapslider";

const HeritageDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const data = useAppSelector((state: RootState) => state.heritage.heritage);
  const [heritage, setHeritage] = useState<Heritage | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      dispatch(fetchHeritageByIdRequest(id as string));
    }
  }, [dispatch, router.query]);

  useEffect(() => {
    if (data) {
      setHeritage(data);
    }
  }, [data]);

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
  };

  return (
    <>
    
      <HeritageThumbnailAnimation
        name={heritage?.name}
        thumbnail={heritage?.thumbnailUrl}
      />

      <DescriptionMapSlider
        title={heritage?.name ?? ""}
        description={heritage?.description ?? ""}
        mapUrl={heritage?.mapUrl ?? ""}
      />
    </>
  );
};

export default HeritageDetails;
