import assert from "assert";

import { KakDela } from "../src";
type IObject<T extends string = string> = Record<T, bigint>;

const executeObject = (actual: IObject, expected: IObject) => {
  Object.keys(actual).forEach((key) => {
    it(`Ключ "${key}" должен содержать "${actual[key]}"`, () => {
      assert.equal(actual[key], expected[key]);
    });
  });
};

const executeRights = <T extends string[] = string[]>({
  actual,
  exclude,
  rights,
}: {
  actual: IObject<T[number]>;
  exclude: T | Readonly<T>;
  rights: {
    default: IObject;
    available: IObject;
  };
}) => {
  describe("Default", () => {
    const expected: IObject = rights.default;

    console.log(expected);
    executeObject(actual, expected);
  });

  describe("Available", () => {
    const expected: IObject = rights.available;

    executeObject(
      Object.fromEntries(
        Object.keys(actual).map((k) => [
          k,
          exclude.includes(k) ? 0n : (<IObject>actual)[k],
        ]),
      ),
      expected,
    );
  });
};

describe("Rights.Constants", () => {
  describe("My", () => {
    executeRights({
      actual: <KakDela.Rights.Types.My>{
        USER: 1n << 0n,
        ADMINISTATOR: 1n << 1n,
        BANNED: 1n << 2n,
        CREATE_MESSAGES: 1n << 3n,
        CHANGE_MESSAGES: 1n << 4n,
        READ_MESSAGES: 1n << 5n,
        DELETE_MESSAGES: 1n << 6n,
        JOIN_CHATS: 1n << 7n,
        CREATE_CHATS: 1n << 8n,
        READ_ACCOUNTS: 1n << 9n,
      },
      exclude: KakDela.Rights.Constants.My.EXCLUDE,
      rights: {
        default: KakDela.Rights.Constants.My.DEFAULT,
        available: KakDela.Rights.Constants.My.AVAILABLE,
      },
    });
  });

  describe("User", () => {
    executeRights({
      actual: <KakDela.Rights.Types.User>{
        CHANGE_MESSAGES: 1n << 10n,
        DELETE_MESSAGES: 1n << 11n,
        FORWARD_MESSAGES: 1n << 12n,
        REACT_MESSAGES: 1n << 13n,
        READ_MESSAGES: 1n << 14n,
        SEND_MESSAGES: 1n << 15n,
        SEND_GIFS: 1n << 16n,
        SEND_PHOTOS: 1n << 17n,
        SEND_STICKERS: 1n << 18n,
        SEND_VIDEOS: 1n << 19n,
        SEND_VOICE_MESSAGES: 1n << 20n,
      },
      exclude: KakDela.Rights.Constants.User.EXCLUDE,
      rights: {
        default: KakDela.Rights.Constants.User.DEFAULT,
        available: KakDela.Rights.Constants.User.AVAILABLE,
      },
    });
  });

  describe("Chat", () => {
    executeRights({
      actual: <KakDela.Rights.Types.Chat>{
        CREATOR: 1n << 21n,
        ADMINISTATOR: 1n << 22n,
        BANNED: 1n << 23n,
        VIEW: 1n << 24n,
        CREATE_INVITE_LINKS: 1n << 25n,
        VIEW_MEMBERS: 1n << 26n,
        KICK_MEMBERS: 1n << 27n,
        BAN_MEMBERS: 1n << 28n,
        RESTRICT_MEMBERS: 1n << 29n,
      },
      exclude: KakDela.Rights.Constants.Chat.EXCLUDE,
      rights: {
        default: KakDela.Rights.Constants.Chat.DEFAULT,
        available: KakDela.Rights.Constants.Chat.AVAILABLE,
      },
    });
  });
});
