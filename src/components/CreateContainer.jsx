import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebaseFunction";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../utils/data";
import { saveItem } from "../utils/firebaseFunction";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState();
  const [alertSatus, setAlertSatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  // Function to upload image to firebase
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while Uploading : Try Again");
        setAlertSatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setImageAsset(getDownloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Succesfully Uploaded");
          setAlertSatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted Successfully");
      setAlertSatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !categories || !imageAsset || !price || !calories) {
        setFields(true);
        setMsg("Required Fields Can't be empty");
        setAlertSatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded Successfully");

        setAlertSatus("success");
        setTimeout(() => {
          setFields(false);
          clearData();
        }, 4000);

        fetchData();
      }

      const clearData = () => {
        setTitle("");
        setCalories("");
        setImageAsset("");
        setPrice("");
        setCategory("Select Category");
      };

      const fetchData = async () => {
        await getAllFoodItems().then((data) => {
          dispatch({
            type: actionType.SET_FOOD_ITEMS,
            foodItems: data,
          });
        });
      };
    } catch (error) {
      setFields(true);
      setMsg("Error while Uploading : Try Again");
      setAlertSatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
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
        <div className="w-full py-2 border-b-2 border-gray-300 flex items-center gap-4">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            className="w-full h-full text-lg bg-transparent  outline-none border-none text-textColor placeholder:text-gray-400"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Give me a title..."
          />
        </div>
        {/* category section */}
        <div className="w-full ">
          <select
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
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

        {/* File Upload section */}

        <div className="group flex justify-center items-center flex-col my-3 border-2 rounded-lg border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Upload image If Asset URL is not available */}
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500  hover:text-gray-700">
                        Click here to Upload
                      </p>
                    </div>
                    <input
                      className="w-0 h-0"
                      onChange={uploadImage}
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                    />
                  </label>
                </>
              ) : (
                <>
                  {/* If there's an Asset URL */}
                  <div className="h-full relative">
                    <img
                      src={imageAsset}
                      alt="uploadedImage"
                      className="w-full h-full object-cover"
                    />
                    {/* Show delete Icon to remove Image In case of error */}
                    <button
                      onClick={deleteImage}
                      className="absolute bottom-3 right-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/* Calories Field */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className="text-gray-700 text-2xl " />
            <input
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="calories"
            />
          </div>
        </div>

        {/* Price Field */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className="text-gray-700 text-2xl " />
            <input
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="price"
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full h-full items-center">
          <button
            type="button"
            onClick={saveDetails}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
