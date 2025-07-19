import mongoose from "mongoose";

import "./schemas/index";
import "./helpers/index";
import "./index";

export default async (url: string) => {
  mongoose
    .connect(url)
    .catch((err) => console.error(err))
    .then(async () => {
      console.log("Connected to MongoDB.");
    });
};
