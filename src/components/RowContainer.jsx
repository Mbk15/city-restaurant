import React from "react";

const RowContainer = ({ flag }) => {
  return (
    <div
      className={`w-full my-12 ${
        flag ? "overflow-x-scroll" : "overflow-x-hidden"
      } `}
    >
      <div className="w-full md:w-350  shadow-md h-20 backdrop-blur-lg bg-cardOverlay"></div>
    </div>
  );
};

export default RowContainer;
