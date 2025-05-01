import { Model as MongoModel } from "mongoose";

import { KakDela } from "@kakdela/types";

import { Auth } from "./models/auth.model";
import { User } from "./models/user.model";
import { Message } from "./models/message.model";

type Models = {
  auth: MongoModel<KakDela.IAuth>,
  user: MongoModel<KakDela.IUser>,
  message: MongoModel<KakDela.IMessage>
};

const MODELS: Models = {
  auth: Auth,
  user: User,
  message: Message
} as const;

class Database<T> {
  public constructor(public readonly model: MongoModel<T>) {};

  public findLast = async <T extends { id: string }>(): Promise<Readonly<T>> => {
    return (await this.model.findOne({}, {}, { sort: { "created_at": -1 }, new: true }))!;
  };
  
  public generateId = async() => {
    const id = await this.model.countDocuments();
  
    return `${(id === 0 ? 0 : +(await this.findLast()).id) + 1}`;
  }
}

class Model<
  ModelName extends (typeof KakDela.Database.MODELS)[number],
  Create extends KakDela.Database.Create[ModelName] = KakDela.Database.Create[ModelName],
  Base extends KakDela.Database.Base[ModelName] = KakDela.Database.Base[ModelName]
> {
  private readonly database: Database<Base>;
  private readonly _constructor_data: Create & Partial<Base>;
  private _data: Base = <Base>{};
  private _initialized: boolean = false;
  
  public constructor(
    modelName: ModelName,
    data: Create & Partial<Base>
  ) {
    this._constructor_data = {
      created_at: new Date(),
      ...KakDela.Database.DEFAULT[modelName],
      ...data
    };
    
    this.database = new Database<Base>(MODELS[modelName] as unknown as MongoModel<Base>);
  };

  public async init() {
    if (this._initialized) return this;

    if (!this._constructor_data.id) {
      const createdModel = await this.database.model.create({ id: await this.database.generateId(), ...this._constructor_data });
      
      this._data = createdModel;
      this._initialized = true;

      return this;
    };

    await this.database.model.updateOne({ id: this._constructor_data.id }, <any>this._constructor_data);
    
    this._data = <Base>(await this.database.model.findOne({ id: this._constructor_data.id }));
    this._initialized = true;

    return this;
  }

  public get data() {
    if (!this._initialized) throw new Error("Model not initialized")
    
    return this._data;
  }
}

export { Model, Database };

export default Model;
