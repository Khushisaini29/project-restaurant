// Create , Update , Delete ,Read , Read All
// Admin - Create , Read , Update , Delete
// User - Read

import fileUploader from "../config/fileUploader.js";
import Food from "../model/food.model.js";

export const CreateFood = async (req, res) => {
  try {
    const { name, description, category, price, isAvailable} = req.body;
    const file = req.files; // multer.array() then req.files else multer.single then req.file
    console.log("1. CreateFood started");
    console.log("2. Request body:", req.body);
    console.log("3. Files:", req.files);
    console.log("image file", file);
    // validating Data
    if (!name || !description || !category || !price || !isAvailable === undefined) {
      return res.status(400).json({
        success: false,
        message: "Kindly Fill all required Fields",
      });
    }
    console.log("4. Starting Cloudinary upload");
    const result = await Promise.all(
      file.map((fileObj) =>
        fileUploader(fileObj.path, "food_Image").then((value) => {
          console.log(value);
          return value.secure_url;
        }),
      ),
    );
    console.log("5. Cloudinary upload completed");
    console.log("Image URLs:", result);
    console.log("Image Url ", result);
    const newFood = new Food();
    newFood.name = name;
    newFood.description = description;
    newFood.category = category;
    newFood.price = price;
    newFood.isAvailable = isAvailable;
    newFood.image = result;

    await newFood.save();

    console.log(newFood);

    res.status(201).json({
      success: true,
      newFoodItem: newFood,
      message: "Food Item Created Successfully",
    });
  } catch (error) {
    console.log("Error in Create FOod", error.message);
    return res.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
};
export const updateFoodData = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    let foodData = await Food.findOne({ _id: id });

    if (!foodData) {
      return res.status(404).json({
        success: false,
        message: "Resource Not Found",
      });
    }

    let updatedFoodData = await Food.findOneAndUpdate(
      { _id: id },
      {
        ...data,
      },
      {
        new: true,
      },
    );
    // foodData = { ...foodData, ...data };

    // await foodData.save();

    console.log(updatedFoodData);

    res.status(202).json({
      success: true,
      message: "Data Updated Successfully",
      updatedFoodData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
};

export const readAllData = async (req, res) => {
  try {
    // const Allfood = await Food.find({}, "-images -description"); // remove Some Field while Fetching Data
    const Allfood = await Food.find({});

    if (!Allfood) {
      return res.status(404).json({
        success: false,
        message: "No Food Data Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food Data Fetched Successfully",
      data: Allfood,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const GetOne = async (req, res) => {
  try {
    const { id } = req.params;

    let foodData = await Food.findOne({ _id: id });

    if (!foodData) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: foodData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const DeleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    let result = await Food.findOneAndDelete(
      { _id: id },
      {
        includeResultMetadata: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Menu Item Delete Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};