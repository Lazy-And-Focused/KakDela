import assert from "assert";

import { KakDela } from "../src";

type IObject<T extends string = string> = Record<T, bigint>;

const executeObject = (actual: IObject, expected: IObject) => {
  Object.keys(actual).forEach(key => {
    it(`Ключ "${key}" должен содержать "${actual[key]}"`, () => {
      assert.equal(actual[key], expected[key]);
    });
  });
};

const executeRights = <T extends string[] = string[]>({
  actual, exclude, rights
}: {
  actual: IObject<T[number]>,
  exclude: T | Readonly<T>,
  rights: {
    default: IObject,
    available: IObject
  }
}) => {
  describe("Default", () => {
    const expected: IObject = rights.default;

    console.log(expected);
    executeObject(actual, expected);
  });

  describe("Available", () => {
    const expected: IObject = rights.available;

    executeObject(
      Object.fromEntries(Object.keys(actual).map(k => [
        k, exclude.includes(k) ? 0n : (<IObject>actual)[k]
    ])), expected);
  });
};

describe("Rights.Constants", () => {
  describe("My", () => {
    executeRights({
      actual: <KakDela.Rights.Types.My>{
        USER: 1n << 0n,
        READ_MESSAGES: 1n << 1n,
        CREATE_MESSAGES: 1n << 2n,
        CHANGE_MESSAGE: 1n << 3n,
        DELETE_MESSAGE: 1n << 4n,
        JOIN_CHATS: 1n << 5n,
        CREATE_CHATS: 1n << 6n,
        READ_ACCOUNTS: 1n << 7n,
        ADMINISTATOR: 1n << 8n,
        BANNED: 1n << 9n
      },
      exclude: KakDela.Rights.Constants.My.EXCLUDE,
      rights: {
        default: KakDela.Rights.Constants.My.DEFAULT,
        available: KakDela.Rights.Constants.My.AVAILABLE
      }
    });
  });
  
  describe("Message", () => {
    executeRights({
      actual: <KakDela.Rights.Types.Message>{
        CREATOR: 1n << 10n,
        READ: 1n << 11n,
        CHANGE: 1n << 12n,
        DELETE: 1n << 13n,
        REACT: 1n << 14n,
        REPLY: 1n << 15n,
        FORWARD: 1n << 16n
      },
      exclude: KakDela.Rights.Constants.Message.EXCLUDE,
      rights: {
        default: KakDela.Rights.Constants.Message.DEFAULT,
        available: KakDela.Rights.Constants.Message.AVAILABLE
      }
    });
  });
});