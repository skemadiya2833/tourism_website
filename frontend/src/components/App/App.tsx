import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import PortalDescription from "./PortalDescription";
import TopPlaceSlider from "./TopPlaceSlider";
import ContactForm from "./ContactForm";
import axios from "axios";
import Cookies from "js-cookie";
const App = () => {
  const OPEN_CAGE_API_KEY = "7798af8bda164c24a5e37bb27ccb70c1";

  useEffect(() => {
    const getUserLocation = async () => {
      const savedLocation = Cookies.get("userLocation");

      if (!savedLocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await axios.get(
                  `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
                );
                const city = response?.data?.results[0]?.components?.city;

                if (city) {
                  Cookies.set("userLocation", city, { expires: 7 });
                }
              } catch (error) {
                console.error("Error fetching city name:", error);
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
            }
          );
        } else {
          console.error("Geolocation not supported by this browser.");
        }
      }
    };

    getUserLocation();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PortalDescription />
      <TopPlaceSlider />
      <ContactForm />
    </div>
  );
};

export default App;
