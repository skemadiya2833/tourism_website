import React from "react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import Image from "next/image";
import background from "../../assets/footerBg.jpg";

const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
 
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="w-full h-full"
        />

        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

    
      <div className="relative z-10 container px-12 text-white">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 ">
            <h4 className="text-3xl font-semibold">
              Let &apos; s keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2">
              Find us on any of these platforms, we respond within 1-2 business days.
            </h5>
            <div className="flex mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaXTwitter />
              </button>
              <button
                className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaFacebookF />
              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <IoLogoInstagram />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-300 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Discover
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-300 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-200 hover:text-blueGray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-400 font-semibold py-1">
              © 2024 Tourism App
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
