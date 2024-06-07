import { response } from "express";
import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    // check if userdata already exist
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    // save user data into database
    const savedData = await userData.save();
    //response with saved user data

    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    //handle error
    console.error("Error occurred while creating user:", error);
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({
      error: error.message + " error inside update userController.js",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not exist!" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted successfully" });
  } catch {
    res.status(500).json({
      error: error.message + " error inside deleteUSer userController.js",
    });
  }
};
