import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      {" "}
      {/* Bike Delivery Parent Section */}
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[4.5rem]">
            MBK City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
          placeat inventore reprehenderit nihil cumque totam facilis qui optio
          autem explicabo asperiores, fugiat at numquam dolore officia ad
          voluptatibus, cum vero.
        </p>
        <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-200">
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center">
        <img className="h-650 ml-auto" src={HeroBg} alt="bg-hero" />
      </div>
    </section>
  );
};

export default HomeContainer;
