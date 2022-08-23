import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0])); // set user data to local storage
    }
  };
  return (
    <header className="fixed w-screen z-50 p-6">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex items-center justify-between w-full h-full">
        {/* Logo section */}
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer ">
          <motion.img
            whileTap={{ scale: 0.4 }}
            className="w-8 object-cover"
            src={Logo}
            alt="logo"
          />
          <p className="text-textColor text-xl font-bold">City</p>
        </Link>
        {/* Nav links  */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              Home
            </li>
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-activeText cursor-pointer duration-100 transition-all ease-in-ease-out">
              About Us
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
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="user-profile"
              onClick={login}
            />
          </div>
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
