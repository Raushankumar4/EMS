const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    try {
      fs.unlinkSync(file);
    } catch (unlinkerror) {
      console.log("Error while deleting file", unlinkerror);
    }
    return result;
  } catch (error) {
    console.log("Error while uploading image", error.message);
  }
};

module.exports = uploadOnCloudinary;
