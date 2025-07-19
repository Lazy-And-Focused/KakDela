import { Injectable } from "@nestjs/common";

import { UpdateWriteOpResult } from "mongoose";

import { KakDela } from "@kakdela/types";
import { MODELS } from "database";
import { DeleteResult } from "types/mongodb.types";
import { SelfError, SelfStatus } from "types/status.type";

const { User } = MODELS;
const keyGetSymbols = ["@"];
const keyGetSymbolsMap = new Map<string, string>([
  ["@", "username"],
  ["", "id"]
]);

const ERROR_BAD_SLUG = `argument must be username (@username) or id (id)` as const;

@Injectable()
export class UsersService {
  public static getSlugType(slug: string): "id"|"username"|Error {
    if (!keyGetSymbols.includes(slug[0])) {
      if (isNaN(+slug[0])) {
        return new Error(ERROR_BAD_SLUG);
      };

      return "id";
    };

    return keyGetSymbolsMap.get(slug[0]) as "username" | "id";
  }

  public static lazyGetSlug(slug: string): string | KakDela.Response.GetData<KakDela.IUser> {
    if (!keyGetSymbols.includes(slug[0])) {
      if (isNaN(+slug[0]))
        return {
          error: new Error(ERROR_BAD_SLUG),
          successed: false,
          type: "user",
          resource: null
        };

      return slug;
    }

    const type = keyGetSymbolsMap.get(slug[0]) as "username" | "id";
    if (!type) {
      return {
        successed: false,
        resource: null,
        error: new Error(ERROR_BAD_SLUG),
        type: "user"
      };
    };

    return slug.slice(1);
  }

  public static getSlug(
    slug: string
  ): ({ "id": string } | { "username": string }) | KakDela.Response.GetData<KakDela.IUser> {
    const slugType = UsersService.getSlugType(slug);

    if (slugType instanceof Error) {
      return {
        successed: false,
        resource: null,
        error: slugType,
        type: "user"
      }
    };

    return { [slugType]: this.lazyGetSlug(slug) } as ({ "id": string } | { "username": string }) | KakDela.Response.GetData<KakDela.IUser>;
  }

  public static formatGettedData<Lazy extends boolean = false>(
    data: { "id": string } | { "username": string } | (Lazy extends true ? Error : never)
  ): Lazy extends true ? (string | false) : string {
    if (data instanceof Error) return false as (Lazy extends true ? (string | false) : string);

    const key = Object.keys(data)[0];
    return data[key];
  }

  public async getUser(data: Partial<KakDela.IUser> | string): Promise<KakDela.Response.IResponse<KakDela.IUser>> {
    try {
      const user = (await User.findOne(typeof data === "string" ? { id: data } : data)).toObject();

      if (!user) return new SelfError<null>("User not found.");

      return new SelfStatus(user, "User was found.");
    } catch (error) {
      console.error(error);

      return new SelfError<null>(new Error(error));
    }
  }

  public async updateUser<T extends UpdateWriteOpResult | KakDela.IUser>(
    id: string,
    data: Partial<KakDela.IUser>,
    returnUser: T extends KakDela.IUser ? true : false
  ): Promise<KakDela.Response.IResponse<T>> {
    try {
      const updated = await User.updateOne({ filter: { id }, update: data });

      const resource: T = returnUser
        ? (await User.findOne({ id })).toObject() as any
        : (updated as T);

      if (!updated.acknowledged)
        return new SelfError<null>("Unknown error: 1");

      return new SelfStatus(resource, "User was updated.");
    } catch (error) {
      console.error(error);

      return new SelfError<null>(new Error(error));
    }
  }

  public async deleteUser<T extends DeleteResult | KakDela.IUser>(
    id: string,
    returnUser: T extends KakDela.IUser ? true : false
  ): Promise<KakDela.Response.IResponse<T>> {
    try {
      const resource = returnUser ? User.findOne({filter: {id}}) : null;
      const deleted = await User.deleteOne({id});

      if (!deleted.acknowledged)
        return new SelfError<null>("Unknown error: 2");

      return new SelfStatus(returnUser ? (deleted as T) : (resource as unknown as T), "User was deleted.");
    } catch (error) {
      console.error(error);

      return new SelfError<null>(new Error(error));
    }
  }
}
