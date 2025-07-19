import mongoose from "mongoose";

import { SelfError, SelfStatus } from "types/status.type";

import type { KakDela } from "@kakdela/types";

const deleteModel = async (
  name: string
): Promise<KakDela.Response.IResponse<mongoose.Mongoose, any>> => {
  try {
    const data = mongoose.deleteModel(name);

    return new SelfStatus(data, `Модель ${name} удалена.`)
  } catch (err) {
    console.log(err);

    return new SelfError(new Error(err));
  }
};

export default deleteModel;
