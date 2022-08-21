import React from "react";
import Logo from "../img/logo.png";
const Header = () => {
  return (
    <div className="fixed w-screen z-50 p-6">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex w-full h-full">
        <div className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-textColor text-xl font-bold">City</p>
        </div>
        <ul className="flex items-center gap-8 ml-auto">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>Services</li>
        </ul>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
};

export default Header;
