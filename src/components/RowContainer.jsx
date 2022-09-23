import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
const RowContainer = ({ flag }) => {
  return (
    <div
      className={`w-full my-12 ${
        flag ? "overflow-x-scroll" : "overflow-x-hidden"
      } `}
    >
      <div className="w-full md:w-225 h-auto backdrop-blur-lg">
        <div className="w-300 flex items-center justify-between">
          <motion.img
            whileHover={{ scale: 1.2 }}
            src="https://firebasestorage.googleapis.com/v0/b/restaurant-app-mbk.appspot.com/o/Images%2F1663328480393-i7.png?alt=media&token=5ab49e74-a69d-4f5b-80a2-e616daa0cdf0"
            alt="icecream"
            className="w-40 mt-8"
          />

          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
          >
            <MdShoppingBasket className="text-white " />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RowContainer;
