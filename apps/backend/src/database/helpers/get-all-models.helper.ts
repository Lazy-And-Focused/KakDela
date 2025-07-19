import mongoose from "mongoose";

import { Model } from "types/mongodb.types";
import { SelfError, SelfStatus } from "types/status.type";

import type { KakDela } from "@kakdela/types";

const getAllModels = async (): Promise<KakDela.Response.IResponse<Model[], any>> => {
  try {
    const data = mongoose.modelNames() as Model[];

    if (!data) {
      return new SelfError("Возможно, таблиц не существует.", { resource: [] })
    }

    return new SelfStatus(data, "Таблицы были найдены.");
  } catch (err) {
    console.error(err);

    return new SelfError(new Error(err));
  }
};

export default getAllModels;
