import { Model } from "mongoose";

import { KakDela } from "@kakdela/types";

type DefaultOmit = "id"|"created_at"|"updated_at";

class Database<T> {
  public constructor(public readonly model: Model<T>) {};
}