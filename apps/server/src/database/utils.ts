import { Model } from "mongoose";

export const findLast = async <T extends { id: string }>(model: Model<T>): Promise<Readonly<T>> => {
  return (await model.findOne({}, {}, { sort: { "created_at": -1 }, new: true }))!;
};

export const generateId = async <T extends { id: string }>(model: Model<T>) => {
  const id = await model.countDocuments();

  return `${(id === 0 ? 0 : +(await findLast(model)).id) + 1}`;
}