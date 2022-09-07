import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
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
  const [isMenu, setisMenu] = useState(false);
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
    } else {
      setisMenu(!isMenu); // short circuitry to toggle menu when user is available
    }
  };
  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="fixed w-screen bg-primary z-50 p-3 px-4 md:p-6 md:px-16">
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
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
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
          </motion.ul>
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
            {/* Drop down Menu */}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 bg-gray-50 absolute rounded-lg shadow-xl flex flex-col top-12 right-0"
              >
                {/* Manage Admin Roles to create Item */}
                {user && user.email === "mubarakmuhammadjamiu@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      onClick={() => setisMenu(false)}
                      className="px-4 py-2 flex items-center gap-3 hover:bg-slate-200 cursor-pointer transition-all duration-100 ease-in-out  text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 hover:bg-slate-200 cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden justify-between w-full h-full">
        {/* Cart section */}
        <div className=" relative flex items-center justify-center ">
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-cartNumBg">
            <p className="text-white text-sx font-semibold">2</p>
          </div>
        </div>

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
        {/* Avatar profile */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
            src={user ? user.photoURL : Avatar}
            alt="user-profile"
            onClick={login}
          />
          {/* Drop down Menu */}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-40 bg-gray-50 absolute rounded-lg shadow-xl flex flex-col top-12 right-0"
            >
              {/* Manage Admin Roles to create Item */}
              {user && user.email === "mubarakmuhammadjamiu@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 hover:bg-slate-200 cursor-pointer transition-all duration-100 ease-in-out  text-textColor text-base"
                    onClick={() => setisMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              {/* Nav link mobile */}
              <div>
                <ul>
                  <li
                    className="text-base text-textColor  px-4 py-2  hover:bg-slate-200 cursor-pointer duration-100 transition-all ease-in-ease-out"
                    onClick={() => setisMenu(false)}
                  >
                    Home
                  </li>
                  <li
                    className="text-base text-textColor px-4 py-2  hover:bg-slate-200 cursor-pointer duration-100 transition-all ease-in-ease-out"
                    onClick={() => setisMenu(false)}
                  >
                    Menu
                  </li>
                  <li
                    className="text-base text-textColor px-4 py-2  hover:bg-slate-200 cursor-pointer duration-100 transition-all ease-in-ease-out"
                    onClick={() => setisMenu(false)}
                  >
                    About Us
                  </li>{" "}
                  <li
                    className="text-base text-textColor px-4 py-2  hover:bg-slate-200 cursor-pointer duration-100 transition-all ease-in-ease-out"
                    onClick={() => setisMenu(false)}
                  >
                    Services
                  </li>
                </ul>
              </div>
              {/* LogOut */}
              <p
                onClick={logout}
                className="px-4 py-2 m-2 rounded-md shadow-md flex items-center gap-3 justify-center bg-gray-300 hover:bg-slate-400 cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Log Out <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
