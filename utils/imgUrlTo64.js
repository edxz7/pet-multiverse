const axios = require("axios");

async function imgUrlTo64(imgUrl) {
  try {
    const response = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "binary");
    const base64 = buffer.toString("base64");

    return `data:${response.headers["content-type"]};base64,${base64}`;
  } catch (error) {
    throw new Error("Failed to load the image.");
  }
}

module.exports = imgUrlTo64;