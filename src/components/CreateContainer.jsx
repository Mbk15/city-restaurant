import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood } from "react-icons/md";
import { categories } from "../utils/data";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertSatus, setAlertSatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
        {/* error message field */}
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertSatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        {/* input field */}
        <div className="w-full py-2 border-b-2 border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none text-textColor placeholder:text-gray-400"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="GIve me a title..."
          />
        </div>
        {/* category section */}
        <div className="w-full ">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((data) => {
                return (
                  <option
                    value={data.urlParamName}
                    key={data.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  >
                    {data.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
