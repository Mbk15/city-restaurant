import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
const Header = () => {
  return (
    <header className="fixed w-screen z-50 p-6 bg-gray-300">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex items-center justify-between w-full h-full">
        {/* Logo section */}
        <div className="flex items-center gap-2 ">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-textColor text-xl font-bold">City</p>
        </div>
        {/* Nav links  */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              Home
            </li>
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              Contact
            </li>{" "}
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              Services
            </li>
          </ul>
          {/* Cart section */}
          <div className=" relative flex items-center justify-center ">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-cartNumBg">
              <p className="text-white text-sx font-semibold">2</p>
            </div>
          </div>

          {/* Avatar profile */}
          <img
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl"
            src={Avatar}
            alt="user-profile"
          />
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
