import Sidebar from "@/components/Dashboard/Sidebar";
import Router, { useRouter } from "next/router";
import Profile from "@/components/Dashboard/Profile";
import Hotel from "@/components/Dashboard/Hotel";
import Heritage from "@/components/Dashboard/Heritage";
import Place from "@/components/Dashboard/Place";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hook";
import { RootState } from "@/Redux/store";
const DashboardSection = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("");
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (router.isReady) {
      const { section } = router.query;
      if (section) {
        setActiveItem(section as string);
      }
    }
  }, [router.isReady, router.query]);

  const renderComponent = () => {
    switch (activeItem) {
      case "profile":
        return <Profile />;
      case "hotel":
        return <Hotel />;
      case "heritage":
        return ( user?.role === 'ADMIN' && <Heritage />);
      case "place":
        return ( user?.role === 'ADMIN' && <Place/>);
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex justify-between">
      <div className="hidden md:block">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      </div>
      <div className="mx-auto p-4">{renderComponent()}</div>
    </div>
  );
};

export default DashboardSection;
